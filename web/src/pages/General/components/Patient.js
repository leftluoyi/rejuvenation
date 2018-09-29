import React, { Component } from 'react';
import { Card, Button, Input, List } from 'antd';
import Blank from '@/components/Blank';

const InputGroup = Input.Group;

class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: 'Lily',
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

  render() {
    const { demo } = this.props;

    const mySeriesList = demo.seriesList.map(e => (
      <div>
        <List
          key={e.address}
          header={
            <div>
              <b>{`${e.name} - ${e.address}`}</b>
            </div>
          }
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
