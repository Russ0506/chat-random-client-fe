import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { useUserDispatch, logOut } from '../context/UserContext';
import { Avatar, Typography } from '@material-ui/core';
import { FiUser } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Space } from 'antd';

const TheHeaderDropdown = (props) => {
  // global
  var userDispatch = useUserDispatch();
  let history = useHistory();
  const userId = sessionStorage.getItem('USER_ID');
  
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <Space>
          <Typography variant="h6">{userId}</Typography>
        <Avatar>
            <FiUser/>
        </Avatar>
        </Space>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push('/user/userProfile')}>
          <CIcon name="cil-user" className="mfe-2"/>Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" /> 
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => logOut(
          userDispatch
          , props.history
        )}>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
