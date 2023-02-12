import server from "./server";
import wallet from "./local-metamask";
import { Box, Heading, Input, Text } from "@chakra-ui/react";

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
    <Box padding={"3%"}>
      <Heading>Your wallet</Heading>
      <Input
        placeholder="Enter your username"
        size="xs"
        value={user}
        onChange={handleSelect}
      />
      <Text>Balance: {balance}</Text>
    </Box>
  );
}

export default Wallet;
