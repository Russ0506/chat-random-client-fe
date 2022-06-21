import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';
import Switch from '@mui/material/Switch';
import { useDispatch} from "react-redux"
import { styled, alpha } from '@mui/material/styles';
import { GRP_COLOR, FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT, BORDER_RADIUS, BOX_SHADOW } from "../../../../constant/css_constant"
import { getDataSearch, saveDataSearch } from '../../../../features/user-setting';
import { Chip } from '@mui/material';
import GoogleMapPlaceSearchBox from "../../../../components/googleMapAPI/GoogleMapPlaceSearchBox";
import GgmCurrentPlaceText2 from "../../../../components/googleMapAPI/GgmCurrentPlaceText2";

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
  fontWeight: FONT_WEIGHT.overmiddle,
};

const sxJustifyContent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const sxSearch = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const sxAlignItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const names = [
  "Camping",
  "Read Book",
  "Climb",
  "Sport",
  "Music",
  "Foodt",
  "Forest",
  "Ocean",
  "Animal",
  "Romantic",
];

// For search Function
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(GRP_COLOR.WHITECODE, 0.15),
  "&:hover": {
    backgroundColor: alpha(GRP_COLOR.WHITECODE, 0.25),
  },
  marginRight: theme.spacing(6),
  marginLeft: 0,
  border: `1px solid ${GRP_COLOR.GREYYELLOW}`,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(7.5),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
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
};

// const sxLabelAge = sxJustifyContent

