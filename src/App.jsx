import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./scss/app.scss";
export const StoreContext = createContext();
function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <StoreContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
