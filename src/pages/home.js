const React = require('react');
const { Component } = require('react');
const { Link } = require('react-router-dom');

class App extends Component {
  render() {
    return (
    	<div className="App">
            
            <button>Sales</button>
            <button>Stocks</button>
    	</div>
    );
  }
}

module.exports = App;