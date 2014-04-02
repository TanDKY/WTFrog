var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 50, 150, 80, 200) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.bg = new Background();
        this.addChild( this.bg );

        this.frog = new Frog();
        this.frog.setPosition( new cc.Point( 400, 60 ) );
        this.addChild( this.frog );
        this.frog.setZOrder(1);
        //this.frog.scheduleUpdate();
        this.setKeyboardEnabled( true );

        for(var i=0;i<5;i++){
            this.cave = new Cave();
            this.cave.setPosition( new cc.Point(80+(160*i),530));
            this.addChild( this.cave );
        }

        this.createCarArr();

        this.createLeafArr();

        /*this.leaf1 = new Leaf(0);
        this.leaf1.setPosition( new cc.Point(400,260));
        this.addChild( this.leaf1 );
        this.leaf1.scheduleUpdate();

        this.leaf2 = new Leaf(1);
        this.leaf2.setPosition( new cc.Point(400,300));
        this.addChild( this.leaf2 );
        this.leaf2.scheduleUpdate();*/


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
        var posX = new Array(800,1100,0,1500,-400,1000);
        var posY = new Array(180,180,140,100,140,100);
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
        for(var i=0;i<6;i++){
            this.carArr[i] = this.createCar(i);
            this.addChild(this.carArr[i]);
            this.carArr[i].scheduleUpdate();
        }
    },
    createLeafs: function( amt ){
        this.leafs = new Array();
        for (var i=0;i<amt;i++){
            this.leafs[i] = new newLeaf();
            this.leafs[i].setPosition( new cc.Point(0+(i*40),260));
        }
        return this.leafs;
    },
    createLeafArr: function(){
        this.leafArr = new Array();
        for(var i=0;i<3;i++){
            this.leafArr[i] = this.createLeafs(3);
            for(var j=0;j<3;j++){
                var xPos = this.leafArr[i][j].getPositionX();
                var yPos = this.leafArr[i][j].getPositionY();
                var auto = new Array(400,700,1000);
                this.leafArr[i][j].setPosition( new cc.Point(auto[i]+xPos,yPos));
                this.addChild( this.leafArr[i][j]);
                this.leafArr[i][j].scheduleUpdate();
            }
        }
    }, 
    update: function( dt ){
        for(var i=0;i<6;i++){
         if(this.carArr[i].hit(this.frog)){
                this.frog.reborn();
            }
        }
        /*var xPos = this.leaf1.getPositionX();
        var yPos = this.leaf1.getPositionY();
        var check = this.leaf1.moveWith(this.frog);
        if(check==1){
            this.frog.setPosition(xPos-40,yPos);
        }
        else if (check==2){
            this.frog.setPosition(xPos,yPos);
        }*/
        var checkLife  = true;
        for(var i=0;i<this.leafArr.length;i++){
            for(var j=0;j<this.leafArr[i].length;j++){
                var xPos = this.leafArr[i][j].getPositionX();
                var yPos = this.leafArr[i][j].getPositionY();
                if( this.leafArr[i][j].moveWith(this.frog)){
                    this.frog.setPosition(xPos,yPos);
                    checkLife = false;
                }
            }
        }
        if(checkLife){
            if (this.frog.getPositionY()>=260&&this.frog.getPositionY()!=340){
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

