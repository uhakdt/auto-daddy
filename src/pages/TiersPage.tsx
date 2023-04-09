import React, { useContext } from "react";
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

interface CardProps {
  title: string;
  price: number;
}

const CardMain: React.FC<CardProps> = ({ title, price }) => {
  const [appData, setAppData] = useContext(AppContext);
  const { tier, vehicleCheckData } = appData;
  const navigate = useNavigate();

  console.log(tier, vehicleCheckData);

  const handleClick = () => {
    setAppData((prevData: any) => ({
      ...prevData,
      tier: title,
      vehicleCheckData,
    }));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/payment", { state: { tier: title, vehicleCheckData } });
      } else {
        if (title != null && vehicleCheckData != null) {
          navigate("/login", { state: { tier: title, vehicleCheckData } });
        } else {
          //TODO: Pass error message into landing page and display it
          navigate("/");
        }
      }
    });
  };

  return (
    <div>
      <h2 style={{ color: "black" }}>{title}</h2>
      <p>Price: £{price.toFixed(2)}</p>
      <button onClick={handleClick}>Purchase</button>
    </div>
  );
};

const TiersPage: React.FC = () => {
  return (
    <div className="tiers-page">
      <h1 className="tiers-page-title">Pricing Plan</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="grid-container"
      >
        <Grid item xs={12} sm={4} md={3.5}>
          <Box className="card-wrapper">
            <Card className="card card-first">
              <Box className="card-header">
                <CardContent>
                  <Box className="card-title">
                    <Typography variant="h5" component="div">
                      Basic Check
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      £2.99
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
                    <Button variant="contained">Get Started</Button>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Box className="card-wrapper">
            <Card className="card card-second">
              <Box className="card-header">
                <CardContent>
                  <Box className="card-title">
                    <Typography variant="h5" component="div">
                      Premium Check
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      £4.99
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
                    <li>Random text 4</li>
                    <li>Random text 5</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Box className="card-action">
                    <Button variant="contained">Get Started</Button>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={3.5}>
          <Box className="card-wrapper">
            <Card className="card card-third">
              <Box className="card-header">
                <CardContent>
                  <Box className="card-title">
                    <Typography variant="h5" component="div">
                      Full Check
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      £9.99
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
                    <Button variant="contained">Get Started</Button>
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
