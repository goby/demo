// 每轮测试的游戏
var Game = function(opt) {
    opt = opt || {}
    this.id = opt.id || 0
    this.name = opt.name || "TestGame"
    this.startTime = opt.startTime || Date.now()
    this.finishTime = opt.finishTime
    this.duration = opt.duration || 0
    this.rounds = opt.rounds
    this.breakTime = option.breakTime || 0
}

module.exports = Game
