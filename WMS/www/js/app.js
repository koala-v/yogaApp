'use strict';
var app = angular.module( 'WMSEGDCAPP', [
    'ionic',
    'jett.ionic.filter.bar',
    'ionic-datepicker',
    'ngCordova',
    'WMSAPP.config',
    'WMSAPP.factories',
    'WMSAPP.services',
    'WMSAPP.controllers'
] );
app.run( [
    'ENV',
    '$ionicPlatform',
    '$rootScope',
    '$cordovaSplashscreen',
    '$state',
    '$location',
    '$timeout',
    '$ionicPopup',
    '$ionicHistory',
    '$ionicLoading',
    '$cordovaKeyboard',
    '$cordovaToast',
    '$cordovaFile',
    'SqlService',
    'PopupService',
    'ApiService',
    'TABLE_DB',
    function (
        ENV,
        $ionicPlatform,
        $rootScope,
        $cordovaSplashscreen,
        $state,
        $location,
        $timeout,
        $ionicPopup,
        $ionicHistory,
        $ionicLoading,
        $cordovaKeyboard,
        $cordovaToast,
        $cordovaFile,
        SqlService,
        PopupService,
        ApiService,
        TABLE_DB ) {
        if ( window.cordova ) {
            ENV.fromWeb = false;
        } else {
            ENV.fromWeb = true;
        }

        $ionicPlatform.ready( function () {

            if ( !ENV.fromWeb ) {
                $cordovaKeyboard.hideAccessoryBar( true );
                $cordovaKeyboard.disableScroll( true );
                  // $cordovaSplashscreen.hide();
                  navigator.splashscreen.hide();
            }
            if ( window.StatusBar ) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            SqlService.Init().then(function(res){
                console.log('DB initialized');

            });

        } );
        $ionicPlatform.registerBackButtonAction( function ( e ) {
            if ($cordovaKeyboard.isVisible()) {
                $cordovaKeyboard.close();
            }
            // Is there a page to go back to $state.include
            if ( $state.includes( 'index.main' ) || $state.includes( 'index.login' ) || $state.includes( 'splash' ) ) {
                if ( $rootScope.backButtonPressedOnceToExit ) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showShortBottom( 'Press again to exit.' );
                    setTimeout( function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000 );
                }
            } else if (
                $state.includes( 'enquiryList' ) ||
                $state.includes( 'grList' ) ||
                $state.includes( 'pickingDetail' ) ||
                $state.includes( 'gtList' ) ||
                $state.includes( 'vginDetail' ) ) {
                $state.go( 'index.main', {}, {
                    reload: true
                } );
            } else if ( $state.includes( 'grDetail' ) ) {
                $state.go( 'grList', {} );
            }    else if ( $state.includes( 'pickingDetail' ) ) {
                $state.go( 'pickingList', {} );
            } else if ( $state.includes( 'vginDetail' ) ) {
                $state.go( 'vginList', {} );
            } else if ( $state.includes( 'putawayList' ) ) {
                PopupService.Confirm(null,'Return','Are you sure to return?').then(function(res){
                    if(res){
                        $state.go( 'index.main', {}, {
                            reload: true
                        } );
                    }
                });
            } else if ( $ionicHistory.backView() ) {
                $ionicHistory.goBack();
            } else {
                // This is the last page: Show confirmation popup
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortBottom( 'Press again to exit.' );
                setTimeout( function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000 );
            }
            e.preventDefault();
            return false;
        }, 101 );

} ] );

