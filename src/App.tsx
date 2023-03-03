import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navigation />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
