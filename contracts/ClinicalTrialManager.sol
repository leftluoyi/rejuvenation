pragma solidity ^0.4.23;

contract ClinicalTrialManager {
    mapping (address => bool) categories;
    
    function addCategory() public {
        categories[msg.sender] = true;
    }
}