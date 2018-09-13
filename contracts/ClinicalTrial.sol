pragma solidity ^0.4.23;

contract ClinicalTrial {
    string public info;
    string public addr;
    string public contact;
    address public publisher;
    
    constructor() public {
        publisher = msg.sender;
    }
    
    function addCategory(string minfo, string maddr, string mcontact) public {
        info = minfo;
        addr = maddr;
        contact = mcontact;
    }
}