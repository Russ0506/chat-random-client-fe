import {
  Chip,
  Input,
  InputBase,
  InputLabel,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import GgmCurrentPlaceText2 from "../../../components/googleMapAPI/GgmCurrentPlaceText2";
import GoogleMapPlaceSearchBox from "../../../components/googleMapAPI/GoogleMapPlaceSearchBox";
import { GRP_COLOR } from "../../../constant/css_constant";
import CONSTANT from "../../../constant/constant";
import { saveDataSearch } from "../../../features/user-setting";
import { CmmnInput } from "./components/CmmnInput";
import GmapApiChatAutoInput from "../popup/components/GmapApiChatAutoInput";
import GmapApiChatManualInput from "./components/GmapApiChatManualInput";
import { CmmnFormControl } from "./components/CmmnFormControl";
import { CmmnInputLabel } from "./components/CmmnInputLabel";
import { CmmnSelect } from "./components/CmmnSelect";
import { CmmnGroupSelect } from "./components/CmmnGroupSelect";
import Slider from "@mui/material/Slider";
import InputAdornment from "@mui/material/InputAdornment";
import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import { setUserSettingState } from "../../../features/chat/postSlice";

const minDistance = 0;
function valuetext(value) {
  return `${value}°C`;
}
export default function PartnerSetting(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userSettingData = useSelector((state) => state.post.userSetting);

  // var initData
  const [initData, setInitData] = React.useState({
    user_setting: {
      from_age: userSettingData.from_age,
      to_age: userSettingData.to_age,
      lat: userSettingData.lat,
      long: userSettingData.long,
      address: userSettingData.address,
      radius: userSettingData.radius,
      gender: userSettingData.gender || "female",
      hobbies: userSettingData.hobbies || [],
      majors: userSettingData.majors || [],
      enable_age_filter: userSettingData.enable_age_filter,
      enable_gender_filter: userSettingData.enable_gender_filter,
      enable_location_filter: userSettingData.enable_location_filter,
    },
  });
  const [slideVal, setSlideVal] = React.useState(userSettingData.radius);
  const [currentLocationPermision, setcurrentLocationPermision] =
    React.useState(false);

  const [hobbies, setHobbies] = React.useState(initData.user_setting.hobbies);
  const [majors, setMajors] = React.useState(initData.user_setting.majors);
  const [topic, setTopic] = React.useState(["Sharing Stories"]);
  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState({
    address: initData.user_setting.address,
    lo: initData.user_setting.lo,
    la: initData.user_setting.lat,
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const MIN = 15;
  const MAX = 100;
  const [ageSlideVal, setAgeSlideVal] = React.useState([
    userSettingData.from_age != null ? userSettingData.from_age : 15,
    userSettingData.to_age != null ? userSettingData.to_age : 23,
  ]);
  const setCurrentLocationPermision = (event, child) => {
    setcurrentLocationPermision(
      currentLocationPermision === false ? true : false
    );
  };
  const [genderValue, setGenderValue] = React.useState(
    userSettingData.gender || "male"
  );

  const handleChangeHobby = (event) => {
    const {
      target: { value },
    } = event;
    setHobbies(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeMajor = (event) => {
    const {
      target: { value },
    } = event;
    setMajors(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const saveDataSearchPartnerSetting = (event) => {
    dispatch(setUserSettingState({}));
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let dataSearch = {
      user_setting: {
        from_age: parseInt(data.get("from_age")),
        to_age: parseInt(data.get("to_age")),
        lat: document.getElementById("__curr_la").value,
        long: document.getElementById("__curr_lo").value,
        address:
          document.getElementById("__curr_address").value ||
          initData.user_setting.address,
        radius: parseInt(data.get("radius")),
        gender: genderValue,
        hobbies: hobbies,
        topic: topic,
        majors: majors,
      },
    };

    dispatch(setUserSettingState(dataSearch.user_setting));

    dispatch(saveDataSearch(dataSearch))
      .unwrap()
      .then(() => {})
      .catch(() => {
        setLoading(false);
      });
    // open popup view here
  };

  function getStyles(name, selectName, theme) {
    return {
      fontWeight:
        selectName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleSliderChange = (event, newValue) => {
    setSlideVal(newValue);
  };

  const handleInputChange = (event) => {
    setSlideVal(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleChangeAgeSlideVal = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setAgeSlideVal([
        Math.min(newValue[0], ageSlideVal[1] - minDistance),
        ageSlideVal[1],
      ]);
    } else {
      setAgeSlideVal([
        ageSlideVal[0],
        Math.max(newValue[1], ageSlideVal[0] + minDistance),
      ]);
    }
  };

  const handleBlur = () => {
    if (slideVal < 5) {
      setSlideVal(5);
    } else if (slideVal > 100) {
      setSlideVal(100);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={saveDataSearchPartnerSetting}
      sx={{ color: GRP_COLOR.CODE016, alignItems: "center" }}
    >
      <Button ref={props.submitRef} type="submit" style={{ display: "none" }} />
      <Stack sx={{ mt: "15px" }}>
        <CmmnInputLabel shrink htmlFor="gender-inpt">
          Conversation Topic
        </CmmnInputLabel>
        <FormControl
          className="__fc__gender"
          variant="standard"
          sx={{ width: "70%" }}
        >
          <CmmnSelect
            id="topic-inpt"
            name="topic"
            defaultValue={topic}
            sx={{
              border: "1px solid #e5e0e0",
              boxShadow: "none",
              width: "100%",
            }}
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          >
            {CONSTANT.TopicList.map((item, index) => (
              <MenuItem key={index} value={item} selected={true}>
                {item}
              </MenuItem>
            ))}
          </CmmnSelect>
        </FormControl>
      </Stack>
      <Stack sx={{ width: "100%" }}>
        <CmmnFormControl variant="standard">
          <CmmnInputLabel shrink htmlFor="location-inpt">
            Location
          </CmmnInputLabel>
          {currentLocationPermision === false ? (
            <GmapApiChatManualInput
              locationName={initData.user_setting.address}
            />
          ) : (
            <GmapApiChatAutoInput />
          )}
          {/* <CmmnInput placeholder="Fill your location" id="location-inpt" /> */}
          <TextField
            id="__curr_lo"
            type="hidden"
            inputProps={{
              readOnly: true,
            }}
            sx={{ display: "none" }}
          />
          <TextField
            id="__curr_address"
            type="hidden"
            inputProps={{
              readOnly: true,
            }}
            sx={{ display: "none" }}
          />
          <TextField
            id="__curr_la"
            type="hidden"
            inputProps={{
              readOnly: true,
            }}
            sx={{ display: "none" }}
          />
        </CmmnFormControl>
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
        <CmmnFormControl variant="standard">
          <CmmnInputLabel shrink htmlFor="expected-dis-inpt">
            Expected Distance
          </CmmnInputLabel>
          <Box width="xl" sx={{ mt: 3, pl: 1, pr: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Slider
                  min={5}
                  max={100}
                  value={slideVal != null ? slideVal : 5}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  name="radius"
                  value={slideVal != null ? slideVal : 5}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">Km</InputAdornment>
                  }
                  inputProps={{
                    step: 10,
                    min: 5,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                  sx={{ width: "75px", pt: 0, pb: 0, mt: 0 }}
                />
              </Grid>
            </Grid>
          </Box>
        </CmmnFormControl>
        <Stack sx={{ mt: "15px" }}>
          <CmmnInputLabel shrink htmlFor="gender-inpt">
            Gender
          </CmmnInputLabel>
          <FormControl
            className="__fc__gender"
            variant="standard"
            sx={{ width: "30%" }}
          >
            <Select
              id="gender-inpt"
              name="gender"
              value={genderValue}
              onChange={(event) => {
                setGenderValue(event.target.value);
              }}
              sx={{ border: "1px solid #e5e0e0", boxShadow: "none", pl: 1.5 }}
              // displayEmpty
              // inputProps={{ "aria-label": "Without label" }}
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
        </Stack>
        <Stack sx={{ mt: "15px" }}>
          <CmmnInputLabel shrink>Age</CmmnInputLabel>
          <Stack flexDirection="row">
            <FormControl
              sx={{
                width: "150px",
                ml: 1,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormLabel sx={sxJustifyContent}>
                From {ageSlideVal[0] != null ? ageSlideVal[0] : 15}
              </FormLabel>
              <CmmnInput
                as={TextField}
                name="from_age"
                type="number"
                defaultValue={15}
                value={ageSlideVal[0] != null ? ageSlideVal[0] : 15}
                sx={{ display: "none" }}
              />
            </FormControl>
            <FormControl
              sx={{
                ml: 1,
                width: "150px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormLabel sx={sxJustifyContent}>
                To {ageSlideVal[1] != null ? ageSlideVal[1] : 23}
              </FormLabel>
              <CmmnInput
                as={TextField}
                name="to_age"
                type="number"
                defaultValue={23}
                value={ageSlideVal[1] != null ? ageSlideVal[1] : 23}
                sx={{ display: "none" }}
              />
            </FormControl>
          </Stack>
          <Slider
            min={MIN}
            max={MAX}
            getAriaLabel={() => "Minimum distance"}
            value={ageSlideVal}
            onChange={handleChangeAgeSlideVal}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
          />
        </Stack>
        <Stack sx={{ mt: "15px" }}>
          <CmmnInputLabel shrink htmlFor="demo-multiple-chip">
            Hobbies
          </CmmnInputLabel>
          <CmmnFormControl
            variant="outlined"
            sx={{ boxShadow: "none", outline: "none", mt: "0 !important" }}
          >
            <CmmnGroupSelect
              size="small"
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
              {CONSTANT.HobbiesNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                  <Checkbox checked={hobbies.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </CmmnGroupSelect>
          </CmmnFormControl>
        </Stack>
        <Stack sx={{ mt: "15px", mb: 1 }}>
          <CmmnInputLabel shrink htmlFor="demo-multiple-chip">
            Majors
          </CmmnInputLabel>
          <CmmnFormControl
            variant="outlined"
            sx={{ boxShadow: "none", outline: "none", mt: "0 !important" }}
          >
            <CmmnGroupSelect
              size="small"
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              name="majors"
              value={majors}
              onChange={handleChangeMajor}
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
              {CONSTANT.MajorNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                  <Checkbox checked={majors.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </CmmnGroupSelect>
          </CmmnFormControl>
        </Stack>
      </Stack>
    </Box>
  );
}

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

const sxJustifyContent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
