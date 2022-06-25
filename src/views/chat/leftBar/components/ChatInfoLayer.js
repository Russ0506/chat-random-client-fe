import React from "react";

export default function ChatInfoLayer() {
  // name of sender
  const [name, setName] = React.useState("");
  // content of nearly message
  const [nearlyMsg, setNearlyMsg] = React.useState("");
  // avatar of sender
  const [avartar, setAvatar] = React.useState("");
  // status of user (true: user is online [green status], false: user is offline[there are two option below)
  const [status, setStatus] = React.useState(true);

  // ==== option: ==== //
  // -- op1: time offline
  // [format:
  //  +-- time offline < 1h --> "mm mins"
  //  +-- time offline < 1 day --> hh hours
  //  +-- time offline = 1 day --> 01 day
  //  +-- time offline > 1 day --> dd days
  // ]
  const [offTime, setOffTime] = React.useState("");
  // -- op2: time send of the nearest chat message
  // [format:
  //  +-- time send < 1h --> "mm mins"
  //  +-- time send < 1 day --> hh hours
  //  +-- time send = 1 day --> 01 day
  //  +-- time send > 1 day --> dd days
  // ]
  const [nearestChatTm, setNearestChatTm] = React.useState("");

  return <div></div>;
}
