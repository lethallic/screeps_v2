module.exports = function( proto , options ) {
	for ( var key in options ) {
		proto[key] = options[key];
	}
};