import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

const CodeMng = (props) => {
    return (
        <>
        <CCard>
            <CRow>
			    <CCol xs="6" sm="6">
                    <CCardHeader>
                        <strong>Fist Code</strong>
                        <small> LIST</small>
                    </CCardHeader>
                    <CCardBody>
					    <CRow>
                            <select multiple={true} style={{width: "100%", height: "300px"}}>

                            </select>
                        </CRow>
                    </CCardBody>
                </CCol>
                <CCol xs="6" sm="6">
                    <CCardHeader>
                        <strong>Second Code</strong>
                        <small> LIST</small>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <select multiple={true} style={{width: "100%", height: "300px"}}>

                            </select>
                        </CRow>
                    </CCardBody>
                </CCol>
            </CRow>
        </CCard>
        </>
    )
}

export default CodeMng;