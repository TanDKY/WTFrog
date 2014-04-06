var Frog = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile( 'images/frog.png' );
        this.direction = 0;
   	},
	switchDirection: function ( e ) {
		this.direction = e;
    },
    reborn: function (){
    	this.setPosition( new cc.Point( 400, 60 ) );
    	
    },
    move: function (){
    	var pos = this.getPosition();
         
		if ( this.direction == Frog.DIR.UP ) {
			this.setPosition( new cc.Point( pos.x, pos.y + Frog.SPEED) );	
		} else if ( this.direction == Frog.DIR.RIGHT ) {
		    this.setPosition( new cc.Point( pos.x + Frog.SPEED, pos.y ) );
		} else if ( this.direction == Frog.DIR.LEFT ) {
		    this.setPosition( new cc.Point( pos.x - Frog.SPEED, pos.y ) );
		} else if (this.direction == Frog.DIR.DOWN ) {
		    if ( pos.y > 60 ) {
		    	this.setPosition( new cc.Point( pos.x, pos.y - Frog.SPEED ) );
		    }
		} else if ( this.direction == Frog.DIR.STOP ) {
	  		this.setPosition( new cc.Point( pos.x, pos.y ) );
		}

		if ( pos.x < 30 || pos.x > 770 ) {
			this.reborn();
		}
    }
});

Frog.DIR = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    DOWN: 40,
    STOP: 0

};

Frog.SPEED = 40;