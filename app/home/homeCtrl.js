define(['app'], function (app) {
    app.register.controller('HomeController', ['$scope', '$window', '$http', '$sce', function ($scope, $window, $http, $sce) {

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
        let spreadsheetID =  "1sDm6rnDXtpmxyh_aw5bvj5gItSwh-x6a8HfuI3V_eUg";
        let request = {
            method: 'GET',
            url: "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/full?alt=json"
        };
        $http(request).then(function(response){
            $scope.data.content = response.data['feed']['entry'];

            /* Processing safe HTML */
            for (let item in $scope.data.content) {
                if ($scope.data.content.hasOwnProperty(item)) {
                    $scope.data.content[item]['gsx$describethekeyelementsofyourresource']['$t'] =
                        $sce.trustAsHtml($scope.data.content[item]['gsx$describethekeyelementsofyourresource']['$t'].trim().replace(/\n/g, '<BR>'));
                    $scope.data.content[item]['gsx$whattypeofexecutionisit']['$t'] =
                        $sce.trustAsHtml($scope.data.content[item]['gsx$whattypeofexecutionisit']['$t'].trim().replace(/,/g, '<BR>'));

                }
            }
            $scope.display.labels = build_labels(response.data['feed']['entry'][0]);
        });

        /* PRIVATE FUNCTIONS */

        let build_labels = function(item){
            /* Builds the labels using the first item in the response list */
            let labels = [];
            let ignored_labels = [
                "Label", "ResourceURL", "OrganizationURL", "MaterialURL", "Reviewed"
            ];
            for (let field in item){
                if (item.hasOwnProperty(field)
                    && field.indexOf('gsx$') !== -1
                    && ignored_labels.indexOf(item[field]['$t']) === -1)
                {
                    console.log(field);
                    console.log(item[field]);
                    let label = item[field]['$t'];
                    labels.push({property: field, label: label})
                }
            }

            return labels;
        }



    }])
});
