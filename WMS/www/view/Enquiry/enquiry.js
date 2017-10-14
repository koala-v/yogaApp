appControllers.controller('EnquiryListCtrl', [
    'ENV',
    '$scope',
    '$stateParams',
    '$state',
    '$cordovaKeyboard',
    '$cordovaBarcodeScanner',
    '$cordovaToast',
    'ionicDatePicker',
    'ApiService',
    'PopupService',
    function (
        ENV,
        $scope,
        $stateParams,
        $state,
        $cordovaKeyboard,
        $cordovaBarcodeScanner,
        $cordovaToast,
        ionicDatePicker,
        ApiService,
        PopupService) {
          $scope.func_GR = function () {
              $state.go('grList', {}, {
                  reload: true
              });
          };
          $scope.user = {
           username: "",
           password:  "",
           isChecked: false,
           phone: '',
           vercode:''
       };
       $scope.$on('$stateChangeSuccess', function () {
          //  if (Storage.get("loginInfo") !== null) {
          //      $scope.user.username = Storage.get("loginInfo").username;
          //      $scope.user.password = Storage.get("loginInfo").password;
          //      $scope.user.isChecked = Storage.get("loginInfo").isChecked;
          //  }
          //  else {
          //      $scope.user.username = "";
          //      $scope.user.password = "";
          //      $scope.user.isChecked = false;
          //  }
       });

       //登录
       $scope.signIn = function () {

           userFactory.login($scope.user.username, $scope.user.password);
       };

       $scope.$on('User.loginUpdated', function () {
           console.log("User.loginUpdated");
           var userRel = userFactory.getCurrentUser();
           console.log(userRel);
           if (userRel.status != "1") {//登陆失败
               $ionicLoading.show({
                   noBackdrop: true,
                   template: userRel.msg,
                   duration: 1500
               });
           } else {
               if ($scope.user.isChecked) {
                   Storage.set("loginInfo", $scope.user);
               } else {
                   Storage.remove("loginInfo");
               }
               $state.go('app.user');  //路由跳转

           }
       });

       //登录切换
       $scope.isloginModel = true;
       $scope.isgeneralCss = "sub_button_select";
       $scope.isfastCss = "";
       $scope.changeModel = function (lm) {

           if (lm === 0) {
               $scope.isgeneralCss = "sub_button_select";
               $scope.isloginModel = true;
               $scope.isfastCss = "";
           }
           if (lm === 1) {

               $scope.isgeneralCss = "";
               $scope.isfastCss = "sub_button_select";
               $scope.isloginModel = false;
           }
       };
       $scope.registerclick = function () {
           $state.go("register");
       };
        $scope.returnMain = function () {
            $state.go('index.main', {

            }, {
                reload: true
            });
        };
        $scope.GoToDetail = function (FlagID) {
            $state.go('EnquiryDetail', {
                'FlagID': FlagID,
            }, {
                reload: true
            });
        };
    }
]);

appControllers.controller('EnquiryDetailCtrl', [
    'ENV',
    '$scope',
    '$rootScope',
    '$stateParams',
    '$state',
    '$timeout',
    '$ionicPlatform',
    '$ionicHistory',
    '$ionicPopup',
    '$ionicModal',
    '$ionicLoading',
    '$cordovaToast',
    '$cordovaBarcodeScanner',
    'ApiService',
    'SqlService',
    'PopupService',
    function (
        ENV,
        $scope,
        $rootScope,
        $stateParams,
        $state,
        $timeout,
        $ionicPlatform,
        $ionicHistory,
        $ionicPopup,
        $ionicModal,
        $ionicLoading,
        $cordovaToast,
        $cordovaBarcodeScanner,
        ApiService,
        SqlService,
        PopupService) {
        var popup = null;
        $scope.Detail = {
            FlagID: $stateParams.FlagID,
            YogaLoginTitle: '',
            PhoneNumber: '',
            PassWord: ''
        };
        var getYogaLoginTitle = function (FlagID) {
            if (FlagID === '1') {
                $scope.Detail.YogaLoginTitle = "管理员";
            } else if (FlagID === '2') {
                $scope.Detail.YogaLoginTitle = "瑜伽馆主";
            } else {
                $scope.Detail.YogaLoginTitle = "会员";
            }
        };

        // var Sayglogin = function () {
        //     if (window.cordova && window.cordova.plugins.Keyboard) {
        //         cordova.plugins.Keyboard.close();
        //     }
        //     if ($scope.Detail.PhoneNumber === '') {
        //         PopupService.Info(null, '请输入正确的电话号码，密码', '').then(function (res) {});
        //         $timeout(function () {}, 2500);
        //         return;
        //     }
        //
        //     var objUri = ApiService.Uri(true, '/api/Yoga/Sayg1/Check');
        //     objUri.addSearch('PhoneNumber', $scope.Detail.PhoneNumber);
        //     objUri.addSearch('Password', $scope.Detail.PassWord);
        //     ApiService.Get(objUri, true).then(function success(result) {
        //         if (result.data.results.length > 0) {
        //             $rootScope.$broadcast('login');
        //             sessionStorage.clear();
        //             sessionStorage.setItem('UserId', $scope.Detail.PhoneNumber);
        //             $scope.func_Putaway();
        //         } else {
        //             PopupService.Info(null, '请输入正确的电话号码，密码', '').then(function (res) {});
        //         }
        //     });
        // };

        var Samrlogin = function () {
            var objUri = '';
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.close();
            }
            if ($scope.Detail.PhoneNumber === '') {
                PopupService.Info(null, '请输入正确的电话号码，密码', '').then(function (res) {});
                $timeout(function () {}, 2500);
                return;
            }

            if ($scope.Detail.FlagID === '2') {
                objUri = ApiService.Uri(true, '/api/Yoga/Sayg1/Check');
            } else if ($scope.Detail.FlagID === '3') {
                objUri = ApiService.Uri(true, '/api/Yoga/Smar1/Check');
            } else {}
            objUri.addSearch('PhoneNumber', $scope.Detail.PhoneNumber);
            objUri.addSearch('Password', $scope.Detail.PassWord);
            ApiService.Get(objUri, true).then(function success(result) {
                if (result.data.results !== 'undefined') {
                    if (result.data.results.length > 0) {
                        $rootScope.$broadcast('login');
                        sessionStorage.clear();
                        sessionStorage.setItem('PhoneNumber', $scope.Detail.PhoneNumber);
                        $scope.func_Putaway();
                    } else {
                        PopupService.Info(null, '请输入正确的电话号码，密码', '').then(function (res) {});
                    }
                } else {
                    PopupService.Info(null, '请输入正确的电话号码，密码', '').then(function (res) {});
                }
            });
        };
        $scope.YogaLogin = function () {
            if ($scope.Detail.FlagID === '1') {

            } else if ($scope.Detail.FlagID === '2') {
                Samrlogin();
            } else {
                Samrlogin();
            }
        };
        getYogaLoginTitle($scope.Detail.FlagID);
        $scope.func_Putaway = function () {
            $state.go('putawayList', {}, {
                reload: true
            });
        };
        $scope.returnLogin = function () {
            $state.go('enquiryList', {}, {
                reload: true
            });
        };

    }
]);
