import React,{ Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//import Test from './pages/Test';
import Home from './pages/home';
class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Switch>
            <Route exact path='/admin' component={Home}/>
            <Route exact path='/admin/stocks' component={Home}/>
            <Route exact path='/admin/sales' component={Home}/>
            
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