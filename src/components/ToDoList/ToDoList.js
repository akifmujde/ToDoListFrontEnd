import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import './ToDoList.css'

class ToDoList extends Component{

    constructor(){
        super();

        this.state = {
            lists: [],
            name: ''
        };

        this.showListItem = this.showListItem.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.createList = this.createList.bind(this);
    }

    componentWillMount(){

      axios.post("http://localhost:8080/todolist",{token: localStorage.getItem('token')}).then((response) => {
        if(response.data.result){
          this.setState({
            lists: response.data.lists
          })
        }
      });
    }

    showListItem(e){
      

      alert(e.target.id);
    }

    deleteList(e){
      if(window.confirm("Are you sure !")){
        axios.post("http://localhost:8080/todolist/deletelist",{
          token: localStorage.getItem('token'),
          list_id: e.target.id}
          ).then((response) => {
          alert(response.data.message);
          window.location.reload();
        })
      }
    }

    createList(){
      
      axios.post("http://localhost:8080/todolist/createlist",{
        token: localStorage.getItem('token'),
        name: this.state.name
      }).then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
    }

    onChange(e){
      this.setState({[e.target.name]:e.target.value});
    }

    render(){

      let lists = this.state.lists.map((list) => {
        return(
          <tr>
            <td>{list.id}</td>
            <td>{list.name}</td>
            <td>{list.created_date}</td>
            <td>{list.updated_date}</td>
            <td>
              <input type="button" className="btn btn-primary" id={list.id} value="List Detail" onClick={this.showListItem}/>
              &nbsp;&nbsp;&nbsp;
              <input type="button" className="btn btn-danger" id={list.id} value="Delete List!" onClick={this.deleteList}/>
            </td>
          </tr>
        );
      })

      if(!localStorage.getItem('token')){
        return (<Redirect to={'/'}/>)
      }

      return(
          <div className="container">
          <label>Create new list.</label>
            <div className="row">
              <div className="col-md-10 col-lg-10">
                <input type="text" id="name" name="name" onChange={this.onChange} className="form-control" />
              </div>
              <div class="col-md-2 col-lg-2">
                <input type="button" className="btn btn-success" value="Add a list." onClick={this.createList}/>
              </div>
            </div>
            <br/>
            <hr/>
            <br/>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>List Name</th>
                  <th>Created Date</th>
                  <th>Updated Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lists}
              </tbody>
            </table>
          </div>
      );
    }
}

export default ToDoList;
