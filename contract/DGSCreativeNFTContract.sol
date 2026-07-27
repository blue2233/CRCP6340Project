// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

error DGSCreativeNFTContract__MaxSupplyReached();
error DGSCreativeNFTContract__ValueNotEqualPrice();
error DGSCreativeNFTContract__WrongAvenueForThisTransaction();
error DGSCreativeNFTContract__TransferFailed();

/// @custom:security-contact contact@nordak.io
contract DGSCreativeNFTContract is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    ERC721Royalty,
    Ownable,
    ReentrancyGuard
{
    uint256 private _tokenIdCounter;
    uint256 private immutable i_mint_price;
    uint256 private immutable i_max_tokens;
    string private s_base_uri;

    event MintingCompleted(uint256 tokenId, address owner);
    event FundsDistributed(address owner, uint256 amount);

    constructor(
        uint256 _mint_price,
        uint256 _max_tokens,
        string memory _base_uri,
        address _royaltyArtist,
        uint96 _royaltyBasis
    ) ERC721("DGSCreativeNFTContract", "DGS") Ownable(msg.sender) {
        i_mint_price = _mint_price;
        i_max_tokens = _max_tokens;
        s_base_uri = _base_uri;
        _setDefaultRoyalty(_royaltyArtist, _royaltyBasis);
    }

    receive() external payable {
        revert DGSCreativeNFTContract__WrongAvenueForThisTransaction();
    }

    fallback() external payable {
        revert DGSCreativeNFTContract__WrongAvenueForThisTransaction();
    }

    function mintTo(
        string calldata uri // ipfs url string
    ) public payable nonReentrant returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        // check our supply limits
        if (tokenId >= i_max_tokens) {
            revert DGSCreativeNFTContract__MaxSupplyReached();
        }
        // make sure there is the right amount of money
        if (msg.value != i_mint_price) {
            revert DGSCreativeNFTContract__ValueNotEqualPrice();
        }
        _tokenIdCounter++;
        uint256 newItemId = _tokenIdCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, uri);

        emit MintingCompleted(newItemId, msg.sender);
        _withdraw(address(this).balance);
        return newItemId;
    }

    function addFunds() external payable {}

    function withdraw() external onlyOwner nonReentrant {
        _withdraw(address(this).balance);
    }

    function getMaxSupply() public view returns (uint256) {
        return i_max_tokens;
    }

    function getMintPrice() public view returns (uint256) {
        return i_mint_price;
    }

    function getBaseURI() public view returns (string memory) {
        return s_base_uri;
    }

    function contractURI() public view returns (string memory) {
        return s_base_uri;
    }

    function setRoyalty(
        // called by platform to set royalty rates and artist payout address
        address _receiver,
        uint96 feeNumerator
    ) public onlyOwner {
        _setDefaultRoyalty(_receiver, feeNumerator);
    }

    function _baseURI() internal pure override returns (string memory) {
        return '';
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Royalty)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _withdraw(uint256 amount) private {
        if (amount == 0) {
            return;
        }

        address payable recipient = payable(owner());
        (bool success, ) = recipient.call{value: amount}("");
        if (!success) {
            revert DGSCreativeNFTContract__TransferFailed();
        }

        emit FundsDistributed(recipient, amount);
    }
}