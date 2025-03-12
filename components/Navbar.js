import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function NavBar() {
  // const wallet = useWallet();
  const [walletAddress, setWalletAddress] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      console.error("MetaMask not found");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      console.log("Connected:", address);
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  }

  function disconnectWallet() {
    setWalletAddress(null);
  }

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        pos="fixed"
        top="0"
        w={"full"}
        minH={"60px"}
        boxShadow={"sm"}
        zIndex="999"
        justify={"center"}
        css={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(26, 32, 44, 0.8)"
          ),
        }}
      >
        <Container as={Flex} maxW={"7xl"} align={"center"}>
          <Flex flex={{ base: 1 }} justify="start" ml={{ base: -2, md: 0 }}>
            <Heading
              textAlign="left"
              fontFamily={"heading"}
              color={useColorModeValue("teal.800", "white")}
              as="h2"
              size="lg"
            >
              <Box as={"span"} color={useColorModeValue("teal.400", "teal.300")}>
                <NextLink href="/">🤝BetterFund</NextLink>
              </Box>
            </Heading>
          </Flex>
          <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
            <Button fontSize={"md"} fontWeight={600} variant={"link"}>
              <NextLink href="/campaign/new">Create Campaign</NextLink>
            </Button>
            <Button fontSize={"md"} fontWeight={600} variant={"link"}>
              <NextLink href="/#howitworks"> How it Works</NextLink>
            </Button>
            {walletAddress ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {walletAddress.substr(0, 10) + "..."}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={disconnectWallet}>Disconnect Wallet</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                fontSize={"md"}
                fontWeight={600}
                color={"white"}
                bg={"teal.400"}
                _hover={{ bg: "teal.300" }}
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            )}
            <DarkModeSwitch />
          </Stack>
        </Container>
      </Flex>
    </Box>
  );
}
