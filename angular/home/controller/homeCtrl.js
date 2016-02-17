'use strict';

angular.module("Home")
    .controller("HomeCtrl", ["$scope", "fetcherSVC",
        function ($scope, fetcherSVC) {
            // here we activate the tooltip
            $(".infoTooltip").tooltip();
            // used to contain and show the array of states
            var states = [];
            // used to contain and show the array of makes
            $scope.makes = [];
            // used to contain and show the array of models
            $scope.models = [];
            // used to contain the selected attr in the form so we can easy send it
            $scope.form = {
                "from": null,
                "to": null,
                "make": "Select Make",
                "model": "Select Model",
                "isOperatable": "Yes",
                "transportType": "Open"
            };
            // we fetch the makes and models
            fetcherSVC.getMakesAndModels().then(function (result) {
                // we set the makes as results
                $scope.makes = result;
            });
            // we fetch the states
            fetcherSVC.getStates().then(function (result) {
                // we set the makes as results
                states = result;
                // we use jquery-ui for the autocomplete funcitonallity
                $("#from").autocomplete({
                    maxResults: 6,
                    source: function(request, response) {
                        var results = $.ui.autocomplete.filter(states, request.term);
                        response(results.slice(0, this.options.maxResults));
                    }
                });
                $("#to").autocomplete({
                    maxResults: 6,
                    source: function(request, response) {
                        var results = $.ui.autocomplete.filter(states, request.term);
                        response(results.slice(0, this.options.maxResults));
                    }
                });
            });
            // used to fill the second select based on the selected make
            $scope.fillModels = function () {
                // hide the result from the old search so we can dodge problems
                $scope.form.model = "Select Model";
                // we set the correct models in the options
                for (var modelCounter = 0; modelCounter < $scope.makes.length; modelCounter++) {
                    if ($scope.form.make === $scope.makes[modelCounter].id) {
                        $scope.models = $scope.makes[modelCounter].model;
                    }
                }
            };
            // used to send the form to the backend for calculation
            $scope.calculate = function () {
                // not enought data so we can implement dummy calculation logic into the nodejs
                // fetcherSVC.sendForCalculation($scope.form);
            };
            // used to clear the input on demand
            $scope.clear = function(formElement){
                $scope.form[formElement] = null;
            }
        }]);
