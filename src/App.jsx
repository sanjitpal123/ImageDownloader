import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Component/Navbar";

import Collection from "./Component/Homeimagestore";


function App() {
  return (
    <>
      <Navbar />
    
        <Collection/>
      
    </>
  );
}

export default App;
