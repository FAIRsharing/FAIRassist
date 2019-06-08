define(['app'], function (app) {
    app.register.controller('View1Controller', ['$scope', '$window', '$http', function ($scope, $window, $http) {

        /* CONTENT */
        $scope.data = {};
        $scope.data.title = "List of FAIR evaluation services";
        $scope.data.content = [];
        $scope.display = {};
        $scope.display.mobile = ($window.innerWidth <= 900) ;

        /* trigger the digest cycle when the window in re-sized to compute width vies */
        angular.element($window).bind('resize', function(){
           $scope.display.mobile = ($window.innerWidth <= 900) ;
           $scope.$digest();
        });

        /* Accessing the spreadsheet */
        let spreadsheetID = "1gzt5eYLk-5MJ-EC1s8KDq5fpFcNQxa47PUWAGk2gHzw";
        let request = {
            method: 'GET',
            url: "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/full?alt=json"
        };
        $http(request).then(function(response){
            $scope.data.content = response.data['feed']['entry'];
            $scope.display.labels = build_labels(response.data['feed']['entry'][0]);
        });

        /* PRIVATE FUNCTIONS */

        let build_labels = function(item){
            /* Builds the labels using the first item in the response list */
            let labels = [];
            for (let field in item){
                if (item.hasOwnProperty(field) && field.indexOf('gsx$') !== -1){
                    let label = field.replace('gsx$', '');
                    labels.push({property: field, label: label})
                }
            }

            return labels;
        }



    }])
});
