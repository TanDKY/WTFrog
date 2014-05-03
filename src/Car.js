var Car = cc.Sprite.extend({
    ctor: function ( index, gameLayer ) {
        this._super();
        this.index = index;
        this.gameLayer = gameLayer;
        var num = Math.round( Math.random() * 4 );
        var imageArr = new Array( 'images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png' );
        this.initWithFile( imageArr[num] );
        if ( index % 3 == 1 ){
        	this.setRotation( 180 );
        }
   	},
   	update: function ( dt ) {
      var speed = this.chooseSpeed();
      if ( this.index % 3 != 1 ) { 
         this.setPositionX( this.getPositionX() - speed.FROM_RIGHT );

	   		  if ( this.getPositionX() <= -100 ) {
	    	    this.setPositionX( 1100 );
	  	    }
   		} 
   		else {
	   		this.setPositionX( this.getPositionX() + speed.FROM_LEFT );
	   		
	    	if ( this.getPositionX() >= 900 ) {
	        	this.setPositionX( -300 );
	    	}
	    }
   	},
    chooseSpeed: function() {
        if ( this.gameLayer.state > 1 ) {
            return Car.SPEED2;
        }
        else {
            return Car.SPEED1;
        }
    },
   	hit: function ( frog ){
   		var frogPos = frog.getPosition();
   		var carPos = this.getPosition();

   		if( frogPos.y == carPos.y && Math.abs( frogPos.x - carPos.x ) <= 45 ) { 
    		return true;
    	}
    
    	return false;
   	}
});

Car.SPEED1 = {
  FROM_RIGHT: 6,
  FROM_LEFT: 9
}
Car.SPEED2 = {
  FROM_RIGHT: 10,
  FROM_LEFT: 12
}