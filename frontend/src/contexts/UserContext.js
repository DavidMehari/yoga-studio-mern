import React, { createContext, useContext, useState } from 'react';
import { getDataFromToken } from '../helpers/utils';

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

function UserContextProvider({ children }) {
  const storedJwt = localStorage.getItem('userToken');
  const [activeUser, setActiveUser] = useState(storedJwt ? getDataFromToken(storedJwt) : null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <UserContext.Provider
      value={{
        activeUser,
        setActiveUser,
        authDialogOpen,
        setAuthDialogOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
