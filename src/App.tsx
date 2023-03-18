import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { AppContext, initialData, saveDataToStorage } from "./appContext";
import { useEffect, useState } from "react";

export const App = ({ children }: any) => {
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
