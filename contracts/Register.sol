pragma solidity ^0.4.23;

contract Register {
	address public doctor;
	mapping (address => bool) private authorizationList;
	uint public numAuthorized;

	// modifier onlyOwner {
	// 	require(
	// 		msg.sender == organizer,
	// 		"Only organizer can call this function."
	// 	)
	// }

	event Authorize(address _patient, address _doctor);
	event Unauthorize(address _patient, address _doctor);

	constructor() public {
		doctor = msg.sender;
		numAuthorized = 0;
	}

	function authorize() public returns (bool success) {
		authorizationList[msg.sender] = true;
		numAuthorized++;
		emit Authorize(msg.sender, doctor);
		return true;
	}

	function unauthorize() public {
		if(authorizationList[msg.sender]) {
			authorizationList[msg.sender] = false;
			numAuthorized--;
			emit Unauthorize(msg.sender, doctor);
		}
	}

	function queryAuthority(address patient) public constant returns (bool authorized) {
		return authorizationList[patient];
	}
}