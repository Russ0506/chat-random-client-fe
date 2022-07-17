import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_HEADER_HEIGHT } from '../../../../constant/css_constant';

import { loadConversation } from '../../../../features/chat';
import Scrollbar from "../../../common/base/scroll-bar/Scrollbar"
import ChatMessageItem from './ChatMessageItem';
import { selectNewMessages } from "../../../../features/chat/messagesSlice"
import { resetMessages } from "../../../../features/chat/messagesSlice";
import useFetchList from '../../../../utils/useFetchList';

ChatMessageList.propTypes = {
  newMessages: PropTypes.array,
};

export default function ChatMessageList({conversation}) {
  const newMessages = useSelector(selectNewMessages)
  const dispatch = useDispatch()
  const scrollRef = useRef(null);
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [messagesList, loading, outOfPage] = useFetchList({
    resourceType: 'message',
    params: {conversationId: conversation?.id},
    page: page
  });

  useEffect(()=>{
    if (page > 1) setScrollToBottom(false)
  }, [page])

  useEffect(()=>{
    dispatch(resetMessages());
    setScrollToBottom(true)
    setPage(1);
  }, [conversation]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: document.querySelector('#chat-scroll-ult'),
      rootMargin: "0px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const handleOpenLightbox = (url) => {
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Box sx={{ height: `calc(100% - ${CHAT_HEADER_HEIGHT})`, pl: 2}}>
        <Scrollbar
          scrollableNodeProps={{ ref: scrollRef }}
          sx={{ height: "auto" }}
          scrollBottom={scrollToBottom}
          indentify="chat-scroll-ult"
        >
          { loading ? <div className="items-center"><div className="lds-dual-ring"></div></div>: <></> }
          <div ref={loader}/>
          {messagesList.slice().reverse().map((message,i) => (
            <ChatMessageItem
              key={i}
              message={message}
              nextMessage={(i< messagesList.length -1 ) ? messagesList[i+1] : newMessages[0]}
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
