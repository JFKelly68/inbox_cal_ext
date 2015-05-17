'use strict';

var NavBtns = React.createClass({displayName: "NavBtns",
	render: function() {
		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "navBtn", id: "inbox"}), 
				React.createElement("div", {className: "navBtn", id: "gmail"})
			)
		)
	}
})

var DateOptions = React.createClass({displayName: "DateOptions",
	render: function() {
		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", null, "JAMES")
			)
		)
	}
})

var InCal = React.creatClass({
	render: function() {
		return (
			React.createElement("div", null, 
				"InCal:", 
				React.createElement(NavBtns, null), 
				React.createElement(DateOptions, null)
			)
		)
	}
})

React.render(
	React.createElement(InCal, null),
  document.getElementById('content')
)
