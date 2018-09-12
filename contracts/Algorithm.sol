pragma solidity ^0.4.24;

import './AlgorithmManager.sol';

contract Algorithm {
    string public target;
    string public performanceName;
    string public performanceValue;

    constructor(string mtarget, string mperformanceName, string mperformanceValue, address managerAddr) public {
        target = mtarget;
        performanceName = mperformanceName;
        performanceValue = mperformanceValue;
        AlgorithmManager(managerAddr).addAlgorithm();
    }
    
}