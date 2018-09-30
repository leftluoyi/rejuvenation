import { Register, Series, accounts } from '../../../global';

const getMySeriesList = async regaddress => {
  const seriesList = [];
  const register = Register.at(regaddress);
  const seriesLength = (await register.getMySeriesCount()).toNumber();
  for (let i = 0; i < seriesLength; i += 1) {
    const address = await register.getMySeries(i);
    const series = await Series.at(address);
    const name = await series.name();
    const recordCount = (await series.getRecordCount()).toNumber();
    const tmpRecord = [];
    for (let j = 0; j < recordCount; j += 1) {
      tmpRecord.push({ sql: await series.getRecord(j) });
    }
    seriesList.push({ address, name, records: tmpRecord });
  }
  return seriesList;
};

const getAuthorizedSeriesList = async regaddress => {
  const seriesList = [];
  const register = Register.at(regaddress);
  const seriesLength = (await register.getAuthorizedSeriesCount()).toNumber();
  for (let i = 0; i < seriesLength; i += 1) {
    const address = await register.getAuthorizedSeries(i);
    const series = await Series.at(address);
    const name = await series.name();
    const recordCount = (await series.getRecordCount()).toNumber();
    const tmpRecord = [];
    for (let j = 0; j < recordCount; j += 1) {
      tmpRecord.push({ sql: await series.getRecord(j) });
    }
    seriesList.push({ address, name, records: tmpRecord });
  }
  return seriesList;
};

export default {
  namespace: 'demo',

  state: {
    patient: undefined,
    patientName: undefined,
    seriesList: [],
    doctorList: [],
    doctor: undefined,
    docAuthorizedList: [],
    externalDoctor: undefined,
    externalDocAuthorizedList: [],
  },

  effects: {
    *register({ payload }, { put }) {
      // let entity;
      const entity = yield Register.new(payload.name, payload.category, {
        from: accounts[0],
        gas: 1000000,
      });
      if (payload.category === 0) {
        yield put({ type: 'setPatient', payload: entity });
        const patientname = yield entity.getName();
        yield put({ type: 'setPatientName', payload: patientname });
      } else if (payload.category === 1) {
        yield put({ type: 'setDoctor', payload: entity });
        const name = yield entity.getName();
        yield put({ type: 'addToDoctorList', payload: { entity, name } });
      } else if (payload.category === 1.1) {
        yield put({ type: 'setExternalDoctor', payload: entity });
        const name = yield entity.getName();
        yield put({ type: 'addToDoctorList', payload: { entity, name } });
      }
    },
    *authorize({ payload }, { put }) {
      const series = yield Series.at(payload.source);
      yield series.authorizeTo(payload.target, { from: accounts[0] });
      yield put({ type: 'updateLists' });
    },
    *submitSeries({ payload }, { put, select }) {
      const patient = yield select(state => state.demo.patient);
      const doctor = yield select(state => state.demo.doctor);
      yield Series.new(patient.address, payload, doctor.address, '', {
        from: accounts[1],
        gas: 1000000,
      });
      yield put({ type: 'updateLists' });
    },
    *submitExternalSeries({ payload }, { put, select }) {
      const patient = yield select(state => state.demo.patient);
      const doctor = yield select(state => state.demo.externalDoctor);
      yield Series.new(patient.address, payload, doctor.address, '', {
        from: accounts[1],
        gas: 1000000,
      });
      yield put({ type: 'updateLists' });
    },
    *submitRecord({ payload }, { put }) {
      yield Series.at(payload.series).addRecord(payload.query, { from: accounts[1] });
      yield put({ type: 'updateLists' });
    },
    *updateLists(_, { put }) {
      yield put({ type: 'updateSeriesList' });
      yield put({ type: 'updateDocAuthorizedList' });
      yield put({ type: 'updateExternalDocAuthorizedList' });
    },
    *updateSeriesList(_, { put, select }) {
      const patient = yield select(state => state.demo.patient);
      const seriesList = yield getMySeriesList(patient.address);
      yield put({ type: 'setSeriesList', payload: seriesList });
    },
    *updateDocAuthorizedList(_, { put, select }) {
      const doctor = yield select(state => state.demo.doctor);
      if (doctor) {
        const seriesList = yield getAuthorizedSeriesList(doctor.address);
        yield put({ type: 'setDocAuthorizedList', payload: seriesList });
      }
    },
    *updateExternalDocAuthorizedList(_, { put, select }) {
      const doctor = yield select(state => state.demo.externalDoctor);
      if (doctor) {
        const seriesList = yield getAuthorizedSeriesList(doctor.address);
        yield put({ type: 'setExternalDocAuthorizedList', payload: seriesList });
      }
    },
  },

  reducers: {
    setPatient(state, { payload }) {
      return {
        ...state,
        patient: payload,
      };
    },
    setPatientName(state, { payload }) {
      return {
        ...state,
        patientName: payload,
      };
    },
    setSeriesList(state, { payload }) {
      return {
        ...state,
        seriesList: payload,
      };
    },
    addToDoctorList(state, { payload }) {
      return {
        ...state,
        doctorList: [...state.doctorList, payload],
      };
    },
    setDoctor(state, { payload }) {
      return {
        ...state,
        doctor: payload,
      };
    },
    setDocAuthorizedList(state, { payload }) {
      return {
        ...state,
        docAuthorizedList: payload,
      };
    },
    setExternalDoctor(state, { payload }) {
      return {
        ...state,
        externalDoctor: payload,
      };
    },
    setExternalDocAuthorizedList(state, { payload }) {
      return {
        ...state,
        externalDocAuthorizedList: payload,
      };
    },
  },
};
