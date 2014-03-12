var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 100, 300, 200, 100) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.frog = new Frog();
        this.frog.setPosition( new cc.Point( 400, 100 ) );
        this.addChild( this.frog );
         this.frog.scheduleUpdate();
        this.setKeyboardEnabled( true );
        
        return true;
    },

    onKeyDown: function( e ) {
        this.frog.switchDirection(e); 
    },

    onKeyUp: function() {
        this.frog.switchDirection(0);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

