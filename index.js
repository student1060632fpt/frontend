// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FungibleToken, NFTMarketplace, veFungibleToken, VotingContract, FaucetContract } from './near-interface';

import { Wallet } from './near-wallet';
import { store } from './redux/store';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.FT_CONTRACT_ID });

const ftContractId = new FungibleToken({contractId: "partie-test2.thanhdevtest.testnet", wallet});

const stakingContractId = new veFungibleToken({contractId: "staking-test12.thanhdevtest.testnet", wallet});

const votingContractId = new VotingContract({contractId: "voting-test8.thanhdevtest.testnet", wallet});

const faucetContractId = new FaucetContract({contractId: "faucet-test1.thanhdevtest.testnet", wallet});

const nftMarketplace = new NFTMarketplace({contractId: "bkhcm.vbidev.testnet", wallet});


const contract_id = new Map();
contract_id.set("ftContractId",ftContractId);
contract_id.set("stakingContractId",stakingContractId);
contract_id.set("nftMarketplace",nftMarketplace);
contract_id.set("votingContractId",votingContractId);
contract_id.set("faucetContractId",faucetContractId);
// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
 
  ReactDOM.render(
   <Provider store={store}>
    <BrowserRouter>
      <App isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />
    </BrowserRouter>
   </Provider>,
    document.getElementById('root')
  );
}