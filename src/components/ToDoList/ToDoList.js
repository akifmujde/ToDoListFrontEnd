import React, {Component} from 'react'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom';

class ToDoList extends Component{

    constructor(){
        super();

        this.state = {
            lists: [],
            name: ''
        };
        
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

    deleteList(list_id){
      if(window.confirm("Are you sure !")){
        axios.post("http://localhost:8080/todolist/deletelist",{
          token: localStorage.getItem('token'),
          list_id: list_id}
          ).then((response) => {
          window.location.reload();
        })
      }
    }

    createList(){
      if(this.state.name){
        axios.post("http://localhost:8080/todolist/createlist",{
          token: localStorage.getItem('token'),
          name: this.state.name
        }).then((response) => {
          window.location.reload();
        })
      }
      else{
        alert("Name is null!");
      }
      
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
              <Link className="btn btn-primary" to={'/todolist/'+list.id} >List Items</Link>
              &nbsp;&nbsp;&nbsp;
              <input type="button" className="btn btn-danger" value="Delete" onClick={() =>this.deleteList(list.id)}/>
            </td>
          </tr>
        );
      })

      if(!localStorage.getItem('token')){
        return (<Redirect to={'/'}/>)
      }

      return(
          <div className="container">
          <h3>Create new list.</h3><br/>
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
