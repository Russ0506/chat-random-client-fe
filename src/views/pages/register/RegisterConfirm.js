import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { registerConfirm } from "../../../features/auth";

export default function RegisterConfirm() {
    const dispatch = useDispatch()
    const { token } = useParams();

    useEffect(() => {
        dispatch(registerConfirm({confirmation_token: token }));
      }, [dispatch]);

    return (
        <div>Register Successfully</div>
    )
}