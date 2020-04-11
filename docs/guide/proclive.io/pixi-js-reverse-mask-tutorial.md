## PIXI.js 拖放教程

是时候回馈社区了，所以这次的教程是很多人比较感兴趣的。
我想要这样一个创建渐进层，中心比较明亮，边缘暗淡，就像光一样。
这里是一张我们目前正在开发中的应用了该效果之前和之后对比的游戏截图。


![](/images/tutorial/tutorialWithoutDark.png)


![](/images/tutorial/tutorialWithDark.png)

## 长话短说，上干货

这是第一课,你很可能在这里复制粘贴,了解它的工作原理然后继续,
所以我要让它尽可能的容易。
版本较长，向下滑动即可。
```javascript
/**
* @param size of the screen {width: 800, height: 800}
* @param renderer just pass the renderer
*/
var Light = function(size, renderer){  
  var self = this;
  self.size = size;
  self.renderer = renderer;

  self.container = new PIXI.Container();

  self.canvas = document.createElement('canvas');
  self.canvas.width = size.width;
  self.canvas.height = size.height;
  self.ctx = self.canvas.getContext('2d');

  self.renderTexture = PIXI.RenderTexture.create(self.size.width, self.size.height);
  self.maskSprite = new PIXI.Sprite(self.renderTexture);

  self.rendMask();

  self.darkTex = new PIXI.Texture.fromImage("assets/overlay2.jpg");
  self.darkSprite = new PIXI.Sprite(self.darkTex);
  self.darkSprite.filters = [new PIXI.SpriteMaskFilter(self.maskSprite)];
  self.container.addChild(self.darkSprite);
}

var pt = Light.prototype;

pt.rendMask = function(center, smallLights){  
  var self = this;

  if(!center){
    return false;
    center = {
      x: 400,
      y: 300
    }
  } else {
    center.x = center.x;
    center.y = center.y;
  }

  self.ctx = self.canvas.getContext('2d');

  self.ctx.clearRect(0,0,800,600);
  var gradient = self.ctx.createRadialGradient(center.x, center.y, 1, center.x, center.y, 600);
  gradient.addColorStop(0,"black");
  gradient.addColorStop(1,"white");
  self.ctx.fillStyle = gradient;
  self.ctx.fillRect(0,0,800,600);

  if(!self.spr){
    var texture = new PIXI.Texture.fromCanvas(self.canvas);
    self.spr = new PIXI.Sprite(texture);
  } else {
    self.spr.texture.update();
  }
  self.renderer.render(self.spr, self.renderTexture, true);
}

//module.exports = Light;
var light = new Light({width:800, height: 600}, renderer);

stage.addChild(light.container); 
```
在代码里这样使用
```javascript
light.rendMask({x: renderer.plugins.interaction.mouse.global.x, y: renderer.plugins.interaction.mouse.global.y}, []);  
```
## 初始化设置
我会尽量让这个尽可能的简单，所以我先使用基本pixi.js第一部分的基础示例,
文件和目录结构是这样的:

```
./
./assets/bunny.png
./assets/overlay2.jpg
./lib/pixi.js
./index.html
./main.js
```
这里是index.html
```html
<!DOCTYPE HTML>  
<html>  
<head>  
     <meta charset="UTF-8">
    <title>Proclive Tutorials: Light</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #000000;
        }
    </style>
    <script src="lib/pixi.js"></script>
</head>  
<body>  
  <script src="main.js"></script>
</body>  
</html>  
```
main.js

```javascript
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});  
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('assets/bunny.png');

// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprite's anchor point
bunny.anchor.x = 0.5;  
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = 200;  
bunny.position.y = 150;

stage.addChild(bunny);

// start animating
animate();  
function animate() {  
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;

    // render the container
    renderer.render(stage);
}
```
## 有趣的部分
好了,是时候把兔子放到黑暗中啦。
在我的游戏中，我用这张图片添加划痕到屏幕上,
如果你想清晰的过渡的话，就不需要使用它。看你的需要啦，
这是我用的图片(是jpg格式的,没有透明度)

![](/images/tutorial/overlay2.jpg)

这段代码可以使它生效

```javascript
/**
* @param size of the screen {width: 800, height: 800}
* @param renderer just pass the renderer
*/
var Light = function(size, renderer){  
  var self = this;
  self.size = size;
  self.renderer = renderer;

  self.container = new PIXI.Container();

  self.canvas = document.createElement('canvas');
  self.canvas.width = size.width;
  self.canvas.height = size.height;
  self.ctx = self.canvas.getContext('2d');

  self.renderTexture = PIXI.RenderTexture.create(self.size.width, self.size.height);
  self.maskSprite = new PIXI.Sprite(self.renderTexture);

  self.rendMask();

  self.darkTex = new PIXI.Texture.fromImage("assets/overlay2.jpg");
  self.darkSprite = new PIXI.Sprite(self.darkTex);
  self.darkSprite.filters = [new PIXI.SpriteMaskFilter(self.maskSprite)];
  self.container.addChild(self.darkSprite);
}

var pt = Light.prototype;

pt.rendMask = function(center, smallLights){  
  var self = this;

  if(!center){
    return false;
    center = {
      x: 400,
      y: 300
    }
  } else {
    center.x = center.x;
    center.y = center.y;
  }

  self.ctx = self.canvas.getContext('2d');

  self.ctx.clearRect(0,0,800,600);
  var gradient = self.ctx.createRadialGradient(center.x, center.y, 1, center.x, center.y, 600);
  gradient.addColorStop(0,"black");
  gradient.addColorStop(1,"white");
  self.ctx.fillStyle = gradient;
  self.ctx.fillRect(0,0,800,600);

  if(!self.spr){
    var texture = new PIXI.Texture.fromCanvas(self.canvas);
    self.spr = new PIXI.Sprite(texture);
  } else {
    self.spr.texture.update();
  }
  self.renderer.render(self.spr, self.renderTexture, true);
}

//module.exports = Light;
var light = new Light({width:800, height: 600}, renderer);

stage.addChild(light.container);  
```
这样修改动画函数：
```javascript
function animate() {  
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;
    if(light){
      light.rendMask({x: renderer.plugins.interaction.mouse.global.x, y: renderer.plugins.interaction.mouse.global.y}, []);
    }
    // render the container
    renderer.render(stage);
}
```
最终(简化版)产品是这样的:
 
(移动鼠标查看效果)

<iframe 
 width="800"
 height="600" 
 src="/demo/tutorial-lights"  
 frameborder="0" 
 style="overflow:hidden" 
 scrolling="no">
</iframe>
为了本教程的目的，我不得不精简代码，
在原始代码中，我实现了传递一系列小灯的功能，
这些灯用于环境照明和子弹发光。
在这种情况下，它有点复杂，并且占用大量CPU，
但是如果您使用较小的画布，并将其缩放到屏幕大小，则可以解决此问题。
在这种情况下，灯是有些像素化的感觉，
但是在游戏中使用时，可以有效避免为了实现单一效果牺牲太多资源。

如果您有兴趣，请给我评论，我可能会写第二部分或扩大这篇文章的范围。