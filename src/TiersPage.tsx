import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

interface VehicleCheckData {
  Model: string;
  Colour: string;
  Year: string;
}

interface CardProps {
  title: string;
  price: number;
  vehicleCheckData: VehicleCheckData;
}

const Card: React.FC<CardProps> = ({ title, price, vehicleCheckData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (title === "Initial Check") {
          navigate("https://buy.stripe.com/3cs5nS2MI2xLbRu3cc");
        } else if (title === "Basic Check") {
          navigate("https://buy.stripe.com/4gwdUo5YU8W98FibIJ");
        } else if (title === "Full Check") {
          navigate("https://buy.stripe.com/14k03y5YUgoBbRu6oq");
        }
      } else {
        navigate("/register", { state: { title, price, vehicleCheckData } });
      }
    });
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>Price: £{price.toFixed(2)}</p>
      <button onClick={handleClick}>Purchase</button>
    </div>
  );
};

const TiersPage: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Tiers Page</h1>
      <Card
        title="Initial Check"
        price={2.99}
        vehicleCheckData={location.state?.vehicleCheckData}
      />
      <Card
        title="Basic Check"
        price={4.99}
        vehicleCheckData={location.state?.vehicleCheckData}
      />
      <Card
        title="Full Check"
        price={9.99}
        vehicleCheckData={location.state?.vehicleCheckData}
      />
    </div>
  );
};

export default TiersPage;
