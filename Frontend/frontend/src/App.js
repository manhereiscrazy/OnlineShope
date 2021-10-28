import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Products from './Components/Products/Products';

export default function App() {

  return (
    <Router>
          <div className="main">
            <Switch>
              <Route path="/" exact component={Products}/>
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </div>
    </Router>
  );
}