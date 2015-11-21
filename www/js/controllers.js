app.controller(
    'HomeScreenCtrl',
    ['$scope', '$state', '$ionicPlatform',
    function($scope, $state, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            $scope.callGFit = function() {
                console.log("In callGFit()...");
                var end_time = new Date().getTime();
                var start_time = end_time - 1 * 1000*60*60*24   // Go back one day
                window.plugins.googlefit.getStuff1(
                    start_time,    // Start time in milliseconds
                    end_time,    // Start time in milliseconds
                    ['com.google.step_count.delta'],        // Datatypes under the URL format specified by GoogleFit
                    function(data) {
                        // Success callback. The data object is a JSON that follows
                        // the structure of GoogleFit data structures
                        console.log("Data: " + JSON.stringify(data));
                        // $scope.gfit_data = JSON.stringify(data);
                        $scope.gfit_step_count = $scope.calculateSteps(data);
                        $scope.$apply();
                    },
                    function(e) {
                        // The error e is returned in case of problems with the query
                        console.log("Error: " + JSON.stringify(e));
                        // $scope.gfit_data = JSON.stringify(e);
                        $scope.gfit_step_count = $scope.calculateSteps(null);
                        $scope.$apply();
                    }
                );
            };
            $scope.callGFit();
            $scope.calculateSteps = function(data) {
                console.log("In calculateSteps");
                // Check if there is no error
                if(data == null) {
                    return 0;
                }
                // If no error, there is data available
                var step_count = 0;
                var total_data = data[0];
                var step_data = null;
                // Process each of the step_count.delta values
                for(var i=0; i < total_data.length; i++) {
                    step_data = total_data[i].fields[0];
                    if(step_data.field == 'steps') {
                        step_count += parseInt(step_data.value);
                    }
                }
                return step_count;
            };
        });
    }
    ]
);
