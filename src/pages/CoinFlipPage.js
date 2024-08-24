import React, { useState } from 'react';
import Web3 from 'web3';
import CoinFlipABI from '../CoinFlipABI.json'; // ABI from the compiled contract

function CoinFlipPage() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [side, setSide] = useState('heads');
  const [status, setStatus] = useState('');

  // Connect to Ethereum
  async function connectWallet() {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3Instance.eth.getAccounts();
      setWeb3(web3Instance);
      setAccount(accounts[0]);

      const networkId = await web3Instance.eth.net.getId();
      const networkData = CoinFlipABI.networks[networkId];
      if (networkData) {
        const contractInstance = new web3Instance.eth.Contract(CoinFlipABI.abi, networkData.address);
        setContract(contractInstance);
      }
    } else {
      alert('Please install MetaMask!');
    }
  }

  // Flip the coin
  async function flipCoin() {
    if (contract) {
      try {
        setStatus('Flipping...');
        const result = await contract.methods.flip(side === 'heads').send({ from: account, value: web3.utils.toWei('0.01', 'ether') });
        if (result) {
          setStatus('You won!');
        } else {
          setStatus('You lost!');
        }
      } catch (error) {
        setStatus('Error!');
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="text-center p-6">
        <h1 className="text-4xl font-bold mb-6">Coin Flip Game</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-400 transition" onClick={connectWallet}>
          Connect Wallet
        </button>
        <div className="flex mt-6">
          <button
            className={`py-2 px-4 rounded-md mx-2 transition ${side === 'heads' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}
            onClick={() => setSide('heads')}
          >
            Heads
          </button>
          <button
            className={`py-2 px-4 rounded-md mx-2 transition ${side === 'tails' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}
            onClick={() => setSide('tails')}
          >
            Tails
          </button>
        </div>
        <button
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-400 transition"
          onClick={flipCoin}
        >
          Flip Coin
        </button>
        <p className="mt-6 text-xl">{status}</p>
      </header>
    </div>
  );
}

export default CoinFlipPage;
