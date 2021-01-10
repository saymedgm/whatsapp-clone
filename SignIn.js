import React from 'react';
import {Button} from '@material-ui/core';
import "./SignIn.css";
import {auth, provider} from './firebase';
import {useStateValue} from './StateProvider'
import { actionTypes } from './reducer';

function Signin(){
   
   const [{}, dispatch] = useStateValue();

   const logIn = () => {
       auth.signInWithPopup(provider)
       .then((result) => {
         dispatch({
           type: actionTypes.SET_USER,
           user: result.user,
         })
       })
       .catch((error) => alert(error.message));
   };

    return(
      <div className = "signin">
        <div className = "signinContainer">
          <img 
             src = "https://png.pngtree.com/element_origin_min_pic/00/00/05/31574d5cbd9f117.jpg"
             alt = ""
          />

            <div className = "signinText">
              <h1> SignIn to Whatsapp</h1>
            </div>

        <Button type = "submit" onClick = {logIn}>
          SignIn with Google
        </Button>

        </div>
      </div>
       
    )
    ;
}

export default Signin;