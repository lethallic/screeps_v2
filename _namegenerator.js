module.exports = (function(factory){
    return new factory(["ALPHA", "BRAVO", "CHARLIE", "DELTA"]);
})(
    function(names){
        var _names = names || [];
    
        var getName = function(n){
            if ( _names.length == 0 ) return "UNIT_" + n;
        
            var index = Math.round(Math.random() * names.length);
            if ( index == _names.length ) index--;
            
            return _names[index] + "_" + n;
        }

        this.get = function() {
            var num = Math.round(Math.random() * 1000);
            return getName(num);
        }

    }
)