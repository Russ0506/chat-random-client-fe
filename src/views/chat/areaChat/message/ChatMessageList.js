import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef,useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_HEADER_HEIGHT } from '../../../../constant/css_constant';

import { loadConversation } from '../../../../features/chat';
//
import LightboxModal from "../../../common/base/light-box/LightboxModal"
import Scrollbar from "../../../common/base/scroll-bar/Scrollbar"
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
  newMessages: PropTypes.array,
};

export default function ChatMessageList({newMessages, conversation}) {
  const [dataConversation, setDataConversation] = React.useState([]);
  const dispatch = useDispatch()
  const scrollRef = useRef(null);
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  // const []

  // useEffect(() => {
  //   const scrollMessagesToBottom = () => {
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //     }
  //   };
  //   scrollMessagesToBottom();
  // }, [conversation1.messages]);

  useLayoutEffect(()=> {
    dispatch(loadConversation({conversation_id : conversation.id})) .then((data) => {
      setDataConversation(data.payload);
    })
    .catch(() => {
    });
  }, []);

  // const imagesLightbox = conversation1.messages
  //   .filter((messages) => messages.contentType === 'image')
  //   .map((messages) => messages.body);

  const handleOpenLightbox = (url) => {
    // const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  return (
    <>
      <Box className="" sx={{ height: `calc(100% - ${CHAT_HEADER_HEIGHT})` }}>
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
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
          {newMessages.map((message, i) => (
            <ChatMessageItem
              key={i}
              message={message}
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
