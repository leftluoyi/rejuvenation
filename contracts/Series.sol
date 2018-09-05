pragma solidity ^0.4.24;

import './Register.sol';
import './Record.sol';

contract Series {
    address public owner;
    address public provider;
    address public record;
    string private sql;

    constructor(address ownerAddr, string query) public {
        Register(ownerAddr).addMySeries();
        owner = ownerAddr;
        sql = query;
    }

    function getSql() public view returns (string) {
        return sql;
    }

    function addRecord() public {
        record = msg.sender;
    }
}