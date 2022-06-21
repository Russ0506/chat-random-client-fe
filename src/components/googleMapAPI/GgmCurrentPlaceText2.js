import { TextField} from "@mui/material";
import React, { Component } from "react";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDgu1_PPhBne4sp9PlPQ0eG3bfzSKGut_g");
Geocode.setLanguage("en");
// Geocode.setRegion("world");
// Geocode.setLocationType("ROOFTOP");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(pos) {
  var crd = pos.coords;
  // Get address from latitude & longitude.
  Geocode.fromLatLng(crd.latitude, crd.longitude).then(
    (response) => {
      const address = response.results[0].formatted_address;
      let city, state, country;
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              city = response.results[0].address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              state = response.results[0].address_components[i].long_name;
              break;
            case "country":
              country = response.results[0].address_components[i].long_name;
              break;
          }
        }
      }
      document.getElementById("__curr_address_temp").value = address;
      document.getElementById("__curr_address").value = address;
      document.getElementById("__curr_lo").value = crd.latitude;
      document.getElementById("__curr_la").value = crd.longitude;
      console.log(city, state, country);
      console.log(address);
    //   return {
    //     addr: address,
    //     la: crd.latitude,
    //     lo: crd.longitude,
    //   };
    },
    (error) => {
      console.error(error);
      return null;
    }
  );
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default class GgmCurrentPlaceText2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullAddress: {},
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            // console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }

  render() {
    return (
      <>
        {/* <Typography>you have agreed to share your location </Typography> */}
        <TextField
          sx={{ ml: 2, width: 300 }}
          id="__curr_address_temp"
          type="text"
          inputProps={{
            readOnly: true,
          }}
        />
      </>
    );
  }
}
