import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";

export default class FormComponent extends Component {
  state = {
    nama: "",
    alamat: "",
    status: 0,
    checked: true,
    postId: 0
  }

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = function(event){
    this.setState({[event.target.name]:event.target.value});
    console.log(event.target.name);
  }

  handleChangeCheck = function(){
    this.setState({checked:!this.state.checked});
    this.setState({status:!this.state.checked?1:0});
  }

  submitForm = function(event){
    const data = this.state;
    delete data.checked;
    delete data.postId;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:8000/api/people/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  }

  render() {
    return (
      <Form>
        <Row>
          <Col sm={6} lg={6} xl={6}>
            <FormGroup row>
              <Label for="nama" sm={2}>
                Nama
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="nama"
                  placeholder="Nama Penuh"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6} lg={6} xl={6}>
            <FormGroup row>
              <Label for="alamat" sm={2}>
                Alamat
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="alamat"
                  placeholder="Alamat"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6} lg={6} xl={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox2" value="1" checked={this.state.checked} onChange={this.handleChangeCheck} defaultChecked={this.defaultChecked}/>{' '}
                Status
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <Button outline color="primary" onClick={this.submitForm}>Simpan</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
