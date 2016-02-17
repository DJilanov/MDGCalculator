"use strict";

angular.module("Home")
	.value("API_GLOBAL_SETTINGS", {
		// the nodejs backend is deployed api on heroku
		makesAndModelsUrl: "https://agile-hollows-13663.herokuapp.com/api/makesAndModels",
		statesUrl: "https://agile-hollows-13663.herokuapp.com/api/states"
	})
	.factory("fetcherSVC", ["$http", "$q", "API_GLOBAL_SETTINGS",
		function($http, $q, API_GLOBAL_SETTINGS) {
			// we fetch the products and show them. we save them into the array for future direct use
			function getMakesAndModels() {
				var deferred = $q.defer();
				$http.get(API_GLOBAL_SETTINGS.makesAndModelsUrl).then(function (response) {
					deferred.resolve(response.data.makesAndModels[0].carsAndModels);
				});

				return deferred.promise;
			}
			// we fetch the states and set them for auto complete
			function getStates() {
				var deferred = $q.defer();
				$http.get(API_GLOBAL_SETTINGS.statesUrl).then(function (response) {
					deferred.resolve(response.data.states[0].states);
				});

				return deferred.promise;
			}

			return {
				getStates: getStates,
				getMakesAndModels: getMakesAndModels
			};
		}
]);
