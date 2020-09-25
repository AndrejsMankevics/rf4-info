import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { db } from './firebase';
import { useRoutes } from './routes';
import { useMediaQuery } from './shared/hooks/mediaQuery';
import { useAppStateValue } from './state/AppStateProvider';

function App() {
  const [, dispatch] = useAppStateValue();
  const routes = useRoutes(false);

  const mobile = useMediaQuery();
  useEffect(() => {
    dispatch({ type: 'SET_IS_MOBILE', payload: { isMobile: mobile } });
  }, [mobile, dispatch]);

  useEffect(() => {
    db.collection('places')
      .get()
      .then((ref) => {
        dispatch({ type: 'SET_PLACES', payload: { places: ref.docs.map((doc) => doc.data()) } });
      });
    // db.collection('places').onSnapshot((snapshot) => {
    //   dispatch({ type: 'SET_PLACES', payload: { places: snapshot.docs.map((doc) => doc.data()) } });
    // });

    fetch('/mock/baits.json')
      .then((response) => response.json())
      .then((baits) => {
        dispatch({ type: 'SET_BAITS', payload: { baits } });
      });

    // fetch('/mock/places.json')
    //   .then((response) => response.json())
    //   .then((places) => {
    //     dispatch({ type: 'SET_PLACES', payload: { places } });
    //   });
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <div className="router-container">{routes}</div>
      </Router>
    </div>
  );
}

export default App;
