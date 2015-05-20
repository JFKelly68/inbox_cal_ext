'use strict';

var Utility = {
	thread: "aY ac X s2",
	subject: "eo xJNT8d",
	classId:	"pA s2",
	eachEmail: {
		sender: "fX",
		sendDate: "qO s2",
		textBody: "F3hlO"
	}
}

function EmailObj() {
	this.subject = "";
	this.sender = "";
	this.email = "";
	this.sendDate = "";
	this.textBody = "";
};

// change to listen on first element with role="list", maybe
document.getElementsByTagName("body")[0].addEventListener("click", function(event) {
	event.preventDefault();
	var elements = scrapeThread();
	console.log("not poop", elements);
})

function scrapeThread() {
	var emailObjsInThread = [];
	// checks that one of the threads is expanded
	if(document.getElementsByClassName(Utility.thread).length) {
		// gonna need to account for having multiple emails in same thread open
		// loop thru doc.getElemClassName(classId) and build diff EmailObj for each iteration

		var openEmailElemsInThread = document.getElementsByClassName(Utility.classId);
		
		// loops over all expanded emails in thread
		for(var i=0, len=openEmailElemsInThread.length; i < len; i++){
			var email = new EmailObj();
			email.subject = textNodesUnder(document.getElementsByClassName(Utility.subject)[0]);
			emailObjsInThread[i] = traverseThreadAndBuildObj(checkAttrs, openEmailElemsInThread[i], email);
		}
	}
	return emailObjsInThread;
}

// depth-first, passing down parameter (arrays are passed by reference!)
var traverseThreadAndBuildObj = function(matchFunc, rootEl, resultSet) {
  // short-circuiting logical OR operator for "default" assignment
  resultSet = resultSet || new EmailObj();
  if (typeof rootEl === "undefined") rootEl = document.body;

  var matched = matchFunc(rootEl);

  // might need a check to see if prop already exists
  if(matched){
	  if(matched === "sender") {
	  	resultSet[matched] += rootEl.textContent;
	  	// account for issue of emails being attr on the parent elem of "name" text nodes
	  	// without this check, one of the two props, sender/email, will overwrite the other
	  	resultSet.email = rootEl.getAttribute("email");
	  }
	  else {
	  	resultSet[matched] += textNodesUnder(rootEl);
	  }
  }

  for(var i = 0; i < rootEl.children.length; i++) {
    // these calls return resultSet, but we don't care — the important thing
    // is that each function call is modifying the SAME resultSet
    traverseThreadAndBuildObj(matchFunc, rootEl.children[i], resultSet);
  }
  // when we do return resultSet to our $ engine, we know that it has
  // been modified by all the recursive checks.
  return resultSet;
};

function textNodesUnder(el){
  var n, a="", walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) {
  	if(n.nodeValue) {
  		// pass in elem and parse the body for any date-related words
  		// side effect that changes the html
  		findDates(n);
  		a += n.nodeValue;
  	}
  }
  return a;
}


// Loops thru Utility.eachEmail and checks if the current element
// is one of the various elements that will compose the EmailObj
function checkAttrs(elem){
	// will hold the RegEx str needed to check if class exists in elem.className
	var matchClass = "";

  // check if elem has any classes
  if(elem.className) {
	  // loop thru the Utility.eachEmail and check if current elem 
	  // matches any of the classes 
	  for(var each in Utility.eachEmail){
	  	matchClass = new RegExp(Utility.eachEmail[each], "g");
	  	// if it matches any, change retVal to property name
	  	if(matchClass.test(elem.className)){
	  		return each;
	  	}
	  	// console.log("testing! each:", each, "util[each]: ", Utility.eachEmail[each], "matchClass:", matchClass, "elem class:", elem.className, retVal);
	  }
	}
  return false;
}


function findDates(node) {
	var testing = chrono.parse(node.nodeValue)
	console.log("this is chrono: ", testing)

	// (/\b(?:(?:Mon)|(?:Tues?)|(?:Wed(?:nes)?)|(?:Thur?s?)|(?:Fri)|(?:Sat(?:ur)?)|(?:Sun))(?:day)?\b[:\-,]?\s*[a-zA-Z]{3,9}\s+\d{1,2}\s*,?\s*\d{4}/)

	// (January|February|March|April|May|June?|July|August|September|October|November|December)\s(\d\d?).+?(\d\d\d\d)
}


// traverse the tree and if the element has a text node
// check the text for dates
// if there are dates, replace them with clickable elements
// also, collect them and pass them as a message to the extension


function changeLinked(text) {
	return text.replace(/(linkedin)/ig, "Farts!");
}