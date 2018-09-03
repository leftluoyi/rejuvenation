var Authorization = artifacts.require("./Authorization.sol");
var Register = artifacts.require("./Register.sol");
var Record = artifacts.require("./Record.sol");


module.exports = function(deployer, network, accounts) {
    deployer.deploy(Authorization);
    deployer.deploy(Register, "Dr Who", 0);
};
