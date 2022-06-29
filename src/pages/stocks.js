const React = require('react');
const { Component } = require('react');
const { Link, Redirect } = require('react-router-dom');
const axios = require('axios');
require('./admin.css');
const ReactModal = require('react-modal');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list:[],
      
    };

  }

  componentDidMount(){
    axios.get('/api/stocks/list').then((res)=>{
      console.log(res.status)
      this.setState({
        list:res.data
      })
    })
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  onItemNameChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)
    axios.get(`/api/stocks/change/name?itemCode=${e.target.parentNode.parentNode.dataset.key}&itemName=${e.target.value}`)
  }

  onStocksChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)
    axios.get(`/api/stocks/change/stocks?itemCode=${e.target.parentNode.parentNode.dataset.key}&stocks=${e.target.value}`)

  }
  onStockUnitChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)
   

  }
  onItemTypeChange(e){
    //console.log(e.target.value)
    console.log(e.target.parentNode.parentNode.dataset.key)
    
  }

  onPricePerUnitChange(e){
      axios.get(`/api/stocks/change/ppu?itemCode=${e.target.parentNode.parentNode.dataset.key}&pricePerUnit=${e.target.value}`)
  }



  onDelete(e){
    console.log(e.target.parentNode.parentNode.parentNode.dataset.key)
    
    axios.get(`/api/stocks/delete?itemCode=${e.target.parentNode.parentNode.parentNode.dataset.key}`).then(()=>{
      window.location.assign("/admin/stocks");
    })
  }

  render() {
      let list = this.state.list;
      
      return (
          <div className="App">

            {/* <button onClick={this.handleOpenModal()} className="circle-div"><span className="material-symbols-outlined">
add
</span></button> */}
              <table cellSpacing={10}>
                <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Stocks</th>
                  <th>Stock Unit</th>
                  <th>Price Per Unit</th>
                  <th>Item Type</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                  list.map((item,index)=>{
                    return <tr data-key = {JSON.stringify(item.item_code)} key = { index }>
                      <td style={{textAlign:'center'}}>{item.item_code}</td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onItemNameChange(e)} defaultValue={item.item_name}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onStocksChange(e)} defaultValue={item.stocks}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onStockUnitChange(e)} defaultValue={item.stock_unit}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onPricePerUnitChange(e)} defaultValue={item.price_per_unit}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onItemTypeChange(e)} defaultValue={item.item_type}/></td>
                      <td><button onClick={e=>this.onDelete(e)}><span className="material-symbols-outlined">delete</span></button></td>
                    </tr>
                  })

                  
                }
               {/* <tr data-key = {JSON.stringify(item.item_code)} key = { index }>
                      <td style={{textAlign:'center'}}>{item.item_code}</td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onItemNameChange(e)} defaultValue={item.item_name}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onStocksChange(e)} defaultValue={item.stocks}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onStockUnitChange(e)} defaultValue={item.stock_unit}/></td>
                      <td style={{textAlign:'center'}}><input type="number" onChange={(e)=>this.onPricePerUnitChange(e)} defaultValue={item.price_per_unit}/></td>
                      <td style={{textAlign:'center'}}><input onChange={(e)=>this.onItemTypeChange(e)} defaultValue={item.item_type}/></td>
                      <td><button onClick={e=>this.onDelete(e)}><span className="material-symbols-outlined">delete</span></button></td>
                    </tr> */}
                </tbody>
              </table>
          </div>
      );
  }
}

module.exports = App;