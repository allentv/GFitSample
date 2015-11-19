app.controller(
    'HomeScreenCtrl',
    ['$scope', '$state', '$ionicPlatform',
    function($scope, $state, $ionicPlatform) {
        $scope.controller_status = "In controller...";
        $scope.gfit_data = "Fetching...";
        $scope.gfit_call_counter = 0;
        $ionicPlatform.ready(function(){
        this.callGFit = function() {
            var end_time = new Date().getTime();
            var start_time = end_time - 5 * 1000*60*60*24   // Go back one day
            GFitPlugin.getStuff1(
                start_time,
                end_time,
                ['com.google.step_count.delta'],
                function(data) {
                    // console.log("Data recevied : " + data);
                    $scope.gfit_data = data;
                },
                function(e) {
                    // console.log("Error received :" + e);
                    $scope.gfit_data = e;
                }
            );
        };
        $scope.gfit_call_counter = 1;
        this.callGFit();
        // $scope.gfit_call_counter = 2;
        // this.callGFit();
        // $scope.gfit_call_counter = 3;
        // this.callGFit();
        // $scope.gfit_call_counter = 4;
        // this.callGFit();
        // $scope.gfit_call_counter = 5;
        // this.callGFit();
        });
    }
    ]
);
