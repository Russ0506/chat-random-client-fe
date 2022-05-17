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
	CLabel,
	CInputCheckbox,
	CCollapse,
	CInputRadio,
	CSelect
} from '@coreui/react';
import { request, requestHeader } from '../../util/axios';
import { isEmpty } from 'validate.js';
import { currentDate } from '../../util/common';
import {Modal, Button} from 'react-bootstrap';
import XMLViewer from 'react-xml-viewer'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {
	FaCompressArrowsAlt, 
	FaExpandArrowsAlt, 
	FaSyncAlt,
	FaSistrix,
	FaFileDownload,
	FaWindowClose,
	FaTimes,
} from "react-icons/fa";


const MessageList = props => {
	const [searchState, setSearchState] = useState({
		searchStartD : currentDate(),
		searchStartT : "0000",
		searchEndD : currentDate(),
		searchEndT : "2359",
		searchSprt : "A",
		searchStts : ['C', 'I', 'E'],
		searchDocCd : "",
		searchDobxId : "",
		searchMsgId : "",
		searchSendPtId : "",
		searchRecvPtId : "",
	});

	const[gridApi, setGridApi] = useState();
	const[viewXml, setViewXml] = useState("");
	const[xmlInfo, setXmlInfo] = useState({});
	const[accordion, setAccordion] = useState(1)

	const [gridState, setGridState] = useState(
		{
			columnDefs: [
				{
					field:"SEND_ID",
					hide:true
				},
				{
					field:"RECV_ID",
					hide:true
				},
				{
					field:"CSTM_DESC",
					hide:true
				},
				{
					headerName : "선택", 
					checkboxSelection: true,
					minWidth: 70,
					maxWidth: 100,
					pinned: 'left',
				},
				{
					headerName : "No", 
					field: "NO",
					minWidth: 100,
					maxWidth: 100,
					pinned: 'left',
				},
				{
					headerName : "I/O", 
					field: "SEND_RECV",
					minWidth: 60,
					maxWidth: 60,
					pinned: 'left',
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
				{
					headerName : "문서명", 
					field: "DOC_CD",
					minWidth: 150,
					maxWidth: 150,
					pinned: 'left'
				},
				{
					headerName : "제출번호", 
					field: "SBMT_NO",
					minWidth: 220,
					maxWidth: 300,
				},
				{
					headerName : "메시지 ID", 
					field: "MSG_ID",
					minWidth: 300,
					maxWidth: 400,
				},
				{
					headerName : "송신 메시지 ID", 
					field: "SEND_MSG_ID",
					minWidth: 350,
					maxWidth: 450,
				},
				{
					headerName : "송신 PT ID", 
					field: "SENDR_PART_ID",
					minWidth: 200,
					maxWidth: 250,
				},
				{
					headerName : "수신 PT ID", 
					field: "RECVR_PART_ID",
					minWidth: 200,
					maxWidth: 250,
				},
				{
					headerName : "상태", 
					field: "STTS",
					minWidth: 70,
					maxWidth: 100,
					pinned: 'right',
				},
				{
					headerName : "결과", 
					field: "CSTM_STTS",
					minWidth: 70,
					maxWidth: 100,
					pinned: 'right',
					cellStyle:{"textAlign":"center"},
					tooltipField: 'CSTM_DESC',
					cellRenderer: function(params){
						if(!isEmpty(params.data.CSTM_STTS)){
							if(params.data.CSTM_STTS != "C200"){
								return (
									`
										<span>
											<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-octagon-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
											</svg>
										</span>
									`
								)
							}else{
								return (
									`
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-emoji-smile" fill="green" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
											<path fill-rule="evenodd" d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"/>
											<path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
										</svg>
									`
									)
							}
						}
					}
				},
				{
					headerName : "VIEW", 
					field: "XML_FILE",
					minWidth: 70,
					maxWidth: 100,
					pinned: 'right',
					cellStyle:{"textAlign":"center"},
					cellRendererFramework: params => {
						if(!isEmpty(params.data.XML_FILE)){
							const onclickViewXml = () => {
								request("post", "/api/xml_view", params.data)
									.then(res => {
										setShow(true);
										setViewXml(res);
										setXmlInfo(params.data);
									}
								);
							}

							return (
								<CButton type="button" onClick={onclickViewXml}>
									<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-earmark-text-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7 2l.5-2.5 3 3L10 5a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
									</svg>
								</CButton>
							)
						}else{
							return <div></div>;
						}
					},
					cellRendererParams : {
					}
				},
				{
					headerName : "송수신 일시", 
					field: "DTTM",
					minWidth: 200,
					maxWidth: 250,
					pinned: 'right',
				},
			],
			defaultColDef: { 
				resizable: true,
			},
			tooltipShowDelay: 0,
		}
	);

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const handleXmlViewer = (e, p) => {
		//setShow(true);

		console.log(e);
	}

	const [rowData, setRowData] = useState([]);

	const gridRead = (params) => {
		params.api.sizeColumnsToFit();

		const data = {...searchState};

		request("post", "/api/msg_list", data)
			.then(res => {
				setRowData(res);
			}
		);

		setGridApi(params.api);
	}

	//서치 데이터 핸들러
	const handleChange = e => {
		e.persist();

		let { name, value } = e.target;

		if(name === 'searchStts'){
			if(e.target.checked){
				searchState.searchStts.push(value);
			}else{
				const idx = searchState.searchStts.indexOf(value);
				searchState.searchStts.splice(idx, 1);
			}

			value = searchState.searchStts;
		}

		setSearchState({
			...searchState,
			[name] : value
		});
	}

	//조회
	const handleSearch = e => {
		//if(isEmpty(searchState.searchVal)){
		//	alert("검색어를 입력하세요.");

		//	return false;
		//}else{
			const data = {...searchState};

			request("post", "/api/msg_list", data)
				.then(res => {
					setRowData(res);
				}
			);
		//}
	}

	//다운로드
	const handleDownload = e => {
		const filePath = xmlInfo['XML_FILE'];
		const fileNm = filePath.substring(filePath.lastIndexOf("\/") + 1, filePath.length);

		requestHeader("post", "/api/file_xml_download", xmlInfo)
			.then(res => {
				const url = window.URL.createObjectURL(new Blob([res.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', fileNm);
				document.body.appendChild(link);
				link.click();
			}
		);
	}

	//재처리
	const onclickRprcs = e => {
		let selectedRows = gridApi.getSelectedRows();
		let data = {
			selectData : selectedRows
		};

		if(selectedRows.length > 0){
			if(window.confirm("재처리 실행하시겠습니까?")){
				request("post", "/api/msg_Reprocess", data)
					.then(res => {
						if(!isEmpty(res.RESULT_CD)){
							alert(res.RESULT_MSG);
						}else{
							alert("재처리 실행하였습니다.");
						}
					}
				);
			}
			
		}else{
			alert("선택된 ROW가 없습니다.");
		}
	}

	return (
		<div>
			<div>
				<CRow>
					<CCol xs="12" sm="12" md="12">
						<CCard>
							<CCardBody>
								<CForm action="" method="post" className="form-horizontal">
									<CFormGroup className="pr-1">
										<CFormGroup row className="form-inline">
											<CCol sm="1">
												<CLabel className="pr-2">송/수신일시</CLabel>
											</CCol>
											<CCol sm="9">
												<CInput 
													type="date" 
													id="searchStartD" 
													name="searchStartD" 
													placeholder="date"
													className="input-sm"
													size="sm"
													value={searchState.searchStartD || ''}
													onChange={handleChange}
												/>
												<CInput 
													id="searchStartT" 
													name="searchStartT"
													controls
													placeholder="0000"
													className="input-sm"
													size="sm"
													value={searchState.searchStartT || ''}
													onChange={handleChange}
												/>
												~ 
												<CInput 
													type="date" 
													id="searchEndD" 
													name="searchEndD" 
													placeholder="date"
													className="input-sm"
													size="sm"
													value={searchState.searchEndD || ''}
													onChange={handleChange}
												/>
												<CInput 
													id="searchEndT" 
													name="searchEndT"
													controls
													placeholder="2359"
													className="input-sm"
													size="sm"
													value={searchState.searchEndT || ''}
													onChange={handleChange}
												/>
											</CCol>
											<CCol sm="2" className="text-right">
												<CButton type="button" color="primary" onClick={handleSearch} size="sm"><FaSistrix/> Search</CButton>&nbsp;
												<CButton type="button" color="danger" onClick={() => setAccordion(accordion === 0 ? null : 0)} size="sm">
												{accordion == 0 &&
													<FaCompressArrowsAlt/>
												}
												{accordion != 0 &&
													<FaExpandArrowsAlt/>
												}
												</CButton>
											</CCol>
										</CFormGroup>
										<CCollapse show={accordion === 0}>
											<CFormGroup row>
												<CCol sm="1">
													<CLabel className="pr-2">송/수신</CLabel>
												</CCol>
												<CCol md="2">
													<CSelect 
														custom name="searchSprt"
														id="searchSprt"
														value={searchState.searchSprt || ''} 
														onChange={handleChange}
													>
														<option value="A">전체</option>
														<option value="S">송신</option>
														<option value="R">수신</option>
													</CSelect>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol sm="1">
													<CLabel className="pr-2">처리상태</CLabel>
												</CCol>
												<CCol md="9">
													<CFormGroup variant="custom-checkbox" inline>
														<CInputCheckbox 
															custom id="searchStts2" 
															name="searchStts" 
															value="C" 
															onChange={handleChange} 
															checked={searchState.searchStts.indexOf('C')>-1}
														/>
														<CLabel variant="custom-checkbox" htmlFor="searchStts2">완료</CLabel>
													</CFormGroup>
													<CFormGroup variant="custom-checkbox" inline>
														<CInputCheckbox 
															custom id="searchStts3" 
															name="searchStts" 
															value="I" 
															onChange={handleChange}
															checked={searchState.searchStts.indexOf('I')>-1}
														/>
														<CLabel variant="custom-checkbox" htmlFor="searchStts3">진행 중</CLabel>
													</CFormGroup>
													<CFormGroup variant="custom-checkbox" inline>
														<CInputCheckbox 
															custom id="searchStts4" 
															name="searchStts" 
															value="E" 
															onChange={handleChange}
															checked={searchState.searchStts.indexOf('E')>-1}
														/>
														<CLabel variant="custom-checkbox" htmlFor="searchStts4">오류</CLabel>
													</CFormGroup>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol sm="1">
													<CLabel className="pr-2">문서명</CLabel>
												</CCol>
												<CCol md="2">
													<CInput 
														id="searchDocCd" 
														name="searchDocCd"
														controls
														placeholder="예) GOVCBRA85"
														className="input-sm"
														size="sm"
														value={searchState.searchDocCd || ''}
														onChange={handleChange}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol sm="1">
													<CLabel className="pr-2">문서함 ID</CLabel>
												</CCol>
												<CCol md="2">
													<CInput 
														id="searchDobxId" 
														name="searchDobxId"
														controls
														placeholder="예) VC110811479000"
														className="input-sm"
														size="sm"
														value={searchState.searchDobxId || ''}
														onChange={handleChange}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol sm="1">
													<CLabel className="pr-2">메시지 ID</CLabel>
												</CCol>
												<CCol md="2">
													<CInput 
														id="searchMsgId" 
														name="searchMsgId"
														controls
														placeholder="메시지 ID"
														className="input-sm"
														size="sm"
														value={searchState.searchMsgId || ''}
														onChange={handleChange}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol sm="1">
													<CLabel className="pr-2">송신자 PT ID</CLabel>
												</CCol>
												<CCol md="2">
													<CInput 
														id="searchSendPtId" 
														name="searchSendPtId"
														controls
														placeholder="송신자 PART ID"
														className="input-sm"
														size="sm"
														value={searchState.searchSendPtId || ''}
														onChange={handleChange}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol sm="1">
													<CLabel className="pr-2">수신자 PT ID</CLabel>
												</CCol>
												<CCol md="2">
													<CInput 
														id="searchRecvPtId" 
														name="searchRecvPtId"
														controls
														placeholder="수신자 PART ID"
														className="input-sm"
														size="sm"
														value={searchState.searchRecvPtId || ''}
														onChange={handleChange}
													/>
												</CCol>
											</CFormGroup>
										</CCollapse>
									</CFormGroup>
								</CForm>
							</CCardBody>
						</CCard>
					</CCol>
				</CRow>
			</div>
			<CCard>
				<CCardBody>
					<CRow className="p-1">
						<CCol col="2" className="mb-3 mb-xl-0 text-right">
							<CButton color="primary" size="sm" onClick={onclickRprcs}><FaSyncAlt/> 재처리</CButton>
						</CCol>
					</CRow>
					<CRow>
						<div className="ag-theme-alpine" style={{ width: '100%', height: '550px' }}>
							<AgGridReact
								columnDefs={gridState.columnDefs}
								rowData={rowData}
								onGridReady={gridRead}
								pagination={true}
								rowSelection="multiple"
								tooltipShowDelay={gridState.tooltipShowDelay}
							/>
						</div>
					</CRow>
				</CCardBody>
			</CCard>

			<Modal
                show={show}
                backdrop="static"
				keyboard={false}
				size="lg"				
            >
                <Modal.Header closeButton>
                    <Modal.Title>XML Viewer</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
					<XMLViewer 
						xml={viewXml} 
						theme={{overflowBreak : true}}
					/>
                </Modal.Body>
                <Modal.Footer>
					<Button variant="primary" onClick={handleDownload}><FaFileDownload/> 다운로드</Button>
					<Button variant="danger" onClick={handleClose}>
						<FaWindowClose/> Close
					</Button>
                </Modal.Footer>
            </Modal>
		</div>
	);
};

export default MessageList;