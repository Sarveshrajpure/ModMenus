import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { verify_user } from "../Actions/userActions";
import { userIsAuth } from "../Login/loginAction";

const PrivateRoute = () => {
  /* Track the state of your app instead. Start with a "loading" state */
  const [state, setState] = useState("loading");
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        /* Update effect logic to track correct state */
        const isUserLogged = await userIsAuth();
        if (isUserLogged) {
          // dispatch(verify_user({ ...isUserLogged.data, auth: true }));
          setState(isUserLogged ? "loggedin" : "redirect");
        } else {
          dispatch(verify_user({ ...state, auth: false }));
          setState(isUserLogged ? "loggedin" : "redirect");
        }
      } catch {
        setState("redirect");
      }
    })();
  }, []);

  /* If in loading state, return loading message while waiting for 
 isValidToken to complete */
  if (state === "loading") {
    return <div>Loading..</div>;
  }

  return state === "loggedin" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
