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
  	console.log("THIS IS N", n);
  	if(n.nodeValue) {
  		a += n.nodeValue;
  		// pass in elem and parse the body for any date-related words
  		// side effect that changes the html
  		findDates(n, function(node, match, offset) {
  			console.log("CALLBACK ARGS!:", arguments);
  			console.log("AND THIS IS THE NODE:", node);

  			var span = document.createElement("span");
  			span.className = "test-elem";
  			span.textContent = match;
  			// try changing 'n' to  'node'
  			node.parentNode.insertBefore(span, node.nextSibling)

  			console.log("TREE WALKER OBJ", walk);
  			console.log("TREE WALKER.nextNode", walk.nextNode());
  			console.log("TREE WALKER.nextSibling", walk.nextSibling());
  			console.log("TREE WALKER OBJ.parentNode", walk.parentNode());
  		});
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


function findDates(node, callback) {
	var weekDate = new RegExp(/\b(?:(?:Mon)|(?:Tues?)|(?:Wed(?:nes)?)|(?:Thur?s?)|(?:Fri)|(?:Sat(?:ur)?)|(?:Sun))(?:day)?\b[:\-,]?\s*[a-zA-Z]{3,9}\s+\d{1,2}\s*,?\s*\d{4}/i);
	var monthDdYyyy = new RegExp(/(January|February|March|April|May|June?|July|August|September|October|November|December)\s(\d\d?).+?(\d\d\d\d)/i);
	var dayOrRelative = new RegExp(/(?:(?:\b(?:(?:Mon)|(?:Tues?)|(?:Wed(?:nes)?)|(?:Thur?s?)|(?:Fri)|(?:Sat(?:ur)?)|(?:Sun))(?:day)?\b)|(?:(?:\b(?:to|yester)?(?:\B(?:night|morrow|day))\b)(?:\s(?:evening|night|morning|afternoon))?))(?:\s?(?:\@|at)\s?(?:(?:\d{1,2}(?::?\d{2})?)|noon))?(?:[a|p]m?(?:\b)?)?/i);

	if(weekDate.test(node.data)){
		console.log("DAY, MMM DD, YYYY!:", node.data);	
	} 
	else if(monthDdYyyy.test(node.data)) {
		console.log("MMM DD, YYYY!:", node.data);
	}
	else if(dayOrRelative.test(node.data)) {
		console.log("Relative!:", node.data);
		node.data.replace(dayOrRelative, replaceWithElem)
	}
	else {
		console.log("NONE MATCH!", node.data);
		return;
	}


	function replaceWithElem(matchedStr) {
		console.log("replaceWithElem arguments:", arguments);
		console.log("replaceWithElem 'matchedStr':", matchedStr);

		var args = [].slice.call(arguments),
			offset = args[args.length-2],
			newTextNode = node.splitText(offset);

		// This is where the matched str is "deleted" from the nodeValue
		newTextNode.data = newTextNode.data.substr(matchedStr.length);
		
		callback.apply(window, [node].concat(args));

		node = newTextNode;
	};

	// take in the index and split the nodeValue at that index
	// var	replaced = function(word){
	// 	console.log("offset:", word)
	// 	var textArr = node.nodeValue.split(word);
	// 	console.log("nodeValue", textArr)
		
	// 	return textArr.join();
	// }

	// for each of the regex fxns
	// for(var regex in matchObjs) {
		

	// 	node.nodeValue.replace(regex, function(all) {
 //            var args = [].slice.call(arguments),
 //                offset = args[args.length - 2],
 //                newTextNode = node.splitText(offset);

 //            console.log("AAAAARGS!", args);
 //            console.log("offset: ", offset);
 //            console.log("newTextNode: ", newTextNode)

 //            // newTextNode.data = newTextNode.data.substr(all.length);

 //            // callback.apply(window, [child].concat(args));

 //            // child = newTextNode;
 //            return newTextNode;
 
 //        });



		// find the starting index if there is a match
		// var matched = node.nodeValue.match(matchObjs[each]);
		
		
		// // var bold = document.createElement("em")
		// // bold.id = "dateWord";
		// // bold.innerHtml = "$1";
		// if(matched >= 0) console.log(replaced(matched))
		
		// console.log("testing match:", matchObjs[each].test(node.nodeValue));
	// }

	// return node;
}


// traverse the tree and if the element has a text node
// check the text for dates
// if there are dates, replace them with clickable elements
// also, collect them and pass them as a message to the extension


function changeLinked(text) {
	return text.replace(/(linkedin)/ig, "Farts!");
}