import React, {Component} from 'react'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom';

class ItemDependency extends Component{

    constructor({match}){

        super();

        this.state = {
            list_id: match.params.list_id,
            item_id: match.params.item_id
        }
    }

    render(){
        
        return(
            <h1>selam</h1>
        );
    }
}

export default ItemDependency