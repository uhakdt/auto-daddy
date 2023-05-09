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
  const { tier, vehicleFreeData } = appData;
  const navigate = useNavigate();

  console.log(tier, vehicleFreeData);

  const handleClick = () => {
    console.log("test");
    setAppData((prevData: any) => ({
      ...prevData,
      tier: title,
      vehicleFreeData,
    }));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/payment", { state: { tier: title, vehicleFreeData } });
      } else {
        if (title != null && vehicleFreeData != null) {
          navigate("/login", { state: { tier: title, vehicleFreeData } });
        } else {
          //TODO: Pass error message into landing page and display it
          navigate("/");
        }
      }
    });
  };

  return (
    <Box className="card-wrapper">
      <Card className="card card-first">
        <Box className="card-header">
          <CardContent>
            <Box className="card-title">
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Price: £{price.toFixed(2)}
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
              <Button onClick={handleClick} variant="contained">
                Purchase
              </Button>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
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
        <Grid item xs={12} sm={6}>
          <CardMain title="Basic Check" price={2.99} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMain title="Full Check" price={8.99} />
        </Grid>
      </Grid>
    </div>
  );
};

export default TiersPage;
