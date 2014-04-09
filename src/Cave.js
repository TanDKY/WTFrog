var Cave = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.available = true;
        this.initWithFile( 'images/cave.png' );
   	},

   	checkFinish: function ( frog ) {
   		var frogPos = frog.getPosition();
   	    var cavePos = this.getPosition();

   	    if ( this.available ){
            if ( frogPos.y > 460 && Math.abs( frogPos.x - cavePos.x ) <= 20 ) {
                this.available = false 
                return true;
            }

        }
        
        return false;
   	}
});