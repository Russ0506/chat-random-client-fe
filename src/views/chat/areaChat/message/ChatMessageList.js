import clsx from "clsx";
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_HEADER_HEIGHT } from '../../../../constant/css_constant';

import { loadConversation } from '../../../../features/chat';
//
// import LightboxModal from "../../../common/base/light-box/LightboxModal"
import Scrollbar from "../../../common/base/scroll-bar/Scrollbar"
import ChatMessageItem from './ChatMessageItem';
import { selectNewMessages } from "../../../../features/chat/messagesSlice"
import useLazyLoad from '../../../../features/useLazyLoad';
import Loading from "../../../common/base/loading/Loading";
import { resetMessages } from "../../../../features/chat/messagesSlice";

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  newMessages: PropTypes.array,
};

const SIZE_PAGES = 30;

export default function ChatMessageList({ conversation }) {
  const [dataConversation, setDataConversation] = React.useState([]);
  const newMessages = useSelector(selectNewMessages)
  const dispatch = useDispatch()
  const scrollRef = useRef(null);
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [initFlg, setInitFlag] = useState(false); // flag after init data
  const [isBottom, setIsBottom] = useState(true); // flag for check bottom scroll
  const triggerRef = useRef(null);

  useEffect(()=>{
    dispatch(resetMessages());
  }, [conversation]);

  const onGrabData = (currentPage) => {
    setIsBottom(false)
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(loadConversation({ conversation_id: conversation.id, page: currentPage, per_page: SIZE_PAGES })).then((data) => {
          if (data.payload && data.payload != []) {
            if (currentPage != 1) setDataConversation([...dataConversation, ...data.payload]);
            setInitFlag(true)
          }
        })
          .catch(() => {
          });
        resolve(dataConversation);
      }, 2500);
    });
  };

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  useEffect(() => {
    if (conversation?.id) {
      setIsBottom(true)
      getDataConversation(conversation.id, 1)
    }
  }, [conversation]);

  const getDataConversation = (id, currentPage) => {
    dispatch(loadConversation({ conversation_id: id, page: currentPage, per_page: SIZE_PAGES })).then((data) => {
      if (data.payload && data.payload != []) {
        setDataConversation(data.payload);
        setInitFlag(true)
      }
    })
      .catch(() => {
      });
  }

  const handleOpenLightbox = (url) => {
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  return (
    <>
      <Box sx={{ height: `calc(100% - ${CHAT_HEADER_HEIGHT})`, pl: 2 }}>
        <Scrollbar
          scrollableNodeProps={{ ref: scrollRef }}
          sx={{ height: "auto" }}
          scrollBottom={isBottom}
          indentify="chat-scroll-ult"
        >
          {/* {
            (conversation?.id && initFlg) ? <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
            </div> : ""
          } */}
          {dataConversation.slice().reverse().map((message, i) => (
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
