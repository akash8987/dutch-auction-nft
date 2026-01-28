// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockNFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("Auction Item", "ITEM") {
        tokenCounter = 0;
    }

    function mint() public {
        _safeMint(msg.sender, tokenCounter);
        tokenCounter++;
    }
}
