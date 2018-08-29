var Authorization = artifacts.require("./Authorization.sol");
var Register = artifacts.require("./Register.sol");

module.exports = function(deployer) {
  deployer.deploy(Authorization);
  deployer.deploy(Register);
};
