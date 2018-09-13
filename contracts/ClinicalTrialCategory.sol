pragma solidity ^0.4.23;

contract ClinicalTrialCategory {
    mapping (address => bool) trials;
    string public name;
    
    constructor(string mname) public {
        name = mname;
    }
    
    function addTrial() {
        trials[msg.sender] = true;
    }
}