var checkFrogWoodWith = function( frogX , frogY , woodX , woodY ) {
    if( frogY == woodY && Math.abs( frogX - woodX ) >= 0 && Math.abs( frogX - woodX ) <= 20 ) {
    	return 2;
    }
    
    return false;
};