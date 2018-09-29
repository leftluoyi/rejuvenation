import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Blank from '@/components/Blank';
import Doctor from './components/Doctor';
import ExternalDoctor from './components/ExternalDoctor';
import Patient from './components/Patient';

@connect(({ demo }) => ({
  demo,
}))
class Demo extends Component {
  render() {
    return (
      <GridContent>
        <Row gutter={24} style={{ marginBottom: '40px' }}>
          <Col span={12}>
            <Patient dispatch={this.props.dispatch} demo={this.props.demo} />
          </Col>
          <Col span={12}>
            <Doctor
              dispatch={this.props.dispatch}
              patient={this.props.demo.patient}
              patientName={this.props.demo.patientName}
              doctor={this.props.demo.doctor}
              seriesList={this.props.demo.docAuthorizedList}
            />
            <Blank height={20} />
            <ExternalDoctor
              dispatch={this.props.dispatch}
              patient={this.props.demo.patient}
              patientName={this.props.demo.patientName}
              doctor={this.props.demo.externalDoctor}
              seriesList={this.props.demo.externalDocAuthorizedList}
            />
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Demo;
