pragma solidity ^0.4.18;

import "./DogeFactory.sol";

contract DogeInterface {
  function getDoge(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
  );
}

contract DogeBreeding is DogeFactory {

  address dogeAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
  DogeInterface dogeContract = DogeInterface(dogeAddress);

  function breedAndMultiply(uint _dogeId, uint _targetDna) public {
    require(msg.sender == dogeToOwner[_dogeId]);
    Doge storage myDoge = doges[_dogeId];
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myDoge.dna + _targetDna) / 2;
    _createDoge("NoName", newDna);
  }

}
