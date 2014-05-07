var Time = cc.Sprite.extend({
    ctor: function ( gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;
        this.initWithFile( 'images/time.png' );
        this.setPosition( 400, 15 );
   	},
   	update: function( dt ) {
   		var posX = this.getPositionX();
   		var posY = this.getPositionY();
		  this.setPosition( posX - 1, posY );
   	},
    checkDie: function() {
        if ( this.gameLayer.times.getPositionX() == -400 ) { 
            this.gameLayer.regame();
            this.gameLayer.updateLife( -1 );
        }
    }
});