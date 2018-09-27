import { Register, Series, accounts } from '../../../global';

export default {
  namespace: 'demo',

  state: {
    patient: undefined,
    patientName: undefined,
    doctor: undefined,
    seriesList: [],
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
      }
    },
    *submitSeries({ payload }, { put, select }) {
      const patient = yield select(state => state.demo.patient);
      const doctor = yield select(state => state.demo.doctor);
      yield Series.new(patient.address, payload, doctor.address, '', {
        from: accounts[1],
        gas: 1000000,
      });
      yield put({ type: 'updateSeriesList' });
    },
    *updateSeriesList(_, { put, select }) {
      const seriesList = [];
      const patient = yield select(state => state.demo.patient);
      const seriesLength = (yield patient.getMySeriesCount()).toNumber();
      for (let i = 0; i < seriesLength; i += 1) {
        const address = yield patient.getMySeries(i);
        const name = yield Series.at(address).name();
        seriesList.push({ address, name });
      }
      yield put({ type: 'setSeriesList', payload: seriesList });
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
    setDoctor(state, { payload }) {
      return {
        ...state,
        doctor: payload,
      };
    },
    setSeriesList(state, { payload }) {
      return {
        ...state,
        seriesList: payload,
      };
    },
  },
};
