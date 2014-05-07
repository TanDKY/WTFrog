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
        	this.setPositionX( 920 );
        }
 	},
    chooseSpeed: function() {
        if ( this.gameLayer.state > 1 ) {
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
  THREE: 4,
  FOUR: 5
}

Leaf.SPEED2 = {
  THREE: 7,
  FOUR: 8
}