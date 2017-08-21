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
          $scope.Detail = {
              FlagID: $stateParams.FlagID,
              YogaLoginTitle:'',
          };
          var getYogaLoginTitle=function(FlagID){
            if (FlagID==='1'){
              $scope.Detail.YogaLoginTitle="管理员";
            } else if (FlagID==='2'){
                $scope.Detail.YogaLoginTitle="瑜伽馆主";
            }else{
                  $scope.Detail.YogaLoginTitle="会员";
            }
          };
          $scope.YogaLogin=function(){
          if ($scope.Detail.FlagID==='1'){

          } else{
            $scope.func_Putaway();
          }
        };
          getYogaLoginTitle($scope.Detail.FlagID);
          $scope.func_Putaway = function() {
              $state.go( 'putawayList', {}, {
                  reload: true
              } );
          };
          $scope.returnLogin = function () {
              $state.go('enquiryList', {
              }, {
                  reload: true
              });
          };

    }
]);
