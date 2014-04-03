var Wood = cc.Sprite.extend({
	ctor: function() {
		this._super();
		var imaArr = new Array('images/wood3.png');
		this.initWithFile(imaArr[0]);

	},
	update: function( dt ){
   		this.setPositionX( this.getPositionX() - 5 );
   		if(this.getPositionX()<=-100){
        	this.setPositionX(800);
        }
   	},
   	moveWith: function( frog ){
   		var frogPos = frog.getPosition();
   		var leafPos = this.getPosition();

   		return checkFrogWoodWith(frogPos.x, frogPos.y, leafPos.x, leafPos.y )
   	}
});