import { useState } from "react";
import server from "./server";
import wallet from "./local-metamask";
import { Box, Heading, Input, Text, Button  } from "@chakra-ui/react";

function Transfer({ user, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      amount: parseInt(sendAmount),
      recipient,
    };
    const signature = await wallet.sign(user, message);
    const transaction = {
      message,
      signature,
    };
    console.log("transaction = ", transaction);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);

      setBalance(balance);
      console.log("new balance = ", balance);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <Box py={"5vh"}>
      <form className="container transfer" onSubmit={transfer}>
        <Text color={"yellow.500"} fontWeight={"semibold"} >Transaction Info:</Text>

        <label>
          <Box display={"flex"} flexDirection={"row"} justifyItems={"center"} alignItems={"center"}>
          <Text color={"yellow.500"}  width={"50%"}>
          Send Amount
          </Text>
          <Input
            borderRadius={"10px"}
            borderColor={"yellow.500"}
            backgroundColor={"yellow.100"}
            placeholder="amount to send"
            size="xs"
            _placeholder={{ color: 'black' , fontSize: "1.1em", fontWeight: "bold" }}
            py={"2vh"}
            my={"1vh"}
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></Input>
          </Box>
        </label>

        <label>
          <Box display={"flex"} flexDirection={"row"} justifyItems={"center"} alignItems={"center"}>
            <Text color={"yellow.500"}  width={"50%"}>
            Recipient
            </Text>
            <Input
              borderRadius={"10px"}
              borderColor={"yellow.500"}
              backgroundColor={"yellow.100"}
              placeholder="address of recipient"
              size="xs"
              _placeholder={{ color: 'black' , fontSize: "1.1em", fontWeight: "bold" }}
              py={"2vh"}
              my={"1vh"}
              value={recipient}
              onChange={setValue(setRecipient)}
            ></Input>
          </Box>
        </label>

        <Button>
          <input type="submit" className="button" value="Transfer" />
        </Button>
      </form>
    </Box>
  );
}

export default Transfer;
