import "./App.css";
import Auth from "./components/Auth/Auth";
import React, { useEffect } from "react";
import Chat from "./components/Chat/Chat";
import Navbar from "./containers/Navbar/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "./serverApi";
import Room from "./containers/Broadcast/Room";

function App() {
  const authSuccess = useSelector((state) => state.auth.authSuccess);
  const userName = useSelector((state) => state.auth.name);
  useEffect(() => {
    api.connect();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {!authSuccess ? (
          <Auth />
        ) : (
          <>
            <Navbar userName={userName} />
            <Switch>
            <Route path="/rooms/broadcast/:roomID" component={Room} />
            <Route path="/rooms/:id" component={Chat} />
              <Route path="/rooms" component={Chat} />
              
              
              <Redirect to="/rooms" exact />
            </Switch>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
