// import { useEffect } from "react";
// import { useCookies } from "react-cookie";

import Loading from "../common/base/loading/Loading"

const Logout = () => {
    // const [cookies, setCookie, removeCookie] = useCookies(['_random_chat']);

    // function delete_cookie(name) {
    //     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //   }

    // useEffect(()=> {
    //     delete_cookie('_random_chat')
    //     console.log(cookies);
    // },[])

    setTimeout(() => {
        window.location.replace("/welcome")
    }, 3000);

    return (
        <Loading show={true} />)
}

export default Logout;