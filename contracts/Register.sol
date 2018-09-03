pragma solidity ^0.4.24;

import "./Record.sol";

contract Register {
    enum Categories {Doctor, Patient, Research, General}
    address public entity;
    string private name;
    Categories private category;
    
    // define the confidence level
    mapping (address => uint8) private recordList;

    event AddRecord(address sender);
    event AuthorizeRecord(address _patient, address _doctor, uint8 level);

    constructor(string entityname, Categories mcategory) public {
        entity = msg.sender;
        name = entityname;
        category = mcategory;
    }

    // make sure it is doctor
    function addRecord() public payable {
        emit AddRecord(msg.sender);
        recordList[msg.sender] = 2;
    }

    function getName() public view returns (string) {
        return name;
    }

    // make sure it is from the owner
    function authorize(uint8 level, address recordAddr) public returns (bool success) {
        Record record;
        record = Record(recordAddr);
        if(record.owner() == msg.sender) {
            recordList[msg.sender] = level;
            emit AuthorizeRecord(msg.sender, entity, level);
            return true;
        } else {
            return false;
        }
    }

    function queryAuthority(address record) public view returns (uint8 authorizeType) {
        return recordList[record];
    }
}