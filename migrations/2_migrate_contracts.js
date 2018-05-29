var Authorization = artifacts.require("./Authorization.sol");

module.exports = function(deployer) {
  deployer.deploy(Authorization);
};
