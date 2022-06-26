import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getDataSearch } from '../../../../features/user-setting';
import PartnerSettingModal from '../../popup/PartnerSettingModal';

export default function ConversationControlBox() {
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        dispatch(getDataSearch()).unwrap()
        .then((data) => {
          setUserSetting(data);
        })
        .catch(() => {
        });
      },[])

    const [userSetting, setUserSetting] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openPartnerDialog, setOpenPartnerDialog] = React.useState(false);
    const [openPartnerViewDialog, setOpenPartnerViewDialog] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpenPartnerDialog(true);
    };
  
    const handleOpenViewSettingModal = () => {
      setOpenPartnerViewDialog(true);
    };
  
    const handlePartnerSettingClose = () => {
      setOpenPartnerDialog(false);
    };
  
    const handleParnerSettingViewClose = () => {
      setOpenPartnerViewDialog(false);
    };

  return (
    <>
     <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "end"}} >
      <Button variant="contained" onClick={handleClickOpen}>New Conversation</Button>
      {/* <Typography color="black">Time here</Typography> */}
    </Stack>
      <PartnerSettingModal open={openPartnerDialog} onClose={handlePartnerSettingClose} handleOpenViewSettingModal={handleOpenViewSettingModal} userSetting={userSetting}></PartnerSettingModal>
    </>
  );
}
