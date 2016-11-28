var http = require('http')
var url = 'http://gank.io/'

http.get(url, function(res){
	var html =''
	res.on('data',function(data){
		html+=data
	})
	res.on('end',function(){
		console.log(html)
	})
	res.on('error',function(){
		console.log('error')
	})
})
