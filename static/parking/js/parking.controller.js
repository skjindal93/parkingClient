(function() {
    'use strict';

    angular
        .module('parking.controllers')
        .controller('qrController', qrController)
        .controller('areasController', areasController)
        .controller('areaController', areaController);
    
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

    areasController.$inject = ["api", "parkingService", "$window"];

    function areasController(api, parkingService, $window){
        var vm = this;
        vm.area = area;

        launch();

        function launch(){
            getParkingAreas();
        }

        function getParkingAreas(){
            parkingService.parkingAreas().then(function(results){
                vm.areas = results.data;
            });
        }

        function area(id){
            $window.location.href="area/"+id;
        }
    }

    areaController.$inject = ["api", "ports", "parkingService", "$routeParams"];

    function areaController(api, ports, parkingService, $routeParams){
        var vm = this;
        vm.id = $routeParams.id;
        vm.checkPiStatus = checkPiStatus;

        launch();

        function launch(){
            getAreaSensors(vm.id);
        }

        function getAreaSensors(id){
            parkingService.parkingSensors(id).then(function(results){
                findEmptyPorts(results.data);
                console.log(results.data);
                vm.sensors = results.data;
            });
        }

        function findEmptyPorts(area){
            for (var i=0; i<area.length; i++){
                var temp = [];
                
                for (var j=0; j<area[i].pi.sensors.length; j++){
                    var port = area[i].pi.sensors[j].pi_port;
                    temp.push(port);
                }
                area[i]["empty_ports"] = ports.diff(temp);
            }
        }

        function checkPiStatus(pi) {
            var id = pi.raspberry_id;
            parkingService.getPiStatus(id).then(function(results){
                if (results.data == "1")
                    pi.status = true;
                else
                    pi.status = false;
            });
        }

        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
    }

})();