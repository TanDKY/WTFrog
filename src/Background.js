var Background = cc.Sprite.extend({
    ctor: function ( index ) {
        this._super();
        var imagesArr = new Array( 'images/opening.png', 'images/bg1.png' );
        this.initWithFile( imagesArr[ index ] );
        this.setPosition( 400, 300 );

   	}

 });