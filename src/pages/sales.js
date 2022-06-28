const React = require('react');
const { Component } = require('react');
const { Link } = require('react-router-dom');

class App extends Component {
  render() {
    return (
    	<div styles={{ textAlign: center}} className="App">

        Hello
            <button onCLick={goto('/admin/stocks')}>Stocks</button><br/>
            <button onCLick={goto('/admin/sales')}>Sales</button><br/>
    	</div>
    );
  }
}

module.exports = App;