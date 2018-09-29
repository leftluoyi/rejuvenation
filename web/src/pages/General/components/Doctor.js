import React, { Component } from 'react';
import { Card, Button, Input, Select, List } from 'antd';
import Blank from '@/components/Blank';

const InputGroup = Input.Group;
const { Option } = Select;

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorName: 'Steve',
      seriesName: 'test',
      queryString: 'SELECT * From Record',
      selectedSeries: undefined,
    };
  }

  handleDoctorNameChange = e => {
    this.setState({ doctorName: e.target.value });
  };

  handleDoctorRegister = () => {
    this.props.dispatch({
      type: 'demo/register',
      payload: { name: this.state.doctorName, category: 1 },
    });
  };

  handleSeriesNameChange = e => {
    this.setState({ seriesName: e.target.value });
  };

  handleAddSeries = () => {
    this.props.dispatch({ type: 'demo/submitSeries', payload: this.state.seriesName });
  };

  handleSelectedSeriesChange = e => {
    this.setState({ selectedSeries: e });
  };

  handleQueryStringChange = e => {
    this.setState({ queryString: e.target.value });
  };

  handleAddRecord = () => {
    this.props.dispatch({
      type: 'demo/submitRecord',
      payload: { query: this.state.queryString, series: this.state.selectedSeries },
    });
  };

  render() {
    const { patient, patientName, doctor, seriesList } = this.props;

    let optionsPatient;
    let optionValue;
    if (patient) {
      optionValue = patient.address;
      optionsPatient = <Option value={optionValue}>{patientName}</Option>;
    }

    const optionSeries = seriesList.map(e => (
      <Option key={e.address} value={e.address}>
        {e.name}
      </Option>
    ));

    const docAuthorizedList = seriesList.map(e => (
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
        title={'I am a doctor ' + (doctor ? ' - ' + doctor.address : '')}
        style={{ width: '100%' }}
      >
        <h4>Register</h4>
        <InputGroup compact>
          <Input
            addonBefore="Entity Name"
            style={{ width: '80%' }}
            defaultValue={this.state.doctorName}
            onChange={this.handleDoctorNameChange}
          />
          <Button style={{ width: '20%' }} type="primary" onClick={this.handleDoctorRegister}>
            Submit
          </Button>
        </InputGroup>

        <Blank height={20} />
        <h4>Add series to</h4>
        <Select style={{ width: '100%' }} value={optionValue}>
          {optionsPatient}
        </Select>
        <Blank height={10} />
        <InputGroup compact>
          <Input
            addonBefore="Series Name"
            style={{ width: '80%' }}
            defaultValue={this.state.seriesName}
            onChange={this.handleSeriesNameChange}
          />
          <Button style={{ width: '20%' }} type="primary" onClick={this.handleAddSeries}>
            Submit
          </Button>
        </InputGroup>

        <Blank height={20} />
        <h4>Add Record to</h4>
        <Select
          style={{ width: '100%' }}
          value={this.state.selectedSeries}
          onChange={this.handleSelectedSeriesChange}
        >
          {optionSeries}
        </Select>
        <Blank height={10} />
        <InputGroup compact>
          <Input
            addonBefore="Query String"
            style={{ width: '80%' }}
            defaultValue={this.state.queryString}
            onChange={this.handleQueryStringChange}
          />
          <Button style={{ width: '20%' }} type="primary" onClick={this.handleAddRecord}>
            Submit
          </Button>
        </InputGroup>

        <Blank height={20} />
        <h4>Series Authorized to Me</h4>
        {docAuthorizedList}
      </Card>
    );
  }
}

export default Doctor;
