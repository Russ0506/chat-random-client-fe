import Box from "@mui/material/Box"
import DrawerLayout from "../../common/drawer/DrawerLayout"
import ChatConversation from "./ChatConversation"
import AppearanceSocket from '../sockets/AppearanceSocket'

export default function  ChatMainScreen () {
    return (
        <Box>
            <AppearanceSocket/>
            <DrawerLayout body={<ChatConversation />}/>
        </Box>
    )
}
