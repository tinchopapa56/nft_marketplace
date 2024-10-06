// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTStore is ERC721URIStorage {
    // uint public unlockTime;
    //address payable public owner;
    
    address payable public marketplaceOwner;
    uint256 public currentTokenId;
    uint256 private globalFeePercent = 20;
    uint256 private totalItemsSold;


    struct NFTitem {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
    }

    // Mapeo de tokenId a NftItem
    mapping(uint256 => NFTitem) private tokenIdToItem;

    modifier onlyOwner {
        require(msg.sender == marketplaceOwner, "Only owner can do this");
        _;
    }

    constructor() ERC721("NftStore", "NFTS"){
        marketplaceOwner = payable(msg.sender);
    }

    
    //GETTERS
    function getGlobalFeePercent() public view returns(uint256) {
        return globalFeePercent;
    }
    function getCurrentTokenId() public view returns(uint256) {
        return globalFeePercent;
    }
    function getNFTListing(uint256 _tokenId) public view returns(NFTitem memory) {
        return tokenIdToItem[_tokenId];
    }
    //raro que use storage y no memory
    function getAllListedNFTS() public view returns(NFTitem[] memory) {
        uint256 totalItemsCount = currentTokenId;
        NFTitem[] memory allListedNFTS = new NFTitem[](totalItemsCount);
        uint256 currentI = 0;

        for(uint256 i = 0; i < totalItemsCount; i++){
            uint256 tokenId = i + 1;

            NFTitem storage item = tokenIdToItem[tokenId];
            
            allListedNFTS[currentI] = item;
            currentI++;
        }

        return allListedNFTS;
    }
    //en vez de hace run loop entero = O(n); 
        //hacer un mapping de cada useraddress Y sus tokens
    function getMyNFTs() public view returns (NFTitem[] memory){
        uint256 totalItemsCount = currentTokenId;
        uint256 myNFTsCount = 0;
        uint256 currI = 0;

        for(uint256 i = 0; i < totalItemsCount; i++){
            bool isOwner = tokenIdToItem[i+1].owner == msg.sender;
            bool isSeller = tokenIdToItem[i+1].seller == msg.sender;
            
            if(isOwner || isSeller){
                myNFTsCount++;
            }
        }

        NFTitem[] memory myNFTs = new NFTitem[](myNFTsCount);
        for(uint256 i = 0; i < myNFTsCount; i++){
            bool isOwner = tokenIdToItem[i+1].owner == msg.sender;
            bool isSeller = tokenIdToItem[i+1].seller == msg.sender;
            
            if(isOwner || isSeller){
                uint256 tokenId = i + 1;

                NFTitem storage item = tokenIdToItem[tokenId];
                
                myNFTs[currI] = item;
                currI++;
            }
        }
        return myNFTs;
    }


    //Modify State
    function updateGlobalFeePercent(uint256 _newPercent) public onlyOwner{
        globalFeePercent = _newPercent;
    }
    function createToken(string memory _tokenURI, uint256 _price) public returns(uint256) {
        require(_price > 0, "Price must be greater than zero");

        currentTokenId++;
        uint256 newTokenID = currentTokenId;
        _safeMint(msg.sender, newTokenID);
        _setTokenURI(newTokenID, _tokenURI);

        _createNFTListing(newTokenID, _price);
        return newTokenID;
    }
    function _createNFTListing(uint256 _tokenId, uint256 _price) private {
        tokenIdToItem[_tokenId] = NFTitem({
            tokenId: _tokenId,
            owner: payable(msg.sender),
            seller: payable(msg.sender),
            price: _price
        });
    }
    //fees are handled wwird, might have to re check
    function executeSale(uint256 tokenId) public payable {
        NFTitem storage item = tokenIdToItem[tokenId];
        uint256 price = item.price;
        address payable seller = item.seller;
        //en realidad deberia ser price+fee

        require(msg.value == price, "You must match the listing price");

        item.seller = payable(msg.sender);
        totalItemsSold++;

        //pay
        uint256 fee = (price * globalFeePercent) / 100;
        marketplaceOwner.transfer(fee);
        seller.transfer(msg.value - fee);
        //receive NFT
        _transfer(item.owner, msg.sender, tokenId);

    }

    
}

/*

event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

*/