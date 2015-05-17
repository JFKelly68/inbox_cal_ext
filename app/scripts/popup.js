'use strict';

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

var NavBtns = React.createClass({
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
			<nav className="row">
				<div className="navBtn" id="inbox" onClick={this.goToInbox}>
					<img src={"images/inbox-icon.png"} alt="Inbox" className="icons" id="inbox-icon" />
				</div>

				<div className="navBtn" id="gmail" onClick={this.goToGmail}>
					<img src={"images/New_Logo_Gmail.svg.png"} alt="Gmail" className="icons" id="gmail-icon" />
				</div>
			</nav>
		)
	}
})

React.render(
	<NavBtns />,
	document.getElementById("navigate")
)

var DateOptions = React.createClass({
	render: function() {
		var dateList = this.props.data.map(function(obj) {
			return (
				<div person={obj.person}>
					{obj.date}
				</div>
			);
		});

		return (
			<div className="row">
				<h4 className="centerHead">Possible Dates:</h4>
				{dateList}
			</div>
		)
	}
})

React.render(
	<DateOptions data={sample}/>,
  document.getElementById('dates')
)
