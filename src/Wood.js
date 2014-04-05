var Wood = cc.Sprite.extend({
	ctor: function ( amt ) {
		this._super();
		var imaArr = new Array( 'images/wood3.png', 'images/wood4.png' );
		this.initWithFile( imaArr[amt-3] );
	},
	update: function ( dt ) {
   		this.setPositionX( this.getPositionX() + 5 );
   		if( this.getPositionX() >= 900 ) {
        	this.setPositionX( 10 );
        }
  },
  moveWith: function ( frog ) {
   		var frogPos = frog.getPosition();
   		var woodPos = this.getPosition();

   		return checkFrogWoodWith( frogPos.x, frogPos.y, woodPos.x, woodPos.y )
  },
});