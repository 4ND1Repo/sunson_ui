import React, { Component } from 'react';
import { Container } from "reactstrap";
import FormComponent from './FormComponent';
import ListComponent from './ListComponent';

export default class AppComponent extends Component {
    state = {
        nama: "",
        alamat: "",
        status: 0,
        checked: true,
        postId: 0,
        loading: true,
        data: []
    };

    constructor(props){
        super(props);

        this.loadDatas = this.loadDatas.bind(this);
        this.loadDatas();
    }
      
    updateState = function(state){
        this.setState(state);
        // console.log(state);
        // console.log(this);
    }

    getState = function(){
        return this.state;
    }

    loadDatas = function(){
        let st = this;
    
        this.setState({loading: true});
    
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/people/', requestOptions)
          .then(response => response.json())
          .then(data => st.setState({data: data, loading: false}));
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
