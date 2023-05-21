import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContext } from "../appContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import "./TiersPage.css";
import CheckoutForm from "../components/CheckoutForm";

const auth = getAuth();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const TiersPage = () => {
  const [appData, setAppData] = useContext(AppContext);
  const { tier, vehicleFreeData } = appData;
  const [price, setPrice] = useState(null);
  const [email, setEmail] = useState(auth.currentUser?.email);
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (price, tier) => {
    setPrice(price);
    setAppData((prevData) => ({
      ...prevData,
      tier,
      vehicleFreeData,
    }));

    onAuthStateChanged(auth, (user) => {
      if (!tier || !vehicleFreeData || !user) {
        navigate("/login", { state: { tier, vehicleFreeData } });
      } else {
        fetch(`${process.env.REACT_APP_API_URL_DEV}/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
          body: JSON.stringify({
            email,
            price,
            vehicleFreeData,
          }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }
    });
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="tiers-page">
      <h1 className="tiers-page-title">Pricing Plan</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="grid-container"
      >
        <Grid item xs={12} sm={6}>
          <Box className="card-wrapper">
            <Card className="card card-first">
              <Box className="card-header">
                <CardContent>
                  <Box className="card-title">
                    <Typography variant="h5" component="div">
                      Basic Check
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Price: £3
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <Box className="card-body">
                <CardContent>
                  <ul className="custom-bullet-points">
                    <li>Random text 1</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Box className="card-action">
                    <Button
                      onClick={() => handleSubmit(3, "Basic Check")}
                      type="submit"
                      variant="contained"
                    >
                      Purchase
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="card-wrapper">
            <Card className="card card-first">
              <Box className="card-header">
                <CardContent>
                  <Box className="card-title">
                    <Typography variant="h5" component="div">
                      Full Check
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Price: £9
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <Box className="card-body">
                <CardContent>
                  <ul className="custom-bullet-points">
                    <li>Random text 1</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Box className="card-action">
                    <Button
                      onClick={() => handleSubmit(9, "Full Check")}
                      type="submit"
                      variant="contained"
                    >
                      Purchase
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm price={price} userEmail={email} />
        </Elements>
      )}
    </div>
  );
};

export default TiersPage;
