import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xFa46d5CC37C87baF9B84cA4912Ee7026934b6840"
);

export default instance;
