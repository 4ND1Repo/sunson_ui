import React, { Component } from 'react';
import { Container } from "reactstrap";
import FormComponent from './FormComponent';
import ListComponent from './ListComponent';

export default class AppComponent extends Component {
    state = {
        nama: "",
        alamat: "",
        status: false,
        checked: false,
        postId: 0,
        loading: true,
        data: []
    };

    constructor(props){
        super(props);

        this.loadDatas = this.loadDatas.bind(this);
        this.updateData = this.updateData.bind(this);
        this.loadDatas();
    }
      
    updateState = function(st){
        this.setState(st);
    }

    getState = function(){
        return this.state;
    }

    loadDatas = function(){
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/people/', requestOptions)
          .then(response => response.json())
          .then(data => this.updateData(data));
    }

    updateData = function(data){
        console.log(this);
        if(typeof this.context !== 'undefined'){
            this.setState({data: data, loading: false});
        }
    }

    render() {
        return (
            <Container>
                <FormComponent data={this.getState()} loadDatas={this.loadDatas} updateState={this.updateState.bind(this)}/>
                <ListComponent data={this.getState()} loadDatas={this.loadDatas} updateState={this.updateState.bind(this)}/>
            </Container>
        )
    }
}
