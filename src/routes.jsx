import React,{ Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//import PRoute from './PRoute';
//import Test from './pages/Test';
import Home from './pages/home';

const Head = () => {
  console.log("1");
}

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Switch>
            <Route exact path='/admin' component={Home}/>
            <Route exact path='/test'/>
            <Route exact path='**'>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}
export default App; 