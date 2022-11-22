import React, { useState, useContext } from "react";
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";
import { Routes, Route, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

const theme = createTheme({
  palette: {
    buttonPrimary: {
      main: "#32CD32",
      darker: "#299617",
    },
  },
});
const amount = "2";
const currency = "USD";
const style = {"layout":"vertical"};


const ButtonWrapper = ({ currency, showSpinner }) => {
    
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
                    });
                }}
            />
        </>
    );
}

export default function Donate() {
 
 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
          <Typography component="h1" variant="h5">
          Only 3 days left to fund this project.
          
          </Typography>

          <Typography variant="body2" gutterBottom mt={3}>
          Join the 42 other donors tho have already supported this project. Every dollar helps.
      </Typography>

          <Box component="form"  sx={{ mt: 3}}>
          <TextField 
          type="number"
          fullWidth
  id="outlined-name"
  label="Amount"
  
 
/>
<PayPalScriptProvider

                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "CAD"
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>
      
            {/* <Button
             
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ height: 50 }}
            >
              DONATE
            </Button> */}
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 10, mb: 0 }} />
      </Container>
    </ThemeProvider>
  );
}
