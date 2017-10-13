var objClone = function ( obj ) {
    var newObj = {};
    for ( var prop in obj ) {
        if ( obj.hasOwnProperty( prop ) ) {
            if ( is.object( obj[ prop ] ) ) {
                newObj[ prop ] = objClone( obj[ prop ] );
            } else {
                if ( is.null( obj[ prop ] ) || is.undefined( obj[ prop ] ) || is.equal( obj[ prop ], 'undefined' ) ) {
                    newObj[ prop ] = '';
                } else {
                    if(is.string(obj[ prop ])){
                        newObj[ prop ] = obj[ prop ].replace( /[\']/g, '\'\'' );
                    }else{
                        newObj[ prop ] = obj[ prop ];
                    }
                }
            }
        }
    }
    return newObj;
};
var checkDate = function (datetime) {
    if (is.equal(moment(datetime).format('DD-MMM-YYYY'), '01-Jan-0001')) {
        datetime = '';
    }
    if (is.not.empty(datetime)) {
        datetime = moment(datetime).format('YYYY-MM-DD').toString();
  }
    return datetime;
};
