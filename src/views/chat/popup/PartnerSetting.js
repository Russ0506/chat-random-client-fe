import {
  Chip,
  Input,
  InputBase,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch } from "react-redux";
import GgmCurrentPlaceText2 from "../../../components/googleMapAPI/GgmCurrentPlaceText2";
import GoogleMapPlaceSearchBox from "../../../components/googleMapAPI/GoogleMapPlaceSearchBox";
import { GRP_COLOR } from "../../../constant/css_constant"
import CONSTANT from  "../../../constant/constant"
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
const minDistance = 0;
function valuetext(value) {
  return `${value}°C`;
}
export default function PartnerSetting(props) {
  const theme = useTheme();
  const useEffect = React.useEffect;
  const dispatch = useDispatch();

  // var initData
  const [initData, setInitData] = React.useState({
    user_setting: {
      from_age: props.userSetting.from_age,
      to_age: props.userSetting.to_age,
      lat: props.userSetting.lat,
      long: props.userSetting.long,
      address: props.userSetting.address,
      radius: props.userSetting.radius,
      gender: props.userSetting.gender || "female",
      hobbies: ["Camping"],
      enable_age_filter: props.userSetting.enable_age_filter,
      enable_gender_filter: props.userSetting.enable_gender_filter,
      enable_location_filter: props.userSetting.enable_location_filter,
    },
  });
  const [slideVal, setSlideVal] = React.useState(props.userSetting.radius);
  const [currentLocationPermision, setcurrentLocationPermision] =
    React.useState(false);

  const [hobbies, setHobbies] = React.useState(initData.user_setting.hobbies);
  const [majors, setMajors] = React.useState([]);
  const [topic, setTopic] = React.useState(["Sharing Stories"]);
  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState({
    address: initData.user_setting.address,
    lo: initData.user_setting.lo,
    la: initData.user_setting.lat,
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const min = 0;
  const max = 100;
  const [ageSlideVal, setAgeSlideVal] = React.useState([
    props.userSetting.from_age,
    props.userSetting.to_age,
  ]);
  const setCurrentLocationPermision = (event, child) => {
    setcurrentLocationPermision(
      currentLocationPermision === false ? true : false
    );
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

    props.takeDataSubmit(dataSearch);
    dispatch(saveDataSearch(dataSearch))
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
            id="gender-inpt"
            name="gender"
            defaultValue={topic}
            sx={{ border: "1px solid #e5e0e0", boxShadow: "none", width: "100%" }}
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
            <GmapApiChatManualInput />
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
                  value={typeof slideVal === "number" ? slideVal : 5}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  name="radius"
                  value={slideVal}
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
            <CmmnSelect
              id="gender-inpt"
              name="gender"
              defaultValue={initData.user_setting.gender}
              sx={{ border: "1px solid #e5e0e0", boxShadow: "none" }}
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
            </CmmnSelect>
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
              <FormLabel sx={sxJustifyContent}>From {ageSlideVal[0]}</FormLabel>
              <CmmnInput
                as={TextField}
                name="from_age"
                type="number"
                defaultValue={initData.user_setting.from_age}
                value={ageSlideVal[0]}
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
              <FormLabel sx={sxJustifyContent}>To {ageSlideVal[1]}</FormLabel>
              <CmmnInput
                as={TextField}
                name="to_age"
                type="number"
                defaultValue={initData.user_setting.to_age}
                value={ageSlideVal[1]}
                sx={{ display: "none" }}
              />
            </FormControl>
          </Stack>
          <Slider
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
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, hobbies, theme)}
                >
                  {name}
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
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, majors, theme)}
                >
                  {name}
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
