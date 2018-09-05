pragma solidity ^0.4.24;

import "./Series.sol";

contract Register {
    enum Categories {Doctor, Patient, Research, Drug, Insurance, Government, General}
    
    address public entity;
    string private name;
    Categories private category;
    mapping (address => bool) private authorizedSeries;
    mapping (address => bool) private mySeries;
    address private subscribedCT;

    constructor(string entityname, Categories mcategory) public {
        entity = msg.sender;
        name = entityname;
        category = mcategory;
    }

    // make sure it is validated
    function addMySeries() public payable {
        mySeries[msg.sender] = true;
    }

    // make sure it is validated
    function addAuthorizedSeries() public payable {
        mySeries[msg.sender] = true;
    }

    function getName() public view returns (string) {
        return name;
    }

    // make sure it is from the owner
    function authorize(address seriesAddr) public returns (bool) {
        Series series;
        series = Series(seriesAddr);
        if(series.owner() == msg.sender) {
            authorizedSeries[msg.sender] = true;
            return true;
        } else {
            return false;
        }
    }

    function unauthorize(address seriesAddr) public returns (bool) {
        Series series;
        series = Series(seriesAddr);
        if(series.owner() == msg.sender) {
            delete authorizedSeries[msg.sender];
            return true;
        } else {
            return false;
        }
    }

    function queryAuthority(address series) public view returns (bool) {
        return authorizedSeries[series];
    }
}