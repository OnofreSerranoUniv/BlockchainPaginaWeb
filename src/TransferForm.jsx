import { useState } from "react";

export function TransferForm({ contract, account }) {
  const [to, setTo] = useState("");
  const [id, setId] = useState(1);
  const [amount, setAmount] = useState(1);

  async function handleTransfer() {
    const tx = await contract.safeTransferFrom(account, to, id, amount, "0x");
    await tx.wait();
    alert("Transfer OK!");
    window.location.reload();
  }

  return (
    <div>
      <h3>Transferir TravelPass</h3>
      <label>Destinatario: <input value={to} onChange={e => setTo(e.target.value)} /></label>
      <label>ID: <input type="number" value={id} onChange={e => setId(+e.target.value)} /></label>
      <label>Cantidad: <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} /></label>
      <button onClick={handleTransfer} disabled={!contract}>Transferir</button>
    </div>
  );
}
