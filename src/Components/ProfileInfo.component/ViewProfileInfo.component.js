import { Typography } from '@mui/material';

export default function ViewProfileInfo({profileData}){

    return(
        <Typography variant="h5">
                {`${profile.firstName} ${profile.lastName}`}
        </Typography>
    )
}