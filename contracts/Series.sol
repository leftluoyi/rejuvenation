pragma solidity ^0.4.24;

import './Register.sol';

contract Series {
    struct Record {
        string featureName;
        string featureValue;
        uint256 datetime;
        string sql;
    }
    
    string public name;
    address public owner;
    address public provider;
    string private sql;
    Record[] public records;

    constructor(address ownerAddr, string mname, address mprovider, string query) public {
        Register(ownerAddr).addMySeries();
        name = mname;
        owner = ownerAddr;
        provider = mprovider;
        sql = query;
    }

    function getSql() public view returns (string) {
        return sql;
    }

    function addRecord(string featureName, string featureValue, uint256 datetime, string msql) public {
        Record memory record = Record(featureName, featureValue, datetime, msql);
        records.push(record);
    }
}