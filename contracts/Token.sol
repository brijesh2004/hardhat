// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address => uint) balances;
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
    // transfer the tokens
    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    // checking the balances

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}
