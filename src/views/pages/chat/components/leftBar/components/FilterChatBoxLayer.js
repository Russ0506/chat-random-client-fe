import React from "react";

export default function FilterChatBoxLayer() {
  // list or array list of data of chax box (all)
  const [data, setData] = React.useState([]);
  return (
    <>
      <div>This is an popup filter</div>
      <div>
        when click the box chat setting, will display this popup and help user
        filter chat box that him/ her want to
      </div>
    </>
  );
}
