import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('auth-token');
    if (typeof tokenString === 'string') {
      return tokenString
    }else{
      return null;
    }
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken:any) => {
    setToken(userToken)
    sessionStorage.setItem("auth-token", userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}