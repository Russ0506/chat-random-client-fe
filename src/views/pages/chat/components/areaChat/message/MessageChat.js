import React from 'react'
import PropTypes from 'prop-types';
import cx from 'clsx';

import defaultChatMsgStyles from './defaultChatMsgStyles';
import { Avatar, Grid, Typography, Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import TextChatLayer from './message-description/ChatLayer'

function MessageChat(props) {
  // props => {
  const {
    classes,
    avatar,
    messages,
    side,
    GridContainerProps,
    GridItemProps,
    AvatarProps,
    getTypographyProps,
  } = props;
  const attachClass = index => {
    if (index === 0) {
      return classes[`${side}First`];
    }
    if (index === messages.length - 1) {
      return classes[`${side}Last`];
    }
    return '';
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justify={side === 'right' ? 'flex-end' : 'flex-start'}
        {...GridContainerProps}
      >
        {side === 'left' && (
          <Grid item {...GridItemProps}>
            <Avatar
              src={avatar}
              {...AvatarProps}
              className={cx(classes.avatar, AvatarProps.className)}
            />
          </Grid>
        )}
        <Grid item xs={8}>
          {messages.map((msg, i) => {
            const TypographyProps = getTypographyProps(msg, i, props);
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={msg.id || i} className={classes[`${side}Row`]}>
                <Typography
                  align={'left'}
                  {...TypographyProps}
                  className={cx(
                    classes.msg,
                    classes[side],
                    attachClass(i),
                    TypographyProps.className
                  )}
                >
                  {msg}
                </Typography>
              </Box>
            );
          })}
        </Grid>
      </Grid>
      <TextChatLayer />

    </Box>
  )
      // <>
      //   <div>this is place where all the chat component is rendered! ==))</div>
      //   <div>include</div>
      //   <ol>
      //     type of chat balloon:
      //     <li>
      //       <AdminMsg />
      //     </li>
      //     <li>
      //       <PairingPersonMsg />
      //     </li>
      //     <li>
      //       <MyMsg />
      //     </li>
      //   </ol>
      //   <ol> Layout box chat
      //     <TextChatLayer />
      //   </ol>
      // </>


  // }


}

MessageChat.propTypes = {
  avatar: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  side: PropTypes.oneOf(['left', 'right']),
  GridContainerProps: PropTypes.shape({}),
  GridItemProps: PropTypes.shape({}),
  AvatarProps: PropTypes.shape({}),
  getTypographyProps: PropTypes.func,
};
MessageChat.defaultProps = {
  avatar: '',
  messages: [],
  side: 'left',
  GridContainerProps: {},
  GridItemProps: {},
  AvatarProps: {},
  getTypographyProps: () => ({}),
};

export default withStyles(defaultChatMsgStyles, { name: 'MessageChat' })(MessageChat);
