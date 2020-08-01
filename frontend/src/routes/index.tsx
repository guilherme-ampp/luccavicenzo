import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import 'bootstrap/dist/css/bootstrap.min.css';

import PasswordGateway from '../pages/PasswordGateway';
import ShareVideo from '../pages/ShareVideo';

const Routes: React.FC = () => (
  // if we used a fragment <> </> to encapsulate the <Route> tags - all the matching
  // routes would be shown -> "/" would match both of them!
  // when we use <Switch></Switch> to encapsulate the <Route> tags - it makes
  // sure only one match will show
  // <Switch> cannot be used outside of a Router component
  // so we use <BrowserRouter> around our '<Routes/>' component in the App.tsx file
  <Switch>
    <Route path="/" exact component={PasswordGateway} />
    <Route path="/share" component={ShareVideo} isPrivate />
  </Switch>
);

export default Routes;
