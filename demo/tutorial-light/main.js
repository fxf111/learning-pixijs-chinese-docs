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
  if(light){
    light.rendMask({x: renderer.plugins.interaction.mouse.global.x, y: renderer.plugins.interaction.mouse.global.y}, []);
  }
  // render the container
  renderer.render(stage);
}

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
