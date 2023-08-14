import express from "express";
const { processCashLine } = require('./controllers/watchCashController');
import banUser from './controllers/ban'
import getRoleList from "./controllers/userRolesController";
import banRole from "./controllers/banRole";


const router = express.Router();
router.use(express.json()); 


router.post('/getroles', async (req, res) => {
  try {
    const { userId } = req.body;
    const rolelist = await getRoleList(userId);
    res.json(rolelist);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/banuser', async (req, res) => {
  try {
    const {userId, time, reason} = req.body;
    const baned = await banUser(userId, time, reason);
    res.json(baned);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/banrole', async (req, res) => {
  try {
    const {roleid, time, reason} = req.body;
    const baned = await banRole(roleid, time, reason);
    res.json(baned);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;

