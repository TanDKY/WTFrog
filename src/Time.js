var Time = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile( 'images/time.png' );
        this.setPosition( 400, 15 );
   	},

   	update: function( dt ) {
   		var posX = this.getPositionX();
   		var posY = this.getPositionY();
   		//this.MoveAction = cc.MoveTo.create( 50, cc.p( posX - 10, posY) );
		//this.runAction(this.MoveAction);
		this.setPosition( posX - 1, posY );
   	}
});