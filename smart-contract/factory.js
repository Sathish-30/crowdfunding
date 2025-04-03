import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x1899F1aD7Eb0dA518Ce2Cd99B673ad00dE58894a"
);

export default instance;
