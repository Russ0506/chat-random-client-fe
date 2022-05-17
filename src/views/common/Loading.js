import React from 'react';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from 'react-redux';

const Loading = (props) => {
    const dispatch = useDispatch();
    const loadingShow = useSelector(state => state.loadingReducer.loading);

    const override = css`
                    margin: 0 auto;
                    border-color: red;
                    position: absolute;
                    z-index: 10000;
                    top:50%;
                    left: 50%;
                    `;

    return (
        <div className={loadingShow?'loadingdiv':''}>
            <BeatLoader
            css={override}
            size={50}
            color={"#123abc"}
            loading={loadingShow}
            />
        </div>
    )
}

export default Loading;