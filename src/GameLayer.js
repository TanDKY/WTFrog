var GameLayer = cc.LayerColor.extend( {
    init: function() {
        this._super( new cc.Color4B( 50, 150, 80, 200 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.background = new Background();
        this.addChild( this.background );

        this.frog = new Frog();
        this.frog.setPosition( new cc.Point( 400, 60 ) );
        this.addChild( this.frog );
        this.frog.setZOrder( 1 );
        
        this.setKeyboardEnabled( true );

        for ( var i = 0; i < 5; i++ ) {
            this.cave = new Cave();
            this.cave.setPosition( new cc.Point( 80 + ( 160 * i ),530 ) );
            this.addChild( this.cave );
        }

        this.createCarArr();

        this.createAllLeaf();

        this.createAllWoods();

        this.scheduleUpdate();

        return true;
    },
    onKeyDown: function ( e ) {
        this.frog.switchDirection( e );
        this.frog.move();
    },
    onKeyUp: function () {
        this.frog.switchDirection( 0 );
    },
    //Create CAR
    createCar: function ( index ) {
        var car;
        var posX = new Array( 800, 1100, 0, 1500, -400, 1000);
        var posY = new Array( 180, 180, 140, 100, 140, 100);

        if ( posX[index] >= 800 ) {
            car = new Car1();
            car.setPosition( new cc.Point( posX[index], posY[index] ) );
        } else {
            car = new Car2();
            car.setPosition( new cc.Point( posX[index], posY[index] ) );
        }

        return car;
    },
    createCarArr: function () {
        this.carArr = new Array();

        for ( var i = 0; i < 6; i++ ) {
            this.carArr[i] = this.createCar( i );
            this.addChild( this.carArr[i] );
            this.carArr[i].scheduleUpdate();
        }
    },
    //Create LEAFS
    createLeafs: function ( amt ) {
        this.leafs = new Array();

        for ( var i = 0; i < amt; i++ ) {
            this.leafs[i] = new Leaf( amt );
            var yPosArr = new Array( 260, 380 );
            this.leafs[i].setPosition( new cc.Point( i * 40, yPosArr[amt - 3] ) );
        }

        return this.leafs;
    },
    createLeafArr: function ( amt ) {
        this.leafArr = new Array();

        for ( var i = 0; i < 3; i++ ) {
            this.leafArr[i] = this.createLeafs( amt );
            for( var j = 0; j < amt; j++ ) {
                var xPos = this.leafArr[i][j].getPositionX();
                var yPos = this.leafArr[i][j].getPositionY();
                var form = new Array( 200, 500, 800 );
                this.leafArr[i][j].setPosition( new cc.Point( form[i] + xPos, yPos) );
            }
        }

        return this.leafArr;
    }, 
    createAllLeaf: function () {
        this.allLeaf = new Array( this.createLeafArr( 3 ), this.createLeafArr( 4 ) );

        for ( var i = 0; i < this.allLeaf.length; i++ ) {
            for ( var j = 0; j < this.allLeaf[i].length; j++) {
                for( var k = 0; k < this.allLeaf[i][j].length; k++ ) {
                    this.addChild( this.allLeaf[i][j][k] );
                    this.allLeaf[i][j][k].scheduleUpdate();
                }
            }
        }
    },
    //Create Wood
    createWood: function ( amt ) {
        this.woodArr = new Array();
        var xPosArr = new Array( 200, 500, 800 );
        var yPosArr = new Array ( 300, 420 );
        for ( var i = 0; i < 3; i++ ) {
            this.woodArr[i] = new Wood( amt );
            this.woodArr[i].setPosition( new cc.Point( xPosArr[i], yPosArr[ amt - 3 ] ) );
        }
        return this.woodArr;
    },
    createAllWoods: function () {
        this.allWoods = new Array( this.createWood( 3 ), this.createWood( 4 ) );
         for ( var i = 0; i < this.allWoods.length; i++ ) {
            for ( var j = 0; j < this.allWoods[i].length; j++ ) {
                this.addChild( this.allWoods[i][j] );
                this.allWoods[i][j].scheduleUpdate();
            }
        } 
    },

    update: function( dt ) {
        
         for ( var i = 0; i < 6; i++ ) {
            if( this.carArr[i].hit( this.frog ) ) {
                this.frog.reborn();
            }
        }
        
        var checkLife  = true;
        for ( var i = 0; i < this.allLeaf.length; i++ ) {
            for ( var j = 0; j < this.allLeaf[i].length; j++ ) {
                for ( var k = 0; k < this.allLeaf[i][j].length; k++ ) {
                    var leaf = this.allLeaf[i][j][k];
                    var xPos = leaf.getPositionX();
                    var yPos = leaf.getPositionY();
                    if( leaf.moveWith( this.frog ) ){
                        this.frog.setPosition( xPos, yPos );
                        checkLife = false;
                    }
                }
            }
        }

        for ( var i = 0; i < this.allWoods.length; i++ ) { 
            for ( var j = 0; j < this.allWoods[i].length; j++ ) {
                var wood = this.allWoods[i][j];
                var xPosW = wood.getPositionX();
                var yPosW = wood.getPositionY();
                var detectWood = wood.moveWith( this.frog );
                if ( detectWood == 1 ) {
                    this.frog.setPosition( xPosW - 40, yPosW );
                    checkLife = false;
                } else if ( detectWood == 2 ) {
                    this.frog.setPosition( xPosW, yPosW );
                    checkLife = false;
                } else if ( detectWood  == 3) {
                    this.frog.setPosition( xPosW + 40, yPosW );
                    checkLife = false;
                }
            }
        }

        if ( checkLife ) {
           if ( this.frog.getPositionY() >= 300 && this.frog.getPositionY() != 340) {
                this.frog.reborn();
            }
        }

    }

});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

