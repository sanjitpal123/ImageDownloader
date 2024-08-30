import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

function Provider({ children }) {
    const [Query, SetQuery] = useState(null);
  

    useEffect(()=>{
    console.log("ff",Query)
    },[Query])
    return (
        <MyContext.Provider value={{ Query, SetQuery }}>
            {children}
        </MyContext.Provider>
    );
}

export default Provider;
