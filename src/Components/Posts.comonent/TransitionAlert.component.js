import * as React from 'react';
import {
    Box, Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    Typography
} from '@mui/material';

export default function TransitionAlert({ msg, closeAlert }) {
    const open = Boolean(msg);

    return (
        <Box sx={{ width: '100%' }}>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={closeAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography component={'span'}  variant="h6" >
                            {msg}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAlert} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}