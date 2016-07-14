"use strict";

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ResultsArray = new Mongo.Collection('results');

if (Meteor.isServer) {

	Meteor.publish('results', function resultsPublication() {
		return ResultsArray;
	});

}

Meteor.methods({
	'results.insert'(text) {
		check(text, String);
		console.log(text);
		ResultsArray.insert({
			text,
		});
	},

	'results.clear'() {
		ResultsArray.remove({});
	}
});