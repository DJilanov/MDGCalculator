'use strict';

angular.module('Home')
	.value("API_GLOBAL_SETTINGS", {
		// deployed api on heroku
		makesAndModelsUrl: "https://agile-hollows-13663.herokuapp.com/api/makesAndModels"
	})
	.factory('fetcherSVC', ['$http', '$q', 'API_GLOBAL_SETTINGS',
		function($http, $q, API_GLOBAL_SETTINGS) {
			var url = API_GLOBAL_SETTINGS.makesAndModelsUrl;
			// we fetch the products and show them. we save them into the array for future direct use
			function getMakesAndModels() {
				var deferred = $q.defer();
				$http.get(url).then(function (response) {
					deferred.resolve(response.data.makesAndModels[0].carsAndModels);
				});

				return deferred.promise;
			}

			return {
				getMakesAndModels: getMakesAndModels,
			};
		}
])
