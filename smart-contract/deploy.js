const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();


const provider = new HDWalletProvider(
    process.env.mnemonic,
    process.env.link,
);

const web3 = new Web3(provider);
const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Available accounts:', accounts);
        
        // Check account balance before deploying
        const balance = await web3.eth.getBalance(accounts[0]);
        console.log(`Account balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        
        if (balance === '0') {
            console.error('ERROR: Your account has no ETH. Please fund it using a faucet.');
            return;
        }
        
        console.log('Attempting to deploy from account:', accounts[0]);
        
        const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
            .deploy({ data: '0x' + compiledFactory.bytecode })
            .send({ 
                from: accounts[0],
                gas: 3000000,
                chainId: 17000 // Lower gas price
            });
        
        console.log('Contract deployed to:', result.options.address);
    } catch (error) {
        console.error('Deployment failed:', error.message);
    }
};

console.log(provider)
deploy();