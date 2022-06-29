const React = require('react');
const { Component } = require('react');
const { Link } = require('react-router-dom');
const axios = require('axios');
require('./admin.css')


import Switch from '@material-ui/core/Switch';

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


  onApproval = (e,ele) => {
    let key = ele.target.parentNode.parentNode.dataset.key
    //this.forceUpdate();
    /* this.setState({list:{
        ...this.state.list,
        
    }}) */
    this.state.list[key-1].approval = !this.state.list[key-1].approval
    console.log(this.state.list[key-1].approval)
    axios.get(`/api/order/approval?orderID=${key}&approval=${this.state.list[key-1].approval}`)
    this.forceUpdate();

    //this.state.list[e].approval=!this.state.list[e].approval;
  }

  onDelete = (e) => {
    console.log(e.target.parentNode.parentNode.parentNode.dataset.key)
    axios.get(`/api/order/delete?orderID=${key}`)        
  }

  render() {
    let CustBut = (props) => {
        if(props.approval)
        return <button onClick={(e)=>this.onApproval(props.approval,e)}>Disapprove</button>
        else
        return <button onClick={(e)=>this.onApproval(props.approval,e)}>Approve</button>
    }
      let list = this.state.list;
      return (
          <div className="App">
              <table cellSpacing={10}>
                <thead>
                <tr>
                  <th>Order ID</th>
                  {/* <th>Item Code</th> */}
                  <th>Item Name</th>
                  <th>Total Price in RS</th>
                  {/* <th>Receipt ID</th> */}
                  <th>Quantity</th>
                  <th>Quantity Unit</th>
                  <th>Purchaser Name</th>
                  <th>Purchaser Email</th>
                  <th>Approval</th>
                  <th>Delete</th>
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
                    if(item.approval == undefined){
                        item.approval = false;
                    }
                    return <tr data-key = {JSON.stringify(item.order_id)} key = { index }>
                      <td>{item.order_id}</td>
                      {/* <td>{item.item_code}</td> */}
                      <td> {item.item_name}</td>
                      <td> {item.total_price_in_rs}</td>
                      {/* <td> {item.receipt_ID}</td> */}
                      <td> {item.quantity}</td>
                      <td> {item.quantity_unit}</td>
                      <td> {item.purchaser_name}</td>
                      <td> {item.purchaser_email}</td>
                      <td> <CustBut approval={item.approval} element={this} /> </td>
                      <td><button onClick={e=>{this.onDelete(e)}}><span className="material-symbols-outlined">delete</span></button></td>
                    </tr>
                  })
                }
                </tbody>
              </table>
          </div>
      );
  }
}

//module.exports = App;
export default App;