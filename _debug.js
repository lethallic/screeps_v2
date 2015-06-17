module.exports = function(name) {
    var _self = this;
    
    var _start = Game.getUsedCpu();
    var _name = name;
    
    this.name = function() {
        return _name;
    }
    
    this.duration = function() {
        return (Game.getUsedCpu() - _start);
    }
    
    this.log = function() {
        console.log("DEBUG", _self.name(), _self.duration());
    }
    
}