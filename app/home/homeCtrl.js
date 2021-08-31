define(['app'], function (app) {
    app.register.controller('HomeController', ['$scope', '$window', '$http', '$sce', function ($scope, $window, $http, $sce) {

        /* CONTENT */
        $scope.data = {};
        $scope.data.title = "List of FAIR evaluation services";
        $scope.data.content = [];

        $scope.display = {};
        $scope.display.mobile = ($window.innerWidth <= 900) ;
        $scope.display.authorized_labels = [
            "Resource",
            "Execution-type",
            "Key-features",
            "Organisation",
            "Target-objects",
            "Reading-material"
        ];

        $scope.display.sorting_field = "Resource";
        $scope.display.sorting_order = {
            "Resource": false,
            "Execution-type": false,
            "Organisation": false,
            "Target-objects": false,
            "Reading-material": false
        };

        /* trigger the digest cycle when the window in re-sized to compute width vies */
        angular.element($window).bind('resize', function(){
           $scope.display.mobile = ($window.innerWidth <= 900) ;
           $scope.$digest();
        });

        /* Accessing the spreadsheet */
        const apiKey = "AIzaSyAJxTN38pXzhOqM99nGj6LhUYNTLUtDj1w",
          sheetID = "11do5pyqEAI_mSq_kRWQpHe3GSGUtWOwlbe_uQW9sZs4",
          sheetName = "FormResponses",
          baseURL = "https://sheets.googleapis.com/v4/spreadsheets/",
          url = baseURL + sheetID + '/values/' + sheetName  + "?alt=json&key=" + apiKey,
          request = {
            method: 'GET',
            url: url
          };

        /* TRIGGERING THE QUERY AND BUILDING THE DATA */
        $http(request).then(function(response){
            const data = response.data['values']
            $scope.display.labels = data[0].filter(obj => { return obj !== 'Timestamp'}) // build_labels(res[0]);
            let i = 0;
            data.forEach(obj => {
                if (i > 1 && ["Y", "True", "Yes", "y", "true", "yes"].includes(obj[13])) {
                    $scope.data.content.push( {
                        "Resource": $sce.trustAsHtml(obj[1]),
                        "Resource_URL": $sce.trustAsHtml(obj[2]),
                        "Execution-type": $sce.trustAsHtml(obj[3]),
                        "Key-features": $sce.trustAsHtml(obj[4].split("\n").join('<BR>')),
                        "Organisation": $sce.trustAsHtml(obj[5]),
                        "Target-objects": $sce.trustAsHtml(obj[7]),
                        "Reading-material": $sce.trustAsHtml(obj[8]),
                        "Reading-material_URL": $sce.trustAsHtml(obj[9])
                    })
                }
                i += 1;
            })
        });
    }])
});
