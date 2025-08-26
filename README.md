# OnLoan: Onchain P2P Lending App

## Overview
OnLoan is a decentralized P2P lending platform using USDT for stable lending/borrowing, with ETH for fees/collateral. Features include credit scoring, loan types, pool lending, and auto-liquidation.

## Features
- User roles: Lender/Borrower
- Credit scoring based on repayments
- Loan types: Personal, Home, Business, Auto
- Pool lending with APY
- Dashboard for tracking
- Secure smart contracts with OpenZeppelin

## Setup Instructions
1. Clone repo: `git clone <repo>`
2. Contracts: `cd contracts && npm install`
3. Configure .env with PRIVATE_KEY
4. Deploy: `npx hardhat run scripts/deploy.js --network polygon`
5. Frontend: `cd ../frontend && npm install`
6. Update src/utils/web3.js with contract address/ABI
7. Run: `npm run dev`

## Deployment Guide
- Contracts: Use Hardhat to deploy to Polygon.
- Frontend: `npm run build`, deploy to hosting service.

## Usage Guide
- Connect wallet on home page.
- Lenders: Deposit USDT to pool via dashboard.
- Borrowers: Select amount/type, provide collateral.
- Track in dashboard.

## Smart Contract Details
- Address: [Deployed address]
- ABI: See contracts/artifacts

## Contribution Guidelines
Fork, PR with tests.