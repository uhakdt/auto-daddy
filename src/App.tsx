import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { AppContext, initialData, saveDataToStorage } from "./appContext";
import { ReactNode, useEffect, useState } from "react";

interface AppProps {
  children?: ReactNode;
}

export const App = ({ children }: AppProps) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    saveDataToStorage(data);
  }, [data]);

  return (
    <AppContext.Provider value={[data, setData]}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
          {children}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};
