import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Input, Divider, IconButton, InputAdornment } from '@mui/material';
import Iconify from '../../../common/base/icon/Iconify';
import EmojiPicker from '../../../common/base/emoji/EmojiPicker'
import { sendMesage } from '../../../../features/chat';
// utils
// import uuidv4 from '../../../utils/uuidv4';
// components


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  // conversation: PropTypes.object,
  onSend: PropTypes.func,
};

export default function ChatMessageInput({ disabled, conversation, onSend, recipientId }) {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend && conversation.conversationId) {
      let params = {
        conversationId :conversation.conversationId,
        // messageId: uuidv4(),
        // messageId: "123",
        text: message,
        // contentType: 'text',
        // attachments: [],
        // createdAt: new Date(),
        recipient_id: recipientId,
      }
      onSend(params);

      dispatch(sendMesage(params))

    }
    return setMessage('');
  };

  return (
    <RootStyle>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
        // startAdornment={
        //   <InputAdornment position="start">
        //     <EmojiPicker disabled={disabled} value={message} setValue={setMessage} />
        //   </InputAdornment>
        // }
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Iconify icon="ic:round-add-photo-alternate" width={22} height={22} />
            </IconButton>
            <EmojiPicker disabled={disabled} value={message} setValue={setMessage} />
            <IconButton disabled={disabled} size="small">
              <Iconify icon="eva:mic-fill" width={22} height={22} />
            </IconButton>
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{ mx: 1 }}>
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </RootStyle>
  );
}
