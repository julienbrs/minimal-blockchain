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
    <Box>
      <Heading color="yellow.500">Your wallet</Heading>
      <Input
        borderRadius={"10px"}
        borderColor={"yellow.500"}
        backgroundColor={"yellow.100"}
        placeholder="Enter your username"
        size="xs"
        value={user}
        _placeholder={{ color: "black", fontSize: "1.1em", fontWeight: "bold" }}
        onChange={handleSelect}
        py={"2vh"}
        my={"1vh"}
      />
      <Text color={"yellow.500"}>Balance: {balance}</Text>
    </Box>
  );
}

export default Wallet;
