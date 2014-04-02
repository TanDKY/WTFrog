var Car2 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        var num = Math.round(Math.random()*4);
        var imaArr = new Array('images/1.png','images/2.png','images/3.png',
                                          'images/4.png','images/5.png');
        this.initWithFile( imaArr[num] );
        this.setRotation( 180 );
   	},
   	update: function( dt ){
   		this.setPositionX( this.getPositionX() + 10);
   		if(this.getPositionX()>=850){
        	this.setPositionX(0);
        }
   	},
   	hit: function( player ){
   		var playerPos = player.getPosition();
   		var myPos = this.getPosition();

   		return checkPlayerCarCollision(playerPos.x, playerPos.y, myPos.x, myPos.y );
   		
   	}
});