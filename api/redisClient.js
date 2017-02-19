const redis = require('redis');
const config = require('../config');
const port = config.redis.port;
const host = config.redis.host;
const db = config.redis.db;
let client = redis.createClient(port, host, {db:db});
let numberOfDbs;

const getDbs = ()=>{
    return new Promise((resolve, reject ) => {
        if(numberOfDbs) return resolve(numberOfDbs);
        client.config(['get', 'databases'], (err, reply) => {
            numberOfDbs = parseInt(reply[1]);
            client.quit();
            return resolve(numberOfDbs);
        });
    });
}

class RedisClient {
    getDbsAndKeys(req, res) {
        getDbs().then((databases)=>{
            let promises = [];
            let dbKeys = {};
            for(let i = 0; i < databases; i++) {
                dbKeys[i] = [];
                let currentClient = redis.createClient(port, host, {db: i});
                promises.push(new Promise((resolve, reject ) => {
                    currentClient.keys('*', (err, replies) => {
                        dbKeys[i] = replies;
                        currentClient.quit();
                        resolve(dbKeys[i]);
                    });
                }));
            }
            Promise.all(promises).then(() => {
                res.send({keys: dbKeys});
            });
        });
    }

    set(req, res) {
        let key = req.body.key;
        let value = JSON.parse(req.body.value) || 'false';
        let currentDb = req.body.db || db;
        let currentClient = redis.createClient(port, host, {db:currentDb});
        currentClient.set(key, value);
        currentClient.quit();
        res.send({result: value});
    }

    get(req, res) {
        let key = req.body.key;
        let currentDb = req.body.db || db;
        let currentClient = redis.createClient(port, host, {db:currentDb});
        currentClient.get(key, (err, result)=>{
            res.send({result: result});
            currentClient.quit();
        });
    }

    remove(req, res) {
        let keys = req.body.keys;
        let currentDb = req.body.db || db;
        let currentClient = redis.createClient(port, host, {db:currentDb});
        currentClient.del(keys);
        res.sendStatus(200);
    }
}

module.exports = new RedisClient();