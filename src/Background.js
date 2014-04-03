var Background = cc.Sprite.extend({
    ctor: function () {
        this._super();

        this.road = cc.Sprite.create( 'images/road.jpg' );
        this.road.setPosition( new cc.Point( 400, 140 ) );
        this.addChild( this.road );

        this.water1 = cc.Sprite.create( 'images/water.png' );
        this.water1.setPosition( new cc.Point( 400, 280 ) );
        this.addChild( this.water1 );

		this.water2 = cc.Sprite.create( 'images/water.png' );  
        this.water2.setPosition( new cc.Point( 400, 400 ) );
        this.addChild( this.water2 );

		this.water3 = cc.Sprite.create( 'images/water.png' );  
        this.water3.setPosition( new cc.Point( 400, 440 ) );
        this.addChild( this.water3 );

		this.rail = cc.Sprite.create( 'images/rail.png' );  
        this.rail.setPosition( new cc.Point( 400, 340 ) );
        this.addChild( this.rail );        
   	}
 });