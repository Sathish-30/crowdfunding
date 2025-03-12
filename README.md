Crowdfunding Platform Powered by Ethereum Blockchain

## Problem Statement and Necessity 
Crowdfunding is one of the most popular ways to raise funds for any project, cause or for helping any individual in need. With the onset of Covid we have seen a rise in Crowdfunding activities across the globe which includes small campaigns to help people get oxygen and medical help to large funds such as PM Cares.

The major problems with the Current Crowdfunding Platforms that we wanted to solve were : 
- Security : As the funds become larger, they need to be heavily secure, although stringent measures such as symmetric encryption are in place to make e-payment safe and secure,it is still vulnerable to hacking. Blockchain — which has never been compromised yet — can provide that level of security.
- Transparency and Anti-Fraud  : We have seen, and continue to see a lot of crowdfunding scams happening around. There is no way to see where the funds are being used. We wanted to make the entire flow of funds transparent at every stage, so that there is no possibility of the money being misused.
- Global contribution : With some of the platforms being country specific, it becomes hard for people from other countries to contribute to various campaigns. Using blockchain anyone in the world can contribute to the campaign. Transactions are quick and convenient.

We were highly inspired by the CryptoRelief initiative ([www.cryptorelief.in](https://www.cryptorelief.in))  which raised ~1 billion dollars for Covid Relief in India from the entire global community, in a highly transparent manner. 

## Tech Stack 
- Next JS
- Chakra UI
- Solidity
- Web3.js

## To run the application locally
- run `yarn install` to install all the dependencies
- run `yarn dev` to run the application locally


## To Deploy your own Contract 
1. Create an account in alchemy
2. Create .env file in Ethereum directory and add these line to it.
	> mnemonic = 'Your mnemonic code' <br>
	link = 'Your infura end point link '
3. Do the Changes that you want to do inside the Solidity File
4. Compile the Contract 
  `node compile.js`
5. Deploy Contract by going into smart-contract Directory and run.
	`node deploy.js`
	
   Copy the contract deploy address and replace it in factory.js file.
  
  
6. Replace your "alchemy link" in web3.js file

