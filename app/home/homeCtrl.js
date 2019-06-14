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
        let spreadsheetID =  "11do5pyqEAI_mSq_kRWQpHe3GSGUtWOwlbe_uQW9sZs4";
        let request = {
            method: 'GET',
            url: "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/full?alt=json"
        };

        /* TRIGGERING THE QUERY AND BUILDING THE DATA */
        $http(request).then(function(response){
            $scope.display.labels = build_labels(response.data['feed']['entry'][0]);

            let output = [];
            let it = 0;
            for (let item_it in response.data['feed']['entry']) {
                if (response.data['feed']['entry'].hasOwnProperty(item_it)) {

                    let valid_item = false;
                    let new_item = {};

                    if (it > 0){
                        let item = response.data['feed']['entry'][item_it];

                        for (let field in item) {
                            if (item.hasOwnProperty(field) && field.indexOf('gsx$') > -1) {
                                new_item[$scope.display.labels[field]] = $sce.trustAsHtml(item[field]['$t'].replace(/\n/g, "<BR>").trim());
                                if (field === 'gsx$reviewed' && item[field]['$t'] === 'Y' ) {
                                    valid_item = true;
                                }
                            }
                        }
                    }
                    if (valid_item) {
                        output.push(new_item)
                    }
                }
                it++;
            }
            $scope.data.content = output;
        });

        /* PRIVATE FUNCTIONS */
        let build_labels = function(item){
            let labels = {};
            for (let field in item){
                if (item.hasOwnProperty(field)
                    && field.indexOf('gsx$') !== -1)
                {
                    labels[field] = item[field]['$t'];
                }
            }
            return labels;
        }
    }])
});
