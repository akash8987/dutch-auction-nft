# Dutch Auction for NFTs

This smart contract implements a Dutch Auction. Unlike English auctions (bid up), the price here starts high and drops by a fixed amount per second.

## Mechanism
1. **Seller** deploys the auction with a `startPrice` and `discountRate`.
2. **Price** = `startPrice - (discountRate * timeElapsed)`.
3. **Buyer** calls `buy()`. If they send enough ETH >= current price, they get the NFT instantly.
4. **Refund**: If the buyer sends more than the current price, the excess is refunded.

## Prerequisites
- Node.js
- Hardhat

## Setup
1. Install dependencies:
   ```bash
   npm install
