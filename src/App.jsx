import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Component/Navbar";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Collection from "./Component/Homeimagestore";
import SharedCom from "./SharedComponent/Shared";
import GetSinglePhoto from "./Component/GetSinglePhoto";
import Provider from "./Store/Contextapi";
function App() {
  return (
    <Provider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SharedCom />}>
        <Route index element={<Collection />} />
        <Route path="photo/:id" element={<GetSinglePhoto />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
