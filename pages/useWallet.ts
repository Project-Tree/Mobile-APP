import detectEthereumProvider from '@metamask/detect-provider'
import { useState } from 'react';
import { useEffect } from 'react';
import { Contract, providers } from 'ethers/lib/index';
import contractAddress from '../contracts/contract-address.json';
import TokenArtifact from '../contracts/TREToken.json';

export default function useWallet (): [providers.Web3Provider, string, Contract] {  
  const [provider, setProvider] = useState<providers.Web3Provider>(null);
  const [metamaskAccount, setMetamaskAccount] = useState<string>();
  const [treContract, setTREContract] = useState<Contract>();

  useEffect(() => {
    async function getProvider() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _provider = await detectEthereumProvider() as any;
      if(provider) {
        setProvider(_provider)  
      }

      return _provider
    }
    async function getMetamaskAccount(provider) {
      const [selectedAccount] = await provider.request({method: 'eth_requestAccounts',});
      setMetamaskAccount(selectedAccount);
    }
    async function getAllContract(provider) {
      const _tre = new Contract(
        contractAddress.TREToken,
        TokenArtifact.abi,
        provider.getSigner(0)
      );
      setTREContract(_tre);
    }
    
    const provider = getProvider();
    getMetamaskAccount(provider);
    getAllContract(provider);

  }, [])

  return [provider, metamaskAccount, treContract]
}

