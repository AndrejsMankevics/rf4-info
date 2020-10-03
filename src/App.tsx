import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { auth, db } from './firebase';
import { useRoutes } from './routes';
import { useMediaQuery } from './shared/hooks/mediaQuery';
import { UserUtils } from './shared/utils/user.utils';
import { useAppStateValue } from './state/AppStateProvider';

function App() {
  const [, dispatch] = useAppStateValue();
  const routes = useRoutes(false);

  const mobile = useMediaQuery();
  useEffect(() => {
    dispatch({ type: 'SET_IS_MOBILE', payload: { isMobile: mobile } });
  }, [mobile, dispatch]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          payload: { user: UserUtils.parseUserData(authUser) },
        });
      } else {
        dispatch({
          type: 'SET_USER',
          payload: { user: null },
        });
      }
    });

    db.collection('places')
      .get()
      .then((ref) => {
        dispatch({ type: 'SET_PLACES', payload: { places: ref.docs.map((doc) => ({ ...doc.data(), id: doc.id })) } });
      });

    db.collection('baits')
      .get()
      .then((ref) => {
        dispatch({ type: 'SET_BAITS', payload: { baits: ref.docs.map((doc) => ({ ...doc.data(), id: doc.id })) } });
      });
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
