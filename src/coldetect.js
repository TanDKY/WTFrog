var checkPlayerCarCollision = function( playerX, playerY, carX, carY ) {
    if(playerY==carY&&Math.abs(playerX-carX)<=45&&Math.abs(playerX-carX)>=0){
    	return true;
    }
    return false;
};