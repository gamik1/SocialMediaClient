import { Typography } from '@mui/material';

export default function ViewProfileInfo({data , variant = "h6"}){

    return(
        <Typography variant={variant}>
                {`${data}`}
        </Typography>
    );
}