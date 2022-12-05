import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import ViewInfo from "./ViewInfo.component";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import jwt from "jwt-decode";
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "../../context/AuthContext";
import validator from "validator";
import TransitionAlert from "../Posts.comonent/TransitionAlert.component";

export default function UserNameBlock({
  dataFN,
  dataLN,
  infoTitleFN,
  infoTitleLN,
}) {
  const [alertMsg, setAlertMsg] = useState(null);
  const [edit, setEdit] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    [infoTitleFN]: dataFN,
    [infoTitleLN]: dataLN,
  });
  const { updateProfile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setInputInfo({
      [infoTitleFN]: dataFN,
      [infoTitleLN]: dataLN,
    });
  }, [dataFN, dataLN]);

  const closeAlert = (e) => {
    e.stopPropagation();
    setAlertMsg(null);
  }

  const handleChange = async (event) => {
    let { name, value } = event.target;
    await setInputInfo((prev) => {
      return { ...prev, [name]: value };
    });
    // console.log(inputInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* if (inputInfo[infoTitleFN]  === "" || inputInfo[infoTitleLN]) {
      alert("please enter profile Name to update");
    } */ 
    if (!validator.isAlpha(inputInfo[infoTitleFN])) {
      setAlertMsg('The first name must contain only letters');
    } else if (!validator.isAlpha(inputInfo[infoTitleLN])) {
      setAlertMsg('The last name must contain only letters');
    } else {
      const response = updateProfile(inputInfo, user.token);
      if (response) {
        console.log("profile updated");
      } else {
        console.log("some error occured");
        setInputInfo({ [infoTitleFN]: dataFN, [infoTitleLN]: dataLN });
        alert("could not update");
      }
      setEdit(false);
    }
  };

  return (
    <div>
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent="flex-start"
      alignItems="center"
    >
      {edit ? (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-start"
          alignItems="baseline"
        >
          <TextField
            margin="normal"
            required
            onChange={handleChange}
            id={infoTitleFN}
            name={infoTitleFN}
            autoComplete={infoTitleFN}
            value={inputInfo[infoTitleFN] === "" ? "" : inputInfo[infoTitleFN]}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            onChange={handleChange}
            id={infoTitleLN}
            name={infoTitleLN}
            autoComplete={infoTitleLN}
            value={inputInfo[infoTitleLN] === "" ? "" : inputInfo[infoTitleLN]}
          />
          <IconButton aria-label="delete" onClick={handleSubmit}>
            <SaveIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setEdit(false);
            }}
          >
            <CancelPresentationIcon />
          </IconButton>
        </Stack>
      ) : (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-start"
          alignItems="center"
        >
          <ViewInfo
            data={`${
              inputInfo[infoTitleFN] === "" ? "Not Set" : inputInfo[infoTitleFN]
            } ${inputInfo[infoTitleLN] === "" ? "" : inputInfo[infoTitleLN]}`}
            variant="h4"
          />
          <IconButton
            aria-label="delete"
            onClick={() => {
              setEdit(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Stack>
      )}
      
    </Stack>
    <TransitionAlert msg={alertMsg} closeAlert={closeAlert} />
    </div>
  );
}
