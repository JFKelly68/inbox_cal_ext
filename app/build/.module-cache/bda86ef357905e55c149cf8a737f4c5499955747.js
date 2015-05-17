'use strict';

React.render(
	React.createElement("div", {className: "topRow"}, 
		React.createElement("div", {className: "navBtn", id: "inbox"}, "div1"), 
		React.createElement("div", {className: "navBtn", id: "gmail"}, "div2")
	),
  document.getElementById('content')
)
