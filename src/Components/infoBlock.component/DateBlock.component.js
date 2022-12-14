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
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";

export default function DateBlock({ data, infoTitle, title }) {
  const [edit, setEdit] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    [infoTitle]: data,
  });
  const { updateProfile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setInputInfo({
      [infoTitle]: data,
    });
  }, [data]);

  const handleChange = async (event) => {
    let { name, value } = event.target;
    await setInputInfo(() => {
      return { [name]: value };
    });
    console.log(inputInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(inputInfo[infoTitle] === ""){
      alert("please select a date to update");
    }else{
      const response = updateProfile(inputInfo, user.token);
    if (response) {
      console.log("profile updated");
    } else {
      console.log("some error occured");
      setInputInfo({ [infoTitle]: data });
      alert("could not update");
    }
    setEdit(false);
    }
    
  };

  return (
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {`${title}`}{" "}
        </Typography>
      {edit ? (
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
            type="date"
            inputProps={{ min: "1950-01-01", max: "2021-12-12" }}
            id={infoTitle}
            name={infoTitle}
            autoComplete={infoTitle}
            value={inputInfo[infoTitle] === "" ? "" : moment(inputInfo[infoTitle]).format("YYYY-MM-DD")}
            autoFocus
          />

          <IconButton aria-label="update" onClick={handleSubmit}>
            <SaveIcon />
          </IconButton>
          <IconButton
            aria-label="cancel"
            onClick={() => {
              setEdit(false);
            }}
          >
            <CancelPresentationIcon />
          </IconButton>
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
        
          <ViewInfo
            data={inputInfo[infoTitle] ? `${moment(inputInfo[infoTitle]).format("LL")}` : "Not Set"}
            title=""
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
  );
}
