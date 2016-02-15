'use strict';

angular.module('Home')
    .controller('HomeCtrl', ['$scope', 'fetcherSVC',
        function ($scope, fetcherSVC) {
			// here we activate the tooltip
			$('.infoTooltip').tooltip();
			// we declare the scope variables we are going to use
			// used to contain and show the array of makes
			$scope.makes = [];
			// used to contain and show the array of models
			$scope.models = [];
			// we fetch the makes and models
			fetcherSVC.getMakesAndModels()
				.then(function (result) {
					$scope.makes = result;
				});
			// used to fill the second select based on the selected make
			$scope.fillModels = function(result) {

			};
		}]);
