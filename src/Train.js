var Train = cc.Sprite.extend({
    ctor: function ( type, gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;
        this.initWithFile( 'images/train.png' );
        this.type = type;
        if ( this.type == 0 ) {
            this.setRotation( 180 );
            this.setPosition( new cc.Point( -100, 340 ) );
        }
        else {
            this.setPosition( new cc.Point( 900, 340 ) ); 
        }
   	},
   	update: function ( dt ) {
        if ( this.type == 0 ){
            this.setPositionX( this.getPositionX() + 3 );

            if ( this.getPositionX() >= 1000 ) {
                this.setPositionX( -400 );
            }
        }
        else {
            this.setPositionX( this.getPositionX() - 3 );
            if ( this.getPositionX() <= -200 ) {
                this.setPositionX( 1200 );
            }
        }
    },
    hit: function ( frog ) {
        var frogPos = frog.getPosition();
        var trainPos = this.getPosition();

        if( frogPos.y == trainPos.y && Math.abs( frogPos.x - trainPos.x ) <= 160 ) { 
            return true;
        }
    
        return false;
    },
    checkDie: function( frog ) {
        if( this.hit( frog ) == true ) {
            this.gameLayer.regame();
            this.gameLayer.updateLife( -1 );
        }
    }
});

