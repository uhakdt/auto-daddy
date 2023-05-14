import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContext } from "../appContext";
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

const auth = getAuth();

const TiersPage: React.FC = () => {
  const [appData, setAppData] = useContext(AppContext);
  const { tier, vehicleFreeData } = appData;
  const [dataToSendToStripe, setDataToSendToStripe] = useState({} as any);
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  console.log(tier, vehicleFreeData);

  const handleSubmit = (tier: string, event: any) => {
    event.preventDefault(); // Prevent default form submission

    setAppData((prevData: any) => ({
      ...prevData,
      tier,
      vehicleFreeData,
    }));

    onAuthStateChanged(auth, (user) => {
      console.log("1");
      if (!tier || !vehicleFreeData || !user) {
        navigate("/login", { state: { tier, vehicleFreeData } });
      }
      console.log("2");
      setDataToSendToStripe({
        tier,
        vehicleFreeData,
      });
      // If the condition is met, submit the form programmatically
      if (formRef.current) {
        console.log("3");
        formRef.current.submit();
      }
    });
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
                    <li>Random text 2</li>
                    <li>Random text 3</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Box className="card-action">
                    <form
                      ref={formRef}
                      action="http://localhost:4242/api/v1/create-checkout-session"
                      method="POST"
                      onSubmit={handleSubmit.bind(null, "basic")}
                    >
                      <input
                        type="hidden"
                        name="vehicleFreeData"
                        value={JSON.stringify(vehicleFreeData)}
                      />
                      <input
                        type="hidden"
                        name="tier"
                        value={JSON.stringify(tier)}
                      />
                      <input
                        type="hidden"
                        name="userId"
                        value={JSON.stringify(auth.currentUser?.uid)}
                      />
                      <Button type="submit" variant="contained">
                        Purchase
                      </Button>
                    </form>
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
                    <li>Random text 2</li>
                    <li>Random text 3</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Box className="card-action">
                    <form
                      ref={formRef}
                      action="http://localhost:4242/api/v1/create-checkout-session"
                      method="POST"
                      onSubmit={handleSubmit.bind(null, "full")}
                    >
                      <input
                        type="hidden"
                        name="vehicleFreeData"
                        value={JSON.stringify(vehicleFreeData)}
                      />
                      <input
                        type="hidden"
                        name="tier"
                        value={JSON.stringify(tier)}
                      />
                      <input
                        type="hidden"
                        name="userId"
                        value={JSON.stringify(auth.currentUser?.uid)}
                      />
                      <Button type="submit" variant="contained">
                        Purchase
                      </Button>
                    </form>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default TiersPage;
