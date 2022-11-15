import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function ProfilePictureUpload({ uploadedFile }) {
  const [file, setFile] = useState(null);
  const {user} = useContext(AuthContext);
  const secret_token = user.token;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      axios
        .post(`http://localhost:8800/user/upload-profile`, data, {
          headers: {
            Authorization: `Bearer ${secret_token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  return (
    <div>
      <hr className="shareHr" />
      {file && (
        <div className="shareImgContainer">
          <img className="uploadImg" src={URL.createObjectURL(file)} alt="" />
        </div>
      )}
      <form className="" onSubmit={submitHandler}>
        <label htmlFor="file">
          <Typography style={{cursor: "pointer"}} sx={{ borderBottom: 1, fontWeight: 'light', p:1}} variant="h6" component="span">
          Upload Profile Picture  
            </Typography>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>&nbsp;&nbsp;
        <Button variant="contained" className="shareButton" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}
