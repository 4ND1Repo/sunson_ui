import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Table,
} from "reactstrap";

export default class ListComponent extends Component {

  constructor(props){
    super(props);

    this.editButton = this.editButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  editButton = function(event){
    let index = event.target.dataset.id,
      datas = this.props.data.data[index];
      console.log(datas);
    datas['checked'] = (datas.status == 1?true:false);
    datas['postId'] = datas.id;
    this.props.updateState(datas);
  }

  deleteButton = function(event){
    let index = event.target.dataset.id,
      datas = this.props.data.data[index],
      id = datas.id,
      st = this;

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:8000/api/people/'+id+'/', requestOptions)
      // .then(response => response.json())
      .then((data) => {
        st.props.loadDatas();
      });
  }

  render() {
    return (
      <Row>
        <Col sm={12} lg={12} xl={12} className="text-right">
          <Button outline color="warning" onClick={this.props.loadDatas.bind(this)}>Refresh</Button>
        </Col>
        <Col>
          <Table dark>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!this.props.data.loading?this.props.data.data.map((data,index) => {
                const { id, nama, alamat, status } = data;
                return (
                  <tr>
                    <td>{id}</td>
                    <td>{nama}</td>
                    <td>{alamat}</td>
                    <td>{status==1?"Aktif":"Tidak Aktif"}</td>
                    <td>
                        <Button outline color="info" onClick={this.editButton} data-id={index}>Edit</Button>{' '}
                        <Button outline color="danger" onClick={this.deleteButton} data-id={index}>Delete</Button>
                    </td>
                  </tr>
                );
              }):<tr><td colSpan='5'>Loading...</td></tr>}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}
