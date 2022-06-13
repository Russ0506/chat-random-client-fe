import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { GRP_COLOR, FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT, BORDER_RADIUS, BOX_SHADOW } from "../../../../constant/css_constant"
import Switch from '@mui/material/Switch';
import { useEffect } from 'react';
import { Chip } from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sxHeaderPopup = {
  paddingTop: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontWeight: FONT_WEIGHT.overmiddle
}

const sxJustifyContent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}
const sxAlignItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const names = [
  'Camping',
  'Read Book',
  'Climb',
  'Sport',
  'Music',
  'Foodt',
  'Forest',
  'Ocean',
  'Animal',
  'Romantic',
];

// For search Function
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(GRP_COLOR.WHITECODE, 0.15),
  '&:hover': {
    backgroundColor: alpha(GRP_COLOR.WHITECODE, 0.25),
  },
  marginRight: theme.spacing(6),
  marginLeft: 0,
  border: `1px solid ${GRP_COLOR.GREYYELLOW}`,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(7.5),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// end // For search Function

// css
const typeButton = {
  py: 3,
  px: 2,
  bgcolor: GRP_COLOR.BACKGROUND01,
  color: GRP_COLOR.CODE016,
  borderRadius: BORDER_RADIUS.br10,
  boxShadow: BOX_SHADOW.CODE001,
  height: "45px",
}


export default function PartnerSettingView(props) {
  const [data, setData] = React.useState(props.data.user_setting);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const initialValue = [
    { id: 1, name: "location", value: true }];

  const [enableData, setEnableData] = React.useState(initialValue)


  const allowedState = [
    { id: 1, name: "location", value: true },
    { id: 2, name: "expectedDistance", value: true },
    { id: 3, name: "gender", value: true },
    { id: 4, name: "age", value: true },
    { id: 5, name: "hobby", value: true },
  ];

   
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


  // [location, radius, gender, age, hobby]

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };



  const saveDataSearchPartnerSetting = (event) => {
    let mockData = {

    }
    console.log("saveDataSearchPartnerSetting", mockData);
  }

  return (
    <Box>
      <DialogContent>
        <Box component="form" onSubmit={saveDataSearchPartnerSetting} sx={{ mt: 3, color: GRP_COLOR.CODE016, alignItems: "center" }} className="abc">
          <Button ref={props.submitRef} type="submit" style={{ display: 'none' }} />
          <Grid container spacing={5}>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Location</FormLabel>
              </Grid>
              <Grid container item xs={8}>
                <Switch {...label} defaultChecked size="small" />
                <FormLabel>

                  {
                    allowedState[0].value === true ? data.address : ''
                  }
                </FormLabel>
              </Grid>
            </Grid>

            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Expected Distance</FormLabel>
              </Grid>
              <Grid container item xs={8}>
                <Switch {...label} defaultChecked size="small" />
                <FormLabel>

                  {
                    allowedState[1].value === true ? data.radius : ''
                  }
                </FormLabel>
              </Grid>
            </Grid>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Gender</FormLabel>
              </Grid>
              <Grid container item xs={8}>
              <Switch {...label} defaultChecked size="small" />
                <FormLabel>  
             
                {                  
                    allowedState[2].value === true ? data.gender: ''
                }
                </FormLabel>
              </Grid>
            </Grid>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Age</FormLabel>
              </Grid>
              <Grid container item xs={8} >
              <Switch {...label} defaultChecked size="small" />
                <FormLabel>  
             
                {                  
                    allowedState[3].value === true ? `From ${data.from_age} to ${data.to_age}`: ''
                }
                </FormLabel>
              </Grid>

            </Grid>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Hobbies</FormLabel>
              </Grid>
              <Grid container item xs={8}>
                <FormControl style={{ minWidth: 300 }}>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    disabled
                    value={data.hobbies}
                    input={<OutlinedInput id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    // MenuProps={MenuProps}
                  >
                    {/* {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, hobbies, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", opacity: 0}}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Hobbies</FormLabel>
              </Grid>
              <Grid container item xs={8}>
               <TextField />
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex" , opacity: 0}}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Hobbies</FormLabel>
              </Grid>
              <Grid container item xs={8}>
               <TextField />
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", display: "none" }}>
              <Grid container item xs={4} alignItems="center">
              </Grid>
              <Grid container item xs={8}>
               <TextField />
              </Grid>
            </Grid>
          </Grid>
        </Box>

      </DialogContent>
    </Box>
  )
}