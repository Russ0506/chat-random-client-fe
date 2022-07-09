import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Avatar, Box, Typography } from '@mui/material';
import styles from "../../../../styles/chat.scss"
import image from "../../../../assets/img/find-partner.jpg"

export default function MessageStatus({ status }) {
  const listStatus = ['sending', 'sent', 'received', 'seen']

  const Switch = props => {
    const { status, children } = props
    // filter out only children with a matching prop
    return children.find(child => {
      return child.props.value === status
    })
  }

  return (
    <Switch status={status}>
      <div className="config-position-icon" value={listStatus[0]}>
        <CircleOutlinedIcon sx={{ width: "16px" }} />{" "}
      </div>
      <div className="config-position-icon" value={listStatus[1]}>
        <CheckCircleOutlineIcon sx={{ width: "16px" }} />
      </div>
      <div className="config-position-icon" value={listStatus[2]}>
        <CheckCircleIcon sx={{ width: "16px" }} />
      </div>
      <div className="config-position-icon" value={listStatus[3]}>
        <Box className="config-position-icon-seen">
          <img
            src={image}
            className="avatar-circle"
            width="16px"
            height="16px"
          ></img>
        </Box>
      </div>
    </Switch>
  );
}
