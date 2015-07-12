module.exports = function(name, minUsed) {
    
    var _self = this;
    
    var _start = Game.getUsedCpu();
    var _name = name;
    var _minUsed = minUsed || 0;
    var _stepUsed = 0;
    
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
                console.log("!debug", this.name(), this.duration());
            }
        },
        logStep : function(step) {
            var now = Game.getUsedCpu();
            var used = now - _stepUsed
            if ( used > _minUsed ) {
                console.log("!debug", this.name(), step, used, now, _stepUsed);
            }
            _stepUsed = now;
        }
    }
}