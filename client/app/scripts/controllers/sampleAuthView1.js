'use strict';


angular.module('clientApp')
    .controller('authView1Ctrl', function ($filter, $scope, $http, $rootScope, $cookieStore, $location) {
        var branch = $cookieStore.get('branch');
        $scope.branch = branch;
        $scope.userclick = false;
        $scope.checkdate = false;

        //datepicker code
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();


        $scope.format = 'yyyy-MM-dd';
        // END of datepicker code

        $scope.dataRequest1 = function () {

            $scope.userclick = true;
            //proceed to do your thing
            //request data by date(date here is an example)
            var date = $filter('date')($scope.dt, 'yyyy-MM-dd');
            var branch = $cookieStore.get('branch');
            //var date = '2013-12-31';
            var postData = {
                'branch': branch,
                'date': date
            };
            var request = $http.post('/dataRequest1', postData);
            request.success(function (data) {
                var resData = JSON.parse(data.dataset);
                // we'll come back to here and fill in more when ready
                $scope.myData = [];
                angular.forEach(resData, function (row) {
                    $scope.myData.push(row);
                    console.log(row);
                });

                $scope.displayData = [].concat($scope.myData);
                console.log('success:' + $scope.myData);

            }).error(function (data) {
                console.log('request error:' + data);
                $location.path('/main');
            });
        };

        $scope.dataRequest2 = function () {

            $scope.userclick = true;
            //proceed to do your thing
            //request data by date(date here is an example)
            var date = $filter('date')($scope.dt, 'yyyy-MM-dd');
            var branch = $cookieStore.get('branch');
            //var date = '2013-12-31';
            var postData = {
                'branch': branch,
                'date': date
            };
            var request = $http.post('/dataRequest2', postData);
            request.success(function (data) {
                var resData = JSON.parse(data.dataset);
                // we'll come back to here and fill in more when ready
                $scope.myData = [];
                angular.forEach(resData, function (row) {
                    $scope.myData.push(row);
                    console.log(row);
                });

                //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
                $scope.displayData = [].concat($scope.myData);
                console.log('success:' + $scope.myData);

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


        // $scope.myData = sampleData;
        //user authentication check:



    });