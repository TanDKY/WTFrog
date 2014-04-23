var GameLayer = cc.LayerColor.extend( {
    init: function () {
        this._super( new cc.Color4B( 50, 150, 80, 200 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.state = GameLayer.STATES.FRONT;
        
        this.createBackground( 0 );       

        this.word = new Word();
        this.addChild( this.word );
        this.word.scheduleUpdate();

        this.checkLife = true;
        this.lifeScore = 10;

        this.isCompleteArr = new Array( false, false, false, false, false );

        this.setKeyboardEnabled( true );

        //this.scheduleUpdate();

        return true;
    },

    onKeyDown: function ( e ) {
        
        if( this.state == GameLayer.STATES.FRONT ) { 
        
            this.state = GameLayer.STATES.LEVEL_1;
            this.removeChild( this.word );
            this.removeChild( this.background );
            this.level( 1 );
            this.scheduleOnce(function() {
                this.createBackground( 1 );
                this.createFrog();
                this.createCave();
                this.createFlag();
                this.createCarArr();
                this.createAllLeaf();
                this.createAllWoods();
                this.createLife();
                this.createTime();
                this.scheduleUpdate();
            }, 3);
        
        } else if ( this.state == GameLayer.STATES.LEVEL_1 ) {
            this.frog.switchDirection( e );
            this.frog.move();
        } else if ( this.state == GameLayer.STATES.LEVEL_2 ) {

        }

    },
    onKeyUp: function () {
        this.frog.switchDirection( 0 );
    },

    createFrog: function () {

        this.frog = new Frog();
        this.addChild( this.frog );
        this.frog.setZOrder( 1 );

    },

    createBackground: function( index ) {
        this.background = new Background( index );
        this.addChild( this.background );
    },

    createTime: function () {
        this.time = new Time();
        this.addChild( this.time );
        this.time.scheduleUpdate();
    },

    //Create Life
    createLife: function () {
        this.lifeScoreArr = new Array();

        for ( var i = 0; i < this.lifeScore; i++ ) {
            this.lifeScoreArr[i] = cc.Sprite.create( 'images/life.png' );
            this.lifeScoreArr[i].setPosition( cc.p( 760 - ( i * 50 ) , 570 ));
            this.addChild( this.lifeScoreArr[i] );
        }

    },
    updateLife: function( amt ) {
       this.lifeScore = this.lifeScore + amt;
       console.log( amt );
       this.removeChild( this.lifeScoreArr[this.lifeScore]);
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
    createOneRowLeafs: function ( amt ) {
        this.leafsArr = new Array();
        var form = new Array( 200, 500, 800 );

        for ( var i = 0; i < 3; i++ ) {
            this.leafsArr[i] = this.createLeafs( amt );
            for( var j = 0; j < amt; j++ ) {
                var xPos = this.leafsArr[i][j].getPositionX();
                this.leafsArr[i][j].setPosition( new cc.Point( form[i] + xPos, 0 ) );
            }
        }

        return this.leafsArr;
    }, 
    createAllLeaf: function () {
        this.allLeaf = new Array( this.createOneRowLeafs( 3 ), this.createOneRowLeafs( 4 ), this.createOneRowLeafs( 3 ) );
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
                this.updateLife( -1 );
                this.createTime();
            }
        }

    },
    checkSide: function() {

        if ( this.frog.getPositionX() < 1 || this.frog.getPositionX() > 799 ) {   
            this.updateLife( -1 );
            this.frog.reborn();
            this.createTime();
        }

    },
    checkCompleteLevel: function() {
       
        for ( var i = 0; i < 5; i++ ) {
            this.isCompleteArr[i] = !this.caveArr[i].getAvailable();
        }

        if ( this.isCompleteArr[0] == true && this.isCompleteArr[1] == true && this.isCompleteArr[2] == true && this.isCompleteArr[3] == true && this.isCompleteArr[4] == true ) {
            

            for ( var i = 0; i < 5; i++ ){
                this.flagArr[i].setVisible( false );
            }

            for ( var i = 0; i < 5; i++ ){
                this.isCompleteArr[i] = false;
            }

            for ( var i = 0; i < 5; i++ ){
                this.caveArr[i].setAvailable( true );
            }
        } 
        
    },
    checkTime: function() {
        if ( this.time.getPositionX() == -400 ) { 
            this.frog.reborn();
            this.updateLife( -1 );
            this.createTime();
        }
    },
    checkMoveLeaf: function() {

        for ( var i = 0; i < this.allLeaf.length; i++ ) {
            for ( var j = 0; j < this.allLeaf[i].length; j++ ) {
                for ( var k = 0; k < this.allLeaf[i][j].length; k++ ) {
                    var leaf = this.allLeaf[i][j][k];
                    var xPos = leaf.getPositionX();
                    var yPos = leaf.getPositionY();
                    if ( leaf.moveWith( this.frog ) ){
                        this.frog.setPosition( xPos, yPos );
                        this.checkLife = false;
                    }
                }
            }
        }

    },
    checkMoveWood: function() {

        for ( var i = 0; i < this.allWoods.length; i++ ) { 
            for ( var j = 0; j < this.allWoods[i].length; j++ ) {
                var wood = this.allWoods[i][j];
                var xPosW = wood.getPositionX();
                var yPosW = wood.getPositionY();
                var detectWood = wood.moveWith( this.frog );
                
                if ( detectWood != 99 ) { 
                    this.frog.setPosition( xPosW + detectWood, yPosW );
                    this.checkLife = false;
                } 
            }
        }   

    },
    checkCave: function() {

        for ( var i = 0; i < this.caveArr.length; i++ ){
            if (this.caveArr[i].checkFinish( this.frog )){

                this.flagArr[i].setVisible( true );
                this.frog.reborn();
                this.createTime();
                this.resetCar();

            }
        }

    },
    checkWater: function() {

         if ( this.checkLife ) {
           if ( this.frog.getPositionY() >= 260 && this.frog.getPositionY() != 340) {
                this.frog.reborn();
                this.resetCar();
                this.updateLife( -1 );
                this.createTime();
            }
        }

    },

    gameOver: function() {
        this.gameOverLabel = cc.LabelTTF.create( '      Game Over       ', 'Arial', 40 );
        this.gameOverLabel.setPosition( new cc.Point( 400, 300 ) );
        this.addChild(this.gameOverLabel);
    },
    level: function( num ) {
        this.levelLabel = cc.LabelTTF.create( '  Level  ' + num , 'Arial', 40 );
        this.levelLabel.setPosition( new cc.Point( 400, 300 ) );
        this.addChild(this.levelLabel);
        this.scheduleOnce(function() {
            this.removeChild(this.levelLabel);
        }, 3);
    },

    /////////    UPDATE    ////////////
    update: function( dt ) {
        
        if( this.state == GameLayer.STATES.LEVEL_1 ) {
        
            this.checkTime();

            this.checkSide();

            this.checkHitCar();

            this.checkMoveLeaf();

            this.checkMoveWood();

            this.checkCave();

            this.checkWater();

            this.checkLife = true;

            this.checkCompleteLevel();

            if ( this.lifeScore == -1 ) {
                this.createBackground( 0 );
                this.gameOver();
                this.removeChild( this.frog );
                this.state = GameLayer.STATES.ENDED;
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

 GameLayer.STATES = {
    FRONT: 1,
    LEVEL_1: 2,
    LEVEL_2: 3,
    ENDED: 4
 };
