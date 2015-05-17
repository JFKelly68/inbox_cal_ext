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
				React.createElement("div", {className: "navBtn", id: "inbox"}), 
				React.createElement("div", {className: "navBtn", id: "gmail"})
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

		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", null, "JAMES")
			)
		)
	}
})

var InCal = React.createClass({displayName: "InCal",
	render: function() {
		return (
				React.createElement(DateOptions, null)
		)
	}
})

React.render(
	React.createElement(InCal, null),
  document.getElementById('dates')
)
