var Leaf = cc.Sprite.extend({
	ctor: function( amt ) {
		this._super();
    this.amount = amt;
		this.initWithFile('images/leaf.png');
	},
	update: function( dt ){
   		if(this.amount==3){
        this.setPositionX( this.getPositionX() - 5 );
      }
      else {
        this.setPositionX( this.getPositionX() - 8);
      }
   		if(this.getPositionX()<=-10){
        	this.setPositionX(1000);
        }
   	},
   	moveWith: function( frog ){
   		var frogPos = frog.getPosition();
   		var leafPos = this.getPosition();

   		return checkFrogLeafWith(frogPos.x, frogPos.y, leafPos.x, leafPos.y )
   	}
});