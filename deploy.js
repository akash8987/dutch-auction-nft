const hre = require("hardhat");

async function main() {
  const [seller, buyer] = await hre.ethers.getSigners();

  // 1. Deploy NFT
  const MockNFT = await hre.ethers.getContractFactory("MockNFT");
  const nft = await MockNFT.deploy();
  await nft.waitForDeployment();
  console.log(`NFT deployed to: ${nft.target}`);

  // 2. Mint NFT #0 to Seller
  await nft.mint();
  console.log("Seller minted NFT #0");

  // 3. Deploy Auction
  // Start at 1000 Wei, discount 1 Wei per second
  const startPrice = 1000000;
  const discountRate = 1;
  
  const DutchAuction = await hre.ethers.getContractFactory("DutchAuction");
  const auction = await DutchAuction.deploy(
    startPrice,
    discountRate,
    nft.target,
    0
  );
  await auction.waitForDeployment();
  console.log(`Dutch Auction deployed to: ${auction.target}`);

  // 4. Approve Auction to spend NFT
  await nft.approve(auction.target, 0);
  console.log("Seller approved Auction contract");

  // 5. Check Price
  const currentPrice = await auction.getPrice();
  console.log(`Current Price: ${currentPrice.toString()} wei`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
