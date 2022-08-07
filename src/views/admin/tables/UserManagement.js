import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { userList2 } from "../mock_data";
import LaunchIcon from "@mui/icons-material/Launch";
import { IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BlockIcon from "@mui/icons-material/Block";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FlagIcon from '@mui/icons-material/Flag';
import Iconify from "../../common/base/icon/Iconify";
import BlockDialog from "../dialog/blockDialog/BlockDialog";
import ReportDialog from "../dialog/ReportDialog/ReportDialog";
import { axiosClient } from "../../../setup/axiosClient";

const BootstrapTable = () => {
  const [adminList, setAdminList] = React.useState([])

  const [openReportDialog, setOpenReportDialog] = useState({
    open: false,
    data: {
      userId: "",
      userName: "",
      email: "",
    },
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
    });
  }
  function handleOpenReportModal(user, filter = "") {
    setOpenReportDialog({ open: true, data: user, filter : filter });
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

  useEffect(() => {
    axiosClient.get('/admin/users')
      .then(data => {
        const newData = data.map((item) => ({
          ...item,
          isResolve: 0 === item.no_of_unresolved_reports,
        }));
        setAdminList(newData);
      })
      .catch(err => console.log(err))
  },[])

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">User Management</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th  className="text-center ">Total Unresolved Reports</th>
                    <th  className="text-center ">Total Reports</th>
                    {/* <th>Reports</th> */}
                    <th className="text-left ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adminList.map((user, index) => (
                    <tr className={(user.isResolve) ? "text-center black-color fw-bolder " : "text-center gray-color"} key={index}>
                      <th scope="row">{index}</th>
                      <td className="text-left">{user.name}</td>
                      <td className="text-left">{user.email}</td>
                      <td onClick={() => handleOpenReportModal(user)}>{
                        user.no_of_reports < 2
                          ? user.no_of_reports + " time"
                          : user.no_of_reports + " times"}</td>
                      <td onClick={() => handleOpenReportModal(user, "unresolved")}>
                      {
                        user.no_of_unresolved_reports < 2
                          ? user.no_of_unresolved_reports + " time"
                          : user.no_of_unresolved_reports + " times"}
                        </td>
                      <td className="text-left">
                        {user.status !== "blocked" ? (
                          <>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <Iconify icon="ooui:un-block" />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <BlockIcon
                                onClick={() => handleOpenBlockModal(user)}
                              />
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
      />
    </React.Fragment>
  );
};

export default BootstrapTable;
