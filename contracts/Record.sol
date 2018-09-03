pragma solidity ^0.4.24;

import "./Register.sol";

contract Record {
    address public owner;
    address public provider;
    string private sql;

    constructor(address ownerAddr, address providerAddr, string query) public {
        Register(ownerAddr).addRecord();
        Register(providerAddr).addRecord();

        owner = ownerAddr;
        provider = providerAddr;
        sql = query;
    }
    
}