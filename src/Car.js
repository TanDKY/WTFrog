var Car = cc.Sprite.extend({
    ctor: function ( index ) {
        this._super();
        this.index = index;
        var num = Math.round( Math.random() * 4 );
        var imaArr = new Array( 'images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png' );
        this.initWithFile( imaArr[num] );
        if ( index > 4 ){
        	this.setRotation( 180 );
        }
   	},
   	update: function ( dt ){
   		if ( this.index < 4 ) { 
   			this.setPositionX( this.getPositionX() - 13 );
      
	   		if ( this.getPositionX() <= -50 ) {
	    	    this.setPositionX( 1000 );
	  	    }
   		} 
   		else {
	   		this.setPositionX( this.getPositionX() + 10);
	   		
	    	if ( this.getPositionX() >= 850 ) {
	        	this.setPositionX( -200 );
	    	}
	    }
   	},
   	hit: function ( player ){
   		var playerPos = player.getPosition();
   		var myPos = this.getPosition();

   		return checkPlayerCarCollision( playerPos.x, playerPos.y, myPos.x, myPos.y );
   		
   	}
});