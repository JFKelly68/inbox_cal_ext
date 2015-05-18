'use strict';

// traverse the tree and if the element has a text node
// check the text for dates
// if there are dates, replace them with clickable elements
// also, collect them and pass them as a message to the extension

// matching function for traversal
function textNodes(elem){
  return (elem.hasAttribute("aria-expanded"));
}

// depth-first, passing down parameter (arrays are passed by reference!)
var traverseDomAndCollectElements = function(matchFunc, startEl, resultSet) {
  // short-circuiting logical OR operator for "default" assignment
  resultSet = resultSet || [];
  if (typeof startEl === "undefined") startEl = document.body;

  if (matchFunc(startEl)) resultSet.concat(textNodesUnder(startEl));

  for (var i = 0; i < startEl.children.length; i++) {
    // these calls return resultSet, but we don't care — the important thing
    // is that each function call is modifying the SAME resultSet
    traverseDomAndCollectElements(matchFunc, startEl.children[i], resultSet);
  }
  // when we do return resultSet to our $ engine, we know that it has
  // been modified by all the recursive checks.
  return resultSet;
};


function changeLinked(text) {
	return text.replace(/(linkedin)/ig, "Farts!");
}

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) {
  	if(n.nodeValue) n.nodeValue = changeLinked(n.nodeValue);
  	a.push(n);
  }
  return a;
}

function scrapeInbox() {
	var root = document.getElementsByClassName('tE')[0];
	return textNodesUnder(root);
	// return traverseDomAndCollectElements(textNodes, root);
}


document.getElementsByTagName("body")[0].addEventListener("click", function(event) {
	event.preventDefault();
	var elements = scrapeInbox();
	console.log("poop", elements);
})