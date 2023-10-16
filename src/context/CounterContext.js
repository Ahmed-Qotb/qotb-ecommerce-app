import { createContext, useState } from "react";


export const couterContext = createContext();
export default function CouterContextProvider(props) {

const [counter, setCounter] = useState(0);
    return <couterContext.Provider value={{counter}}>
        {props.children}
    </couterContext.Provider>
}