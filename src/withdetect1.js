var checkFrogLeafWith = function( frogX , frogY , leafX , leafY ) {
    if ( frogY == leafY && Math.abs( frogX - leafX ) >= 0 && Math.abs( frogX - leafX ) <= 20 ) {
    	return true;
    }
    
    return false;
};