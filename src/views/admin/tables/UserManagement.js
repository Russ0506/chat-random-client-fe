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
  function handleOpenReportModal(user) {
    setOpenReportDialog({ open: true, data: user });
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
      .then(data => setAdminList(data))
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
                  <tr className="text-center ">
                    <th>No.</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Total Unresolved Reports</th>
                    <th>Total Reports</th>
                    <th>Status</th>
                    {/* <th>Reports</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adminList.map((user, index) => (
                    <tr className="text-center" key={index}>
                      <th scope="row" onClick={() => handleOpenReportModal(user)}>{index}</th>
                      <td className="text-left" onClick={() => handleOpenReportModal(user)}>{user.name}</td>
                      <td className="text-left" onClick={() => handleOpenReportModal(user)}>{user.email}</td>
                      <td onClick={() => handleOpenReportModal(user)}>{
                        user.no_of_unresolved_reports < 2
                          ? user.no_of_unresolved_reports + " time"
                          : user.no_of_unresolved_reports + " times"}</td>
                      <td onClick={() => handleOpenReportModal(user)}>
                      {
                        user.no_of_reports < 2
                          ? user.no_of_reports + " time"
                          : user.no_of_reports + " times"}
                        </td>
                      <td>
                        {user.status === "blocked" ? (
                          <Typography variant="body2" color="red">
                            Blocked
                          </Typography>
                        ) : (
                          <Typography variant="body2">Normal</Typography>
                        )}
                      </td>
                      {/* <td>
                        {user.reportCount < 2
                          ? user.reportCount + " time"
                          : user.reportCount + " times"}
                        {user.reportCount > 0 ? (
                          <IconButton
                            onClick={() => handleOpenReportModal(user)}
                          >
                            <LaunchIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                      </td> */}
                      <td className="text-left">
                        {user.status === "blocked" ? (
                          <>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <Iconify icon="ooui:un-block" />
                            </IconButton>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <DeleteForeverIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <BlockIcon
                                onClick={() => handleOpenBlockModal(user)}
                              />
                            </IconButton>

                            {user.no_of_unresolved_reports >= 10 ?
                              <IconButton sx={{ marginLeft: 0.5 }}>
                                <FlagIcon sx={{ color: "red" }} />
                              </IconButton>
                              : ""}
                          </>
                        )}
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
