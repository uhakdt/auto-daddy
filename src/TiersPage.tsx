import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./appContext";

const auth = getAuth();

interface CardProps {
  title: string;
  price: number;
}

const Card: React.FC<CardProps> = ({ title, price }) => {
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
      <h2>{title}</h2>
      <p>Price: £{price.toFixed(2)}</p>
      <button onClick={handleClick}>Purchase</button>
    </div>
  );
};

const TiersPage: React.FC = () => {
  return (
    <div>
      <h1>Tiers Page</h1>
      <Card title="Initial Check" price={2.99} />
      <Card title="Basic Check" price={4.99} />
      <Card title="Full Check" price={9.99} />
    </div>
  );
};

export default TiersPage;
