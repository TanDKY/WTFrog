var Leaf = cc.Sprite.extend({
	ctor: function ( amt, gameLayer) {
		this._super();
        this.amount = amt;
        this.gameLayer = gameLayer;
		this.initWithFile( 'images/leaf.png' );
	},
	update: function ( dt ) {
   		var speed = this.chooseSpeed();
        if ( this.amount == 3 ) {
            this.setPositionX( this.getPositionX() - speed.THREE );
        } else {
            this.setPositionX( this.getPositionX() - speed.FOUR );
        }

   		if ( this.getPositionX() <= -100 ) {
        	this.setPositionX( 1200 );
        }
 	},
    chooseSpeed: function() {
        if ( this.gameLayer.state > 2 ) {
            return Leaf.SPEED2;
        }
        else {
            return Leaf.SPEED1;
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

Leaf.SPEED1 = {
  THREE: 3,
  FOUR: 4
}

Leaf.SPEED2 = {
  THREE: 5,
  FOUR: 6
}