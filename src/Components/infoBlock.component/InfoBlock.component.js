import Stack from "@mui/material/Stack";
import ViewInfo from "./ViewInfo.component";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EditProfileInfo from "../ProfileInfo.component/EditProfileInfo.component";
import { useState } from "react";

export default function InfoBlock({ infoTitle, title, data, variant }) {
  const [edit, setEdit] = useState(false);
  const updateEdit = (edit)=>{
    setEdit(edit);
  }
  return (
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      {title !== "" && (
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {`${title}`}{" "}
        </Typography>
      )}
      {edit ? (
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <EditProfileInfo infoTitle={infoTitle} infoData={data} updateEdit={updateEdit} />
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
          direction={"row"}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <ViewInfo data={`${data}`} variant={variant} />
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
