import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import jwt from "jwt-decode";
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "../../context/AuthContext";
import { isEmpty, isName } from "../../Validations/Validators";
import validator from "validator";

export default function EditProfileInfo({ infoTitle, infoData, updateEdit }) {
  const [inputInfo, setInputInfo] = useState({ [infoTitle]: `${infoData}` });
  const { updateProfile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  const decoded = jwt(user.token);
  const id = decoded.user._id;
  const navigate = useNavigate();
  const stringRegex = "^[a-zA-Z]+[a-zA-Z ]*$";

  const handleChange = async (event) => {
    let { name, value } = event.target;
    await setInputInfo(() => {
      return { [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ( !inputInfo[infoTitle].match(stringRegex)) {
      alert(`only text allowed in ${infoTitle}`);
    } else {
      const response = updateProfile(inputInfo, user.token);
      if (response) {
        console.log("profile updated");
      } else {
        console.log("some error occured");
        alert("could not update");
      }
      updateEdit(false);
    }
  };

  return (
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        margin="normal"
        required
        onChange={handleChange}
        id={infoTitle}
        name={infoTitle}
        autoComplete={infoTitle}
        value={inputInfo[infoTitle]}
        autoFocus
      />
      <IconButton aria-label="update" onClick={handleSubmit}>
        <SaveIcon />
      </IconButton>
    </Stack>
  );
}
