pragma solidity ^0.4.18;

contract DogeFactory {

    event NewDoge(uint dogeId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Doge {
        string name;
        uint dna;
    }

    Doge[] public doges;

    mapping (uint => address) public dogeToOwner;
    mapping (address => uint) ownerDogeCount;

    function _createDoge(string _name, uint _dna) internal {
        uint id = doges.push(Doge(_name, _dna)) - 1;
        dogeToOwner[id] = msg.sender;
        ownerDogeCount[msg.sender]++;
        NewDoge(id, _name, _dna);
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomDoge(string _name) public {
        require(ownerDogeCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createDoge(_name, randDna);
    }

}
