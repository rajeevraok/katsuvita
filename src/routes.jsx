import React,{ Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//import Test from './pages/Test';
import Home from './pages/home';
import Stocks from './pages/stocks';
import Sales from './pages/sales';
class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>

            <Route exact path='/admin' >
              <Redirect to="/admin/stocks"/>
            </Route>
            <Route exact path='/admin/stocks' component={Stocks}/>
            {/* <Route exact path='/admin/sales' component={Sales}/> */}

            <Route exact path='**'>
              <Redirect to="/" />
            </Route>

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