pragma solidity ^0.4.24;

import './Register.sol';

contract Series {
    struct Record {
        string sql;
    }
    
    string public name;
    address public owner;
    address public provider;
    string private sql;
    Record[] private records;

    constructor(address ownerAddr, string mname, address mprovider, string query) public {
        Register(ownerAddr).addMySeries();
        Register(mprovider).addAuthorizedSeries();
        name = mname;
        owner = ownerAddr;
        provider = mprovider;
        sql = query;
    }

    function getSql() public view returns (string) {
        return sql;
    }

    function addRecord(string msql) public {
        Record memory record = Record(msql);
        records.push(record);
    }
    
    function getRecordCount() public view returns (uint) {
        return records.length;
    }
    
    function getRecord(uint index) public view returns (string) {
        return records[index].sql;
    }
}