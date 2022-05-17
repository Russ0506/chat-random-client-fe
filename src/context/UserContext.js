import React from 'react';
import { isEmpty } from 'validate.js';
import {request} from '../util/axios/axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGOUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const UserProvider = ({children}) => {
	var [state, dispatch] = React.useReducer(userReducer, {
		isAuthenticated: !!sessionStorage.getItem("token"),
	});

	return (
		<UserStateContext.Provider value={state}>
      		<UserDispatchContext.Provider value={dispatch}>
        		{children}
      		</UserDispatchContext.Provider>
    	</UserStateContext.Provider>
	);
}

function useUserState() {
  	var context = React.useContext(UserStateContext);
  	if (context === undefined) {
    	throw new Error("useUserState must be used within a UserProvider");
  	}
 	return context;
}

function useUserDispatch() {
  	var context = React.useContext(UserDispatchContext);
  	if (context === undefined) {
    	throw new Error("useUserDispatch must be used within a UserProvider");
 	}
  	return context;
}

export {UserProvider, useUserState, useUserDispatch, loginUser, logOut};

function loginUser(dispatch, userId, password, history, setIsLoading, setError) {
	if(userId === ""){
        alert("USER ID를 입력하세요.");
        return false;
    }
    if(password === ""){
        alert("비밀번호를 입력하세요.");
        return false;
	}

	request("post", "/authenticate", {
        username : userId,
        password
      }
    ).then(res => {
        if(res !== undefined){
            sessionStorage.setItem("token", res.token);
		    sessionStorage.setItem("USER_ID", userId);

            //사용자 정보 조회
            request("post", "/api/user_dtl", {userId : userId})
            .then(res => {
                if(res !== undefined){
                    sessionStorage.setItem("GRP_ID", res.grpId);

                    //사용자 메뉴 조회
                    request("post", "/api/user_menu", {
                        userId : userId,
                    }).then(res => {
                        if(res !== undefined){
                            let menu = menuCreate(res);
                            sessionStorage.setItem("USER_MENU", JSON.stringify(menu));

                            setError(null);
                            setIsLoading(false);
                            dispatch({ type: 'LOGIN_SUCCESS' });
                            history.push("/dashboard");
                        }else{
                            setError(null);
                            setIsLoading(false);
                            dispatch({ type: 'LOGIN_FAILURES' });
                        }
                    });
                }else{
                    setError(null);
                    setIsLoading(false);
                    dispatch({ type: 'LOGIN_FAILURES' });
                }
            });
        }
    });
}

function logOut(dispatch, history) {
  	sessionStorage.removeItem("token");
  	sessionStorage.removeItem("USER_ID");
  	sessionStorage.removeItem("GRP_ID");

  	dispatch({ type: "LOGOUT_SUCCESS" });
  	history.push("/login");
}

function findRoute(children){
    let rut = "";

    for(let i = 0 ; i < children.length ; i++){
        const val = children[i];

        if(!isEmpty(val.menuUrl)){
            let url = val.menuUrl.split("/");
            rut = `/${url[1]}`;

            if(!isEmpty(rut)){
                break;
            }
        }
    }

    return rut;
}


function menuCreate(menuData){
    let menu = [];

    if(!isEmpty(menuData)){
        Object.entries(menuData).map(([key, val]) => {
            let menuItem = {};
            let children = [];

            menuItem = {
                _tag: val.menuTag
            };

            if(val.menuTag === "CSidebarNavTitle"){
                menuItem = {
                    ...menuItem,
                    _children: [val.menuNm]
                };

                menu.push(menuItem);
            }

            if(val.menuTag === "CSidebarNavTitle" && val.children.length > 0){
                let menuItems = menuCreate(val.children);

                for(let i = 0 ; i < menuItems.length ; i++){
                    menu.push(menuItems[i]);
                }
            }else{
                //메뉴 이름
                if(!isEmpty(val.menuNm)){
                    menuItem = {
                        ...menuItem,
                        name: val.menuNm
                    };
                }

                //링크
                if(!isEmpty(val.menuUrl)){
                    menuItem = {
                        ...menuItem,
                        to: val.menuUrl
                    };
                }

                //아이콘
                if(!isEmpty(val.menuIcon)){
                    menuItem = {
                        ...menuItem,
                        icon: val.menuIcon
                    };
                }

                //자식이 있으면 처리
                if(val.children.length > 0){
                    children = menuCreate(val.children);

                    //route 구하기
                    if(val.menuTag === "CSidebarNavDropdown"){
                        let route = findRoute(val.children);

                        menuItem = {
                            ...menuItem,
                            route: route
                        };
                    }

                    menuItem = {
                        ...menuItem,
                        _children: children
                    };
                }

                menu.push(menuItem);
            }
        });
    }

    return menu;
}
