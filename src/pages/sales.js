const React = require('react');
const { Component } = require('react');
const { Link } = require('react-router-dom');
const axios = require('axios');
require('./admin.css')

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
      return (
          <div className="App">
              <table cellSpacing={10}>
                <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Total Price in RS</th>
                  <th>Receipt ID</th>
                  <th>Quantity</th>
                  <th>Quantity Unit</th>
                  <th>Purchaser Name</th>
                  <th>Purchaser Email</th>
                </tr>
                </thead>
                <tbody>
                {

                  	/*
                    item_code
                    item_name
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
                      <td>{item.order_id}</td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onItemIDChange(e)} defaultValue={item.item_code}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onItemNameChange(e)} defaultValue={item.item_name}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onRSChange(e)} defaultValue={item.total_price_in_rs}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onreceiptIDChange(e)} defaultValue={item.receipt_ID}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onQuantityChange(e)} defaultValue={item.quantity}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onQuantityUnitChange(e)} defaultValue={item.quantity_unit}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onPurchaserNameChange(e)} defaultValue={item.purchaser_name}/></td>
                      <td style={{textAlign:'center'}}><input type="email" onChange={(e)=>this.onPurchaserEmailChange(e)} defaultValue={item.purchaser_email}/></td>
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