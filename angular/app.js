"use strict";
// here we set all of the modules we are going to integrate
var _mainModules = [
    "ngRoute"
    ,"ngResource"
    ,"Home"
];

angular.module("app", _mainModules )
    .config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider){
        $routeProvider
            .otherwise({
                redirectTo: "/home"
            });

        var routes = [];

        routes.push({
            name: "/home",
            params: {
                templateUrl:  "./angular/home/view/home.html",
                controller: "HomeCtrl"
            }
        });

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });

        var $http,
            interceptor = ["$q", "$injector", function ($q, $injector) {
                var notificationChannel;

                function success(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get("$http");
                    // don"t send notification until all requests are complete
                    if ($http.pendingRequests.length < 1) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get("requestNotificationChannelSvc");
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }
                    return response;
                }

                function error(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get("$http");
                    // don"t send notification until all requests are complete
                    if ($http.pendingRequests.length < 1) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get("requestNotificationChannelSvc");
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }
                    return $q.reject(response);
                }

                return function (promise) {
                    // get requestNotificationChannel via $injector because of circular dependency problem
                    notificationChannel = notificationChannel || $injector.get("requestNotificationChannelSvc");
                    // send a notification requests are complete
                    notificationChannel.requestStarted();
                    return promise.then(success, error);
                };
            }];

        $httpProvider.interceptors.push(interceptor);

    }])
    .constant("serverErrorMsg","Server error!")
    .constant("sessionToken", "session-token");



