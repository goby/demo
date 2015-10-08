var Action = function(opt) {
    opt = opt || {}
    this.id = opt.id || 0
    this.name = opt.name
    this.description = opt.description
    this.duration = opt.duration
    this.minUser = opt.minUser || 1
    this.maxUser = opt.maxUser || 1
    this.consume = opt.consume || 0
    this.reward  = opt.reward  || 0
    this.type    = opt.type 
}

module.exports = Action
