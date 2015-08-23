
var User = function(opt) {
    opt = opt || {}
    this.id = opt.id || 0
    this.name = opt.name || "User"
    this.password = opt.password 
    this.health = opt.health || {}
    this.state = opt.state || {}
    this.locate = opt.locate || {}
    this.join = opt.join || Date.now()
}

module.exports = User
