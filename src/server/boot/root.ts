import bparser from 'body-parser';
import { Request, Response, Router } from 'express';
import path from 'path';
import profile from '../controllers/profile';
import settings from '../controllers/settings';
import checkSituation from '../jobs/checkSituation';

const root = app => {
  const router: Router = app.loopback.Router();
  router.get('/', (req: Request, res: Response) => res.redirect('/config'));
  router.get('/healthy', app.loopback.status());
  router.get('/config', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../dist', 'index.html'));
  });
  router.get('/profile', profile.load);
  router.post('/settings', bparser.json(), settings.update);
  app.use(router);

  checkSituation();
};

export default root;
