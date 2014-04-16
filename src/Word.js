var Word = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile( 'images/word.png' );
        this.setPosition( 1000, 100 );

   	},
   	update: function( dt ) {
   		var posX = this.getPositionX();
   		var posY = this.getPositionY();
   		this.setPosition( cc.p( posX - 5, posY ) );
		if ( posX <-50 ) { 
			this.setPosition( new cc.p( 1000, 100 ) );
		}
   	}


 });