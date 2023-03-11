import {
  Box,
  Heading,
  Input,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

import { useState } from "react";

import wallet from "../local-metamask";

function AccountsInfo() {
  console.log("getAccountsInfo");
  const USERS = wallet.USERS;
  return (
    <Box>
      {USERS.map((user, index) => (
        <Box
          key={index}
          backgroundColor={"cyan.100"}
          borderRadius={"10px"}
          py={"1vh"}
          px={"1vw"}
          my={"1vh"}
        >
          <Box>
            <Text color={"cyan.900"} fontWeight={"medium"}>
              Username: {user}{" "}
            </Text>
            <Text color={"cyan.900"} fontWeight={"medium"}>
              Address: {wallet.getAddress(user)}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function ProjectOverview() {
  return (
    <Box>
      <Text>
        <Heading color={"cyan.900"} fontSize={"1.2em"}>
          Introduction
        </Heading>
        <Text mb={"2vh"}>
          Blockchain project as an ECDSA Node to transfer funds between accounts
          using digital signatures and public key cryptography.{" "}
        </Text>

        <Heading color={"cyan.900"} fontSize={"1.2em"}>
          Key Features
        </Heading>
        <UnorderedList mb={"2vh"}>
          <ListItem>
            Public key cryptography: Transactions are secured using digital
            signatures that verify the identity of the sender.
          </ListItem>
          <ListItem>
            Private key ownership verification: Users must verify that they own
            the private key corresponding to the address that is sending funds.
          </ListItem>
          <ListItem>
            Centralized server: Transactions are processed by a single server,
            ensuring consistency and security.
          </ListItem>
          <ListItem>
            Transaction history: Users can view their transaction history and
            balances.
          </ListItem>
        </UnorderedList>
        <Heading color={"cyan.900"} fontSize={"1.2em"}>
          Limitations
        </Heading>
        <UnorderedList>
          <ListItem>
            Trust in server operator: Since the server is centralized, users
            must trust the operator not to act maliciously.
          </ListItem>
          <ListItem>
            Centralization: The centralized nature of the server may limit
            scalability and decentralization efforts.
          </ListItem>
          <ListItem>
            Simplified implementation: This project is intended as a learning
            exercise and does not include all the features or complexities of a
            real-world blockchain.
          </ListItem>
        </UnorderedList>
      </Text>
    </Box>
  );
}

function Features() {
  return (
    <Box>
      <UnorderedList>
        <ListItem>
          Public Key Cryptography to ensure secure transactions
        </ListItem>
        <ListItem>
          Private Key Ownership Verification to prevent unauthorized
          transactions
        </ListItem>
        <ListItem>
          Centralized Server for consistent and secure transaction processing
        </ListItem>
        <ListItem>
          Transaction History and Balances for transparent record-keeping
        </ListItem>
      </UnorderedList>
    </Box>
  );
}

function BcBasics() {
  return (
    <Box>
      <UnorderedList>
        <ListItem>
          <Link
            href="https://www.investopedia.com/terms/b/blockchain.asp"
            isExternal
          >
            What is Blockchain? - Investopedia
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://www.ibm.com/blockchain/what-is-blockchain"
            isExternal
          >
            What is Blockchain Technology? - IBM
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://blockchainhub.net/blockchain-explained/"
            isExternal
          >
            Blockchain Explained: A Guide for Beginners - Blockchain Hub
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://www.investopedia.com/terms/b/bitcoin.asp"
            isExternal
          >
            What is Bitcoin? - Investopedia
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://ethereum.org/en/what-is-ethereum/" isExternal>
            What is Ethereum? - Ethereum Foundation
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://www.youtube.com/watch?v=SSo_EIwHSd4" isExternal>
            How Does Blockchain Work? - Simply Explained
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm"
            isExternal
          >
            What is ECDSA in cryptography? - Wikipedia{" "}
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
}

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  return (
    <Box display={"flex"} justifyContent={"space-between"} px={"10%"}>
      <Button
        onClick={() => {
          onOpen();
          setModalTitle("Local Wallets");
          setModalBody(<AccountsInfo />);
        }}
        fontSize={"lg"}
        fontWeight={"semibold"}
        color={"cyan.700"}
        borderColor={"cyan.700"}
        borderWidth={"1px"}
        borderRadius={"10px"}
        bg={"whiteAlpha.800"}
      >
        Accounts
      </Button>
      <Button
        fontSize={"lg"}
        fontWeight={"semibold"}
        color={"cyan.700"}
        borderColor={"cyan.700"}
        borderWidth={"1px"}
        borderRadius={"10px"}
        bg={"whiteAlpha.800"}
        onClick={() => {
          onOpen();
          setModalTitle("Project Overview");
          setModalBody(<ProjectOverview />);
        }}
      >
        Project Overview
      </Button>
      <Button
        fontSize={"lg"}
        fontWeight={"semibold"}
        color={"cyan.700"}
        borderColor={"cyan.700"}
        borderWidth={"1px"}
        borderRadius={"10px"}
        bg={"whiteAlpha.800"}
        onClick={() => {
          onOpen();
          setModalTitle("Features");
          setModalBody(<Features />);
        }}
      >
        Features
      </Button>
      <Button
        fontSize={"lg"}
        fontWeight={"semibold"}
        color={"cyan.700"}
        borderColor={"cyan.700"}
        borderWidth={"1px"}
        borderRadius={"10px"}
        bg={"whiteAlpha.800"}
        onClick={() => {
          onOpen();
          setModalTitle("Blockchain Basics");
          setModalBody(<BcBasics />);
        }}
      >
        Blockchain Basics
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent minWidth={"60vw"}>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Navbar;
