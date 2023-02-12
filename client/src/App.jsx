import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import "../public/style/style.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState("");

  return (
    <Box>
      <Navbar />
      <Box
        w={"40%"}
        marginLeft={"auto"}
        borderRadius={"20px"}
        bg={"rgba(36, 49, 69, 0.4)"}
        height={"60vh"}
        mt={"10vh"}
        mr={"7vw"}
      >
        <Wallet
          balance={balance}
          setBalance={setBalance}
          user={user}
          setUser={setUser}
        />
        <Transfer setBalance={setBalance} user={user} />
      </Box>
    </Box>
  );
}

export default App;
