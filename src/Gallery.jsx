import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function Gallery({ contract, provider, account }) {
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    if (!contract) return;
    async function load() {
      const ids = [1,2];
      const items = await Promise.all(ids.map(async id => {
        const uri = await contract.uri(id);
        const url = uri.replace("{id}", id.toString(16).padStart(64,"0"));
        const meta = await fetch(url).then(r=>r.json());
        const balance = await contract.balanceOf(account, id);
        return { id, meta, balance: balance.toString() };
      }));
      setPasses(items);
    }
    load();
  }, [contract, account]);

  // Dentro de Gallery.jsx
return (
  <div className="gallery">
    {passes.map(p => (
      <div className="gallery-item" key={p.id}>
        <img src={p.meta.image} alt={p.meta.name} />
        <p><strong>{p.meta.name}</strong></p>
        <p>Balance: {p.balance}</p>
      </div>
    ))}
  </div>
);
}
