import { useEffect } from "react"   ;
import Loading from "../common/base/loading/Loading"
import authService from "../../service/auth.service"; 

const Logout = () => {

    useEffect(()=> {
        authService.logout().then(()=>  window.location.replace("/welcome")) ;
    },[])

    return (
        <Loading show={true} />)
}

export default Logout;