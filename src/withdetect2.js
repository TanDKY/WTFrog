var checkFrogWoodWith = function( frogX , frogY , woodX , woodY ) {
	if( frogY == woodY ) {
		if( frogX - woodX  >= -60 && frogX - woodX  < -20 ) {
	    	return 1;
	    } else if ( Math.abs( frogX - woodX ) <= 20 ) {
	    	return 2;
	    } else if ( frogX - woodX >= 20 && frogX - woodX <= 60 ) {
	    	return 3;
	    }
	}
    
    return 0;
};