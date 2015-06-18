'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

var chrono = require('chrono-node');

// Because getBackgroundPage() returns window object, must make this global
window.sample = [
	{
		date: "May 12th, 2015",
		person: "Chris Kelly",
		email: "kelly.christopherp@gmail.com"
	},
	{
		date: "May 25th, 2015",
		person: "Andrew Fried",
		email: "kosherpineapple@gmail.com"
	}
]

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Listening and hearing", request.targetDate);
	if(request.targetDate) {
		request.date = chrono.parseDate(request.targetDate).toString().substr(0,16);
		console.log(request);
		window.sample.push(request);
		sendResponse({test: "farts"});
	}
	sendResponse({test: "no farts"});
})
