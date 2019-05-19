import React, {Component} from 'react'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom';

class ToDoItem extends Component{

    constructor({match}){
        super();

        this.state = {
            lists: [],
            name: '',
            description: '',
            deadline: '', 
            filter_name: '',
            status_id: '',
            list_id: match.params.id
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.markItem = this.markItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.filterItem = this.filterItem.bind(this);
        this.orderItem = this.orderItem.bind(this);

    }

    // work
    componentWillMount(){
      axios.post("http://localhost:8080/todolist/todoitem/listoftodoitem/",{
        token: localStorage.getItem('token'),
        list_id: this.state.list_id
      }).
      then((response) => {
        if(response.data.result){
          document.getElementById("list_name").innerHTML = response.data.list_name;
          this.setState({
            lists: response.data.todoitems
          })

        }
      });
    }
    
    // work
    deleteItem(item_id){
      axios.post("http://localhost:8080/todolist/todoitem/deleteitem",{
        token: localStorage.getItem('token'),
        id: item_id
      }).then((response) => {
        if(response.data.result){
          window.location.reload();
        }
        else{
          alert(response.data.message);
        }
      })
    }

    // work
    markItem(item_id){
      
      axios.post("http://localhost:8080/todolist/todoitem/markcompleted",{
        token: localStorage.getItem('token'),
        todo_item_id: item_id
      }).then((response) => {
        if (response.data.result) {
          window.location.reload();   
      }
      else alert(response.data.message);
      });
    }

    // work
    createItem(){
      if(this.state.name && this.state.deadline){
        axios.post("http://localhost:8080/todolist/addtodoitem",{
          token: localStorage.getItem('token'),
          list_id: this.state.list_id,
          name: this.state.name,
          description: this.state.description,
          deadline: this.state.deadline
        }).then((response) => {
          if(!response.data.result){
            alert(response.data.message);
          }
          else{
            window.location.reload();
          }
        })
      }
      else{
        alert("We need the all item property!");
      }
    }

    // work
    onChange(e){
      this.setState({[e.target.name]:e.target.value});
    }

    // work
    filterItem(){
      if(this.state.status_id != 0){
        axios.post('http://localhost:8080/todolist/todoitem/filteritem',{
          token: localStorage.getItem('token'),
          name: this.state.filter_name,
          status_id: this.state.status_id,
          list_id: this.state.list_id
        }).then((response) => {
          if(response.data.result){
            this.setState({
              lists: response.data.toDoItems
            });
  
          }
        });
      }
      else{
        alert("Please select the status.");
      }
      
    }

    orderItem(){
      var index = document.getElementById("order_item").selectedIndex;
      var order_items = document.getElementById("order_item").options;
      alert(order_items[index].value + " " + order_items[index].id);
      
      axios.post("http://localhost:8080/todolist/todoitem/orderitem",{
        token: localStorage.getItem('token'),
        list_id: this.state.list_id,
        column_name: order_items[index].value,
        order_type: order_items[index].id
      }).then((response) => {
        if(response.data.result){
          this.setState({
            lists: response.data.toDoItems
          });
        }
        else{
          alert(response.data.message);
        }
      });
    }

    render(){
      var date =  new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate()+1;
      var current_date = y + "-" + (m < 10 ? "0"+m : m) + "-" + (d < 10 ? "0"+d : d); 
      
      let lists = this.state.lists.map((list) => {
        return(
          <tr>
            <td>{list.id}</td>
            <td>{list.name}</td>
            <td>{list.description}</td>
            <td>{list.created_date}</td>
            <td>{list.updated_date}</td>
            <td>{list.deadline}</td>
            <td>{list.status_id == 1 ?  <label style={{color: 'green'}}>Completed</label> : <label style={{color: 'red'}}>Not Completed</label>}</td>
            <td>
              <Link className="btn btn-primary" to={'/todolist/'+list.list_id + '/' + list.id}>
                Dependencies
              </Link>
              &nbsp;
              <button className="btn btn-success" onClick={() => this.markItem(list.id)}>
                <i class="far fa-check-square"></i>
              </button>
              &nbsp;
              <button className="btn btn-danger" onClick={() => this.deleteItem(list.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        );
      });

      if(!localStorage.getItem('token')){
        return (<Redirect to={'/'}/>)
      }

      return(
        <div className="container-fluid">
          <h2 id="list_name"></h2>
          <h5>Create new item.</h5>
          <hr/>
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <input type="text" id="name" name="name" onChange={this.onChange} className="form-control" placeholder="Name"/>
            </div>
            <div className="col-md-5 col-lg-5">
              <input type="text" id="description" name="description" onChange={this.onChange} className="form-control" placeholder="Description"/>
            </div>
            <div className="col-md-2 col-lg-2">
              <input type="date" id="deadline" name="deadline" min={current_date} onChange={this.onChange} className="form-control" />
            </div>
            <div class="col-md-2 col-lg-2">
              <input type="button" className="btn btn-success" value="Add a list item" onClick={this.createItem}/>
            </div>
          </div>
          <hr/>
          <br/><br/>
          <hr />
          <div className="row">
          
            <div class="col-md-1 col-lg-1">
              <h5>Filter Item</h5>
            </div>
            <div className="col-md-5 col-lg-5">
              <input type="text" name="filter_name" onChange={this.onChange} className="form-control" placeholder="Name"/>
            </div>
            <div className="col-md-2 col-lg-2">
              <select className="form-control" name="status_id" onChange={this.onChange}>
                <option selected disabled>Select status.</option>
                <option value="1">Completed</option>
                <option value="2">Not completed</option>
              </select>
            </div>
            <div class="col-md-1 col-lg-1">
              <input type="button" className="btn btn-success" value="Filter Item" onClick={this.filterItem}/>
            </div>

            <div class="col-md-1 col-lg-1">
              <h5>Order Item</h5>
            </div>

            <div className="col-md-2 col-lg-2">
              <select className="form-control" id="order_item" onChange={this.orderItem}>
                <option selected disabled>Select order type.</option>
                <option value="created_date" id="asc" >Create Date ( Asc )</option>
                <option value="created_date" id="desc" >Create Date ( Desc )</option>
                <option value="deadline" id="asc" >Deadline ( Asc )</option>
                <option value="deadline" id="desc" >Deadline ( Desc )</option>
                <option value="name" id="asc" >Name ( Asc ) </option>
                <option value="name" id="desc" >Name ( Desc ) </option>
                <option value="status_id" id="asc" > Status ( Asc ) </option>
                <option value="status_id" id="desc" > Status ( Desc ) </option>
              </select>
            </div>

            

          </div>

          <hr/>
          <br/>
         
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>List Name</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="table_items">
              {lists}
            </tbody>
          </table>
        </div>
      );
    }
}

export default ToDoItem;
