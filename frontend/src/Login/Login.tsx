import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { LOGIN_MUTATION} from "../GraphQL"
import { useMutation} from "@apollo/client";
import {useNavigate} from 'react-router-dom';
import Spinner from "react-spinner-material";
interface RetLog{
  id:number
  key:string
}

interface LoginProps{
  setToken: React.Dispatch<React.SetStateAction<string>>
  setID:React.Dispatch<React.SetStateAction<string>>
}

export function Login( props: LoginProps){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [er, setEr] = useState(false);
  const [ mutateFunction, {loading}] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    mutateFunction({variables:{email: email, password: password},
      onCompleted: ({ login }) => {
        if (login !== "Wrong") {
          let obj: RetLog = JSON.parse(login);

          props.setID(obj.id.toString());
          props.setToken(obj.key);
          navigate('/');
          window.location.reload(); 
        }else{
          setEr(true);
        }

      }});

  }

  if (loading) {
    return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
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
        <div className="Register"><Link to="/Register">Register</Link></div>
        </div>}
        {er && <span>Wrong password or error</span>}
      </div>
      
    
    );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}