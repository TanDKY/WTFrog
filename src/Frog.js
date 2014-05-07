var Frog = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile( 'images/frog.png' );
        this.direction = 0;
        this.setPosition( new cc.Point( 400, 60 ) );
   	},
	switchDirection: function ( e ) {
		this.direction = e;
    },
    reborn: function () {
    	this.setPosition( new cc.Point( 400, 60 ) );

    },
    move: function () {
    	var pos = this.getPosition();
         
		if ( this.direction == Frog.DIR.UP ) {
			this.setPosition( new cc.Point( pos.x, pos.y + Frog.SPEED) );	
		} else if ( this.direction == Frog.DIR.RIGHT ) {
		    this.setPosition( new cc.Point( pos.x + Frog.SPEED, pos.y ) );
		} else if ( this.direction == Frog.DIR.LEFT ) {
		    this.setPosition( new cc.Point( pos.x - Frog.SPEED, pos.y ) );
		} else if (this.direction == Frog.DIR.DOWN ) {
		    if ( pos.y > 60 ) {
		    	this.setPosition( new cc.Point( pos.x, pos.y - Frog.SPEED ) );
		    }
		} else if ( this.direction == Frog.DIR.STOP ) {
	  		this.setPosition( new cc.Point( pos.x, pos.y ) );
		}
		
    },
    moveWithLeaf: function( allLeaf ) {
        var checkLife = true;
        for ( var i = 0; i < allLeaf.length; i++ ) {
            for ( var j = 0; j < allLeaf[i].length; j++ ) {
                for ( var k = 0; k < allLeaf[i][j].length; k++ ) {
                    var leaf = allLeaf[i][j][k];
                    var xPos = leaf.getPositionX();
                    var yPos = leaf.getPositionY();
                    if ( leaf.moveWith( this ) ){
                        this.setPosition( xPos, yPos );
                        checkLife = false;
                    }
                }
            }
        }
        return checkLife;
    },
    moveWithWood: function( allWoods, checkLife ) {

        for ( var i = 0; i < allWoods.length; i++ ) { 
            for ( var j = 0; j < allWoods[i].length; j++ ) {
                var wood = allWoods[i][j];
                var xPosW = wood.getPositionX();
                var yPosW = wood.getPositionY();
                var detectWood = wood.moveWith( this );
                
                if ( detectWood != 99 ) { 
                    this.setPosition( xPosW + detectWood, yPosW );
                    checkLife = false;
                }
            }
        }   
        return checkLife;
    }
});

Frog.DIR = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    DOWN: 40,
    STOP: 0

};

Frog.SPEED = 40;