# EventSphere

This is an innovative ticket booking platform with on-chain attestation done on scroll sepolia network. Built using MessageKit readily available on Convere app. It simplifies ticket booking while ensuring security and transparency with blockchain attestation technology. 


**https://scroll-sepolia.blockscout.com/address/0xD3FE5664a46Ac11d17454C5cba0b6a1De04fdc35?tab=contract**


Backend:
XMTP Bot: 
XMTP Bot API: https://ethglobal-bangkok-production.up.railway.app/
ee1ef5b4ce080aa9ecb3ad8c92115e971910f4ed1e84459b9bbfb12a543f6b9a


# Swift Yield



<br />

![swiftyield](https://github.com/user-attachments/assets/ee3aad79-58d1-4789-9bdc-874bcac50185)

🧪 Swift Yield is an advanced Flash Loan Arbitrage bot that harnesses the power of flash loans from Balancer to perform arbitrage trading across various decentralized exchanges (DEXs) on **Base Mainnet**

Currently, Three Decentralised Exchanges are integrated 

- ✅ **[Uniswap V2](https://app.uniswap.org/?chain=base)**: Factory Contract Address,	V2Router02 Contract Address can be found **[here](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/v2-deployments)**
  
- 🧱 **[Sushiswap V2](https://www.sushi.com/swap)**: Factory Contract Address, V2Router02 Contract Address can be found **[here](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/v2-deployments)**
  
- 🧱 **[Pankcake Swap V2](https://pancakeswap.finance/info/v2)**: Factory Contract Address, V2Router02 Contract Address can be found **[here](https://docs.pancakeswap.finance/developers/smart-contracts/pancakeswap-exchange/v2-contracts)**

Based on Uniswap V2 Code/Smart Contracts there are 643 Forked Protocols. So we can integrate hundreds of DEX into this bot.

The Flash Loan Smart Contract is deployed on **Tenderly's Base Mainnet Virtual Testnet**. 

You can access the **Public Explorer** from here [https://dashboard.tenderly.co/explorer/vnet/753ba0a6-023a-4c8d-b3e4-60f03d6dc4b7/transactions?kind=standard]

<br />

![tenderly explorer](https://github.com/user-attachments/assets/6e1553e4-ec51-4238-85bb-da554580e8ab)

<br />

**Scroll SDK Rollup**

<br />

<img width="994" alt="Screenshot 2024-11-17 at 8 20 59 AM" src="https://github.com/user-attachments/assets/460b7e03-6e03-4579-9977-8955c2be3e9c">

<br />

# Rollup Explorer

# Track the status of blocks and transactions as they are committed and finalized.

<br />

<img width="962" alt="Screenshot 2024-11-17 at 8 01 45 AM" src="https://github.com/user-attachments/assets/ddea576c-7c25-4bae-b94f-88b942ddf134">

<br />

<br />

**Blockscout Explorer to view L2 Rollup Transactions**

<img width="960" alt="Screenshot 2024-11-17 at 8 06 11 AM" src="https://github.com/user-attachments/assets/e62b7206-8886-4689-8f0f-7f44bc4c7eb5">

<br />

**Smart Contract to provide movie data was deployed on L2 Rollup**

<img width="959" alt="Screenshot 2024-11-17 at 8 05 11 AM" src="https://github.com/user-attachments/assets/9c1016a4-9741-456e-8200-f3cb18bb47a2">

<br />
<img width="859" alt="Screenshot 2024-11-17 at 8 05 29 AM" src="https://github.com/user-attachments/assets/3c252e4f-1326-44e5-913d-09c336a02f29">
<img width="955" alt="Screenshot 2024-11-17 at 8 04 37 AM" src="https://github.com/user-attachments/assets/c9be68f1-6651-42b5-b7b5-c1957018cbac">

## For Testing the app 

1. Visit https://swiftyield.vercel.app/ and click on start arbitrage, verify yourself with World ID, then deploy the contract.
   
2. After the contract is deployed copy the contract address.
   
3. Clone this repo and run

```
yarn install
```

4. Then Run the bot by running this command
   
```
yarn bot 
```

You can use npm instead of yarn

You can then check the transaction here [https://dashboard.tenderly.co/explorer/vnet/753ba0a6-023a-4c8d-b3e4-60f03d6dc4b7/transactions?kind=standard]

**Note:** Some Transactions may fail because of the gas fees issue, we are optimizing the contract code

<br />

## For Setting up Dev Environment 

⚙️ This application is built using **Scaffold Eth 2**.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

To get started with Swift Yield Development, follow the steps below:

1. Install Tenderly CLI

```
curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-macos.sh | sh
```

2.  Then login (create an account first)

```
tenderly login
```

3. Clone this repo & install dependencies

```
git clone https://github.com/SudeepGowda55/SwiftYield.git
cd SwiftYield
yarn install
```

4. To deploy the contract to tenderly:

Create packages/tenderly/.env

```
# https://docs.tenderly.co/account/projects/account-project-slug
TENDERLY_ACCOUNT_ID=
TENDERLY_PROJECT_ID=

# https://docs.tenderly.co/account/projects/how-to-generate-api-access-token
TENDERLY_ACCESS_TOKEN=
```

Create packages/hardhat/.env

```
ALCHEMY_API_KEY= # leave empty
# DEPLOYER_PRIVATE_KEY=
ETHERSCAN_API_KEY= # leave empty

# https://docs.tenderly.co/account/projects/account-project-slug
TENDERLY_ACCOUNT_ID=
TENDERLY_PROJECT_ID=
# https://docs.tenderly.co/account/projects/how-to-generate-api-access-token
TENDERLY_ACCESS_TOKEN=
TENDERLY_AUTOMATIC_VERIFICATIONS=true
```

Create a staging environment

Note: use different environment name (test-1) every time

```
cd packages/tenderly
yarn stage:new test-1 8453
yarn stage:activate test-1
yarn stage:connect:hardhat
yarn stage:connect:nextjs
```

Now deploy the contract by running

```
cd packages/hardhat
yarn deploy --network virtual_mainnet
```
Now the contract will be deployed

5. To start NextJS app:

```
cd packages/nextjs
yarn dev
```

Visit the app on: `http://localhost:3000`. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

6. Now to interact with the bot and perform Flash Loan Arbitrage

```
cd packages/bot
node arbitrageBot.js
```
