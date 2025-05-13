import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function ConnectWallet({ onConnect }) {
  const [account, setAccount] = useState(null);

  async function connect() {
    if (!window.ethereum) return alert("Instala MetaMask");
    const [selected] = await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAccount(selected);
    onConnect({ provider, signer, account: selected });
  }

  // Efecto para auto-conectar si MetaMask ya está desbloqueado
  useEffect(() => {
    (async () => {
      const selected = window.ethereum?.selectedAddress;
      if (selected) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(selected);
        onConnect({ provider, signer, account: selected });
      }
    })();
  }, [onConnect]);

  return (
    <div>
      {account 
        ? <p>Conectado: {account}</p>
        : <button onClick={connect}>Conectar MetaMask</button>
      }
    </div>
  );
}
