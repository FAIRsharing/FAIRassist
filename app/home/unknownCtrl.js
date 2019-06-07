define(['app'], function (app) {
    app.register.controller('View1Controller', ['$scope', '$window', '$http', function ($scope, $window, $http) {

        /* CONTENT */
        $scope.data = {};
        $scope.data.title = "List of FAIR evaluation services";
        $scope.data.labels = [
            "label 1",
            "label 2",
            "label 3",
            "label 4",
            "label 5"
        ];
        $scope.data.content = [
        ];

        /* DISPLAY */
        $scope.display = {};
        $scope.display.mobile = ($window.innerWidth <= 556) ;

        angular.element($window).bind('resize', function(){
           $scope.display.mobile = ($window.innerWidth <= 556) ;
           $scope.$digest();
           console.log($scope.display.mobile);
        });

        let spreadsheetID = "1gzt5eYLk-5MJ-EC1s8KDq5fpFcNQxa47PUWAGk2gHzw";
        let request = {
            method: 'GET',
            url: "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/full?alt=json"
        };

        $http(request).then(function(response){
            console.log(response)
            $scope.data.content = response.data['feed']['entry']
        })



    }])
});
