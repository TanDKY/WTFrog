var Cave = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile( 'images/cave.png' );
   	},
   	checkFinish: function ( frog ) {
   		var frogPos = frog.getPosition();
   	    var cavePos = this.getPosition();

   	    if ( frogPos.y > 460 && Math.abs( frogPos.x - cavePos.x ) <= 20 ) {
            return true;
        }
    
        return false;
   	}
});