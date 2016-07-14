"use strict";

import { Template } from 'meteor/templating';
import { ResultsArray } from './ui/resultsArray';
import { Meteor } from 'meteor/meteor';

import './body.html';


Template.body.onCreated(function bodyOnCreated(){
	Meteor.call('results.clear');
	this.queryContent = "";
	Meteor.subscribe('results');
});

Template.body.helpers({
	results() {
		console.log(ResultsArray);
		return ResultsArray.find();
	}
});

Template.body.events({
  'submit .searchQuery'(event) {
  	Meteor.call('results.clear');
  	event.preventDefault();
    var q = document.getElementById("userQuery");
    var baseURL = "https://en.wikipedia.org/w/api.php?action=query&list=allpages&apfrom=REPLACE&aplimit=10&format=json";
    var finalQuery = baseURL.replace("REPLACE", q.value);

    $.getJSON(finalQuery, function(json){
    	var jsonArray = json.query.allpages;
    	for(var ii = 0; ii < jsonArray.length; ii++) {
    		Meteor.call('results.insert', jsonArray[ii].title);	
    	}
    });
  },
});
