import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { LOGIN_MUTATION} from "../GraphQL"
import { useMutation} from "@apollo/client";
import {useNavigate} from 'react-router-dom';

export function Login( {setToken}: {setToken: React.Dispatch<React.SetStateAction<string>>}){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [er, setEr] = useState(false);
  const [ mutateFunction, {loading}] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    mutateFunction({variables:{email: email, password: password},
      onCompleted: ({ login }) => {
        if (login != "Wrong") {
          setToken(login)
          navigate('/');
          window.location.reload(); 
        }else{
          setEr(true);
        }

      }});

  }

    return (
      <div className="login-wrapper">
        {loading ? <span>LOADING</span> : <div>
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <Link to="/Register">Register</Link><br/>
        </div>}
        {er && <span>Wrong password or error</span>}
      </div>
      
    
    );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}