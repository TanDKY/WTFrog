var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 100, 300, 200, 100) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.frog = new Frog();
        this.frog.setPosition( new cc.Point( 400, 60 ) );
        this.addChild( this.frog );
        this.frog.setZOrder(1);
        //this.frog.scheduleUpdate();
        this.setKeyboardEnabled( true );

        this.cave1 = new Cave();
        this.cave1.setPosition( new cc.Point( 100, 530 ) );
        this.addChild( this.cave1 );

        this.cave2 = new Cave();
        this.cave2.setPosition( new cc.Point( 250, 530 ) );
        this.addChild( this.cave2 );

        this.cave3 = new Cave();
        this.cave3.setPosition( new cc.Point( 400, 530 ) );
        this.addChild( this.cave3 );

        this.cave4 = new Cave();
        this.cave4.setPosition( new cc.Point( 550, 530 ) );
        this.addChild( this.cave4 );
        
        this.cave5 = new Cave();
        this.cave5.setPosition( new cc.Point( 700, 530 ) );
        this.addChild( this.cave5 );

        this.createCarArr();

        this.scheduleUpdate();

        return true;
    },

    onKeyDown: function( e ) {
        this.frog.switchDirection(e);
        this.frog.move();
    },

    onKeyUp: function() {
        this.frog.switchDirection(0);
    },
    createCar: function( index ){
        var posX = new Array(800,1100,0,1500,-400);
        var posY = new Array(180,180,140,100,140);
        var car;
        if(posX[index]>=800){
            car = new Car1();
            car.setPosition(new cc.Point(posX[index],posY[index]));
        }
        else {
            car = new Car2();
            car.setPosition(new cc.Point(posX[index],posY[index]));
        }

        return car;
    },
    createCarArr: function(){
        this.carArr = new Array();
        for(var i=0;i<5;i++){
            this.carArr[i] = this.createCar(i);
            this.addChild(this.carArr[i]);
            this.carArr[i].scheduleUpdate();
        }
    },
    update: function( dt ){
        for(var i=0;i<5;i++){
         if(this.carArr[i].hit(this.frog)){
                this.frog.reborn();
            }
        }
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

