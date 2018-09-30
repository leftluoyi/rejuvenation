import React, { Component } from 'react';
import { Card, Button, Input, List, Col, Row, Select } from 'antd';
import Blank from '@/components/Blank';

const { Option } = Select;
const InputGroup = Input.Group;

class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: 'Lily',
      target: undefined,
    };
  }

  handlePatientNameChange = e => {
    this.setState({ patientName: e.target.value });
  };

  handlePatientRegister = () => {
    this.props.dispatch({
      type: 'demo/register',
      payload: { name: this.state.patientName, category: 0 },
    });
  };

  handleTargetChange = e => {
    this.setState({ target: e });
  };

  handleAuthorize = series => {
    this.props.dispatch({
      type: 'demo/authorize',
      payload: { source: series, target: this.state.target },
    });
  };

  render() {
    const { demo } = this.props;

    const doctorOption = demo.doctorList.map(e => (
      <Option value={e.entity.address}>{e.name}</Option>
    ));

    const mySeriesList = demo.seriesList.map(e => (
      <div key={e.address}>
        <List
          // key={e.address}
          header={
            <Row>
              <Col span={8}>
                <b>{`${e.name}`}</b>
              </Col>
              <Col span={16}>
                <InputGroup compact size="small">
                  <Select size="small" style={{ width: '70%' }} onChange={this.handleTargetChange}>
                    {doctorOption}
                  </Select>
                  <Button
                    style={{ width: '30%' }}
                    type="primary"
                    size="small"
                    onClick={() => this.handleAuthorize(e.address)}
                  >
                    Authorize
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          }
          footer={<b>{`${e.address}`}</b>}
          bordered
          dataSource={e.records.map(ele => ele.sql)}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        <Blank height={10} />
      </div>
    ));

    return (
      <Card
        // eslint-disable-next-line
        title={'I am a patient ' + (demo.patient ? ' - ' + demo.patient.address : '')}
        style={{ width: '100%' }}
      >
        <h4>Register</h4>
        <InputGroup compact>
          <Input
            addonBefore="Entity Name"
            style={{ width: '80%' }}
            defaultValue={this.state.patientName}
            onChange={this.handlePatientNameChange}
          />
          <Button style={{ width: '20%' }} type="primary" onClick={this.handlePatientRegister}>
            Submit
          </Button>
        </InputGroup>
        <Blank height={20} />
        <h4>My Series List</h4>
        {mySeriesList}
      </Card>
    );
  }
}

export default Patient;
