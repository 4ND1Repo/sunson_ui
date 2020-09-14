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
    this.props.updateState({[event.target.name]:event.target.value});
  }

  handleChangeCheck = function(){
    this.props.updateState({checked:!this.props.data.checked});
    this.props.updateState({status:!this.props.data.checked?1:0});
  }

  submitForm = function(event){
    const data = this.props.data,
      id = data.postId,
      st = this;

    delete data.checked;
    delete data.postId;
    delete data.loading;
    delete data.data;
    console.log(id == "0");
    console.log(id == 0);
    if(id == "0"){

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      fetch('http://localhost:8000/api/people/', requestOptions)
        .then(response => response.json())
        .then((data) => {
          st.props.loadDatas();
        });
    } else {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      console.log(requestOptions);
      fetch('http://localhost:8000/api/people/'+id+'/', requestOptions)
        .then(response => response.json())
        .then((data) => {
          st.props.loadDatas();
        });
    }
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
                  value={this.props.data.nama}
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
                  value={this.props.data.alamat}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6} lg={6} xl={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox2" value="1" checked={this.props.data.checked} onChange={this.handleChangeCheck} defaultChecked={this.defaultChecked}/>{' '}
                Status
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <Input type="hidden" name="postId" value={this.props.data.postId} />
            <Button outline color="primary" onClick={this.submitForm}>Simpan</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
