angular.module('ngWhisk')
    .controller('requestController', function($scope, $http, $log, $rootScope, ngDialog) {
        $log.log('inside');
        var API_URL = 'Your OpenWhisk API'; // OpenWhisk exposed API
        $scope.emailSent = false; // setting message logic to false not display any message by default

        $scope.sendMail = function () { //The send button will call this method to make an API to a OpenWhisk Action exposed as a API

            //scope binding the form data
            var data = {
                myName: $scope.myName,
                myEmail: $scope.myEmail,
                myUrl: $scope.myUrl,
                myDescription: $scope.myDescription
            };
            // adding content type for post header, this is needed for when calling OpenWhisk API
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            // Simple POST request example (passing data) :
            $http.post(API_URL, data, config)
                .then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $log.log('Email Sent with response status of: ' + JSON.stringify(response.status));
                    $scope.emailSent = true;

                    // Injecting success into the array of alerts
                    $scope.alerts = [ {type: 'success', msg: ''} ];
                    $scope.alerts[0].msg = 'Thanks, ' + $scope.myName + ' we have got your request, and we will be in touch. ';

                    // After user sent the email, then clear the values to be empty
                    $scope.myName = "";
                    $scope.myEmail = "";
                    $scope.myUrl = "";
                    $scope.myDescription = "";
                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.log("Error occurred with status: " + '' + JSON.stringify(response.status));
                    $scope.emailSent = true;

                    // if there was an error, then display this message
                    $scope.alerts = [
                        {type: 'danger', msg: ''}
                    ];
                    $scope.alerts[0].msg = 'Oops there was a problem sending your request, please contact Twana Daniel at twanaazi@ie.ibm.com';
                });
        };



        // Remove alert message area
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };


        ///////Handling the popup
        $rootScope.jsonData = '{"foo": "bar"}';
        $rootScope.theme = 'ngdialog-theme-default';
        $scope.open = function () {
            ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl' });
        };

        $scope.openDefault = function () {
            ngDialog.open({
                template: 'firstDialogId',
                controller: 'InsideCtrl',
                className: 'ngdialog-theme-default'
            });
        };

        $scope.openPlain = function () {
            $rootScope.theme = 'ngdialog-theme-plain';

            ngDialog.open({
                template: 'firstDialogId',
                controller: 'InsideCtrl',
                className: 'ngdialog-theme-plain'
            });
        };

        $scope.openTemplate = function () {
            $scope.value = true;

            ngDialog.open({
                template: 'externalTemplate.html',
                className: 'ngdialog-theme-plain',
                scope: $scope
            });
        };

    });


//popup ctrl
angular
    .module('ngWhisk')
    .controller('InsideCtrl', function ($scope, ngDialog) {
        $scope.openSecond = function () {
            ngDialog.open({
                template: '<h3><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
                plain: true,
                closeByEscape: false,
                controller: 'SecondModalCtrl'
            });
        };
    });

angular
    .module('ngWhisk')
    .controller('SecondModalCtrl', function ($scope, ngDialog) {
        $scope.closeSecond = function () {
            ngDialog.close();
        };
    });

