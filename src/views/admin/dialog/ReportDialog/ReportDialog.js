import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { CardContent, Collapse, DialogTitle, Fade, Input, Stack, Typography } from "@mui/material";
import { Card } from "react-bootstrap";
import { mockData3 } from "../../mock_data"
import { axiosClient } from "../../../../setup/axiosClient";
import StartBarCt from "../../../common/error/StackBarCt";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});
const items = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,];
const DURATION_ERROR = 2000

export default function ReportDialog(props) {
  const [expanded, setExpanded] = React.useState(false)
  const [openStb, setOpenStb] = React.useState(false)
  const [message, setMessage] = React.useState("")

  function handleSubmitReport() {
    props.onClose();
  }

  function handleCloseReport() {
    props.onClose();
  }

  function handleToggleExpanded() {
    setExpanded(expanded ? false : true);
  }

  // error noti  
  const handleCloseStb = () => {
    setOpenStb(false)
  }


  function handleResolveReport() {
    axiosClient.put(`admin/reports/${props.data.id}/resolve`)
      .then(data => {
        console.log(data);
        props.onClose();
      })
      .catch(err => {
        setMessage(err.response.statusText)
        setOpenStb(true)
      })
  }

  React.useLayoutEffect(() => {
    const params = {
        "q[target_id_eq]" : props.data.id,
        "q[status_eq]": props.filter,
        "q[target_type_eq]" : "User"
    }


    if(props.data.id) {
      axiosClient.get(`/admin/reports`, {params: params})
        .then(data => console.log(data))
        .catch(err => {
          setMessage(err.response.statusText)
          setOpenStb(true)
        })
    }}, [props.data])

  return (
    <>
      <Dialog
        open={props.open ?? true}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        onClose={handleCloseReport}
        aria-describedby="alert-dialog-slide-description"
      >
        <StartBarCt openStb={openStb} closeStb={handleCloseStb} titleStb={message} typeNoti="error" duration={DURATION_ERROR}></StartBarCt>
        <DialogTitle>
          <Typography
            component="div"
            variant="h5"
          >Report List</Typography>
          <Input
            name="userId"
            type="hidden"
            value={props.data.userId}
            sx={{ display: "none" }}
          />
          <Typography variant="body2">
            <strong>Name:</strong> {props.data.name}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {props.data.email}
          </Typography>
          <strong>
            <Button onClick={handleToggleExpanded}>
              {expanded ? "Hide" : "View Detail"}
            </Button>{" "}
          </strong>
        </DialogTitle>
        <DialogContent>
          {mockData3.map((item, index) => (
            <Card style={{ width: "100%", marginTop: "20px" }} key={index}>
              <Card.Body>
                <Card.Title>Report ID: {item.id}</Card.Title>
                <Card.Text>
                  {/* <Card.Subtitle className="mb-2 text-muted"> */}
                  <div>
                    <strong>Reporter:</strong> {item.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {item.email}
                  </div>
                  <div>
                    <strong>Date Report:</strong> {item.created_at}
                  </div>
                  {/* </Card.Subtitle> */}
                </Card.Text>
                <Card.Subtitle>
                  {/* <strong>
                    <Button onClick={handleToggleExpanded}>
                      {expanded ? "Hide" : "View Report"}
                    </Button>{" "}
                  </strong> */}
                  <Stack>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography>Method: {item.problem_type}</Typography>
                        <Typography>
                          Detail : {
                            item.text
                          }
                        </Typography>
                        {/* <Typography paragraph>
                          Heat oil in a (14- to 16-inch) paella pan or a large,
                          deep skillet over medium-high heat. Add chicken,
                          shrimp and chorizo, and cook, stirring occasionally
                          until lightly browned, 6 to 8 minutes. Transfer shrimp
                          to a large plate and set aside, leaving chicken and
                          chorizo in the pan. Add pimentón, bay leaves, garlic,
                          tomatoes, onion, salt and pepper, and cook, stirring
                          often until thickened and fragrant, about 10 minutes.
                          Add saffron broth and remaining 4 1/2 cups chicken
                          broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                          Add rice and stir very gently to distribute. Top with
                          artichokes and peppers, and cook without stirring,
                          until most of the liquid is absorbed, 15 to 18
                          minutes. Reduce heat to medium-low, add reserved
                          shrimp and mussels, tucking them down into the rice,
                          and cook again without stirring, until mussels have
                          opened and rice is just tender, 5 to 7 minutes more.
                          (Discard any mussels that don&apos;t open.)
                        </Typography>
                        <Typography>
                          Set aside off of the heat to let rest for 10 minutes,
                          and then serve.
                        </Typography> */}
                      </CardContent>
                    </Collapse>
                  </Stack>
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </DialogContent>
        <DialogActions sx={{ marginBottom: 1 }}>
          <Button
            variant="contained"
            onClick={handleResolveReport}
            sx={{ marginLeft: 1, marginRight: 1, backgroundColor: "#1dd8cc" }}
          >
            Resolve
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitReport}
            sx={{ marginLeft: 1, marginRight: 1 }}
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
