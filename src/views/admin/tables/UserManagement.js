import BlockIcon from "@mui/icons-material/Block";
import { IconButton } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FlagIcon from '@mui/icons-material/Flag';
import Pagination from '@mui/material/Pagination';
import { axiosClient } from "../../../setup/axiosClient";
import Iconify from "../../common/base/icon/Iconify";
import Search from "../../common/Search";
import BlockDialog from "../dialog/blockDialog/BlockDialog";
import ReportDialog from "../dialog/ReportDialog/ReportDialog";


const UserManagement = () => {
  const [adminList, setAdminList] = React.useState([])
  // pagination
  const [totalPage, setTotalPage] = React.useState(10)
  const [currentPage, setCurrentPage] = React.useState(1)

  const [openReportDialog, setOpenReportDialog] = useState({
    open: false,
    data: {
      userId: "",
      userName: "",
      email: "",
    },
    filter: "",
  });
  const [openBlockDialog, setOpenBlockDialog] = useState({
    open: false,
    data: {
      userId: "",
      userName: "",
      email: "",
    },
  });
  function handleCloseReportDialog() {
    setOpenReportDialog({
      open: false,
      data: {
        userId: "",
        userName: "",
        email: "",
      },
      filter: "",
    });
  }
  function handleOpenReportModal(user, filter = "") {
    setOpenReportDialog({ open: true, data: user, filter: filter });
  }
  function handleCloseBlockDialog() {
    setOpenBlockDialog({
      open: false,
      data: {
        userId: "",
        userName: "",
        email: "",
      },
    });
  }
  function handleOpenBlockModal(user) {
    setOpenBlockDialog({ open: true, data: user });
  }

  function onSearch(dataSearch = { statusBlock: null, statusEQ: null, text: null, page: null }) {
    const params = {
      "q[kewword]": dataSearch.text,
      "q[statusBlock]": dataSearch.statusBlock,
      "q[statusEQ]": dataSearch.statusEQ,
      "per_page": 10,
      "page": dataSearch.page != null ?  dataSearch.page : currentPage
    }
    axiosClient.get('/admin/users', {params : params})
      .then(data => {
        const newData = data.map((item) => ({
          ...item,
          isResolve: 0 === item.no_of_unresolved_reports,
        }));
        setAdminList(newData);
        // console.log(newData.length/10 +1);
        // setTotalPage(newData.length/10 +1)
      })
      .catch(err => console.log(err))
  }

  useLayoutEffect(() => {
    onSearch();
  }, [])

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header style={{ borderBottom: "none" }}>
              <Card.Title as="h5">User Management</Card.Title>
            </Card.Header>
            <Search onSearch={onSearch}  />
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th className="text-center ">Total Unresolved Reports</th>
                    <th className="text-center ">Total Reports</th>
                    {/* <th>Reports</th> */}
                    <th className="text-left ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adminList.map((user, index) => (
                    <tr className={(user.isResolve) ? "text-center black-color fw-bolder " : "text-center gray-color"} key={index}>
                      <th scope="row" className="text-left">{index+1}</th>
                      <td className="text-left">{user.name}</td>
                      <td className="text-left">{user.email}</td>
                      <td onClick={() => handleOpenReportModal(user, "unresolved")}>
                        {
                          user.no_of_unresolved_reports < 2
                            ? user.no_of_unresolved_reports + " time"
                            : user.no_of_unresolved_reports + " times"}
                      </td>
                      <td onClick={() => handleOpenReportModal(user, "")}>{
                        user.no_of_reports < 2
                          ? user.no_of_reports + " time"
                          : user.no_of_reports + " times"}
                      </td>
                      <td className="text-left">
                        {user.status == "unblocked" ? (
                          <>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <Iconify icon="ooui:un-block" />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton sx={{ marginLeft: 0.5 }} onClick={() => handleOpenBlockModal(user)}>
                              <BlockIcon/>
                            </IconButton>
                          </>

                        )}
                        {user.no_of_unresolved_reports >= 10 ?
                          <IconButton sx={{ marginLeft: 0.5 }}>
                            <FlagIcon sx={{ color: "red" }} />
                          </IconButton>
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            <div className="pagination-contain p-2 pr-5 border-top d-flex justify-content-end">
              <Pagination count={totalPage} boundaryCount={2} size="large" variant="outlined" shape="rounded" page ={currentPage} onChange = {(event, pg) => {setCurrentPage(pg); onSearch({page: pg})}}/>
            </div>
          </Card>
        </Col>
      </Row>
      <BlockDialog
        open={openBlockDialog.open}
        onClose={handleCloseBlockDialog}
        data={openBlockDialog.data}
      />
      <ReportDialog
        open={openReportDialog.open}
        onClose={handleCloseReportDialog}
        data={openReportDialog.data}
        filter={openReportDialog.filter}
      />
    </React.Fragment>
  );
};

export default UserManagement;
