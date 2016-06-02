(function() {
	'use strict';

	angular
		.module('parking', ['ngRoute','constants','ngCookies','ngStorage',
											'parking.services','parking.controllers'])
		.config(config);

	angular
		.module('parking.controllers', []);
  angular
		.module('parking.services', []);

	config.$inject = ["$routeProvider", "$locationProvider"];

	function config($routeProvider, $locationProvider) {
		
		$routeProvider.
			when('/qr/', {
				templateUrl: '/static/parking/partials/qr.html',
				controller: 'qrController',
				controllerAs: 'vm'
			}).
			when('/areas/', {
				templateUrl: '/static/parking/partials/areas.html',
				controller: 'areasController',
				controllerAs: 'vm'
			}).
			when('/area/:id', {
				templateUrl: '/static/parking/partials/area.html',
				controller: 'areaController',
				controllerAs: 'vm'
			}).
			otherwise({
				redirectTo: '/qr'
			});

	  $locationProvider.html5Mode(true);
	  
	}

})();
