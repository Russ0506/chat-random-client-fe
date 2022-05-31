import Box from "@mui/material/Box"
import DrawerLayout from "../../common/drawer/DrawerLayout"
import ChatConversation from "./ChatConversation"


export default function  ChatMainScreen () {
    return (
        <Box>
            <DrawerLayout body={<ChatConversation />}/>
        </Box>
    )
}