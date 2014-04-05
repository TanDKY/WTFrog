var Wood = cc.Sprite.extend({
	ctor: function ( amt ) {
		this._super();
    this.amount = amt;
		var imaArr = new Array( 'images/wood3.png', 'images/wood4.png' );
		this.initWithFile( imaArr[amt-3] );
	},
	update: function ( dt ) {
   		this.setPositionX( this.getPositionX() + 5 );
   		if( this.getPositionX() >= 900 ) {
        	this.setPositionX( 10 );
        }
    },
    getAmount: function () {
        return this.amount;
    },
    moveWith: function ( frog ) {
        var frogPos = frog.getPosition();
   		var woodPos = this.getPosition();
        var diffPos = frogPos.x - woodPos.x;
        
        if ( frogPos.y == woodPos.y ){
            if ( this.amount == 3 ) {
                if( diffPos  >= -60 && diffPos  <= -20 ) {
                    return 1;
                } else if ( Math.abs( diffPos ) <= 20 ) {
                    return 2;
                } else if ( diffPos >= 20 && diffPos <= 60 ) {
                    return 3;
                }
            } else if ( this.amount == 4 ) {
                if ( diffPos >= -80 && diffPos <= -40 ) {
                    return 1;
                } else if ( diffPos >= -40 && diffPos <= 0 ) {
                    return 2;
                } else if ( diffPos >= 0 && diffPos <= 40 ) {
                    return 3;
                } else if ( diffPos >= 40 && diffPos <= 80 )
                    return 4;
            }
        
        }

   		return 0;
  },
});