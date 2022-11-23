/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>> @author Thomas Lhoest - tlhoest@gmail.com
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

define(function() {

	/*
	* @param timestamp
	* @return int
	*/
	var _timestamp = Math.round((new Date()).getTime() / 1000);

	/*
	* @param randomInt
	* @return int
	*/
	var _randomInt = function(mini, maxi) {
        var nb = mini + (maxi+1-mini)*Math.random();
        return Math.floor(nb);
    };

	return {
		timestamp: _timestamp,
		randomInt: _randomInt
	};
});