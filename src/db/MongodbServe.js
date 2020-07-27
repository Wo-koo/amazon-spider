/**
 * 使用MongoDb实现数据存储
 * */
var mongo = require("mongodb")
var conf = require("./config")
var pool = require("generic-pool")

var connectionPool = pool.createPool({
    create: function () {
        return new Promise((resolve, reject) => {
            mongo.connect(conf.mongoUrl, {useNewUrlParser: true}, (err, cli) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(cli)
                    }
                }
            )
        })
    }, destroy: cli => {
        cli.close()
    }
}, {
    max: 10,
    min: 3
})

class MongodbServe {
    static clearConnections() {
        myPool.drain().then(() => {
            myPool.clear();
        })
    }

    static basicFind(condition, callback) {
        connectionPool.acquire().then(
            cli => {
                cli.db("amazonStatistic").collection("labels").find(condition).toArray().then(
                    (data) => {
                        callback(data)
                        connectionPool.release(cli)
                    })
            }
        ).catch(err => {
            console.log(err)
        })
    }


    static loadGoods(goodsname, callback) {
        MongodbServe.basicFind({goodsname: goodsname}, data => {
            if (data.length == 0) callback(null)
            else callback(data[0])
        })
    }

    static loadGoodsList(callback) {
        MongodbServe.basicFind({}, (data) => {
            callback(data.map(x => x.goodsname))
        })
    }

    static insertOne(goodsname, repos, callback) {
        connectionPool.acquire().then(cli => {
            cli.db("amazonStatistic").collection("labels").insertOne({
                repos: repos,
                goodsname: goodsname,
                lastUpdateTime: new Date().getTime()
            }, (err, res) => {
                if (err) console.log(err)
                else {
                    callback(err, res)
                }
                connectionPool.release(cli)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    static update(goodsname, repos, callback) {
        connectionPool.acquire().then(cli => {
            cli.db("amazonStatistic").collection("labels").updateOne({goodsname: goodsname}, {
                $set: {
                    repos: repos,
                    lastUpdateTime: new Date().getTime(),
                },
            }, (err, resp) => {
                if (err) console.log(err)
                else if (callback)
                    callback(err, resp)
            })
        })
    }

    static putUser(goodsname, repos, callback) {
        MongodbServe.basicFind({goodsname: goodsname}, user => {
            if (user == null || user.length == 0) {
                MongodbServe.insertOne(goodsname, repos, callback)
            } else {
                MongodbServe.update(goodsname, repos, callback)
            }
        })
    }
}

module.exports = MongodbServe
if (require && require.main == module) {

    MongodbServe.loadGoods("裤子", (res) => {
        console.log(res)
    })
}

