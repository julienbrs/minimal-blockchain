import { Box, Heading, Input, Text, Button } from "@chakra-ui/react";

function Navbar() {
  return (
    <Box display={"flex"} justifyContent={"space-between"} px={"10%"}>
      <Text fontSize={"lg"} fontWeight={"semibold"} color={"whiteAlpha.800"}>
        Purpose
      </Text>
      <Text fontSize={"lg"} fontWeight={"semibold"} color={"whiteAlpha.800"}>
        Goal
      </Text>
      <Text fontSize={"lg"} fontWeight={"semibold"} color={"whiteAlpha.800"}>
        What's missing
      </Text>
      <Text fontSize={"lg"} fontWeight={"semibold"} color={"whiteAlpha.800"}>
        Purpose
      </Text>
    </Box>
  );
}

export default Navbar;
