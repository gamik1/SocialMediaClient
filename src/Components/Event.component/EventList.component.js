import React, { useState, useContext, useEffect } from 'react';
import { red } from '@mui/material/colors';
import {
    Alert, AlertTitle, Avatar,
    Box, Button,
    Collapse,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { AuthContext } from "../../context/AuthContext";
import { eventListCall, friendEventCall, friendCloseCall } from "../../API/apiCalls";

export default function EventList({ trigger }) {
    let [alertList, setAlertList] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let response = await eventListCall(user.token);
        if (response) {
            console.log(response.events);
            setAlertList(response.events);
        } else {
            console.log("some error occured");
        }
    }

    function EventAlert(event) {
        const [open, setOpen] = React.useState(true);

        const ctntSX = {
            '&.MuiAlertTitle-root': {
                display: 'flex',
                alignItems: 'center',
            }
        }

        const deleteAlert = (id) => {
            alertList = alertList.filter((e) => {
                return e._id !== id
            })
        }

        const accept = async () => {
            await friendEventCall(event.event._id, 'accept', user.token)
            deleteAlert(event.event._id)
            setOpen(false)
            await setAlertList(alertList)
            trigger()
        }

        const reject = async () => {
            await friendEventCall(event.event._id, 'reject', user.token)
            deleteAlert(event.event._id)
            setOpen(false)
        }

        const close = async () => {
            await friendCloseCall(event.event._id, user.token)
            deleteAlert(event.event._id)
            setOpen(false)
        }

        const handleProfile = (e) => {
            window.location.href = `/user/others/profile/${event.event.profile._user_Id}`;
        }

        function AlertFuction() {
            if (event.event.eventType === 'friendRequest') {
                return (
                    <Box>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={accept}
                            sx={{ mr: 1 }}>
                            Accept
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={reject}
                            sx={{}}>
                            Reject
                        </Button>
                    </Box>
                )
            }
            return (
                <Box>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={close}
                        sx={{ mr: 1 }}>
                        Close
                    </Button>
                </Box>
            )
        }

        function AlertMsg() {
            if (event.event.eventType === 'friendRequest') {
                return 'A Friend request from';
            } else if (event.event.eventType === 'friendAccept') {
                return 'Accepted friend request from';
            } else if (event.event.eventType === 'friendRemove') {
                return 'No longer befriend by';
            }
            return 'Rejected friend request from';
        }

        return (
            <Box sx={{ width: '100%', mt: 4 }}>
                <Collapse in={open}>
                    <Alert
                        severity="info"
                        action={<AlertFuction />}
                        sx={{ mb: 2, alignItems: 'center' }}
                    >
                        <AlertTitle sx={ctntSX}>
                            <AlertMsg />
                            <Typography sx={{ color: red[500], fontWeight: 'bold' }}>&nbsp;{event.event.profile.displayName}</Typography>
                            <Avatar
                                component={Paper}
                                elevation={2}
                                sx={{ bgcolor: red[500], width: 48, height: 48, ml: 2 }}
                                src={`${process.env.REACT_APP_API_URL}/image/profile/${event.event.profile.displayImage}`}
                                aria-label={event.event.profile.displayName}
                                onClick={handleProfile}
                            />
                        </AlertTitle>
                    </Alert>
                </Collapse>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            {
                alertList.length > 0 ?
                    <Stack spacing={2} sx={{ mb: 4 }}>
                        {alertList.map((a) => (
                            <EventAlert key={a._id} event={a} />
                        ))}
                    </Stack>
                    : 'There are no events'
            }
        </Box>
    );
}