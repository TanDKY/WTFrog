var GameLayer = cc.LayerColor.extend( {
    init: function () {
        this._super( new cc.Color4B( 50, 150, 80, 200 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.background = new Background();
        this.addChild( this.background );
 
        this.frog = new Frog();
        this.frog.setPosition( new cc.Point( 400, 60 ) );
        this.addChild( this.frog );
        this.frog.setZOrder( 1 );

        this.passArr = new Array( false, false, false, false, false );

        this.createLife();

        this.setKeyboardEnabled( true );

        this.createCave();

        this.createFlag();

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

    //Create Life
    createLife: function () {
        this.lifeScoreArr = new Array();
        for ( var i = 0; i < lifeScore; i++ ) {
            this.lifeScoreArr[i] = cc.Sprite.create( 'images/life.png' );
            this.lifeScoreArr[i].setPosition( cc.p( 760 - ( i * 50 ) , 570 ));
            this.addChild( this.lifeScoreArr[i] );
        }
    },
    updateLife: function() {
       lifeScore--;
       this.removeChild( this.lifeScoreArr[lifeScore]);
    },

     /////////    FLAG    ////////////
    createFlag: function () {
        this.flagArr = new Array();

        for ( var i = 0; i < 5; i++ ) {
            this.flagArr[i] = new Flag();
            this.flagArr[i].setPosition( new cc.Point( 80 + ( 160 * i ), 520 ) );
            this.addChild( this.flagArr[i] );
            this.flagArr[i].setVisible( false );
        }
    },


    /////////    CAVE    ////////////
    createCave: function () {
        this.caveArr = new Array();

        for ( var i = 0; i < 5; i++ ) {
            this.caveArr[i] = new Cave();
            this.caveArr[i].setPosition( new cc.Point( 80 + ( 160 * i ), 520 ) );
            this.addChild( this.caveArr[i] );
        }
    },

    /////////    CAR    ////////////
    createCar: function ( index ) {
        var randomPosX = Math.round( Math.random() * 8 ) * 150;
        var posY = new Array( 100, 140, 180);

        var car = new Car( index );
        car.setPosition( new cc.Point( randomPosX, posY[index % 3] ) );

        return car;
    },
    createCarArr: function () {
        this.carArr = new Array();

        for ( var i = 0; i < 9; i++ ) {
            this.carArr[i] = this.createCar( i );
            this.addChild( this.carArr[i] );
            this.carArr[i].scheduleUpdate();
        }

    },
    resetCar: function() {
        for ( var i = 0; i < this.carArr.length; i++ ) {
            this.removeChild( this.carArr[i] );
        }
        this.createCarArr();
    },

     /////////    LEAF   ////////////
    createLeafs: function ( amt ) {
        this.leafs = new Array();

        for ( var i = 0; i < amt; i++ ) {
            this.leafs[i] = new Leaf( amt );
            this.leafs[i].setPosition( new cc.Point( i * 40, 0 ) );
        }

        return this.leafs;
    },
    createLeafArr: function ( amt ) {
        this.leafArr = new Array();
        var form = new Array( 200, 500, 800 );

        for ( var i = 0; i < 3; i++ ) {
            this.leafArr[i] = this.createLeafs( amt );
            for( var j = 0; j < amt; j++ ) {
                var xPos = this.leafArr[i][j].getPositionX();
                this.leafArr[i][j].setPosition( new cc.Point( form[i] + xPos, 0 ) );
            }
        }

        return this.leafArr;
    }, 
    createAllLeaf: function () {
        this.allLeaf = new Array( this.createLeafArr( 3 ), this.createLeafArr( 4 ), this.createLeafArr( 3 ) );
        var yPosArr = new Array( 260, 380, 460 );

        for ( var i = 0; i < this.allLeaf.length; i++ ) {
            for ( var j = 0; j < this.allLeaf[i].length; j++) {
                for( var k = 0; k < this.allLeaf[i][j].length; k++ ) {
                    this.allLeaf[i][j][k].setPositionY( yPosArr[i] );
                    this.addChild( this.allLeaf[i][j][k] );
                    this.allLeaf[i][j][k].scheduleUpdate();
                }
            }
        }
    },

    /////////    WOOD    ////////////
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

    /////////    CHECK    ////////////
    checkHitCar: function() {
        for ( var i = 0; i < this.carArr.length; i++ ) {
            if( this.carArr[i].hit( this.frog ) ) {
                this.frog.reborn();
                this.updateLife();
            }
        }
    },
    checkSide: function() {

        if ( this.frog.getPositionX() < 1 || this.frog.getPositionX() > 799 ) {   
            this.updateLife();
            this.frog.reborn();
        }

    },
    checkPassLevel: function() {
       
        for ( var i = 0; i < 5; i++ ) {
            this.passArr[i] = !this.caveArr[i].getAvailable();
        }


        if( this.passArr[0] == true && this.passArr[1] == true && this.passArr[2] == true && this.passArr[3] == true && this.passArr[4] == true ) {
            
            for ( var i = 0; i < 5; i++ ){
                this.flagArr[i].setVisible( false );
            }

            for ( var i = 0; i < 5; i++ ){
                this.passArr[i] = false;
            }

            for ( var i = 0; i < 5; i++ ){
                this.caveArr[i].setAvailable( true );
            }
        } 
        
    },

    /////////    UPDATE    ////////////
    update: function( dt ) {
        
        this.checkSide();

        this.checkHitCar();

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
                
                if ( detectWood != 99 ) { 
                    this.frog.setPosition( xPosW + detectWood, yPosW );
                    checkLife = false;
                } 
            }
        }   

        for ( var i = 0; i < this.caveArr.length; i++ ){
            if (this.caveArr[i].checkFinish( this.frog )){

                this.flagArr[i].setVisible( true );
                this.frog.reborn();
                this.resetCar();

            }
        }

        if ( checkLife ) {
           if ( this.frog.getPositionY() >= 260 && this.frog.getPositionY() != 340) {
                this.frog.reborn();
                this.updateLife();
            }
        }

        this.checkPassLevel();

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

var lifeScore = 10;

 GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    ENDED: 3
 };
