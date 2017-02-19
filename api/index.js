const express = require('express');
const router = express.Router();

const redisClient = require('./redisClient');

router.post('/getDbsAndKeys', redisClient.getDbsAndKeys);
router.post('/setRedisValue', redisClient.set);
router.post('/getRedisValue', redisClient.get);
router.post('/removeRedisKey', redisClient.remove);

module.exports = router;