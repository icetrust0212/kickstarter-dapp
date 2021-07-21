// SPDX-License-Identifier: MIT
pragma solidity ^0.4.26;

contract CampainFactory {
    address[] public deployedCampaigns;
     
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDisplayedCampaign() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recepient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    modifier restrictedMinimum() {
        require(msg.value >= minimumContribution);
        _;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    address public manager;
    mapping(address => bool) public approvers;
    uint public minimumContribution;
    Request[] public requests;
    uint public approversCount;
    
    constructor(uint minimum, address creator) public payable {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public restrictedMinimum payable {
        approvers[msg.sender] = true;
        approversCount ++;
    }
    
    function createRequest(string description, uint value, address recepient, bool complete) 
        public {
             Request memory  newRequest = Request({
                description:description,
                value: value,
                recepient: recepient, 
                complete: complete,
                approvalCount: 0
            });
            
            requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount ++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        request.complete = true;
        request.recepient.transfer(request.value);
    }

    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns(uint) {
        return requests.length;
    }
    
}
