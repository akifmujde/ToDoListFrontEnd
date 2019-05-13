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
            list_id: match.params.id
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.markItem = this.markItem.bind(this);
        this.createItem = this.createItem.bind(this);

    }
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

    markItem(item_id){
      
      axios.post("http://localhost:8080/todolist/todoitem/markcompleted",{
        token: localStorage.getItem('token'),
        todo_item_id: item_id
      }).then((response) => {
        alert(response.data.message);
        window.location.reload();
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
          window.location.reload();
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


    render(){

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
        <label>Create new item.</label>
            <div className="row">
              <div className="col-md-3 col-lg-3">
                <input type="text" id="name" name="name" onChange={this.onChange} className="form-control" placeholder="Name"/>
              </div>
              <div className="col-md-5 col-lg-5">
                <input type="text" id="description" name="description" onChange={this.onChange} className="form-control" placeholder="Description"/>
              </div>
              <div className="col-md-2 col-lg-2">
                <input type="date" id="deadline" name="deadline" onChange={this.onChange} className="form-control"/>
              </div>
              <div class="col-md-2 col-lg-2">
                <input type="button" className="btn btn-success" value="Add a list item" onClick={this.createItem}/>
              </div>
            </div>
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
            <tbody>
              {lists}
            </tbody>
          </table>
        </div>
      );
    }
}

export default ToDoItem;
