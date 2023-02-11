const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privKey = toHex(secp.utils.randomPrivateKey());
console.log("Private key = ", privKey);

const fullPubKey = secp.getPublicKey(privKey);
const address = toHex(fullPubKey).slice(-20);
console.log("Address = ", address);
