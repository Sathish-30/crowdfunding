import React, { useState, useEffect } from "react";
import Head from "next/head";
import web3 from "../../smart-contract/web3";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightAddon,
  InputGroup,
  Alert,
  AlertIcon,
  AlertDescription,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getETHPrice, getETHPriceInUSD } from "../../lib/getETHPrice";
import factory from "../../smart-contract/factory";

export default function NewCampaign() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [account, setAccount] = useState(null);
  const [minContriInUSD, setMinContriInUSD] = useState();
  const [targetInUSD, setTargetInUSD] = useState();
  const [ETHPrice, setETHPrice] = useState(0);

  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const result = await getETHPrice();
        setETHPrice(result);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    }
    fetchETHPrice();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask to connect your wallet.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  }

  async function onSubmit(data) {
    try {
      if (!account) {
        alert("Please connect your wallet first.");
        return;
      }
      const accounts = await web3.eth.getAccounts()

      await factory.methods.createCampaign(
          web3.utils.toWei(data.minimumContribution, "ether"),
          data.campaignName,
          data.description,
          data.imageUrl,
          web3.utils.toWei(data.target, "ether")
      )
      .send({
          from: accounts[0],
      })

      router.push("/");
    } catch (err) {
      setError(err.message);
      console.error("Transaction failed:", err);
    }
  }

  return (
    <div>
      <Head>
        <title>New Campaign</title>
        <meta name="description" content="Create New Campaign" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main>
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
          <Text fontSize={"lg"} color={"teal.400"}>
            <ArrowBackIcon mr={2} />
            <NextLink href="/"> Back to Home</NextLink>
          </Text>
          <Stack>
            <Heading fontSize={"4xl"}>Create a New Campaign 📢</Heading>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="minimumContribution">
                  <FormLabel>Minimum Contribution Amount</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      step="any"
                      {...register("minimumContribution", { required: true })}
                      isDisabled={isSubmitting}
                      onChange={(e) => setMinContriInUSD(Math.abs(e.target.value))}
                    />
                    <InputRightAddon children="ETH" />
                  </InputGroup>
                  {minContriInUSD && <FormHelperText>~$ {getETHPriceInUSD(ETHPrice, minContriInUSD)}</FormHelperText>}
                </FormControl>
                <FormControl id="campaignName">
                  <FormLabel>Campaign Name</FormLabel>
                  <Input {...register("campaignName", { required: true })} isDisabled={isSubmitting} />
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Campaign Description</FormLabel>
                  <Textarea {...register("description", { required: true })} isDisabled={isSubmitting} />
                </FormControl>
                <FormControl id="imageUrl">
                  <FormLabel>Image URL</FormLabel>
                  <Input {...register("imageUrl", { required: true })} isDisabled={isSubmitting} type="url" />
                </FormControl>
                <FormControl id="target">
                  <FormLabel>Target Amount</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      step="any"
                      {...register("target", { required: true })}
                      isDisabled={isSubmitting}
                      onChange={(e) => setTargetInUSD(Math.abs(e.target.value))}
                    />
                    <InputRightAddon children="ETH" />
                  </InputGroup>
                  {targetInUSD && <FormHelperText>~$ {getETHPriceInUSD(ETHPrice, targetInUSD)}</FormHelperText>}
                </FormControl>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing={10}>
                  {account ? (
                    <Button bg={"teal.400"} color={"white"} _hover={{ bg: "teal.500" }} isLoading={isSubmitting} type="submit">
                      Create
                    </Button>
                  ) : (
                    <Stack spacing={3}>
                      <Button color={"white"} bg={"teal.400"} _hover={{ bg: "teal.300" }} onClick={connectWallet}>
                        Connect Wallet
                      </Button>
                      <Alert status="warning">
                        <AlertIcon />
                        <AlertDescription mr={2}>Please Connect Your Wallet First to Create a Campaign</AlertDescription>
                      </Alert>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </main>
    </div>
  );
}
