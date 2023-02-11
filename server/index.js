const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const crypto = require("./crypto.js");

app.use(cors());
app.use(express.json());

const balances = new Map([
  ["92c18278ef31d0c69cb2", 100], // bob
  ["d245057209a70c478a4f", 50], // alice
  ["57a4d9a23dc0e1c11e9a", 75], // charles
]);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances.get(address) || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const pubKey = crypto.signatureToPubKey(message, signature);
  const sender = crypto.pubKeyToAddress(pubKey);
  console.log("sender = ", sender);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances.get(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(sender, balances.get(sender) - amount);
    balances.set(recipient, balances.get(recipient) + amount);
    res.send({ balance: balances.get(sender) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
