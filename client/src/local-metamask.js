import * as secp from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { hexToBytes, toHex } from "ethereum-cryptography/utils.js";

/* Local Metamask to not give private key directly in front-end or server */

const ACCOUNTS = new Map([
  [
    "alice",

    {
      privatekey:
        "a5e248607d841cea049668261e7d1e8c1a5ac2f033dd61d3282e1a932899abf4",
      public: "0x92c18278ef31d0c69cb2",
    },
  ],
  [
    "bob",
    {
      privatekey:
        "23356e1f460c2b44937ad0278112025784c2a4a0bb69a278f084204bf50f3d70",
      public: "0xd245057209a70c478a4f",
    },
  ],
  [
    "max",
    {
      privatekey:
        "ce0cd0e82eaa317e4c1576e8e22104f0c804a64e80c081143b3995df5a6cb40e",
      public: "0x57a4d9a23dc0e1c11e9a",
    },
  ],
]);

const USERS = Array.from(ACCOUNTS.keys());

const getAddress = (username) => {
  if (!username) return null;
  const privKey = ACCOUNTS.get(username).privatekey;
  const fullPubKey = secp.getPublicKey(privKey);
  return "0x" + toHex(fullPubKey).slice(-20);
};

const getPublicKey = (username) => {
  const privKey = ACCOUNTS.get(username).privatekey;
  return toHex(secp.getPublicKey(privKey));
};

const getPrivateKey = (username) => {
  return ACCOUNTS.get(username).privatekey;
};

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const sign = async (username, message) => {
  const privKey = getPrivateKey(username);
  const messageHash = hashMessage(message);
  [signature, recoveryBit] = await secp.sign(messageHash, privKey, {
    recovered: true,
  });

  const fullSignature = new Uint8Array(recoveryBit, ...signature);
  return toHex(fullSignature);
};

// console.log("Address of Alice is: ", getAddress("alice"));
// console.log("Address of Bob is: ", getAddress("bob"));
// console.log("Address of Max is: ", getAddress("max"));

// console.log("Public key of Bob is: ", getPublicKey("bob"));

const wallet = {
  USERS,
  getAddress,
  getPublicKey,
  sign,
};
export default wallet;
