import { JSDOM } from 'jsdom';
import checkGameSituation from '../jobs/checkGameSituation';

const root = () => {
  checkGameSituation();
};

export default root;
