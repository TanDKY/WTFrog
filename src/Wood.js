var Wood = cc.Sprite.extend({
	ctor: function( e ) {
		this._super();
		var imaArr = new Array('images/leaf3.png','images/leaf4.png');
		this.initWithFile(imaArr[e]);

	},
	update: function( dt ){
   		this.setPositionX( this.getPositionX() - 1 );
   		if(this.getPositionX()<=-100){
        	this.setPositionX(800);
        }
   	},
   	moveWith: function( frog ){
   		var frogPos = frog.getPosition();
   		var leafPos = this.getPosition();

   		return checkFrogLeafWith(frogPos.x, frogPos.y, leafPos.x, leafPos.y )
   	}
});