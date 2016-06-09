(function() {
    'use strict';

    angular
        .module('parking.controllers')
        .controller('qrController', qrController)
        .controller('sensorQRController', sensorQRController)
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

    sensorQRController.$inject = ["api", "parkingService", "uuid"];

    function sensorQRController(api, parkingService, uuid){
        var vm = this;
        vm.register = register;

        function register(){
            var unique = uuid.v4();
            vm.sensorQR = unique;
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
        vm.deletePi = deletePi;
        vm.deleteSensor = deleteSensor;

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

        function deletePi(pi, index){
            var id = pi.raspberry_id;
            parkingService.deleteRaspberry(id).then(function(results){
                vm.sensors.splice(index,1);
            });
        }

        function deleteSensor(sensor, index, piIndex){
            parkingService.deleteSensor(sensor).then(function(results){
                console.log(vm.sensors[piIndex]);
                vm.sensors[piIndex].pi.sensors.splice(index,1);
            });
        }

        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
    }

})();