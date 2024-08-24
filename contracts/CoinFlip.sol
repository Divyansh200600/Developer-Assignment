// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;
    uint public flipCost = 0.01 ether; // cost to flip

    constructor() {
        owner = msg.sender;
    }

    function flip(bool _side) public payable returns (bool) {
        require(msg.value == flipCost, "Incorrect Ether sent");

        bool result = (block.timestamp % 2 == 0); // pseudo-random coin flip
        if (result == _side) {
            payable(msg.sender).transfer(flipCost * 2);
            return true;
        }
        return false;
    }
}
