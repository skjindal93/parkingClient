(function() {
	'use strict';

	angular
		.module('parking.services')
        .factory('parkingService', parkingService);

    parkingService.$inject = ['$http', 'api'];

    function parkingService($http, api) {

        var parkingService = {
            registerQr: registerQr,
            parkingAreas: parkingAreas,
            parkingSensors: parkingSensors,
            getPiStatus: getPiStatus,
            deleteRaspberry: deleteRaspberry,
            deleteSensor: deleteSensor

        };
        // this.getCategories = getCategories;
        return parkingService;

        function registerQr() {
            return $http({
                url: api+'installation/registerPi/',
                method: 'GET'
            });
        };

        function parkingAreas() {
            return $http({
                url: api+'parking/parkingAreas/',
                method: 'GET'
            });
        }

        function parkingSensors(id) {
            return $http({
                url: api+'parking/areaSensors/?area='+id,
                method: 'GET'
            });
        }

        function getPiStatus(pi) {
            return $http({
                url: api+'parking/checkStatus/?pi='+pi,
                method: 'GET'
            });
        }

        function deleteRaspberry(pi){

            return $http({
                url: api+'parking/deleteRaspberry/'+pi+'/',
                method: 'DELETE'
            });
        }

        function deleteSensor(sensor){

            return $http({
                url: api+'parking/deleteSensor/'+sensor+'/',
                method: 'DELETE'
            });
        }
    }
	
})();