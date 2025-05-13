import { useState } from "react";
import { ConnectWallet } from "./ConnectWallet";
import { useContract } from "./useContract";
import { MintForm } from "./MintForm";
import { TransferForm } from "./TransferForm";
import { Gallery } from "./Gallery";

export default function App() {
  const [ctx, setCtx] = useState({});
  const contract = useContract(ctx.signer);

  return (
    <div className="app">
      <header className="header">
        <h1>TravelPass DApp</h1>
        <ConnectWallet onConnect={setCtx} />
      </header>

      {ctx.account && (
        <main className="main">
          <section className="gallery-section">
            <h2>Mis TravelPasses</h2>
            <Gallery {...ctx} contract={contract} />
          </section>

          <section className="forms-section">
            <div className="form-card">
              <h2>Mint TravelPass</h2>
              <MintForm {...ctx} contract={contract} />
            </div>
            <div className="form-card">
              <h2>Transferir TravelPass</h2>
              <TransferForm {...ctx} contract={contract} />
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
