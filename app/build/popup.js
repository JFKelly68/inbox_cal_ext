'use strict';

chrome.runtime.getBackgroundPage(function(win) {
	var sample = win.sample;
	
	React.render(
		React.createElement(DateOptions, {data: sample}),
  		document.getElementById('dates')
	)
})


var NavBtns = React.createClass({displayName: "NavBtns",
	goTo: function(queryMap, newUrl) {
		console.log("goTo called")
		// check if there are any instances of inbox in current window
		chrome.tabs.query(queryMap, function(tabs) {
			// if there are, make the first one active
			if(tabs.length) {
				chrome.tabs.update(tabs[0].id, {
					active: true
				})
			}
			// otherwise, create a new inbox tab
			else {
				chrome.tabs.create({
					url: newUrl,
					active: true,
				});
			}
		})
	},
	goToInbox: function(e) {
		e.preventDefault();
		console.log("inbox called")
		var queryMap = {
			active: false,
			currentWindow: true,
			url: "*://inbox.google.com/*"
		};
		this.goTo(queryMap, "https://inbox.google.com/")
	},
	goToGmail: function(e) {
		e.preventDefault();
		console.log("gmail called")
		var queryMap = {
			active: false,
			currentWindow: true,
			url: "*://mail.google.com/*"
		};
		this.goTo(queryMap, "https://mail.google.com/")
	},
	render: function() {
		return (
			React.createElement("nav", {className: "row"}, 
				React.createElement("div", {className: "navBtn", id: "inbox", onClick: this.goToInbox}, 
					React.createElement("img", {src: "images/inbox-icon.png", alt: "Inbox", className: "icons", id: "inbox-icon"})
				), 

				React.createElement("div", {className: "navBtn", id: "gmail", onClick: this.goToGmail}, 
					React.createElement("img", {src: "images/New_Logo_Gmail.svg.png", alt: "Gmail", className: "icons", id: "gmail-icon"})
				)
			)
		)
	}
})

React.render(
	React.createElement(NavBtns, null),
	document.getElementById("navigate")
)

var DateOptions = React.createClass({displayName: "DateOptions",
	render: function() {
		var dateList = this.props.data.map(function(obj) {
			return (
				React.createElement("div", {person: obj.person}, 
					obj.date
				)
			);
		});

		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("h4", {className: "centerHead"}, "Possible Dates:"), 
				dateList
			)
		)
	}
})
