import React from "react";
import { useState, useEffect } from "react";

import Geocode from "react-geocode";

const Geolocation = () => {
  //  const [status, setStatus] = useState("unstat");
  // const [latLong, setLatLong] = useState({ latitude: "", longitude: "" });
  const [locAddress, setLocAddress] = useState("");

  Geocode.setApiKey("AIzaSyCMf5u90MmUIk0RD4K_puY1inNcps-KbXA");
  Geocode.setLanguage("en");

  //   const set = (aaa) => {
  //     setStatus(aaa);
  //   };

  const showAddress = (address) => {
    setLocAddress(address);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      //      set("Available");
    } else {
      console.log("Not Available");
      //      set("not available");
    }
    getLocation();

    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log(position)
    //   setPosition(position);
    //   });
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        (response) => {
          const address = response.results[0].formatted_address;
          showAddress(address);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  };
  return (
    <div>
      <h2>{locAddress}</h2>
    </div>
  );
};

export default Geolocation;
