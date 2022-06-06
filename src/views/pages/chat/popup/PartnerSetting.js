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
import CardMedia from '@mui/material/CardMedia';
import FindPartner from '../../../../assets/img/find-partner.jpg';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { GRP_COLOR, FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT, BORDER_RADIUS, BOX_SHADOW } from "../../../../constant/css_constant"


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
  justifyContent: "center",
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

export default function PartnerSetting(props) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle fontSize={FONT_SIZE.formNormalText}
        sx={sxHeaderPopup}>Ideal Partner</DialogTitle>
      <DialogContent>
        <DialogContentText>
          These preferences help us suggest matches by determining who you will be matched.
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
            <Grid item xs={12} sm={4} sx={sxJustifyContent}>
              <FormLabel>Gender</FormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl sx={{ mx: 2, minWidth: 120 }}>
                <Select
                  // value={age}
                  // onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others"><em>Others</em></MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* age */}
            <Grid item xs={12} sm={4} sx={sxJustifyContent}>
              <FormLabel>Age</FormLabel>
            </Grid>
            <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl sx={{ ml: 2, width: '15ch', display: "flex", flexDirection: "row" }}>
                <FormLabel sx={sxJustifyContent} marginRight="100px">From</FormLabel>
                <TextField
                  sx={{ ml: 1 }}
                  id="outlined-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl sx={{ ml: 1, width: '15ch', display: "flex", flexDirection: "row" }}>
                <FormLabel sx={sxJustifyContent} marginRight="100px">To</FormLabel>
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
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} sx={sxJustifyContent}>
              <FormLabel>Location</FormLabel>
            </Grid>
            <Grid item xs={12} sm={9} sx={sxJustifyContent} >
              <Search bgcolor={GRP_COLOR.CODE016}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
          </Grid>

        </Box>

      </DialogContent>
      <DialogActions sx={{m:2}}>
        <Button onClick={props.onClose} sx={typeButton}>Reset</Button>
        <Button onClick={props.onClose} sx={typeButton}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}