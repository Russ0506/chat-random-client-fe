import {
  Checkbox,
  Chip,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { styled } from "@mui/styles";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FONT_SIZE, GRP_COLOR } from "../../../constant/css_constant";
import { enqueuingChat } from "../../../features/chat";
import { clearMessage } from "../../../features/message";
import { saveDataSearch } from "../../../features/user-setting";

export default function PartnerSettingView(props) {
  const [data, setData] = React.useState(props.data.user_setting);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [state, setState] = React.useState({
    checkedLocation: props.userSetting.enable_location_filter,
    checkedGender: props.userSetting.enable_gender_filter,
    checkedAge: props.userSetting.enable_age_filter,
    checkedHobbies: true,
  });

  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value === "Y" ? true : false,
    });
  };

  const searchPartner = (event) => {
    event.preventDefault();
    setIsSubmit(true);

    let requestFilter = {
      user_setting: {
        enable_age_filter: state.checkedAge,
        enable_gender_filter: state.checkedGender,
        enable_location_filter: state.checkedLocation,
      },
    };

    // this function call after enqueue success/ fail
    if (true) {
      // props.outIsSearch(false)
    }

    dispatch(saveDataSearch(requestFilter))
      .unwrap()
      .then(() => {
        // props.outIsSearch(false)

        dispatch(enqueuingChat())
          .unwrap()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        props.outIsSearch(false);
        // setLoading(false);
      });

    // enqueue if pair = true
  };
  return (
    <Box>
      <DialogContent>
        <Box
          component="form"
          onSubmit={searchPartner}
          sx={{ mt: 3, color: GRP_COLOR.CODE016, alignItems: "center" }}
          className="abc"
        >
          <Button
            ref={props.searchRef}
            type="submit"
            style={{ display: "none" }}
          />
          <Stack flexDirection="column">
            <StackLayerRow flexDirection="row" >
              <FormLabel>
                <Typography variant="body1">Location</Typography>
                <Typography variant="subtitle2">{data.address}</Typography>
              </FormLabel>
              <FormControlLabel
                name="checkedLocation"
                control={<Checkbox name="checkedLocation" defaultChecked={state.checkedLocation} />}
                label="Use"
                onChange={(e) => handleOnChange(e)}
              />
            </StackLayerRow>
            <StackLayerRow flexDirection="row" justifyContent="space-between">
              <FormLabel>
                <Typography variant="body1">Expected Distance</Typography>
                <Typography variant="subtitle2">{data.radius} km</Typography>
              </FormLabel>
              <FormControlLabel
                name="checkedExpectedDistance"
                control={
                  <Checkbox defaultChecked={state.checkedExpectedDistance} />
                }
                label="Use"
                onChange={(e) => handleOnChange(e)}
              />
            </StackLayerRow>
            <StackLayerRow flexDirection="row" justifyContent="space-between">
              <FormLabel>
                <Typography variant="body1">Gender</Typography>
                <Typography variant="subtitle2">{data.gender}</Typography>
              </FormLabel>
              <FormControlLabel
                name="checkedGender"
                control={<Checkbox defaultChecked={state.checkedGender} />}
                label="Use"
                onChange={(e) => handleOnChange(e)}
              />
            </StackLayerRow>
            <StackLayerRow flexDirection="row" justifyContent="space-between">
              <FormLabel>
                <Typography variant="body1">Age</Typography>
                <Typography variant="subtitle2">{`From ${data.from_age} to ${data.to_age} year old`}</Typography>
              </FormLabel>
              <FormControlLabel
                name="checkedAge"
                control={<Checkbox defaultChecked={state.checkedAge} />}
                label="Use"
                onChange={(e) => handleOnChange(e)}
              />
            </StackLayerRow>
            <StackLayerCol flexDirection="column">
              <FormLabel>Hobbies</FormLabel>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  disabled
                  value={data.hobbies}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      sx={{ border: "none" }}
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                </Select>
                {message ? (
                  <Box
                    component="div"
                    variant="h5"
                    color="red"
                    fontSize={FONT_SIZE.smallText}
                  >
                    {message}
                  </Box>
                ) : (
                  ""
                )}
              </FormControl>
            </StackLayerCol>
          </Stack>
        </Box>
      </DialogContent>
    </Box>
  );
}
const StackLayerCol = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(1),
  justifyContent:"space-between",
}));
const StackLayerRow = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #e5e0e0",
}));