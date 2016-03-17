//As this app module is too small, everything we need can be put in a single js file
//When the app grows, it's better to have many folders and files as needed, 1 single file for the module definitions(could be this file)
//another one for each controller, directive and so on...
//Also I like to keep an MVC approach and a file structure according to it.

//Defines the angular module
var autoCompletionApp = angular.module('autoCompletionApp',[]);

//Defines a controller - no needed in this example
autoCompletionApp.controller('autoCompletionCtrl', function ($scope){
});

//I will use a directive to apply the auto completion feature
autoCompletionApp.directive('autoCompletion', function() {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, elem, attrs) {
			var substringMatcher = function(strs) {
				return function findMatches(q, cb) {
			    	var matches, substringRegex;

			    	// an array that will be populated with substring matches
			    	matches = [];

				    // regex used to determine if a string contains the substring `q`
				    substrRegex = new RegExp(q, 'i');

				    // iterate through the pool of strings and for any string that
				    // contains the substring `q`, add it to the `matches` array
				    $.each(strs, function(i, str) {
				      if (substrRegex.test(str)) {
				        matches.push(str);
				      }
				    });

				    cb(matches);
				};
			};
            
            //mock data for this example, this can be changed for a json file, or hitting an endpoint via REST
			var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
			  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
			  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
			  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
			  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
			  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
			  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
			  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
			  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
			];

			//initializes the bootstrap component typeahead
			$('.typeahead').typeahead({
			  hint: true,
			  highlight: true,
			  minLength: 1
			},
			{
			  name: 'states',
			  source: substringMatcher(states)
			});
        }
    };
});