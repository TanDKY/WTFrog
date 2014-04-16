var Leaf = cc.Sprite.extend({
	ctor: function ( amt ) {
		this._super();
    this.amount = amt;
		this.initWithFile( 'images/leaf.png' );
	},
	update: function ( dt ) {
   		if ( this.amount == 3 ) {
            this.setPositionX( this.getPositionX() - Leaf.SPEED.THREE );
        } else {
            this.setPositionX( this.getPositionX() - Leaf.SPEED.FOUR );
        }

   		if ( this.getPositionX() <= -100 ) {
        	this.setPositionX( 920 );
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

Leaf.SPEED = {
  THREE: 4,
  FOUR: 6
}