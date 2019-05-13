import React, {Component} from 'react'
import './Home.css'

class Home extends Component{

    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <hr />
                <h1>To-Do List Application</h1>
                <hr />
                <h2>What you can do here ?</h2>
                <h3>You can create a list, show  and delete list.</h3>
                <h3>Add a list to item. You can delete item or show list item and add dependency a list item.</h3>
                <h3>You can filter and order your list items.</h3>
                <h3>Of course login and register.</h3>
            </div>
        );
    }
}

export default Home;
