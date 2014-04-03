var Car1 = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var num = Math.round( Math.random() * 4 );
        var imaArr = new Array( 'images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png');
        this.initWithFile( imaArr[num] );
   	},
   	update: function ( dt ) {
   		//13
      this.setPositionX( this.getPositionX() - 8 );
      
   		if ( this.getPositionX() <= -50 ) {
        this.setPositionX( 800 );
      }
   	},
   	hit: function ( player ) {
   		var playerPos = player.getPosition();
   		var myPos = this.getPosition();

   		return checkPlayerCarCollision(playerPos.x, playerPos.y, myPos.x, myPos.y );
   		
   	}
});