(function() {
	'use strict';

	angular
		.module('parking.services')
        .factory('parkingService', parkingService);

    parkingService.$inject = ['$http', 'api'];

    function parkingService($http, api) {

        var parkingService = {
            registerQr: registerQr,

        };
        // this.getCategories = getCategories;
        return parkingService;

        function registerQr() {
            return $http({
                url: api+'installation/registerPi/',
                method: 'GET'
            });
        };
    }
	
})();