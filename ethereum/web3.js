import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //we are in web browser
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we are on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/250c76c1b5864e7dace102de41e09e4e"
  );
  web3 = new Web3(provider);
}

export default web3;