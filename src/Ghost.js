var Ghost = cc.Sprite.extend({
    ctor: function ( gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;
        this.initWithFile( 'images/ghost.png' );
   	},
   	hit: function ( frog ) {
   		var frogPos = frog.getPosition();
   		var ghostPos = this.getPosition();

   		if( ghostPos.y - frogPos.y  == 10 && Math.abs( frogPos.x - ghostPos.x ) <= 20 ) { 
    		return true;
    	}
    
    	return false;
   	},
    checkDie: function( frog ) {
        if( this.hit( frog ) == true ) {
            this.gameLayer.regame();
            this.gameLayer.updateLife( -1 );
        }
    }
});