    function Collision(cg){
        /**
         *点和矩形间的碰撞
        **/	
        this.col_Point_Rect=function(pointX,pointY,rectObj){
            return (pointX>rectObj.x&&pointX<rectObj.right||pointY>rectObj.y&&pointY<rectObj.bottom);
        }
        /**
         *矩形和矩形间的碰撞
        **/	
        this.col_Between_Rects=function(rectObjA,rectObjB){
            return ((rectObjA.right>rectObjB.x&&rectObjA.right<rectObjB.right||rectObjA.x>rectObjB.x&&rectObjA.x<rectObjB.right)&&(rectObjA.bottom>rectObjB.y&&rectObjA.bottom<rectObjB.bottom||rectObjA.y<rectObjB.bottom&&rectObjA.bottom>rectObjB.y));
        }
        /**
         *点和圆形间的碰撞
        **/	
        this.col_Point_Circle=function(pointX,pointY,circleObj){
            return(Math.pow((pointX-circleObj.x),2)+Math.pow((pointY-circleObj.y),2)<Math.pow(circleObj.r,2));
        }
        /**
         *圆形和圆形间的碰撞
        **/	
        this.col_between_Circles=function(circleObjA,circleObjB){
            return(Math.pow((circleObjA.x-circleObjB.x),2)+Math.pow((circleObjA.y-circleObjB.y),2)<Math.pow((circleObjA.r+circleObjB).r,2));
        }
    };
    exports.Collision = Collision;
