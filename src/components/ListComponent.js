import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

export default class ListComponent extends Component {
  state = {
    data: [],
    loading: true
  }

  constructor(props){
    super(props);

    this.loadData.bind(this);
    this.loadData();
  }

  loadData = function(event){
    let st = this;
    this.setState({loading: true});

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:8000/api/people/', requestOptions)
      .then(response => response.json())
      .then((data) =>{
        st.setState({data: data, loading: false});
      });
      // .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <Row>
        <Col sm={12} lg={12} xl={12} className="text-right">
          <Button outline color="warning" onClick={this.loadData.bind(this)}>Refresh</Button>
        </Col>
        <Col>
          <ul>
            {!this.state.loading?this.state.data.map(data => {
              const { nama, alamat, status } = data;
              return (
                <li>{nama} : {alamat}</li>
              );
            }):<li>Loading...</li>}
          </ul>
        </Col>
      </Row>
    );
  }
}
