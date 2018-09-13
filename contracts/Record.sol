pragma solidity ^0.4.24;

import "./Register.sol";

contract Record {
    address public next;
    string public sql;
    
    constructor(string msql) public {
        sql = msql;
    }
    
    function addNext() public {
        next = msg.sender;
    }
    
}