app.config( [ '$httpProvider', '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
    function ( $httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.platform.ios.tabs.style( 'standard' );
        $ionicConfigProvider.platform.ios.tabs.position( 'top' );
        $ionicConfigProvider.platform.android.tabs.style( 'standard' );
        $ionicConfigProvider.platform.android.tabs.position( 'top' )
         $ionicConfigProvider.tabs.position('bottom');
            /*
            $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
            $ionicConfigProvider.platform.android.navBar.alignTitle('center');
            $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
            $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
            $ionicConfigProvider.platform.ios.views.transition('ios');
            $ionicConfigProvider.platform.android.views.transition('android');
            */
            //$ionicConfigProvider.views.forwardCache(true);//开启全局缓存
        $ionicConfigProvider.views.maxCache( 3 ); //关闭缓存
        $httpProvider.defaults.headers.put[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [ function ( data ) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function ( obj ) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for ( name in obj ) {
                    value = obj[ name ];

                    if ( value instanceof Array ) {
                        for ( i = 0; i < value.length; ++i ) {
                            subValue = value[ i ];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[ fullSubName ] = subValue;
                            query += param( innerObj ) + '&';
                        }
                    } else if ( value instanceof Object ) {
                        for ( subName in value ) {
                            subValue = value[ subName ];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[ fullSubName ] = subValue;
                            query += param( innerObj ) + '&';
                        }
                    } else if ( value !== undefined && value !== null ) {
                        query += encodeURIComponent( name ) + '=' +
                            encodeURIComponent( value ) + '&';
                    }
                }

                return query.length ? query.substr( 0, query.length - 1 ) : query;
            };

            return angular.isObject( data ) && String( data ) !== '[object File]' ?
                param( data ) :
                data;
          } ];
        $ionicConfigProvider.backButton.previousTitleText( false );
        $stateProvider
            .state( 'index', {
                url: '',
                abstract: true,
                templateUrl: 'view/menu.html',
                controller: 'IndexCtrl'
            } )
            .state( 'splash', {
                url: '/splash',
                cache: 'false',
                templateUrl: 'view/splash.html',
                controller: 'SplashCtrl'
            } )
            .state( 'index.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'view/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            } )
            .state( 'index.setting', {
                url: '/setting',
                views: {
                    'menuContent': {
                        templateUrl: 'view/setting.html',
                        controller: 'SettingCtrl'
                    }
                }
            } )
            .state( 'index.update', {
                url: '/update/:Version',
                views: {
                    'menuContent': {
                        templateUrl: 'view/update.html',
                        controller: 'UpdateCtrl'
                    }
                }
            } )
            .state( 'index.main', {
                url: '/main',
                views: {
                    'menuContent': {
                        templateUrl: 'view/main.html',
                        controller: 'MainCtrl'
                    }
                }
            } )
            .state( 'enquiryList', {
                url: '/enquiry/list',
                templateUrl: 'view/Enquiry/list.html',
                controller: 'EnquiryListCtrl'
            } )
            .state( 'grList', {
                url: '/gr/list',
                cache: 'false',
                templateUrl: 'view/GoodsReceipt/list.html',
                controller: 'GrListCtrl'
            } )
            .state( 'grDetail', {
                url: '/gr/detail/:FlagID',
                cache: 'false',
                templateUrl: 'view/GoodsReceipt/detail.html',
                controller: 'GrDetailCtrl'
            } )
            .state( 'grSaygRegister', {
                url: '/gr/saygRegister/:FlagID',
                cache: 'false',
                templateUrl: 'view/GoodsReceipt/saygRegister.html',
                controller: 'GrSaygRegisterCtrl'
            } )

            .state( 'vginList', {
                url: '/vgin/list',
                templateUrl: 'view/VerifyGIN/list.html',
                controller: 'VginListCtrl'
            } )
            .state( 'vginDetail', {
                url: '/vgin/detail/:CustomerCode/:TrxNo/:GoodsIssueNoteNo',
                cache: 'false',
                templateUrl: 'view/VerifyGIN/detail.html',
                controller: 'VginDetailCtrl'
            } )
            .state( 'pickingList', {
                url: '/picking/list',
                templateUrl: 'view/Picking/list.html',
                controller: 'PickingListCtrl'
            } )
            .state( 'pickingDetail', {
                url: '/picking/detail/:CustomerCode/:TrxNo/:GoodsIssueNoteNo',
                cache: 'false',
                templateUrl: 'view/Picking/detail.html',
                controller: 'PickingDetailCtrl'
            } )
            .state( 'CartonDetail', {
                url: '/picking/Carton/:LineItemNo/:CustomerCode/:TrxNo/:GoodsIssueNoteNo',
                cache: 'false',
                templateUrl: 'view/Picking/CartonDetail.html',
                controller: 'CartonDetailCtrl'
            } )
            .state( 'putawayList', {
                url: '/putaway/list',
                cache: 'false',
                templateUrl: 'view/Putaway/list.html',
                controller: 'PutawayListCtrl'
            } )
            .state( 'GrPutawayDetail', {
                url: '/putaway/detail',
                cache: 'false',
                templateUrl: 'view/Putaway/detail.html',
                controller: 'GrPutawayDetailCtrl'
            } )
            .state( 'GrSmarManageMentDetail', {
                url: '/putaway/SmarManageMent',
                cache: 'false',
                templateUrl: 'view/Putaway/ManageMent.html',
                controller: 'GrSmarManageMentDetailCtrl'
            } )
            .state( 'EnquiryDetail', {
                url: '/Enquiry/yogaLogin/:FlagID',
                cache: 'false',
                templateUrl: 'view/Enquiry/yogaLogin.html',
                controller: 'EnquiryDetailCtrl'
            } )
            .state( 'gtList', {
                url: '/gt/list',
                cache: 'false',
                templateUrl: 'view/GoodsTransfer/list.html',
                controller: 'GtListCtrl'
            } )
            .state( 'cycleCountList', {
                url: '/cycleCount/list',
                cache: 'false',
                templateUrl: 'view/CycleCount/list.html',
                controller: 'cycleCountCtrl'
            } )
            .state( 'cycleCountDetail', {
                url: '/CycleCount/detail/:CustomerCode/:TrxNo',
                cache: 'false',
                templateUrl: 'view/CycleCount/detail.html',
                controller: 'cycleCountDetailCtrl'
            } )

            ;
        $urlRouterProvider.otherwise( '/main' );
    } ] );

app.constant( '$ionicLoadingConfig', {
    template: 'Loading...'
} );
