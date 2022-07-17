import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_HEADER_HEIGHT } from '../../../../constant/css_constant';

import { loadConversation } from '../../../../features/chat';
import Scrollbar from "../../../common/base/scroll-bar/Scrollbar"
import ChatMessageItem from './ChatMessageItem';
import { selectNewMessages } from "../../../../features/chat/messagesSlice"
import { resetMessages } from "../../../../features/chat/messagesSlice";

ChatMessageList.propTypes = {
  newMessages: PropTypes.array,
};

export default function ChatMessageList({conversation}) {
  const [dataConversation, setDataConversation] = React.useState([]);
  const newMessages = useSelector(selectNewMessages)
  const dispatch = useDispatch()
  const scrollRef = useRef(null);
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(()=>{
    dispatch(resetMessages());
  }, [conversation]);

  useEffect(()=> {
    if (conversation?.id){
      dispatch(loadConversation({conversation_id : conversation.id})) .then((data) => {
        if (data.payload) {
          setDataConversation(data.payload);
        }
      })
      .catch(() => {
      });
    }
  }, [conversation]);

  const handleOpenLightbox = (url) => {
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  return (
    <>
      <Box  sx={{ height: `calc(100% - ${CHAT_HEADER_HEIGHT})`, pl: 2}}>
        <Scrollbar
          scrollableNodeProps={{ ref: scrollRef }}
          sx={{ height: "auto" }}
          scrollBottom={true}
          indentify="chat-scroll-ult"
        >
          {dataConversation.slice().reverse().map((message,i) => (
            <ChatMessageItem
              key={i}
              message={message}
              nextMessage={(i< dataConversation.length -1 ) ? dataConversation[i+1] : newMessages[0]}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
          {newMessages.map((message, i) => (
            <ChatMessageItem
              key={i}
              message={message}
              nextMessage={(i< newMessages.length -1 ) ? newMessages[i+1] : null}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </Scrollbar>
      </Box>
      {/* <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(true)}
      /> */}
    </>
  );
}
