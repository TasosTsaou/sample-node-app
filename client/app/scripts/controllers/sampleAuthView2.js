'use strict';


angular.module('clientApp')
    .controller('authView2Ctrl', function ($filter, $scope, $http, $rootScope, $cookieStore, $location) {
        var branch = $cookieStore.get('branch');
        $scope.branch = branch;
        $scope.userclick = false;
        $scope.checkdate = false;
        var department;
        $scope.department = department = {};
        //datepicker code
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();


        $scope.format = 'yyyy-MM-dd';
        // END of datepicker code


        $scope.getAppointments = function () {
            $scope.checkdate = false;

            $scope.userclick = true;
            //proceed to do your thing
            //request data by date(date here is an example)

            var date = $filter('date')($scope.dt, 'yyyy-MM-dd');
            var depID = department.id;
            console.log('Department Selected: ' + department.id);
            var postData = {
                'date': date,
                'depID': depID
            };
            var request = $http.post('/dataRequest3', postData);
            request.success(function (data) {
                var resData = JSON.parse(data.dataset);

                $scope.appData = [];
                angular.forEach(resData, function (row) {
                    $scope.appData.push(row);
                    console.log(row);
                });

                //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
                $scope.displayAppData = [].concat($scope.appData);
                console.log('success:' + $scope.appData);

            }).error(function (data) {
                console.log('request error:' + data);
                $location.path('/main');
            });
        };


        //check if user is authenticated,if not send him to login page
        if ($cookieStore.get('id') !== undefined && $cookieStore.get('id') !== null) {
            console.log('scope username and cookie username match');

        } else {
            $location.path('/main');
        }


    });