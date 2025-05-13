import { useState } from "react";

export function MintForm({ contract, account }) {
  const [id, setId] = useState(1);
  const [amount, setAmount] = useState(1);

  async function handleMint() {
  console.log("MintForm.handleMint()", { contract, account, id, amount });
  try {
    const tx = await contract.mintPass(account, id, amount);
    console.log("Tx enviado:", tx);
    await tx.wait();
    console.log("Tx confirmada");
    alert("¡Mint OK!");
    window.location.reload();
  } catch (err) {
    console.error("Error en mintPass:", err);
    alert("Error: " + err.message);
  }
}

  return (
    <div>
      <h3>Mint TravelPass</h3>
      <label>ID: <input type="number" value={id} onChange={e => setId(+e.target.value)} /></label>
      <label>Cantidad: <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} /></label>
      <button onClick={handleMint} disabled={!contract}>Mint</button>
    </div>
  );
}
