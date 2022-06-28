import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
//
import LightboxModal from "../../../common/base/light-box/LightboxModal"
import Scrollbar from "../../../common/base/scroll-bar/Scrollbar"
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default function ChatMessageList({ conversation, mockDataConversation }) {
  const scrollRef = useRef(null);
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const imagesLightbox = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => messages.body);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Box className="assdadas" sx={{ height: "calc(100% - 92px)" }}>
        <Scrollbar
          scrollableNodeProps={{ ref: scrollRef }}
          sx={{ height: "auto" }}
        >
          {/* {conversation.messages.map((message) => (
           
              <ChatMessageItem
                key={message.id}
                message={message}
                conversation={conversation}
                onOpenLightbox={handleOpenLightbox}
              />
         
          ))} */}
           {mockDataConversation.map((message) => (
           
           <ChatMessageItem
             key={message.id}
             message={message}
             conversation={mockDataConversation}
             onOpenLightbox={handleOpenLightbox}
           />
      
       ))}
        </Scrollbar>
      </Box>
      <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(true)}
      />
    </>
  );
}
