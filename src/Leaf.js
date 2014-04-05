var Leaf = cc.Sprite.extend({
	ctor: function ( amt ) {
		this._super();
    this.amount = amt;
		this.initWithFile( 'images/leaf.png' );
	},
	update: function ( dt ) {
   		if ( this.amount == 3 ) {
            this.setPositionX( this.getPositionX() - 5 );
        } else {
            this.setPositionX( this.getPositionX() - 8 );
        }

   		if ( this.getPositionX() <= -100 ) {
        	this.setPositionX( 900 );
        }
 	},
    moveWith: function ( frog ){
   	    var frogPos = frog.getPosition();
   	    var leafPos = this.getPosition();

   	    if ( frogPos.y == leafPos.y && Math.abs( frogPos.x - leafPos.x ) <= 20 ) {
            return true;
        }
    
        return false;
    }
});