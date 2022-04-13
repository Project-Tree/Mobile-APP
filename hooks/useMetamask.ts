import { Contract, providers } from 'ethers/lib/index';
import { useEffect, useState } from 'react';
import contractAddress from '../contracts/contract-address.json';
import TokenArtifact from '../contracts/TREToken.json';

const useMetamask = (): [providers.Web3Provider?, string?, Contract?] => {
  const [provider, setProvider] = useState<providers.Web3Provider>();
  const [metamaskAccount, setMetamaskAccount] = useState<string>();
  const [treContract, setTREContract] = useState<Contract>();

  useEffect(() => {
    const getEthereumAccount = async () => {
      const [selectedAccount] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setMetamaskAccount(selectedAccount);
    };
    const getProvider = (): providers.Web3Provider => {
      const _provider = new providers.Web3Provider(window.ethereum);
      setProvider(_provider);

      return _provider;
    };
    const getAllContract = (provider: providers.Web3Provider) => {
      const _tre = new Contract(
        contractAddress.TREToken,
        TokenArtifact.abi,
        provider.getSigner(0)
      );
      setTREContract(_tre);
    };
    window.ethereum.on('accountsChanged', ([newAddress]: [string]) => {
      setMetamaskAccount(newAddress);
    });

    getEthereumAccount();
    const _provider = getProvider();
    getAllContract(_provider);
  }, []);

  return [provider, metamaskAccount, treContract]
}

export default useMetamask;