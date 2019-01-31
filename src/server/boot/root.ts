import bparser from 'body-parser';
import { Request, Response, Router } from 'express';
import path from 'path';
import profile from '../controllers/profile';
import checkSituation from '../jobs/checkSituation';

const root = app => {
  const router: Router = app.loopback.Router();
  router.get('/', (req: Request, res: Response) => res.redirect('/config'));
  router.get('/healthy', app.loopback.status());
  router.get('/config', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../dist/config', 'index.html'));
  });
  router.get('/profile', profile.load);
  router.post('/profile', bparser.json(), profile.update);
  app.use(router);

  checkSituation();
};

export default root;
