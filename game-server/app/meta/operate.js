var Operate = function(opt) {
    opt = opt || {}
    this.id = opt.id 
    this.user = opt.user || 0
    this.cmd = opt.cmd || 0
    this.think = opt.think || 0
    this.params = opt.params
}

module.exports = Operate
