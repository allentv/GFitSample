app.controller(
    'HomeScreenCtrl',
    ['$scope', '$state', '$ionicPlatform',
    function($scope, $state, $ionicPlatform) {
        $scope.controller_status = "In controller...";
        $scope.gfit_data = "Fetching...";
        $scope.gfit_call_counter = 0;
        $ionicPlatform.ready(function() {
            $scope.callGFit = function() {
                console.log("In callGFit()...");
                var end_time = new Date().getTime();
                var start_time = end_time - 5 * 1000*60*60*24   // Go back one day
                $scope.gfit_call_counter += 1;
                window.plugins.googlefit.getStuff1(
                    start_time,    // Start time in milliseconds
                    end_time,    // Start time in milliseconds
                    ['com.google.step_count.delta'],        // Datatypes under the URL format specified by GoogleFit
                    function(data) {
                        // Success callback. The data object is a JSON that follows
                        // the structure of GoogleFit data structures
                        console.log("Data: " + JSON.stringify(data));
                        $scope.gfit_data = JSON.stringify(data);
                    },
                    function(e) {
                        // The error e is returned in case of problems with the query
                        console.log("Error: " + JSON.stringify(e));
                        $scope.gfit_data = JSON.stringify(e);
                    }
                );
            };
            $scope.callGFit();
            $scope.callGFit();
        });
    }
    ]
);
