// 每轮测试的g象
var Game = function(opt) {
    opt = opt || {}
    this.id = opt.id || 0
    this.name = opt.name || "TestGame"
    this.startTime = opt.startTime || Date.now()
    this.finishTime = opt.finishTime
    this.duration = 0
}

module.exports = Game
