const express = require('express');
const router = express.Router();

const redisClient = require('./redisClient');

router.get('/getDbsAndKeys', redisClient.getDbsAndKeys);
router.get('/getDatabaseKeys', redisClient.getDatabaseKeys);
router.post('/setRedisValue', redisClient.set);
router.post('/getRedisValue', redisClient.get);
router.post('/removeRedisKey', redisClient.remove);

module.exports = router;