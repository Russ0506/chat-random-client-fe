import { Box, Grid } from '@mui/material';
import React from 'react';
import MessageChat from './message/MessageChat';
import TextChatLayer from './sendMessageBox/TextChatLayer'

const MessageLayout = () => (
  <Box sx={{ width: "100%", height : "100%" }}>
    <Box sx={{height: "50%"}}>
      <MessageChat
        avatar={''}
        messages={[
          'Hi Jenny, How r u today?',
          'Did you train yesterday',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
        ]}
      />
      <MessageChat
        side={'right'}
        messages={[
          "Great! What's about you?",
          'Of course I did. Speaking of which check this out',
        ]}
      />
      <MessageChat avatar={''} messages={['Im good.', 'See u later.']} />
    </Box>

    <Box sx={{height: "50%"}}>
      <TextChatLayer />
    </Box>

  </Box>
);


export default MessageLayout;