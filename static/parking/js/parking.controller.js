(function() {
    'use strict';

    angular
        .module('parking.controllers')
        .controller('qrController', qrController);
    
    qrController.$inject = ["api","parkingService"];

    function qrController(api, parkingService){
        var vm = this;
        vm.register = register;

        function register(){
            parkingService.registerQr().then(function(results){
                var img = results.data.svg;
                vm.qr = api+'media/'+img;
            });
        }
    }
})();