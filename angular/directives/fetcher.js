'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {
        // we fetch the products and show them. we save them into the array for future direct use
        function getProducts(callback) {
	        if((response === null)&&(firstTime)) {
	        	firstTime = false;
	        	callbackArray.push(callback);
				returnDummy(callback);
	        	$http.get(config.api).success(function(data, status, headers, config) {
				    response = data;
				}).error(function(data, status, headers, config) {
				    alert('Error on fetching from the server');
				}).then(function(){
					loaded = true;
					console.log('finish');
					// we must rework the app to be build whitout the need of this parsing
					products = sortProductsByCategory(response.products);
					categories = response.categories;
					for(var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
						if (typeof categories[categoriesCounter].info === 'string') {
							categories[categoriesCounter].info = JSON.parse(categories[categoriesCounter].info);
						}
					}
					// return the collections
					for(var callbackCounter = 0; callbackCounter < callbackArray.length; callbackCounter++) {
						callbackArray[callbackCounter](products, categories);
					}
				});
			} else {
				if(loaded) {
					callback(products, categories);
				} else {
					console.log('call');
					callbackArray.push(callback);
					returnDummy(callback);

				}

			}
        }

        return {
            getProducts: getProducts
        };
    }
]);
