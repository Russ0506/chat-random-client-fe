import { AppBar } from "@mui/material";
import React from "react";
import AppBarComponent from "../../../../common/drawer/component/AppBarComponent";
import { DRAWER_WITH } from "../../../../../constant/css_constant";
export default function TopBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${DRAWER_WITH}px)` },
        ml: { sm: `${DRAWER_WITH}px` },
      }}
    >
      <AppBarComponent />
    </AppBar>
  );
}

// import React from 'react'
// import LeftHandSide from './container/LeftHandSide'
// import RightHandSide from './container/RightHandSide'

// export default function TopBar() {
//   return (
//   <>
//     {/* <LeftHandSide />
//     <RightHandSide /> */}

//   </>
//   )
// }
