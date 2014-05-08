var Cross = cc.Sprite.extend({
    ctor: function ( gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;
        this.initWithFile( 'images/cross.png' );
   	},
   	hit: function ( frog ) {
   		var frogPos = frog.getPosition();
   		var crossPos = this.getPosition();

   		if( crossPos.y - frogPos.y  == 10 && Math.abs( frogPos.x - crossPos.x ) <= 20 ) { 
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