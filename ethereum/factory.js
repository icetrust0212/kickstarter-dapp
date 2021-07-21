import web3 from './web3';
import CampaignFactory from './build/CampainFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xE849565535938386672E182580931957E7333225'
);

export default instance;