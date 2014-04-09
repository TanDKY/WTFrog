var Wood = cc.Sprite.extend({
	ctor: function ( amt ) {
		this._super();
    this.amount = amt;
		var imaArr = new Array( 'images/wood3.png', 'images/wood4.png' );
		this.initWithFile( imaArr[amt-3] );
	},
	update: function ( dt ) {
   		this.setPositionX( this.getPositionX() + Wood.SPEED );
   		if( this.getPositionX() >= 900 ) {
        	this.setPositionX( 10 );
        }
    },
    moveWith: function ( frog ) {
        var frogPos = frog.getPosition();
   		var woodPos = this.getPosition();
        var diffPos = frogPos.x - woodPos.x;
        
        if ( frogPos.y == woodPos.y ){
            if ( this.amount == 3 ) {
                if( diffPos  >= -60 && diffPos  <= -20 ) {
                    return -40;
                } else if ( Math.abs( diffPos ) <= 20 ) {
                    return 0;
                } else if ( diffPos >= 20 && diffPos <= 60 ) {
                    return 40;
                }
            } else if ( this.amount == 4 ) {
                if ( diffPos >= -80 && diffPos <= -40 ) {
                    return -60;
                } else if ( diffPos >= -40 && diffPos <= 0 ) {
                    return -20;
                } else if ( diffPos >= 0 && diffPos <= 40 ) {
                    return 20;
                } else if ( diffPos >= 40 && diffPos <= 80 )
                    return 60;
            }
        
        }

   		return 99;
  },
});

Wood.SPEED = 5;