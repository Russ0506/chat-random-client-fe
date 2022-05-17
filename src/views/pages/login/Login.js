import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {request} from '../../../util/axios';
import {useUserDispatch, loginUser} from '../../../context/UserContext';


const Login = props => {
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [userId, setUserId] = useState("");
  var [password, setPassword] = useState("");

  //로그인 이벤트
  const userLogin = e => {
    e.preventDefault();

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
        request("post", "/api/user_dtl", {
          userId : userId,
          }
        ).then(res => {
          if(res !== undefined){
            sessionStorage.setItem("GRP_ID", res.GRP_ID);
          }
        })

        props.history.push("/dashboard");
      }

      
    })
  }

  const appKeyPress = e => {
    if(e.key === 'Enter'){
      loginUser(
        userDispatch,
        userId,
        password,
        props.history,
        setIsLoading,
        setError,
      )
   }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div style={{width:"100%", textAlign:"center"}}>
                      <img src="/images/engineerStory2.png"/>
                    </div>
                    <div style={{width:"100%", textAlign:"end"}}>
                    <h5>WEB TMS</h5>
                    <p className="text-muted">Sign In to your account</p>
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      
                      <CInput 
                        type="text" 
                        placeholder="USER ID" 
                        autoComplete="userId" 
                        name="userId"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password" 
                        placeholder="Password" 
                        autoComplete="current-password" 
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyPress={(appKeyPress)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="12" className="text-center">
                        <CButton 
                          color="primary" 
                          className="px-4" 
                          onClick={() => loginUser(
                            userDispatch,
                            userId,
                            password,
                            props.history,
                            setIsLoading,
                            setError,
                          )}
                          block
                        >Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md="6" className="text-right">
            <h7>Copyright 2020. EngineerStory All Rights Reserved</h7>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
