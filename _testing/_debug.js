module.exports = function(name, minUsed) {
    
    var _self = this;
    
    var _start = Game.getUsedCpu();
    var _name = name;
    var _minUsed = minUsed || 0;
    
    return {
        name : function() {
            return _name;
        },
        duration : function() {
            return (Game.getUsedCpu() - _start);
        },
        log : function() {
            var used = this.duration();
            if ( used > _minUsed ) {
                console.log("DEBUG", this.name(), this.duration());
            }
        }
    }
}