export default function PartnerSetting(props) {
  const theme = useTheme();
  const useEffect = React.useEffect
  const dispatch = useDispatch()

  // var initData
  const [initData, setInitData] = React.useState({
    user_setting: {
      from_age: props.userSetting.from_age,
      to_age: props.userSetting.to_age,
      lat: props.userSetting.lat,
      long: props.userSetting.long,
      address: props.userSetting.address,
      radius: props.userSetting.radius,
      gender: props.userSetting.gender,
      hobbies: ['Camping'],
      enable_age_filter: props.userSetting.enable_age_filter,
      enable_gender_filter: props.userSetting.enable_gender_filter,
      enable_location_filter: props.userSetting.enable_location_filter,
    }
  })

  const [currentLocationPermision, setcurrentLocationPermision] =
    React.useState(false);

  const [hobbies, setHobbies] = React.useState(initData.user_setting.hobbies);
  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState({
    address: initData.user_setting.address,
    lo: initData.user_setting.lo,
    la: initData.user_setting.lat,
  });
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const min = 0;
  const max = 100;

  const setCurrentLocationPermision = (event, child) => {
    setcurrentLocationPermision(currentLocationPermision === false ? true : false);
  };


  useEffect(() => {
    if (props.events) {
      props.events.saveDataSearchPartnerSetting = saveDataSearchPartnerSetting;
    }
  }, []);

  const handleChangeHobby = (event) => {
    const {
      target: { value },
    } = event;
    setHobbies(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const saveDataSearchPartnerSetting = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // setLocation({
    //   address: document.getElementById("__curr_address").value,
    //   lo: document.getElementById("__curr_lo").value,
    //   la: document.getElementById("__curr_la").value,
    // });
    let dataSearch = {
      user_setting: {
        from_age: parseInt(data.get("from_age")),
        to_age: parseInt(data.get("to_age")),
        lat: document.getElementById("__curr_la").value,
        long: document.getElementById("__curr_lo").value,
        address: document.getElementById("__curr_address").value,
        radius: parseInt(data.get("radius")),
        gender: data.get("gender"),
        hobbies: hobbies,
      },
    };

    props.takeDataSubmit(dataSearch)
    dispatch(saveDataSearch(
      dataSearch
    ))
      .unwrap()
      .then(() => {
        // props.onClose()
        // props.handleOpenViewSettingModal()
        // if(isLoggedIn) {
        // navigate("/chat-main-screen");
        //   window.location.reload();
        // }
      })
      .catch(() => {
        setLoading(false);
      });
    // open popup view here
  }

  function getStyles(name, selectName, theme) {
    return {
      fontWeight:
        selectName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <Box>
      <DialogContent>
        <Box
          component="form"
          onSubmit={saveDataSearchPartnerSetting}
          sx={{ mt: 3, color: GRP_COLOR.CODE016, alignItems: "center" }}
          className="abc"
        >
          <Button
            ref={props.submitRef}
            type="submit"
            style={{ display: "none" }}
          />
          <Grid container spacing={5}>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={3} alignItems="center">
                <FormLabel>Location</FormLabel>
              </Grid>
              <Grid container item xs={9} ml={-2}>
                <FormControl style={{ width: 300 }}>
                  {currentLocationPermision === false ? (
                    <GoogleMapPlaceSearchBox />
                  ) : (
                    <GgmCurrentPlaceText2 />
                  )}
                  <TextField
                    id="__curr_lo"
                    type="hidden"
                    inputProps={{
                      readOnly: true,
                    }}
                    // value={location.lo}
                    sx={{ display: "none" }}
                  />
                  <TextField
                    id="__curr_address"
                    type="hidden"
                    inputProps={{
                      readOnly: true,
                    }}
                    // value={location.address}
                    sx={{ display: "none" }}
                  />
                  <TextField
                    id="__curr_la"
                    type="hidden"
                    inputProps={{
                      readOnly: true,
                    }}
                    // value={location.la}
                    sx={{ display: "none" }}
                  />
                </FormControl>
              </Grid>

              {/* cục search của Hiếu nằm đây */}
            </Grid>

            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={4} alignItems="center">
                <FormLabel>Expected Distance</FormLabel>
              </Grid>
              <Grid container item xs={8}>
                <FormControl>
                  <TextField
                    sx={{ width: "140px" }}
                    id="outlined-number"
                    type="number"
                    name="radius"
                    defaultValue={initData.user_setting.radius}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid item xs={6} sm={3}></Grid>
              <Grid item xs={6} sm={9}>
                <Box component="div" sx={{ display: "inline" }}>
                  <Switch
                    {...label}
                    id="curLocaAcesPermis"
                    onChange={setCurrentLocationPermision}
                  />
                </Box>
                <Box component="div" sx={{ display: "inline" }}>
                  Use current location ?
                </Box>
              </Grid>
            </Grid>

            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={3} alignItems="center">
                <FormLabel>Gender</FormLabel>
              </Grid>
              <Grid container item xs={9}>
                <FormControl sx={{ minWidth: 140 }}>
                  <Select
                    name="gender"
                    defaultValue={initData.user_setting.gender}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem key="1" value="male">
                      Male
                    </MenuItem>
                    <MenuItem key="2" value="female">
                      Female
                    </MenuItem>
                    <MenuItem key="3" value="others">
                      <em>Others</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={3} alignItems="center">
                <FormLabel>Age</FormLabel>
              </Grid>
              <Grid container item xs={9} ml={5}>
                <FormControl
                  sx={{
                    ml: 2,
                    width: "15ch",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FormLabel sx={sxJustifyContent}>From</FormLabel>
                  <TextField
                    sx={{ ml: 1 }}
                    id="outlined-number"
                    name="from_age"
                    defaultValue={initData.user_setting.from_age}
                    InputProps={{
                      inputProps: {
                        type: "number",
                        min: 0,
                        max: 100,
                        maxLength: 10,
                      },
                    }}
                    onChange={(e) => {
                      var value = parseInt(e.target.value, 10);

                      if (value > max) value = max;
                      if (value < min) value = min;

                      return value;
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    ml: 1,
                    width: "15ch",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FormLabel sx={sxJustifyContent}>To</FormLabel>
                  <TextField
                    sx={{ ml: 1 }}
                    id="outlined-number"
                    name="to_age"
                    defaultValue={initData.user_setting.to_age}
                    InputProps={{
                      inputProps: {
                        type: "number",
                        min: 0,
                        max: 100,
                        maxLength: 10,
                      },
                    }}
                    onChange={(e) => {
                      var value = parseInt(e.target.value, 10);

                      if (value > max) value = max;
                      if (value < min) value = min;

                      return value;
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* card */}
            <Grid item xs={6} sx={{ display: "flex", pb: 3 }}>
              <Grid container item xs={3} alignItems="center">
                <FormLabel>Hobbies</FormLabel>
              </Grid>
              <Grid container item xs={9}>
                <FormControl style={{ width: 300 }}>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={hobbies}
                    onChange={handleChangeHobby}
                    input={<OutlinedInput id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, hobbies, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Box>
  );
}
