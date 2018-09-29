import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Button, Input, Select, List } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Blank from '@/components/Blank';

const InputGroup = Input.Group;
const { Option } = Select;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({ demo }) => ({
  demo,
}))
class Demo extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  state = {
    patientName: 'Lily',
    doctorName: 'Steve',
    seriesName: 'test',
    queryString: 'SELECT * From Record',
    selectedSeries: undefined,
  };

  componentDidMount() {}

  componentWillUnmount() {}

  handlePatientNameChange = e => {
    this.setState({ patientName: e.target.value });
  };

  handleDoctorNameChange = e => {
    this.setState({ doctorName: e.target.value });
  };

  handleSeriesNameChange = e => {
    this.setState({ seriesName: e.target.value });
  };

  handleQueryStringChange = e => {
    this.setState({ queryString: e.target.value });
  };

  handleSelectedSeriesChange = e => {
    this.setState({ selectedSeries: e });
  };

  handlePatientRegister = () => {
    this.dispatch({
      type: 'demo/register',
      payload: { name: this.state.patientName, category: 0 },
    });
  };

  handleDoctorRegister = () => {
    this.dispatch({ type: 'demo/register', payload: { name: this.state.doctorName, category: 1 } });
  };

  handleAddSeries = () => {
    this.dispatch({ type: 'demo/submitSeries', payload: this.state.seriesName });
  };

  handleAddRecord = () => {
    this.dispatch({
      type: 'demo/submitRecord',
      payload: { query: this.state.queryString, series: this.state.selectedSeries },
    });
  };

  render() {
    const { demo } = this.props;

    let optionsPatient;
    let optionValue;
    if (demo.patient) {
      optionValue = demo.patient.address;
      optionsPatient = <Option value={optionValue}>{demo.patientName}</Option>;
    }

    const optionSeries = demo.seriesList.map(e => (
      <Option key={e.address} value={e.address}>
        {e.name}
      </Option>
    ));

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
      <GridContent>
        <Row gutter={24} style={{ marginBottom: '40px' }}>
          <Col span={12}>
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
                <Button
                  style={{ width: '20%' }}
                  type="primary"
                  onClick={this.handlePatientRegister}
                >
                  Submit
                </Button>
              </InputGroup>
              <Blank height={20} />
              <h4>My Series List</h4>
              {mySeriesList}
            </Card>
          </Col>
          <Col span={12}>
            <Card
              // eslint-disable-next-line
              title={'I am a doctor ' + (demo.doctor ? ' - ' + demo.doctor.address : '')}
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
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Demo;
