import { Alert, Snackbar } from "@mui/material";

export default function StartBarCt({openStb, closeStb, titleStb, duration = 3000, typeNoti = 'success'}) {

    return (
        <Snackbar open={openStb} autoHideDuration={duration} onClose={closeStb}>
        <Alert onClose={closeStb} severity={typeNoti} sx={{ width: '100%' }}>
            {titleStb}
        </Alert>
        </Snackbar>
    )
}