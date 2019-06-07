define(['app'], function (app) {
    app.register.controller('View1Controller', ['$scope', '$window', function ($scope, $window) {

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
            {
                "abc": "defdefde fdefd efdefdefdefdefd ef",
                "def": "def defdef fdefdef def",
                "ijk": "def",
                "lmn": "def",
                "opc": "def"
            },
            {
                "abc": "def",
                "def": "def",
                "ijk": "def",
                "lmn": "def",
                "opc": "def"
            },
            {
                "abc": "def",
                "def": "def",
                "ijk": "def",
                "lmn": "def",
                "opc": "def"
            }
        ];

        /* DISPLAY */
        $scope.display = {};
        $scope.display.mobile = ($window.innerWidth <= 556) ;

        angular.element($window).bind('resize', function(){
           $scope.display.mobile = ($window.innerWidth <= 556) ;
           $scope.$digest();
           console.log($scope.display.mobile);
        });




    }])
});
