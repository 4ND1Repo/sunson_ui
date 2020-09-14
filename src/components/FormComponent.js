import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default class FormComponent extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.callbackSubmit = this.callbackSubmit.bind(this);
  }

  handleChange = function(event){
    this.props.updateState({[event.target.name]:event.target.value});
  }

  handleChangeCheck = function(event){
    console.log(event)
    this.props.updateState({
      status:event.target.checked, 
      checked:event.target.checked
    });
  }

  resetForm = function(event){
    let st = this;
    this.props.updateState({
      nama: "",
      alamat: "",
      status: false,
      checked: false,
      postId: 0,
      data: st.props.data.data,
      loading: false
    });
  }

  submitForm = function(event){
    let dtPost = this.props.data,
      st = this;
    let id = dtPost.postId || 0;
      
    dtPost.status = dtPost.status == 1?true:false;
    delete dtPost.checked;
    delete dtPost.postId;
    delete dtPost.loading;
    delete dtPost.data;
    if(id == "0"){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dtPost)
      };
      fetch('http://localhost:8000/api/people/', requestOptions)
        .then(response => response.json())
        .then(data => this.callbackSubmit(data));
    } else {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dtPost)
      };
      fetch('http://localhost:8000/api/people/'+id+'/', requestOptions)
        .then(response => response.json())
        .then(data => this.callbackSubmit(data));
    }
  }

  callbackSubmit = function(data){
    this.props.loadDatas();
  }

  render() {
    return (
      <Form>
        <Row>
          <Col sm={6}>
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
          <Col sm={6}>
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
          <Col sm={6} lg={6}>
            <FormGroup check>
              <Label check>
                <Input 
                  name="status"
                  type="checkbox"
                  value={this.props.data.status}
                  checked={this.props.data.status}
                  onChange={this.handleChangeCheck}
                />
                {' '}
                Status
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <Input type="hidden" name="postId" value={this.props.data.postId || 0} />
            <Button outline color="primary" onClick={this.submitForm}>Simpan</Button>
            <Button outline color="warning" onClick={this.resetForm}>Baru</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
