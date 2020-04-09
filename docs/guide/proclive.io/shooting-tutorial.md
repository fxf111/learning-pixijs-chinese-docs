## 旋转鼠标并射击

嗨，我们一起来创建一个2d射击游戏。一如既往，让我们给那些喜欢「粘贴/复制」的人他们想要的东西，现在继续:)
### 以下为效果预览
<iframe 
 width="800"
 height="600" 
 src="/demo/1"  
 frameborder="0" 
 style="overflow:hidden" 
 scrolling="no">
</iframe>

```javascript
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});  
document.body.appendChild(renderer.view);

// 创建场景图
var stage = new PIXI.Container();

// 创建图片材质
var texture = PIXI.Texture.fromImage('assets/bunny.png');  
var carrotTex = PIXI.Texture.fromImage('assets/carrot.png');

// 用texture创建Sprite
var bunny = new PIXI.Sprite(texture);

// 将精灵的锚点居中
bunny.anchor.x = 0.5;  
bunny.anchor.y = 0.5;

// 将精灵移到屏幕中央
bunny.position.x = 200;  
bunny.position.y = 150;

var background = new PIXI.Graphics();  
background.beginFill(0x123456);  
background.drawRect(0,0,800,600);  
background.endFill();  
stage.addChild(background);

stage.addChild(bunny);

stage.interactive = true;

stage.on("mousedown", function(e){  
  shoot(bunny.rotation, {
    x: bunny.position.x+Math.cos(bunny.rotation)*20,
    y: bunny.position.y+Math.sin(bunny.rotation)*20
  });
})

var bullets = [];  
var bulletSpeed = 5;

function shoot(rotation, startPosition){  
  var bullet = new PIXI.Sprite(carrotTex);
  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;
  bullet.rotation = rotation;
  stage.addChild(bullet);
  bullets.push(bullet);
}

function rotateToPoint(mx, my, px, py){  
  var self = this;
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  //var degrees = angle * 180/ Math.PI;
  return angle;
}

// 开始设置动画
animate();  
function animate() {  
  requestAnimationFrame(animate);

  // 为了好玩，让我们试兔子先生旋转一点
  bunny.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, bunny.position.x, bunny.position.y);

  for(var b=bullets.length-1;b>=0;b--){
    bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
  }
  // 渲染容器
  renderer.render(stage);
}
```
为了进一步优化这部分代码，你应该在子弹击中一些东西或者超出屏幕时，删除子弹。
我用子弹管理类回收精灵而不是删除或者重新创建。
在任何一款正经游戏中，你最终会想避免调用垃圾收集器和节省内存。
你还可以调整功能，
比如 发射者的距离 以及 给初始坐标添加偏移量
(就像如果你想给兔子一把枪)，大致可以这样写：
```javascript
{
  x: bunny.position.x+Math.cos(bunny.rotation)*distance+offset.x,
  y: bunny.position.y+Math.sin(bunny.rotation)*distance+offset.y
}
```
我得让我们的插画家Pjero画一个胡萝卜枪，这样的话，
我们可以旋转胡萝卜而不是兔子，
但以快速而简单的教程为目的，这些足以把你推动在正确的方向上。 


本教程也希望得到你的建议，你可以在文章底部写下你的建议，稍后我会拜读