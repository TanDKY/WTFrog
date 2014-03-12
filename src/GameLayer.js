var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 100, 300, 200, 100) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        
        this.frog = new Frog();
        this.frog.setPosition( new cc.Point( 400, 80 ) );
        this.addChild( this.frog );
        this.frog.setZOrder(1);
        this.frog.scheduleUpdate();
        this.setKeyboardEnabled( true );

        this.cave1 = new Cave();
        this.cave1.setPosition( new cc.Point( 100, 500 ) );
        this.addChild( this.cave1 );

        this.cave2 = new Cave();
        this.cave2.setPosition( new cc.Point( 250, 500 ) );
        this.addChild( this.cave2 );

        this.cave3 = new Cave();
        this.cave3.setPosition( new cc.Point( 400, 500 ) );
        this.addChild( this.cave3 );

        this.cave4 = new Cave();
        this.cave4.setPosition( new cc.Point( 550, 500 ) );
        this.addChild( this.cave4 );
        
        this.cave5 = new Cave();
        this.cave5.setPosition( new cc.Point( 700, 500 ) );
        this.addChild( this.cave5 );

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

