import React, { useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { userList } from "../../admin/mock_data";
import LaunchIcon from "@mui/icons-material/Launch";
import { IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Iconify from "../../common/base/icon/Iconify";
import BlockDialog from "../dialog/blockDialog/BlockDialog";
import ReportDialog from "../dialog/ReportDialog/ReportDialog";
const BootstrapTable = () => {
  const [openReportDialog, setOpenReportDialog] = useState({
    open: false,
    data: {
      userId: "",
      userName: "",
      email: "",
    },
  });
  function handleCloseReportModal() {
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
                    <th>Status</th>
                    <th>Reports</th>
                    <th className="text-right ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (
                    <tr>
                      <th scope="row">{userList.length - index}</th>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.status === "blocked" ? (
                          <Typography variant="body2" color="red">
                            Blocked
                          </Typography>
                        ) : (
                          <Typography variant="body2">Normal</Typography>
                        )}
                      </td>
                      <td>
                        {user.reportCount < 2
                          ? user.reportCount + " time"
                          : user.reportCount + " times"}
                        {user.reportCount > 0 ? (
                          <IconButton onClick={handleOpenReportModal}>
                            <LaunchIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="d-flex justify-content-end">
                        {user.status === "blocked" ? (
                          <>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <Iconify icon="ooui:un-block" />
                            </IconButton>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <DeleteForeverIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <BlockIcon
                                onClick={() => handleOpenReportModal(user)}
                              />
                            </IconButton>
                            <IconButton sx={{ marginLeft: 0.5 }}>
                              <DeleteForeverIcon />
                            </IconButton>
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
        open={openReportDialog.open}
        onClose={handleCloseReportModal}
        data={openReportDialog.data}
      />
      <ReportDialog
        // open={openReportDialog.open}
        onClose={handleCloseReportModal}
        data={openReportDialog.data}
      />
    </React.Fragment>
  );
};

export default BootstrapTable;
