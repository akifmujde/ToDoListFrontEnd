import React, {Component} from 'react'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom';

class ToDoItem extends Component{

    constructor({match}){
        super();

        this.state = {
            lists: [],
            name: '',
            list_id: match.params.id
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.showDependencies = this.showDependencies.bind(this);
        this.onChange = this.onChange.bind(this);
        this.createItem = this.createItem.bind(this);

    }
    componentWillMount(){

      axios.post("http://localhost:8080/todolist/todoitem/listoftodoitem/",{
        token: localStorage.getItem('token'),
        list_id: this.state.list_id
      }).then((response) => {
        if(response.data.result){
          document.getElementById("list_name").innerHTML = response.data.list_name;
          this.setState({
            lists: response.data.todoitems
          })
        }
      });
    }

    deleteItem(e){
      alert(e.target.id);
    }

    showDependencies(e){
      
      axios.post("http://localhost:8080/todolist/todoitem/showdependencies",{
        token: localStorage.getItem('token'),
        todo_item_id: e.target.id
      }).then((response) => {
        if(response.data.result){
          alert("route dependencies page");
        }
      })
    }

    createItem(){
      
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
            <td>{list.description}</td>
            <td>{list.created_date}</td>
            <td>{list.updated_date}</td>
            <td>{list.deadline}</td>
            <td>{list.status_id == 1 ?  'Completed' : 'Not Completed'}</td>
            <td>
              <Link className="btn btn-primary" to={'/todolist/'+list.list_id + '/' + list.id} >
                <i className="fas fa-eye"></i>
              </Link>
              &nbsp;
              <button className="btn btn-danger" id={list.id} value="Delete!" onClick={this.deleteItem}>
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
              <div className="col-md-10 col-lg-10">
                <input type="text" id="name" name="name" onChange={this.onChange} className="form-control" />
              </div>
              <div class="col-md-2 col-lg-2">
                <input type="button" className="btn btn-success" value="Add a list." onClick={this.createList}/>
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
