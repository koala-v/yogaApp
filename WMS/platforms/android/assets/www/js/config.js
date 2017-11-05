'use strict';
var appConfig = angular.module('WMSAPP.config',[]);
appConfig.constant('ENV', {
    website:      'www.sysfreight.net/app/tms/yoga',
    //  api:          'www.sysfreight.net/apis/tms/yoga',
    api:        '39.108.230.213/WebApi',
        // api:        '192.168.1.5/apis/yoga',
        // api: 'localhost:2354',
    reset:  {
        website:      'www.sysfreight.net/app/tms/yoga',
        api:          'www.sysfreight.net/apis/tms/yoga',
        port:         '8081'
    },
    ssl:          false, // 0 : false, 1 : true
    //  port:         '8081', // http port no
    debug:        true,
    mock:         false,
    fromWeb:      true,
    websql : {
        name: 'YogaDB',
        version: '1.0',
        displayName: 'WMS Database',
        estimatedSize: 10 * 11024 * 1024
    },
    sqlite : {
        name: 'AppYoga.db',
        location: 'default'
    },
    appId:        '9CBA0A78-7D1D-49D3-BA71-C72E93F9E48F',
    apkName:      'yoga',
    updateFile:   'update.json',
    rootPath:     'yogaPath',
    configFile:   'config.txt',
    version:      '1.0.1.0',
    parameter: {
        showSerialNo : false
    },
    // apiMap: {
    //     login: {
    //         check : '/api/wms/login/check'
    //     }
    // }
});
