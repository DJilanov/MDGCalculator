'use strict';

angular.module('Home')
	.value("API_GLOBAL_SETTINGS", {
		makesAndModelsUrl: "http://jilanov.eu:8080/api/home"
	})
	.factory('fetcherSVC', ['$http', '$q', 'API_GLOBAL_SETTINGS',
		function($http, $q, API_GLOBAL_SETTINGS) {
			var url = API_GLOBAL_SETTINGS.makesAndModelsUrl;
			// we fetch the products and show them. we save them into the array for future direct use
			function getMakesAndModels() {
				var deferred = $q.defer();
				$http.get(url).then(function (response) {
					deferred.resolve(response.data);
				});

				return deferred.promise;
			}

			return {
				getMakesAndModels: getMakesAndModels,
			};
		}
])
