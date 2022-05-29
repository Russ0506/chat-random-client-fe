import { AppBar } from '@mui/material';
import React from 'react'
import {DRAWER_WITH} from '../../../constant/css_constant';
import AppBarComponent from './component/AppBarComponent';
export default function DrawerAppBar() {
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
