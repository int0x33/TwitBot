// Our Twitter library
var Twit = require('twit');
var T = new Twit(require('./config.js'));

function datestring () {
	var d = new Date(Date.now() - 5*60*60*1000); //est timezone
	return d.getUTCFullYear() + '-'
	+ (d.getUTCMonth() + 1) + '-'
	+ d.getDate();
};

function runBot() {
	function retweetLatest(searchTerm, messageToSend) {
		var mediaArtsSearch = {q: searchTerm, count: 1, // since: datestring(), 
		result_type: "recent"}; 
		T.get('search/tweets', mediaArtsSearch, function (error, data) {
		  console.log(error);
		  if (!error) {
		  	  for (var i = 0; i < 1; i++) {
								
					var row = data.statuses[i];
					var user = row.user.screen_name;
					var tweetId = row.id_str;
					
					console.log('*************************');
					console.log(' username: ' + user);
					console.log(' ' + row.text);
					console.log(' time/date: ' + row.created_at);
					console.log('*************************');
								
					T.post('statuses/update', {status: messageToSend }, function(err, data, response) {
						console.log(response)
					})	
									
	  		}		
		 }
		  else {
		  	console.log('There was an error with your hashtag search:', error);
		  }
		});
	}
	retweetLatest('int0x33', 'I want to shitpost on the int0x33 hashtag #int0x33');
	
}
runBot();
setInterval(runBot, 1000 * 60 * 2);

