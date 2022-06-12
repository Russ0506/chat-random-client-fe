import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CardMedia from "@mui/material/CardMedia";
import FindPartner from "../../../../assets/img/find-partner.jpg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Switch from "@mui/material/Switch";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import {
  GRP_COLOR,
  FONT_SIZE,
  LINE_HEIGHT,
  FONT_WEIGHT,
  BORDER_RADIUS,
  BOX_SHADOW,
} from "../../../../constant/css_constant";
import { saveDataSearch } from "../../../../features/user-setting";
import GoogleMapPlaceSearchBox from "../../../../components/googleMapAPI/GoogleMapPlaceSearchBox";
import GgmCurrentPlaceText from "../../../../components/googleMapAPI/GgmCurrentPlaceText";
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
  const useEffect = React.useEffect;
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState([]);
  const [dataAge, setDataAge] = React.useState([]);
  const [gender, setGender] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [currentLocationPermision, setcurrentLocationPermision] =
    React.useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  let dataSource = [];
  const min = 0;
  const max = 100;

  useEffect(() => {
    for (let i = 1; i <= 100; i++) {
      dataSource.push(i);
    }
    setDataAge(dataSource);
  }, []);

    const setCurrentLocationPermision = (event, child) => {
      setcurrentLocationPermision(currentLocationPermision === false? true : false);
    };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleGenderChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    setGender(
      // On autofill we get a stringified value.
      value
    );
  };

  const saveDataSearchPartnerSetting = (event) => {
    let mockData = {
      user_setting: {
        from_age: 18,
        to_age: 60,
        lat: document.getElementById("__curr_la").value,
        long: document.getElementById("__curr_lo").value,
        address: "Da Nang, Viet Nam",
        radius: 100,
        gender: "other",
      },
    };
    console.log("saveDataSearchPartnerSetting", mockData);
    dispatch(saveDataSearch(mockData))
      .unwrap()
      .then(() => {
        // if(isLoggedIn) {
        //   navigate("/chat-main-screen");
        //   window.location.reload();
        // }
      })
      .catch(() => {
        setLoading(false);
      });
    // open popup view here
  };

  const [ageFrom, setAgeFrom] = React.useState("");

  const handleAgeChange = (event) => {
    console.log(event.target.value);
    setAgeFrom(event.target.value);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      sx={{ overflowY: "scroll" }}
    >
      <DialogTitle fontSize={FONT_SIZE.formNormalText} sx={sxHeaderPopup}>
        Ideal Partner
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          These preferences help us suggest matches by determining who you will
          be matched.
        </DialogContentText>
        <CardMedia
          component="img"
          height="260"
          image={FindPartner}
          alt="Find Partner"
        />
        <Box component="form" sx={{ mt: 3, color: GRP_COLOR.CODE016 }}>
          <Grid container spacing={2}>
            {/* gender */}
            <Grid item xs={12} sm={5} sx={sxJustifyContent}>
              <FormLabel>Pairing person</FormLabel>
            </Grid>
            <Grid item xs={12} sm={7}>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={gender}
                  onChange={handleGenderChange}
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
            <Grid item xs={12} sm={4} sx={sxJustifyContent}>
              <FormLabel>Address</FormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
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
            </Grid>
            <Grid item xs={12} sm={5} sx={sxJustifyContent}>
              {/* <FormLabel>Address</FormLabel> */}
            </Grid>
            <Grid item xs={12} sm={7}>
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

            {/* age */}
            <Grid item xs={12} sm={4} sx={sxJustifyContent}>
              <FormLabel>Age</FormLabel>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              sx={{ display: "flex", flexDirection: "row" }}
            >
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

                    setAge(value);
                  }}
                />

                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={dataSource}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Movie" />}
                /> */}
                {/* <Select
                  value={age}
                  // onChange={}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="male">i</MenuItem>
                  {
                    dataSource.forEach((element, i) => {
                      <MenuItem key={i} value="male">i</MenuItem>
                    })
                  }
                </Select> */}
                {/* truee */}
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ageFrom}
                  label="Age"
                  onChange={handleAgeChange}
                  
                >
                  {dataAge.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select> */}
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
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            {/* hobby - tag field */}
            <Grid item xs={12} sm={4} sx={sxJustifyContent}>
              <FormLabel>Hobby</FormLabel>
            </Grid>
            <Grid item xs={12} sm={8} sx={sxJustifyContent}>
              <FormControl sx={{ m: 2, width: 300 }}>
                <Select
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {names.map((name, i) => (
                    <MenuItem key={i} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} sx={sxJustifyContent}>
              <FormLabel>Search range</FormLabel>
            </Grid>
            <Grid item xs={12} sm={9} sx={sxJustifyContent}>
              <TextField
                sx={{ ml: 8, width: "100px" }}
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <Button onClick={props.onClose} sx={typeButton}>
          Reset
        </Button>
        <Button onClick={saveDataSearchPartnerSetting} sx={typeButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
