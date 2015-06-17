module.exports = function(name) {
    
    var _self = this;
    
    var _start = Game.getUsedCpu();
    var _name = name;
    
    return {
        name : function() {
            return _name;
        },
        duration : function() {
            return (Game.getUsedCpu() - _start);
        },
        log : function() {
            console.log("DEBUG", this.name(), this.duration());
        }
    }
}