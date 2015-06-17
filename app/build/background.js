'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

var sample = [
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
	console.log("Listening and hearing");
	alert(request.date);
	if(request.date) {
		sample.push(request);
		sendResponse({test: "farts"});
	}
	sendResponse({test: "no farts"});
})
