import React, { useState } from "react";
import { ADD_USER_MUTATION } from "../GraphQL"
import { useMutation, useQuery } from "@apollo/client";
import {useNavigate} from 'react-router-dom';


export function Register(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");
    const [er, setEr] = useState(false);
    const [ mutateFunction, {loading}] = useMutation(ADD_USER_MUTATION);
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (password === rpassword) {
        mutateFunction({variables:{name: name, email: email, password: password},
            onCompleted: ({ addUser }) => {
              if (addUser != "Wrong") {
                navigate('/');
                window.location.reload(); 
              }else{
                setEr(true);
              }
      
            }});
      }
  
    }

    return (
    <div className="login-wrapper">
        {loading ? <span>LOADING</span> : <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setName(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <label>
            <p>Repeat password</p>
            <input type="password" onChange={e => setRPassword(e.target.value)}/>
          </label>
          {(rpassword !== "" && password !== rpassword) && <span>Passwords do not match</span>}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        </div>}
        </div>
        
    );
}