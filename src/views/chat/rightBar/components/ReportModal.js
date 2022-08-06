import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as Yup from "yup";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Checkbox, Fade, Grid, Input, ListItemText, OutlinedInput, Select, Stack, TextField, Typography, MenuItem, Box } from "@mui/material";
import { axiosMultipartForm } from "../../../../setup/axiosClient";
import StartBarCt from "../../../common/error/StackBarCt";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade in={true} ref={ref} {...props} />;
});

const URL = "reports"

export default function ReportModal(props) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const reasonRef = React.useRef('')
    const inputFileRef = React.useRef(null);

    const reason_types = [
        "spam", "nude", "photo", "violence", "hate", "speech", "terrorism", "others",
    ];

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const [loading, setLoading] = React.useState(false)
    const [openStb, setOpenStb] = React.useState(false)
    const [messageError, setMessageError] = React.useState('')
    const [type, setType] = React.useState([]);
    const [typeNoti, setTypeNoti] = React.useState("error")
    const [attachments, setAttachments] = React.useState(null);
    function handleSubmitReport(event) {
        setLoading(true);
        event.preventDefault();
        if (reasonRef.current.value == '' || reasonRef.current.value == null || reasonRef.current.value == undefined) {
            return
        }


        const params = {
            report: {
                text: reasonRef.current.value,
                attachments: attachments,
                problem_type: type,
                target_type: 'User',
                target_id: props.data.id,
            },
        };

        const formData = new FormData();
        for (let param in params["report"]) {
            formData.append(`report[${param}]`, params["report"][param]);
        }

        axiosMultipartForm
            .post(`${URL}`, formData)
            .then((data) => {
                if (data.data.success) {
                    setTypeNoti("success")
                    setMessageError("Report successfully")
                    setOpenStb(true)
                    setLoading(false)
                    setTimeout(() => {
                        handleCancelReport();
                    }, 2000);
                }
            })
            .catch(
                function (error) {
                    setOpenStb(true)
                    setTypeNoti("error")
                    console.log(error.response.statusText);
                    setMessageError(error.response.statusText)
                    setLoading(false)
                }
            );
    }

    const LoginValidationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter the right email format').required('Email Required'),
        password: Yup.string().required('Password Required'),
    });

    function handleCancelReport() {
        reasonRef.current.value = null;
        inputFileRef.current.value = null;
        setAttachments([]);
        setType([]);
        props.onClose();;
    }

    function handleCloseStb() {
        setOpenStb(false)
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onFileChange = (event) => {
        setAttachments(event.target.files)
    }

    return (
        <>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth="sm"
                fullWidth
                onClose={handleCancelReport}
                aria-describedby="alert-dialog-slide-description"
            >
                <StartBarCt openStb={openStb} closeStb={handleCloseStb} titleStb={messageError} typeNoti={typeNoti} ></StartBarCt>

                <Box className="card" style={{ marginBottom: 0 }}>
                    <form autoComplete='off' onSubmit={handleSubmitReport}>
                        <div className="card-header">
                            <h5 className="card-title">
                                <Stack alignItems="center" flexDirection="row">
                                    <ReportGmailerrorredIcon sx={{ mr: 1 }} /> REPORT
                                </Stack>
                                <Typography className="me-5" component="p" variant="outline">Tell us the reason why this user annoy you!</Typography>
                            </h5>
                        </div>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Grid container spacing={2}>
                                    <Grid item xs={4} className="align-middle">
                                        <Typography>Reason<span style={{ color: "red" }}>*</span>:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Input
                                            id="validation-value-01"
                                            required
                                            fullWidth
                                            name="reason"
                                            inputRef={reasonRef}
                                            // value={props.data.id}
                                            sx={{
                                                borderRadius: "10px",
                                                border: "1px solid #f6f6f6",
                                                padding: "10px 5px",
                                                display: "flex",
                                                flexDirection: "column",
                                                overflow: "auto",
                                            }}
                                            placeholder="Type reason block..."
                                            aria-describedby="validation01"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="pt-2">
                                    <Grid item xs={4} className="align-middle">
                                        <Typography>Attachments: </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            ref={inputFileRef}
                                            sx={{ width: "350px" }}
                                            id="outlined-basic"
                                            variant="outlined"
                                            type="file"
                                            onChange={onFileChange}
                                            inputProps={{
                                                multiple: true
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} className="pt-2">
                                    <Grid item xs={4} className="align-middle">
                                        <Typography>Report Type: </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Select
                                            sx={{ width: "350px" }}
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={type}
                                            // name="type"
                                            onChange={handleChange}
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {reason_types.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <ListItemText primary={name} />
                                                    <Checkbox checked={type.indexOf(name) > -1} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ marginBottom: 1 }}>
                            <Button onClick={handleCancelReport}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ marginLeft: 1, marginRight: 1 }}
                                disabled={loading}
                            >
                                Report
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
        </>
    );
}
