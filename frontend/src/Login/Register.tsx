import React, { useState } from "react";
import { ADD_USER_MUTATION } from "../GraphQL"
import { useMutation, useQuery } from "@apollo/client";
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-spinner-material';

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
    if (loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }

    function validate():String[] {
      const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      let errorTable :String[] = [];
      if (!expression.test(email)) {
        errorTable.push("Incorect email format");
      }
      if(name.length > 100){
          errorTable.push("Name can be no longer than 100 characters");
      }
      if(name.length == 0){
          errorTable.push("Name cannot be blank");
      }
      if(password.length <= 8 || password.length >= 30){
        errorTable.push("Password need to be 8 to 30 characters");
      }
      if (password !== "" && password !== rpassword) {
        errorTable.push("Passwords need to match");
      }
      return errorTable;
    }

    let validation :String[] = validate();

    return (
    <div className="login-wrapper">
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
          <div>
            <button type="submit" disabled={validation.length != 0}>Submit</button>
          </div>
        </form>
        {validation.map((error: String, idx: number) => (
                <span key={idx} style={{color:"red"}}>{error}<br/></span>
              ))}
        </div>
    );
}