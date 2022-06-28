const React = require('react');
const { Component } = require('react');
const { Link } = require('react-router-dom');
const axios = require('axios');
require('./stocks.css')

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
  }

  componentDidMount(){
    axios.get('/api/sales/list').then((res)=>{
      console.log(res.status)
      this.setState({
        list:res.data
      })
    })
  }

  onItemNameChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)
  }

  onStocksChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)

  }
  onStockUnitChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)

  }
  onItemTypeChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)

  }

  render() {
      let list = this.state.list;
      function itemName(){
        console.log("touching")
      }
      return (
          <div className="App">
              <table cellSpacing={10}>
                <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Stocks</th>
                  <th>Stock Unit</th>
                  <th>Item Type</th>
                </tr>
                </thead>
                <tbody>
                {

                  	/*
                    item_code
                    order_id
                    total_price_in_rs
                    receipt_ID
                    quantity
                    quantity_unit
                    purchaser_email
                    purcahser_name

                    */
                  list.map((item,index)=>{
                    return <tr data-key = {JSON.stringify(item.order_id)} key = { index }>
                      <td style={{textAlign:'center'}}>{item.item_code}</td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onItemNameChange(e)} defaultValue={item.item_name}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onStocksChange(e)} defaultValue={item.stocks}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onStockUnitChange(e)} defaultValue={item.stock_unit}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onItemTypeChange(e)} defaultValue={item.item_type}/></td>
                    </tr>
                  })
                }
                </tbody>
              </table>
          </div>
      );
  }
}

module.exports = App;