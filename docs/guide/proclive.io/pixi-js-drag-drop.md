## PIXI.js 拖放教程

嗨，又见面了，这次的教程比较简短，因为现在是星期天而且我有一瓶啤酒，所以...来吧，给你一个简短但是有用的教程
```javascript
var drag = false;  
createDragAndDropFor(container)

function createDragAndDropFor(target){  
  target.interactive = true;
  target.on("mousedown", function(e){
    drag = target;
  })
  target.on("mouseup", function(e){
    drag = false;
  })
  target.on("mousemove", function(e){
    if(drag){
      drag.position.x += e.data.originalEvent.movementX;
      drag.position.y += e.data.originalEvent.movementY;
    }
  })
}
```
干杯！