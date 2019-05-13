import React, {Component} from 'react'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom';

class ItemDependency extends Component{

    constructor({match}){

        super();

        this.state = {
            dependencies: [],
            toDoItems: [],
            list_id: match.params.list_id,
            item_id: match.params.item_id
        }
        
        this.addDependency = this.addDependency.bind(this);
        this.deleteDependency = this.deleteDependency.bind(this);
        this.markItem = this.markItem.bind(this);
    }

    componentWillMount(){
        axios.post("http://localhost:8080/todolist/todoitem/showdependencies",{
            token: localStorage.getItem('token'),
            todo_item_id: this.state.item_id
        }).then((response) => {
            if(response.data.result){
                this.setState({
                    dependencies: response.data.not_dependent_items
                })
            }
            else{
                alert(response.data.message);
            }
        });

        axios.post("http://localhost:8080/todolist/todoitem/alldepencenciesitem",{
            token: localStorage.getItem('token'),
            todo_item_id: this.state.item_id
        }).then((response) => {
            if(response.data.result){
                this.setState({
                    toDoItems: response.data.toDoItems
                })
                document.getElementById("list_name").innerHTML = response.data.list_name;
            }
        })

    }

    deleteDependency(tobe_completed_id){
        axios.post("http://localhost:8080/todolist/todoitem/deletedependency",{ 
            token: localStorage.getItem('token'),
            still_waiting_id: this.state.item_id,
            tobe_completed_id: tobe_completed_id
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
        }).then((response) =>      {
            if (response.data.result) {
                window.location.reload();   
            }
            else alert(response.data.message);
        });
      }

    addDependency(item_id){
        
        axios.post("http://localhost:8080/todolist/todoitem/adddependency",{
            token: localStorage.getItem('token'),
            still_waiting_id: this.state.item_id,
            to_to_completed_id: item_id
        }).then((response) => {

            if(response.data.result){
                window.location.reload();
            }
            else{
                alert(response.data.message);
            }
        });
    }


    render(){
        
        let dependencies = this.state.dependencies.map((dependency) => {
            return(
              <tr>
                <td>{dependency.id}</td>
                <td>{dependency.name}</td>
                <td>{dependency.description}</td>
                <td>{dependency.created_date}</td>
                <td>{dependency.updated_date}</td>
                <td>{dependency.deadline}</td>
                <td>{dependency.status_id == 1 ?  <label style={{color: 'green'}}>Completed</label> : <label style={{color: 'red'}}>Not Completed</label>}</td>
                <td>
                    <button className="btn btn-success" onClick={() => this.addDependency(dependency.id)}>Add Dependency</button>
                </td>
              </tr>
            );
          });

          let toDoItems = this.state.toDoItems.map((toDoItem) => {
            return(
              <tr>
                <td>{toDoItem.id}</td>
                <td>{toDoItem.name}</td>
                <td>{toDoItem.description}</td>
                <td>{toDoItem.created_date}</td>
                <td>{toDoItem.updated_date}</td>
                <td>{toDoItem.deadline}</td>
                <td>{toDoItem.status_id == 1 ?  <label style={{color: 'green'}}>Completed</label> : <label style={{color: 'red'}}>Not Completed</label>}</td>
                <td>
                            
                    <button className="btn btn-success" onClick={() => this.markItem(toDoItem.id)}>
                        <i class="far fa-check-square"></i>
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => this.deleteDependency(toDoItem.id)}>
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
                <hr />
                    <h3>Item's can be added dependency items </h3>
                <hr/>
                <div className="row">
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
                            {dependencies}
                        </tbody>
                    </table>
                </div>
                <hr />
                    <h3>Item's dependency items </h3>
                <hr/>
                <div className="row">
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
                            {toDoItems}
                        </tbody>
                    </table>
                </div>
                <br/><br/>
            </div>
          );
    }
}

export default ItemDependency