appControllers.controller('GrListCtrl', [
    'ENV',
    '$scope',
    '$stateParams',
    '$state',
    '$cordovaKeyboard',
    '$interval',
    'ionicDatePicker',
    'ApiService',
    'PopupService',
    function (
        ENV,
        $scope,
        $stateParams,
        $state,
        $cordovaKeyboard,
        $interval,
        ionicDatePicker,
        ApiService,
        PopupService) {
        $scope.canClick = false;
        $scope.description = "获取验证码";
        var second = 59;
        var timerHandler;
        $scope.getTestCode = function () {
            timerHandler = $interval(function () {
                if (second <= 0) {
                    $interval.cancel(timerHandler);
                    second = 59;
                    $scope.description = "获取验证码";
                    $scope.canClick = false;
                } else {
                    $scope.description = second + "s后重发";
                    second--;
                    $scope.canClick = true;
                }
            }, 1000)
        };
        $scope.returnMain = function () {
            $state.go('index.main', {}, {
                reload: true
            });
        };

        $scope.GoToDetail = function (FlagID) {
            if (FlagID === 1) {
                $state.go('grDetail', {
                    'FlagID': FlagID,
                }, {
                    reload: true
                });
            } else {
                $state.go('grSaygRegister', {
                    'FlagID': FlagID,
                }, {
                    reload: true
                });

            }
        };
    }
]);

appControllers.controller('GrDetailCtrl', [
    'ENV',
    '$scope',
    '$stateParams',
    '$state',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicLoading',
    '$ionicPopup',
    '$ionicModal',
    '$cordovaKeyboard',
    '$cordovaToast',
    '$cordovaBarcodeScanner',
    'SqlService',
    'ApiService',
    'PopupService',
    function (
        ENV,
        $scope,
        $stateParams,
        $state,
        $http,
        $timeout,
        $ionicHistory,
        $ionicLoading,
        $ionicPopup,
        $ionicModal,
        $cordovaKeyboard,
        $cordovaToast,
        $cordovaBarcodeScanner,
        SqlService,
        ApiService,
        PopupService) {
        var popup = null;
        $scope.Detail = {
            FlagID: $stateParams.FlagID,
            AreaCode: '',
            YogaStudioName: '',
            PhoneNumber: '',
            PassWord: '',
            Sex: '',
            Remark: '',

        };
        $scope.refreshSayg1_AreaCode = function (AreaCode) {
            if (is.not.undefined(AreaCode) && is.not.empty(AreaCode)) {
                var objUri = ApiService.Uri(true, '/api/Yoga/Sayg1/AreaCode');
                objUri.addSearch('AreaCode', AreaCode);
                ApiService.Get(objUri, false).then(function success(result) {
                    $scope.Sayg1s_AreaCode = result.data.results;
                });
            }
        };

        $scope.refreshSayg1_YogaStudioName = function (YogaStudioName) {
            if (is.not.undefined(YogaStudioName) && is.not.empty(YogaStudioName)) {
                var objUri = ApiService.Uri(true, '/api/Yoga/Sayg1/YogaStudioName');
                objUri.addSearch('YogaStudioName', YogaStudioName);
                ApiService.Get(objUri, false).then(function success(result) {
                    $scope.Sayg1s_YogaStudioName = result.data.results;
                });
            }
        };

        $scope.Confirm = function () {
            $scope.Detail.YogaStudioName = $scope.Sayg1s_YogaStudioName[0].YogaStudioName;
            $scope.Detail.AreaCode = $scope.Sayg1s_YogaStudioName[0].AreaCode;
            if ($scope.Detail.Sex === 'Man') {
                $scope.Detail.Sex = '男';
            } else if ($scope.Detail.Sex === 'WoMan') {
                $scope.Detail.Sex = '女';
            } else {
                $scope.Detail.Sex = '';
            }

            var arrsayg = [];
            arrsayg.push($scope.Detail);
            var jsonData = {
                "UpdateAllString": JSON.stringify(arrsayg)
            };
            var objUri = ApiService.Uri(true, '/api/Yoga/Smar1/Comfirm');
            ApiService.Post(objUri, jsonData, true).then(function success(result) {
                PopupService.Info(null, '注册成功', '').then(function (res) {

                });
            });
        };

        $scope.returnList = function () {
            if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                $state.go('grList', {}, {
                    reload: true
                });
            }
        };

    }
]);

appControllers.controller('GrSaygRegisterCtrl', [
    'ENV',
    '$scope',
    '$stateParams',
    '$state',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicLoading',
    '$ionicPopup',
    '$ionicModal',
    '$cordovaKeyboard',
    '$cordovaToast',
    '$cordovaBarcodeScanner',
    'SqlService',
    'ApiService',
    'PopupService',
    function (
        ENV,
        $scope,
        $stateParams,
        $state,
        $http,
        $timeout,
        $ionicHistory,
        $ionicLoading,
        $ionicPopup,
        $ionicModal,
        $cordovaKeyboard,
        $cordovaToast,
        $cordovaBarcodeScanner,
        SqlService,
        ApiService,
        PopupService) {
        var popup = null;
        $scope.Detail = {
            FlagID: $stateParams.FlagID,
            YogaStudioName: '',
            Name: '',
            AreaCode: '',
            Address: '',
            Businesslicense: '',
            IDCard: '',
            Sex: '',
            Remark: '',
            PhoneNumber: '',
            PassWord: '',

        };
        $scope.Confirm = function () {
            if ($scope.Detail.Sex === 'Man') {
                $scope.Detail.Sex = '男';
            } else if ($scope.Detail.Sex === 'WoMan') {
                $scope.Detail.Sex = '女';
            } else {
                $scope.Detail.Sex = '';
            }

            var arrsayg = [];
            arrsayg.push($scope.Detail);
            var jsonData = {
                "UpdateAllString": JSON.stringify(arrsayg)
            };
            var objUri = ApiService.Uri(true, '/api/Yoga/Sayg1/Comfirm');
            ApiService.Post(objUri, jsonData, true).then(function success(result) {
                PopupService.Info(null, '注册成功', '').then(function (res) {

                });
            });
        };
        $scope.returnList = function () {
            if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                $state.go('grList', {}, {
                    reload: true
                });
            }
        };

    }
]);
