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
import Loading from "../../../common/base/loading/Loading";
import { saveDataSearch } from '../../../../features/user-setting';
import { useDispatch, useSelector } from 'react-redux';
import { enqueuingChat } from '../../../../features/chat';
import { clearMessage } from '../../../../features/message';


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
  const [isSubmit, setIsSubmit] = React.useState(false);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [state, setState] = React.useState({
    checkedLocation: true,
    checkedExpectedDistance: false,
    checkedGender: true,
    checkedAge: true,
    checkedHobbies: true,
  });

  const handleOnChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const searchPartner = (event) => {
    event.preventDefault();
    setIsSubmit(true)

    let requestFilter = {
      user: {
        enable_age_filter: state.checkedAge,
        enable_gender_filter: state.checkedGender,
        enable_location_filter: state.checkedLocation,
      }
    }

    // this function call after enqueue success/ fail
    if (true) {
      // props.outIsSearch(false)
    }

    dispatch(saveDataSearch(
      requestFilter
    ))
      .unwrap()
      .then(() => {
        // props.outIsSearch(false)

        dispatch(enqueuingChat()).unwrap().then((data) => {
          console.log(data);
        }).catch((err) => {
          console.log(err);
        });
      })
      .catch(() => {
        props.outIsSearch(false)
        // setLoading(false);
      });

    // enqueue if pair = true

  }
  return (
    <Box>
      <DialogContent>
        <Box component="form" onSubmit={searchPartner} sx={{ mt: 3, color: GRP_COLOR.CODE016, alignItems: "center" }} className="abc">
          <Button ref={props.searchRef} type="submit" style={{ display: 'none' }} />
          <Grid container spacing={5}>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Location</FormLabel>
              </Grid>
              <Grid container item xs={8}>
                <Switch {...label} name="checkedLocation" checked={state.checkedLocation} value={state.checkedLocation} size="small" onChange={(e) => handleOnChange(e)} />
                <FormLabel>
                  {
                    state.checkedLocation === true ? data.address : ''
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
                <Switch {...label} name="checkedExpectedDistance" checked={state.checkedExpectedDistance} value={state.checkedExpectedDistance} size="small" onChange={(e) => handleOnChange(e)} />
                <FormLabel>

                  {
                    state.checkedExpectedDistance === true ? data.radius : ''
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
                <Switch {...label} name="checkedGender" checked={state.checkedGender} value={state.checkedGender} size="small" onChange={(e) => handleOnChange(e)} />
                <FormLabel>

                  {
                    state.checkedGender === true ? data.gender : ''
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
                <Switch {...label} name="checkedAge" checked={state.checkedAge} value={state.checkedAge} size="small" onChange={(e) => handleOnChange(e)} />
                <FormLabel>

                  {
                    state.checkedAge === true ? `From ${data.from_age} to ${data.to_age}` : ''
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
                  {
                    message ?
                      <Box
                        component="div"
                        variant="h5"
                        color="red"
                        fontSize={FONT_SIZE.smallText}
                      >
                        {message}
                      </Box> : ''}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>

      </DialogContent>
    </Box>
  )
}