pragma solidity ^0.4.24;


contract AlgorithmManager {
    mapping (address => bool) public algorithmList;

    constructor() public {
    }

    function addAlgorithm() public {
        algorithmList[msg.sender] = true;
    }
    
}