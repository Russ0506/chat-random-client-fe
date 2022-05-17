import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { 
	CRow, 
	CCol, 
	CCard, 
	CCardBody, 
	CForm, 
	CFormGroup, 
	CInput, 
	CInputGroupAppend, 
	CButton,
	CLabel
} from '@coreui/react';
import { request } from '../../util/axios';
import { isEmpty } from 'validate.js';
import { currentDate } from '../../util/common';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FaSistrix } from 'react-icons/fa';


const ReprocessList = (props) => {
    const [grpIdList, setGrpIdList] = useState([]);
	const [searchState, setSearchState] = useState({
		searchStartD : currentDate(),
		searchEndD : currentDate(),
	});


	const [gridState, setGridState] = useState(
		{
			columnDefs: [
                {headerName : "No", field: "NO", minWidth: 70, maxWidth: 70,},
                {
					headerName : "I/O", 
					field: "SEND_RECV",
                    minWidth: 60,
                    maxWidth: 60,
					cellStyle:{"textAlign":"center"},
					cellRenderer: function(params){
						if(params.data.SEND_RECV === "I"){
							return (
								`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-left" fill="red" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
								<path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
							  </svg>`
							)
						}else if(params.data.SEND_RECV === "O"){
							return (
								`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-right" fill="blue" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
									<path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
						  		</svg>`)
						}else{
							return "";
						}
					}
                },
                {headerName : "문서 코드", field: "DOC_CD"},
                {headerName : "재처리 ID", field: "RPRCS_ID", minWidth: 200,},
                {headerName : "재처리 상태", field: "PRCS_STTS_DESC", minWidth: 100,},
				{headerName : "원본 ID", field: "ORG_ID", minWidth: 250,},
				{headerName : "원본 상태", field: "DOC_STTS_DESC", minWidth: 100,},
				{headerName : "요청 일시", field: "DTTM", cellStyle:{"textAlign":"center"}, minWidth: 250,},
				{headerName : "처리 일시", field: "PRCS_DTTM", cellStyle:{"textAlign":"center"}, minWidth: 250,},
			]
		}
	);

	const [rowData, setRowData] = useState([]);

	const gridRead = (params) => {
		params.api.sizeColumnsToFit();

		const data = {...searchState};

		request("post", "/api/rprcs_list", data)
			.then(res => {
				setRowData(res);
			}
		);
	}

	//서치 데이터 핸들러
	const handleChange = e => {
		e.persist();

		const { name, value } = e.target;

		setSearchState({
			...searchState,
			[name] : value
		});
	}

	//조회
	const handleSearch = e => {
        const data = {...searchState};

        request("post", "/api/rprcs_list", data)
            .then(res => {
                setRowData(res);
            }
        );
    }
    
    return (
		<>
		<CRow>
			<CCol xs="12" sm="12" md="12">
                <CCard>
                    <CCardBody>
                        <CForm action="" method="post" inline>
                            <CFormGroup className="pr-4">
                                <CLabel htmlFor="searchStartD" className="pr-1">신청 일자</CLabel>
                                <CInput 
                                    type="date" 
                                    id="searchStartD" 
                                    name="searchStartD" 
                                    value={searchState.searchStartD || ''}
                                    onChange={handleChange}
                                /> 
                                <CLabel htmlFor="searchEndD" className="pr-1"> ~ </CLabel>
                                <CInput 
                                    type="date" 
                                    id="searchEndD" 
                                    name="searchEndD" 
                                    value={searchState.searchEndD || ''}
                                    onChange={handleChange}
                                />
                            </CFormGroup>
                            <CFormGroup className="pr-1">
                                    <CInputGroupAppend>
                                        <CButton type="button" color="primary" onClick={handleSearch}><FaSistrix/> Search</CButton>
                                    </CInputGroupAppend>
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                </CCard>
			</CCol>
		</CRow>
		<div className="ag-theme-alpine" style={{ width: '100%', height: '500px' }}>
			<AgGridReact
				columnDefs={gridState.columnDefs}
				rowData={rowData}
				onGridReady={gridRead}
				pagination={true}
			/>
		</div>
		</>
	);
}

export default ReprocessList;