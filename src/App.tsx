import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { useRoutes } from './routes';
import AppContext from './shared/contexts/AppContext';
import { useMediaQuery } from './shared/hooks/mediaQuery';

function App() {
  const routes = useRoutes(false);

  const mobile = useMediaQuery();

  return (
    <AppContext.Provider value={{ isMobile: mobile }}>
      <div className="app-wrapper">
        <Router>
          <Header />
          <div className="router-container">{routes}</div>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
