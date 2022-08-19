import { TextField, Typography } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDgu1_PPhBne4sp9PlPQ0eG3bfzSKGut_g");
Geocode.setLanguage("en");
// Geocode.setRegion("world");
// Geocode.setLocationType("ROOFTOP");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
let fullAddress = null;
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
      fullAddress = {
        addr: address,
        la: crd.latitude,
        lo: crd.longitude,
      };
      console.log(city, state, country);
      console.log(address);
    },
    (error) => {
      console.error(error);
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

class GetLocate extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
            return fullAddress;
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
}


export default function GgmCurrentPlaceText2St() {
  const [fullLocation, setFullLocation] = useState(null);
  useEffect(() => {
    setFullLocation(GetLocate());
  },[fullLocation]);
  return (
    <>
      <Typography>you have agreed to share your location </Typography>
      <TextField
        sx={{ ml: 2, width: 300 }}
        id="outlined-number"
        type="text"
        InputProps={{
          readOnly: true,
        }}
        defaultValue={fullLocation == null ? null : fullLocation.address}
      />
    </>
  );
}
