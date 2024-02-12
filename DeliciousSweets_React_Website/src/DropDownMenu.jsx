import React from 'react'

/* dropdown when in 'open' state*/
const DropDownContext = React.createContext({
        open: false,
        setOpen: ()=>{}
});

function DropDownMenu({children, ...props}){
    const [open, setOpen] = React.useState(false);/* initially closed */
    
    return(
        /* value is what will be used from the context*/
        <DropDownContext.Provider value={{open, setOpen}}>

        </DropDownContext.Provider>
    )
};
