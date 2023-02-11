import server from "./server";
import wallet from "./local-metamask";

function Wallet({ user, setUser, balance, setBalance }) {
  async function handleSelect(evt) {
    const currentUser = evt.target.value;
    setUser(currentUser);
    if (currentUser) {
      const address = wallet.getAddress(currentUser);
      console.log("Address is : ", address);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      console.log("balance is : ", balance);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        User
        <input
          placeholder="Enter your user"
          value={user}
          onChange={handleSelect}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
