# ONLOAN: DECENTRALIZED PEER-TO-PEER LENDING APP

## OVERVIEW
OnLoan is a decentralized P2P lending platform using USDT for stable lending/borrowing, with ETH for fees/collateral. Features include credit scoring, loan types, pool lending, and auto-liquidation.

## PROBLEMS
Existing problems in P2P lending:
- Volatile repayment value: Price drops can trigger liquidation even if users are fundamentally solvent. Most lending relies on volatile assets as collateral. 
- Over-collateralization: Users lock up to 200% of loan value in collateral. Limits exclude creditworthy borrowers without large holdings.
- No credit system: Most platforms use only on-chain behaviour (wallet activity) as a weak proxy for creditworthiness. There's no support for undercollateralized or reputation-based loans.
- Fragmented liquidity: P2P matching limits liquidity and causes inefficiency. It leads to long matching times, low utilisation, poor capital efficicency.
- Slow liquidation: Slow or delayed liquidation leads to bad debt during market crashes. Many platforms rely on bots or third-party artbitrage to liquidate positions.
- High gas: ETH's gas fees can be prohibitive, especially for small loans or frequesnt interactions.
  
## SOLUTIONS
Solutions OnLoan will provide:
- Stablecoin lending with USDT: Stable currency reduces repayment uncertainty for borrowers and protects lender capital from volatility.
- Credit scoring, undercollateralized loans: Allow users to leverage ETH holdings without selling, which maintain long ETH exposure while accessing USDT liquidity.
- On/off-chain credit scoring: Both on-chain data (wallet history, past repayments) and off-chain data (via oracles or identity providers) rewards responsible borrowers, broadens user base.
- Pool based lending: Pool based lending where lenders deposit USDT into pools and borrowers borrow from it enabling instant access, higher untilisation, passive income for lenders. The loan structure will include tailored options for both high- and -low-cap users.
- Auto-liquidation system: Smart contracts based on real time oracle prices and pre-set thresholds prevent losses during crashes, prevents bad debt, improves trust in the system.
- Dual token economy for fees and rewards: The optionally introduced native governance or rewards incentivizes participation and governance control.

## FEATURES
- User roles: Lender/Borrower
- Credit scoring based on repayments
- Loan types: Personal, Home, Business, Auto
- Pool lending with APY 
- Dashboard for tracking
- Secure smart contracts with OpenZeppelin

## USAGE GUIDE
- Connect wallet on home page.
- Lenders: Deposit USDT to pool via dashboard.
- Borrowers: Select amount/type, provide collateral.
- Track in dashboard.

## FIGMA

## TWITTER HANDLE

## LIVE LINK

## CONTRACT ADDRESS

## PITCH DECK

## DEMO VIDEO
