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

var NavBtns = React.createClass({displayName: "NavBtns",
	render: function() {
		return (
			React.createElement("nav", {className: "row"}, 
				React.createElement("div", {className: "navBtn", id: "inbox"}, 
					React.createElement("img", {src: "images/google-inbox_2x.png", alt: "Inbox", height: "50", width: "80"})
				), 

				React.createElement("div", {className: "navBtn", id: "gmail"}, 
					React.createElement("img", {src: "images/New_Logo_Gmail.svg.png", alt: "Gmail", height: "50", width: "80"})
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

React.render(
	React.createElement(DateOptions, {data: sample}),
  document.getElementById('dates')
)
