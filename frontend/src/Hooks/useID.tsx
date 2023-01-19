import { useState } from 'react';

export default function useID() {
  const getID = () => {
    const IDString = sessionStorage.getItem('ID');
    if (typeof IDString === 'string') {
      return IDString
    }else{
      return "";
    }
  };
  const [ID, setID] = useState(getID());

  const saveID = (userID:any) => {
    setID(userID)
    sessionStorage.setItem("ID", userID);
  };

  return {
    setID: saveID,
    ID
  }
}