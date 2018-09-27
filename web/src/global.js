import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import RegisterABI from './assets/contracts/Register.json';
import SeriesABI from './assets/contracts/Series.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const { accounts } = web3.eth;
const Register = TruffleContract(RegisterABI);
Register.setProvider(web3.currentProvider);
const Series = TruffleContract(SeriesABI);
Series.setProvider(web3.currentProvider);

export { accounts, Register, Series };
