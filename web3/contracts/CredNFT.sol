// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CredNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    mapping(address => bool) public hasNFT;

    event NFTMinted(address recipient, uint256 tokenId, string tokenURI);

    constructor() ERC721("CredentialNFT", "CRED") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        require(!hasNFT[recipient], "User already has an NFT");

        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        hasNFT[recipient] = true;

        emit NFTMinted(recipient, newTokenId, tokenURI);
    }
}
