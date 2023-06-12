import { createContext, useReducer } from "react";

export const ItemContext = createContext(); 

const ItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEM':
            return ({
                item: action.payload
            });
            
        default:
            return state;
    }
}

export const ItemContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(ItemReducer, {
        item:null
    });

    return(
        <ItemContext.Provider value = {{...state, dispatch}}>
            {children}
        </ItemContext.Provider>
    )
}
