import { TextField } from "@mui/material";
import React, { Component } from "react";
import Geocode from "react-geocode";
import { geolocated } from "react-geolocated";
import { CmmnInput } from "./CmmnInput";
Geocode.setApiKey("AIzaSyDgu1_PPhBne4sp9PlPQ0eG3bfzSKGut_g");
// Geocode.setLanguage("en");
// Geocode.setRegion("world");
// Geocode.setLocationType("ROOFTOP");
// Enable or disable logs. Its optional.
// Geocode.enableDebug();

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
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default class GmapApiChatAutoInput extends Component {
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
            navigator.geolocation.getCurrentPosition(
              function () {},
              function () {},
              {}
            );
            navigator.geolocation.getCurrentPosition(success, errors, {
              maximumAge: 60000,
              timeout: 5000,
              enableHighAccuracy: true,
            });
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
    // function showPosition(position) {
    //    console.log("lat",position.coords.latitude)
    //    console.log("lo", position.coords.longitude);
    // }
    // if (navigator.geolocation) {
    //  navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    //   alert("not support")
    // }
  }

  render() {
    return (
      <CmmnInput
        id="__curr_address_temp"
        type="text"
        inputProps={{
          readOnly: true,
        }}
      />
    );
  }
}
