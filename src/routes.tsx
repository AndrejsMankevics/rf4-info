import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MorePage from './pages/MorePage';
import PlacesPage from './pages/PlacesPage';
import RegisterPage from './pages/RegisterPage';

export const useRoutes = (isAuthenticated: boolean) => {
  // if (isAuthenticated) {
  //   return (
  //     <Switch>
  //       <Route path="/home" exact>
  //         <HomePage />
  //       </Route>
  //       <Route path="/places" exact>
  //         <PlacesPage />
  //       </Route>
  //       <Redirect to="/home" />
  //     </Switch>
  //   );
  // }

  return (
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/places">
        <PlacesPage />
      </Route>
      <Route path="/more" exact>
        <MorePage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/places" />
    </Switch>
  );
};
