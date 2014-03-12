var Frog = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/frog.png' );
        this.direction= 0;
   	},
   	update: function( dt ) {
		var pos = this.getPosition();
		if(this.reborn()){
            this.setPosition(new cc.Point(400, 80 ) );
        }
        else{ 
			if(this.direction == Frog.DIR.UP){
					this.setPosition( new cc.Point( pos.x, pos.y+8 ));	
			}	
		    else if(this.direction == Frog.DIR.RIGHT){
		    		this.setPosition( new cc.Point(pos.x+8,pos.y));
		    }
		    else if(this.direction == Frog.DIR.LEFT){
		    		this.setPosition( new cc.Point( pos.x-8,pos.y));
		    }
		    else if(this.direction == Frog.DIR.DOWN){
		    	if(pos.y<=80){
		    	
		    	}
		    	else{
		    		this.setPosition( new cc.Point( pos.x,pos.y-8));
		    	}
		    }
		    else if(this.direction == Frog.DIR.STOP){
		    		this.setPosition( new cc.Point( pos.x,pos.y));
		    }
		}
	    
	},
	switchDirection: function(e) {
		this.direction = e;
    },
    reborn: function(){
    	var pos = this.getPosition();
    	if(pos.y>=450){
    		return true;
    	}
    	return false;
    }
});

Frog.DIR = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    DOWN: 40,
    STOP: 0

};