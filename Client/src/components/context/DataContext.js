import React, { createContext, useState } from 'react'

const DataContext = createContext(null)
export const DataProvider = ({children}) => {
  

    const[accountDetails,setAccountDetails] = useState({username:'',email:''})
    
  return (
    <DataContext.Provider value={{
        accountDetails,setAccountDetails

    }}>
        {children}
    </DataContext.Provider>
  )
}

export default DataContext
