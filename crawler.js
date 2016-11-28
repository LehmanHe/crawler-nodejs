var http = require('http')
var cheerio = require('cheerio')
var url = 'http://gank.io/'

function fliterCatalog(html){
	var $ = cheerio.load(html);
	var outlink = $('.outlink')
	var catalogs = outlink.find('h3')
	var titles = [];
	catalogs.each(function(item){
		titles.push($(this).text());
	})
	var contents = outlink.children('ul')
	var courses = [];
	contents.each(function(item){
		var li = $(this).find('li');
		var coursesItem = [];
		li.each(function(item){
			var a = $(this).find('a')
			var href = a.attr('href');
			var courseName = a.text();
			coursesItem.push({
				"href":href,
				"courseName": courseName
			})
		})
		courses.push(coursesItem)
	})
	for(var i=0;i<titles.length;++i){
		console.log(titles[i])
		courses[i].forEach(function(item){
			console.log("  链接：",item.href)
			console.log("  标题",item.courseName)
			console.log("\n")
		})
	}
}

http.get(url, function(res){
	var html =''
	res.on('data',function(data){
		html+=data
	})
	res.on('end',function(){
		fliterCatalog(html)
	})
	res.on('error',function(){
		console.log('error')
	})
})
