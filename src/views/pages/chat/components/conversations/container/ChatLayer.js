import React from 'react'

export default function ChatLayer() {
  // the content of sending's chat
  const [content, setContent] =  React.useState("");
  // icon avartar who send the message
  const [avartar, setAvatar] = React.useState("");
  // time message had sent
  // -- case: today -> format hh:mm
  // -- case: yesterday --> format yesterday, hh:mm
  // -- case: older day --> format day, hh:mm || example : friday, 06:08
  const [time, setTime] = React.useState("hh:mm");
  // emoji list that was use in the message
  const [emoji, setEmoji] =  React.useState({});
  // verify who sending (true: i send, false: another people send)
  const [myChat, setMyChat] = React.useState(true);  
  return (
    <>Chat layer</>
  )
}
