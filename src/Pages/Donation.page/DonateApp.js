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
const currency = "CAD";
const style={
  layout: "horizontal",
  size:"small",
  label: "pay",
  height: 48,
  tagline: "false",
  borderRadius:10,
}


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
                      alert('Transaction completed Successfully');
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
          
          <Typography component="h1" variant="h4">
          Welcome to the Donation Box
          
          </Typography>

          <Typography variant="body1"  mt={3}>
          Join the 42 other donors tho have already supported this project. Every dollar helps.
          We do whatever it takes for a cause but we can't do it without you.
      </Typography>

          <Box component="form"  sx={{ mt: 3}}>
          <TextField 
          type="number"
          fullWidth
  id="outlined-name"
  label="Amount"
  mb={10}
  
 
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
                    showSpinner={true}
                />
			</PayPalScriptProvider>
      
           
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 10, mb: 0 }} />
      </Container>
    </ThemeProvider>
  );
}




