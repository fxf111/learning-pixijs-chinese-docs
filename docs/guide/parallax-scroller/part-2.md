英文教程原作者[Christopher](http://www.yeahbutisitflash.com/?author=1)

[关注他@chriscaleb](https://twitter.com/intent/follow?screen_name=chriscaleb)

本系列教程已经针对[PixiJS v4](http://www.pixijs.com/)进行了更新。

你是否玩过诸如[Canabalt](http://www.adamatomic.com/canabalt/)和[Monster Dash](https://chrome.google.com/webstore/detail/monster-dash/cknghehebaconkajgiobncfleofebcog?hl=en)等无尽的奔跑游戏，并想知道如何创建自己的滚动游戏地图。第一部分介绍了pixi.js渲染引擎，并介绍了视差滚动的基本原理。现在，我们将通过添加视口(viewport)的概念来构建第一次滚动尝试。

## 你将会学到...

- 扩展pixi.js显示对象
- JavaScript中面向对象的基础知识
- 如何添加一个视口到你的滚动

## 你应该了解...

- 了解面向对象的概念
- pixi.js的一些基础知识

您将使用在[第一个教程](/guide/parallax-scroller/part-1.md)中生成的代码。或者，您可以从[GitHub下载](https://github.com/ccaleb/pixi-parallax-scroller/tree/master/tutorial-1)以前的教程源代码。另外，本教程的全部源代码也可以在[GitHub](https://github.com/ccaleb/pixi-parallax-scroller/tree/master/tutorial-2)上找到。


<a href="http://www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/index.html">![](/images/scroller/ps-tut1-screenshot1.png)</a>



作为提醒，点击上面的图片。它将启动并运行当前版本的视差滚动。目前只有两个层，但我们将开始添加第三个，更复杂的层，在接下来的这个教程。我们将通过添加viewport的概念来添加第三层。在此过程中，我们还将执行一些重要的重构，以便将scroller包装在它自己的类中。

虽然本教程主要针对初学者，但希望您至少对面向对象编程概念有基本的了解。不要担心这句话会让您感到不舒服，因为对于不熟悉面向对象JavaScript的人来说，我仍然会在正确的方向上提供足够的提示。

## 开始

如果您还没有完成本系列的[第一个教程](/guide/parallax-scroller/part-1.md)，那么我建议您先从那里开始。


还需要记住的是，您需要运行本地Web服务器才能测试您的工作。 如果您尚未这样做，请参阅[第一个教程的“入门”](/guide/parallax-scroller/part-1.md#入门)部分，以获取有关如何设置Web服务器的详细信息。

## PIXI显示对象的扩展

正如我们之前发现的，pixi.js提供了几种可以使用的显示对象类型。 如果您还记得的话，我们在选择`PIXI.extras.TilingSprite`之前，先简单的体验过`PIXI.Sprite`。

这两个类有很多相同属性。例如，它们都提供了·`position`、`width`、`height`和`alpha`属性。另外，可以通过`addChild()`方法轻松地将它们添加到容器中。事实上，是`PIXI.Container`本身是一个显示对象，它还为您提供了`Sprite`和`TilingSprite`类所使用的许多相同属性。

由于继承的奇妙之处，所有这些通用功能都可用，其中一个类可以继承和扩展另一个类的功能。 为了帮助您理解这一点，请查看下图，该图显示了pixi.js提供的大多数显示对象。

![](/images/scroller/ps-tut2-screenshot1.png)

从上图可以看出，最基本的类型是`PIXI.DisplayObject`类，每个其他显示对象都继承自该类。 此类表示将对象呈现到屏幕所需的绝对必要元素。

::: tip
当我说**显示对象**(**display objects**)时，我不仅指的是`PIXI.DisplayObject`类。 相反，我指的是`PIXI.DisplayObject`及继承自其的所有对象。 本质上，当我使用显示对象一词时，是指pixi.js可以在屏幕上呈现的任何对象。
:::

继承链中的下一个是`PIXI.Container`，它允许一个对象充当其他显示对象的容器。 我们在第一个教程中使用的`addChild()`方法就是`PIXI.Container`提供的，也可以通过`PIXI.Sprite`和`PIXI.TilingSpite`的继承使用。

本质上，继承树中的每个类都是它所继承的类的更专注于某一特殊类的版本。好消息是，我们可以利用继承来创建我们自己的专门显示对象。换句话说，我们可以编写专门的类来表示每个视差层，并让pixi.js处理它们，就好像它们只是另一个显示对象一样。这为我们提供了一种非常好的封装代码的方法，并保持所有东西的整洁。

### 制作一个专门的远层（FAR LAYER）显示对象

因此，让我们从远开始。

打开index.html文件，在init()函数中查找创建和设置该层的代码行。如下所示
```js
var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");	
far = new PIXI.extras.TilingSprite(farTexture, 512, 256);
far.position.x = 0;
far.position.y = 0;
far.tilePosition.x = 0;
far.tilePosition.y = 0;
stage.addChild(far);
```

如果我们能够创建一个表示远层的类，并在类中隐藏我们的实现细节，然后就可以使用下面的代码替换上面那些代码。

```js
far = new Far();
stage.addChild(far);
```

大大减少了代码，对吧?另外，它的可读性也更强了。

让我们通过创建一个名为`Far`的类来实现它，它代表了我们的视差滚动的`Far`层。在项目的根文件夹中创建一个新文件，并将其命名为`Far.js`。

现在定义一个名为`Far`的函数，它代表我们这个类的构造函数。
```js
function Far(texture, width, height) {
  PIXI.extras.TilingSprite.call(this, texture, width, height);
}
```

在构造函数下面添加以下行，然后保存文件
```js {5}
function Far(texture, width, height) {
  PIXI.extras.TilingSprite.call(this, texture, width, height);
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
```

上面那行表示这个类继承了`PIXI.extras.TilingSprite`所有的属性和方法。

::: tip
构造函数是创建类实例的特殊函数类型。在JavaScript中，构造函数的名称也用于指定类的名称。
:::

那么为什么我们的`Far`类要继承`PIXI.TilingSprite`呢?如果你还记得在第一个教程中，我们使用了`TilingSprite`的实例来表示我们的每个视差层。因此，在我们自己的表示这些视差层的自定义类中使用这些特性是有意义的。基本上我们要说的是:我们的`Far`类是特殊的`PIXI.extras.TilingSprite`类（专门表示视差层的）。

因为我们的`Far`类继承自`PIXI.extras.TilingSprite`，所以我们需要记住要初始化`TilingSprite`。 这是通过在我们自定义类的构造函数中调用`TilingSprite`类的构造函数来完成的。 我在下面突出显示了执行此操作的代码行：

```js {2}
function Far(texture, width, height) {
  PIXI.extras.TilingSprite.call(this, texture, width, height);
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
```

这样做是因为我们希望我们的`Far`类继承`TilingSprite`的所有功能。因为`TilingSprite`需要将三个参数传递给它的构造函数，所以我们需要确保我们自己的类接受这些参数并使用它们来进行初始化。下面我会突出显示类中用到这些参数的代码行：
```js {1-2}
function Far(texture, width, height) {
  PIXI.extras.TilingSprite.call(this, texture, width, height);
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
```

我们还需要向`Far`类添加一些额外的功能，但实际上我们已经可以开始将其集成到`index.html`页面中了。

### 实例化您的FAR类

回到`index.html`页面。

为了使用`Far`类，您需要引入包含这个类的js文件。
```html {6}
<body onload="init();">
  <div align="center">
    <canvas id="game-canvas" width="512" height="384"></canvas>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.0.0/pixi.min.js"></script>
  <script src="Far.js"></script>
```

删除下面高亮的代码行
```js {2}
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new PIXI.extras.TilingSprite(farTexture, 512, 256); // 删除此行
  far.position.x = 0;
  far.position.y = 0;
  far.tilePosition.x = 0;
  far.tilePosition.y = 0;
  stage.addChild(far);
```

用这个替换它：
```js {2}
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new Far(farTexture, 512, 256); // 用此行替换
  far.position.x = 0;
  far.position.y = 0;
  far.tilePosition.x = 0;
  far.tilePosition.y = 0;
  stage.addChild(far);
```

好吧，我承认，目前还没有太大的改进。让我们继续封装`Far`类

### 封装位置相关代码

在`index.html`中，我们设置了`far`的`position`和`tilePosition`属性。 让我们删除该功能，将其封装在`Far`类中。

首先从`index.html`删除下面高亮的代码行：

```js {3-6}
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new Far(farTexture, 512, 256);
  far.position.x = 0;
  far.position.y = 0;
  far.tilePosition.x = 0;
  far.tilePosition.y = 0;
  stage.addChild(far);
```
保存所做的更改，然后移至`Far.js`文件。 现在，直接在类自己的构造函数中设置`position`和`tilePosition`属性(添加高亮的代码行)：

```js {4-7}
function Far(texture, width, height) {
  PIXI.extras.TilingSprite.call(this, texture, width, height);
	
  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}
```
如果您一般不熟悉面向对象的JavaScript或面向对象的编程，那么您可能想知道`this`关键字的目的在上面的代码中是什么。 基本上，`this`可以引用类的已创建实例。 通过`this`，我们可以引用该实例的所有属性和方法。

因为我们的`Far`类继承自`PIXI.extras.TilingSprite`，所以它还具有`TilingSprite`的所有属性和方法，包括`position`和`tilePosition`。 要访问这些属性，我们只需使用`this`关键字。 这是设置图层x位置的代码行:

```js
this.position.x = 0;
```

还应注意，`this`关键字也可以引用添加到类中的新属性或方法。

现在保存您的更改并在浏览器中测试您的代码。一切都应按预期运行。在Chrome的JavaScript控制台检查没有抛出错误。

### 封闭纹理

好了，我们开始有进展了。如果你回头看看`index.html`页面，你会发现代码开始变得更简洁了

```js {1-3}
var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");	
far = new Far(farTexture, 512, 256);
stage.addChild(far);
```

但是仍有改进的空间。 毕竟，如果我们可以将位置想着代码直接隐藏在`Far`类中，那么我们也可以把纹理相关的代码封装到那里。

移至`Far.js`文件，并在构造函数的开头添加一行创建图层的纹理代码：
```js {2}
function Far(texture, width, height) {
  var texture = PIXI.Texture.fromImage("resources/bg-far.png");
  PIXI.extras.TilingSprite.call(this, texture, width, height);
```

现在显式地将纹理的宽度和高度传递到`TilingSprite`的构造函数中
```js {3}
function Far(texture, width, height) {
  var texture = PIXI.Texture.fromImage("resources/bg-far.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);
```

由于我们现在直接在类中处理纹理，所以实际上不需要将`texture`、`width`和`height`参数传递给我们的构造函数。删除所有三个参数并保存代码

```js
function Far(texture, width, height) { //删除texture, width, height
```

您的构造函数现在应如下所示：
```js
function Far() {
  var texture = PIXI.Texture.fromImage("resources/bg-far.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}
```

现在要做的就是回到`index.html`文件，删除我们之前创建的纹理，并将其传递给`Far`的构造函数的参数：
```js {1-2}
var farTexture = PIXI.Texture.fromImage("resources/bg-far.png"); // 删除此行
far = new Far(farTexture, 512, 256); // 删除参数 farTexture, 512, 256
stage.addChild(far);
```

您的代码现在应该是这样的:

```js
far = new Far();
stage.addChild(far);
```

比以前简单明了多了，对吧?所有的实现细节现在都安全地隐藏在我们的`Far`类中。

### 封装中间层（MID LAYER）代码

我花了一些时间引导您完成创建代表我们的视差滚动的`Far`类所需的步骤。 该类继承自`PIXI.extras.TilingSprite`，其行为类似于任何其他pixi.js显示对象。现在利用我们所学的知识来创建一个代表视差滚动器中间层的类`Mid`。

创建一个名为`Mid.js`的新文件，并向其添加以下代码：

```js
function Mid() {
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
```

现在在构造函数中，创建中间层的纹理并设置它的`position`属性
```js {2-9}
function Mid() {
  var texture = PIXI.Texture.fromImage("resources/bg-mid.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 128;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
```

保存你的`Mid.js`文件，然后转到index.html，并引入这个js
```html {7}
<body onload="init();">
  <div align="center">
    <canvas id="game-canvas" width="512" height="384"></canvas>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.0.0/pixi.min.js"></script>
  <script src="Far.js"></script>
  <script src="Mid.js"></script>
```

完成后，向下滚动到您的`init()`函数并删除以下行：
```js {4-9}
far = new Far();
stage.addChild(far);

var midTexture = PIXI.Texture.fromImage("resources/bg-mid.png");
mid = new PIXI.extras.TilingSprite(midTexture, 512, 256);
mid.position.x = 0;
mid.position.y = 128;
mid.tilePosition.x = 0;
mid.tilePosition.y = 0;
stage.addChild(mid);
```

用高亮的这一行代码替换它们：
```js {4}
far = new Far();
stage.addChild(far);

mid = new Mid();
stage.addChild(mid);
```

保存你的`Mid.js`文件并在浏览器中测试你的最新代码。

### 编写一个UPDATE()方法
我们已经对代码进行了大量的重构，但是仍然可以做一些事情。 返回到`index.html`文件并向下滚动到其主更新循环：
```js
function update() {
  far.tilePosition.x -= 0.128;
  mid.tilePosition.x -= 0.64;

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

方法中的前两行通过更新其`tilePosition`属性来滚动图层。 但是，我们的代码目前存在一个小问题：即暴露了`Mid`和`Far`类的内部实现，可以直接更改`tilePosition`属性。 这违反了封装的面向对象原则。

理想情况下，我们要在类中隐藏实现。 如果两个类都具有一个`update()`方法，为我们执行滚动，那么我们的代码将易读。 换句话说，对于我们的主循环，下面这种方式更为可取：
```js {2-3}
function update() {
  far.update();
  mid.update();

  renderer.render(stage);

  requestAnimFrame(update);
}
```

幸运的是，我们将向Far和Mid类都添加一个`update()`方法。
从远层开始，打开`Far.js`并添加以下方法：

```js {3-5}
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function() {
  this.tilePosition.x -= 0.128;
};
```

方法的内容你应该很熟悉。它只是简单地将纹理的平铺位置移动0.128像素，这正是我们目前在`index.html`主循环中所做的。

好的，保存您的更改并向`Mid.js`添加一个类似的方法
```js {3-5}
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function() {
  this.tilePosition.x -= 0.64;
};
```

两种方法之间的唯一区别是中间层的`update()`方法将其滚动更大的数量。

保存所做的更改，然后移回`index.html`。 现在，我们要做的就是从主循环中调用每一层的`update()`方法。 删除以下高亮的两行代码：

```js {2-3}
function update() {
  far.tilePosition.x -= 0.128;  // 删除
  mid.tilePosition.x -= 0.64;   // 删除

  renderer.render(stage);

  requestAnimFrame(update);
}
```

并替换为下面高亮的两行：
```js {2-3}
function update() {
  far.update();
  mid.update();

  renderer.render(stage);

  requestAnimFrame(update);
}
```

保存所做的更改，并测试所有内容是否都能在Chrome中按预期运行。

### 停下来思考一下

虽然你的视差滚动仍然表现相同，我们实际上做了一些重要的改变，以整体架构的代码。我们采用了更面向对象的设计，利用继承来创建两个表示视差层的特殊显示对象。

能够编写专门的显示对象，在大部分情况下都非常有用。我们的`Far`和`Mid`类本质上与pixi.js支持的任何其他显示对象一样。下图说明了我们两个专用类在Pixi显示对象类的继承结构中的位置。

![](/images/scroller/ps-tut2-screenshot2.png)

## 创建一个Scroller类

本教程开始时概述的目标之一是将视差滚动条封装到它自定义类中。现在我们已经写了我们的`Far`、`Mid`类。

这样，我们就可以从`index.html`中删除我们的`Mid`和`Far`实例，并将它们封装在一个可以满足所有滚动需求的对象中。

让我们编写一个这样的类。创建一个名为`Scroller.js`的新JavaScript文件，并通过向其添加以下代码来定义一个名为`Scroller`的类：
```js
function Scroller(stage) {
}
```

关于该类，有两点值得注意。 首先，其构造函数希望引用我们的stage舞台（`Pixi.Container`）。 其次，它不继承任何东西。

与`Far`和`Mid`类不同，我们的`Scroller`类不是一个专门的显示对象。相反，它将使用构造函数的`stage`参数添加我们的中间层和中间层。

让我们从在类中设置远端层`far`开始:
```js {2-3}
function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);
}
```

第一行代码创建了`Far`类的一个实例。注意，我们将实例存储在名为`far`的成员变量中。

::: tip
通过使用`this`关键字将属性直接添加到您的类中来创建成员变量。 成员变量的优点是在类实例的整个生命周期中都可以持久保存，这意味着类的任何其他方法也可以访问它。
:::

第二行将远层(`Far`的实例)添加到舞台上。

现在，对中间层进行相同的操作。 在构造函数中添加以下两行：
```js {5-6}
function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);
}
```

我们的类现在有两个成员变量:`far`和`mid`，这很有用，因为它允许我们从其他方法中访问视差层，我们可以添加到类中。这是非常方便的，因为我们确实需要添加一个额外的方法。它将用于更新两个层的位置。现在让我们继续添加这个方法：

```js {9-12}
function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);
}

Scroller.prototype.update = function() {
  this.far.update();
  this.mid.update();
};
```

还记得我们为中类和远类都编写了`update()`方法吗?在我们的`Scroller`类的`update()`方法中需要做的就是调用这些方法。

### 插入`Scroller`类

现在我们有了一个代表视差滚动条的`Scroller`类，我们可以回到`index.html`页面并将其插入。

打开`index.html`并引入`Scroller.js`
```html {4}
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.0.0/pixi.min.js"></script>
<script src="Far.js"></script>
<script src="Mid.js"></script>
<script src="Scroller.js"></script>
```

现在转到`init()`函数并删除以下高亮代码行：
```js {9-13}
function init() {
  stage = new PIXI.Stage(0x66FF99);
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  far = new Far();
  stage.addChild(far);

  mid = new Mid();
  stage.addChild(mid);

  requestAnimationFrame(update);
}
```

记住，远层和中间层现在都将由你的`Scroller`类来处理。因此，让我们创建一个`Scroller`实例来替换我们刚刚删除的行:

```js {9}
function init() {
  stage = new PIXI.Stage(0x66FF99);
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  scroller = new Scroller(stage);

  requestAnimationFrame(update);
}
```

我们向`Scroller`类构造函数传递了一个场景`stage`的引用。我们这样做很重要，因为`Scroller`类需要这个引用，以便将它的远视差层和中视差层添加到显示列表中。

现在我们要做的就是在主循环中调用`scroller`的`update()`方法。 首先，从主循环中删除以下两行：
```js {2-3}
function update() {
  far.update(); //删除
  mid.update(); //删除

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

现在添加以下行以更新滚动条：
```js {2}
function update() {
  scroller.update(); //添加此行

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

保存更改并使用Chrome测试所有内容。 

我们已经成功地重新构造了视差滚动器，所有的东西都包含在一个类中。如果你查看`index.html`，你会发现我们已经隐藏了上次在第一个教程中编写的所有实现代码。

## 添加视口(VIEWPORT)

我们已经取得了巨大的进步，但是我们还要增加一件事。 为了使滚动条完整，我们需要添加视口的概念。 将视口视为在游戏地图上查看的窗口。

你可能会问，我们不是已经有了视口吗？毕竟，当您在浏览器中运行代码时，我们只会看到在舞台范围内可见的内容。这是完全正确的，但目前还没有办法知道我们在游戏世界中滚动了多远。另外，如果我们可以简单地跳到一个特定的位置，看看我们的图层应该是什么样子，不是很好吗?一旦我们添加了视口(viewport)的概念并提供了一种设置其当前位置的方法，所有这些都将成为可能。

### 向`Scroller`类添加`setViewportX()`方法

我们目前有一个`update()`方法，可以用来连续滚动视差层。让我们用一个名为`setViewportX()`的新方法来代替它，我们可以使用它来设置视口(viewport)的水平位置。调用这个方法可以让我们任意定位游戏地图。

让我们从`Scroller`类开始。

打开`Scroller.js`并删除现有的`update()`方法：
```js {9-12}
function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);
}

Scroller.prototype.update = function() {
  this.far.update();
  this.mid.update();
};
```

现在用`setViewportX()`方法替换它并保存您的更改：
```js {9-12}
function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);
}

Scroller.prototype.setViewportX = function(viewportX) {
  this.far.setViewportX(viewportX);
  this.mid.setViewportX(viewportX);
};
```

我们的`setViewportX()`方法相当简单。它期望将一个数字作为方法的`viewportX`参数传递，然后将该值传递给每个层。正如您所看到的，我们的两个层都需要实现它们自己的`setViewportX()`方法。我们现在就开始吧。

### 向`Far`类添加`setViewportX`()方法

我们将从删除现有的`update()`方法类开始。打开Far.js并删除以下行：

```js {13-15}
function Far() {
  var texture = PIXI.Texture.fromImage("resources/bg-far.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function() {
  this.tilePosition.x -= 0.128;
};
```

::: tip 注意
如无特殊说明，删除/添加/替换行，指的是对高亮行的操作。如果无高亮行，则指全部代码。
:::

我们需要能够跟踪视口的水平位置。为此，在类构造函数中定义一个成员变量：
```js {10}
function Far() {
  var texture = PIXI.Texture.fromImage("resources/bg-far.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;

  this.viewportX = 0;
}
```
现在，将以下常量添加到类中：
```js {3}
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.DELTA_X = 0.128;
```

您对`DELTA_X`常量的值应该很熟悉。这是我们先前在每次`update()`调用时将图层的平铺位置偏移的像素数。 当然，使用常量会使我们的代码更具可读性和可维护性，这就是为什么我们选择使用常量。 基本上，每次视口移动一个单位时，我们都会使用该常数将远端图层移动0.128像素。 现在，让我们编写一个`setViewportX()`方法来为我们做这件事。 添加以下内容：

```js {5-9}
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.DELTA_X = 0.128;

Far.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};
```

上面的代码不难理解。首先，我们计算自上次调用`setViewportX()`以来走过的距离。然后将视口的新水平位置存储在我们的`viewportX`成员变量中。 最后，我们将行进的距离乘以`DELTA_X`常数，以确定将图层的图块位置移动多远。

::: tip
请注意，我们的x位置代表视口窗口的左侧。在其他实现中，x位置表示视口的中心也很常见。
:::

保存`Far.js`。

现在，我们需要对`Mid`类进行相同的更改。

### 向`Mid`类添加`setViewportX`()方法

`Mid`类的代码与`Far`类的代码几乎相同，所以我们改起来会很快。

打开`Mid.js`并删除它的`update()`方法

```js {13-15}
function Mid() {
  var texture = PIXI.Texture.fromImage("resources/bg-mid.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 128;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function() {
  this.tilePosition.x -= 0.64;
};
```

现在将以下行添加到您的类中:
```js {10,15,17-20}
function Mid() {
  var texture = PIXI.Texture.fromImage("resources/bg-mid.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 128;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;

  this.viewportX = 0;
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.DELTA_X = 0.64;

Mid.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};
```

这两个类之间的唯一区别是，`Mid`类的`DELTA_X`常数的值为`0.64`，这是为了确保其层的滚动速度比远层的滚动速度快。 保存您的更改。

### 测试视口(VIEWPORT)

我们应该测试视口，并确保设置它的位置反映在视差层中。首先，我们需要打开`index.html`并删除它对`scroller`的`update()`方法的调用。只需从主循环中删除以下行即可:

```js {2}
function update() {
  scroller.update();

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

保存`index.html`文件并在浏览器中测试更改。你应该注意到你看到了你的视差层，但也没有滚动。那是因为我们没有添加任何代码来实际改变视口的水平位置。目前它的默认x位置为0。

在添加代码之前，让我们测试一下`scroller`的`setViewportX()`是否工作。

只需按`F12`键（在Mac上为`Cmd + Opt + i`）以打开“开发工具”窗口，然后单击“`console`”选项卡。

打开Chrome的JavaScript控制台，然后尝试输入以下内容，将视口向右移动50像素：

```js
scroller.setViewportX(50);
```

::: tip
JavaScript控制台可以访问程序中的任何全局变量。因此，我们可以通过全局`scroller`变量访问`scroller`，并调用它的`setViewportX()`方法。
:::

你应该看到你的视差层移动到左边，这表明我们已经成功地重新定位了视口。

尝试将视口移动到7000的x位置
```js
scroller.setViewportX(7000);
```

### 滚动视口
很明显，我们可以通过不断更新滚动条的视口位置来模拟游戏世界中的运动。我们可以在主循环中这样做，但要做到这一点，我们需要能够获得`viewport`的当前水平位置。让我们继续，并添加一个新方法到我们的`Scroller`类，以允许我们这样做。

### 获取视口的位置
目前，我们的`Scroller`类并不存储当前的视口位置，因此我们需要一个成员变量来实现这个目的。

打开`Scroller.js`并在构造函数中定义以下成员变量
```js {8}
function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);

  this.viewportX = 0;
}
```

调用`setViewportX()`方法更新`viewportX`的值：
```js {2}
Scroller.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  this.far.setViewportX(viewportX);
  this.mid.setViewportX(viewportX);
};
```

完成之后，我们可以编写一个`getViewportX()`方法，它将返回`viewport`的当前位置。
```js {7-9}
Scroller.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  this.far.setViewportX(viewportX);
  this.mid.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
  return this.viewportX;
};
```

保存上述修改。

### 更新主循环

现在剩下的就是不断地更新你的滚动条的视口位置。我们将在你的项目主循环中做这件事。

打开`index.html`，只需添加以下两行代码：

```js {2-3}
function update() {
  var newViewportX = scroller.getViewportX() + 5;
  scroller.setViewportX(newViewportX);
            
  renderer.render(stage);

  requestAnimationFrame(update);
}
```

第一行代码表示，获取视口的x位置，并将其增加5个单位，赋值给`newViewportX`。第二行代码表示获设置`viewport`为`newViewportX`。实际上，它迫使`viewport`在每次调用主循环时滚动5个单位。

保存您的工作，然后尝试在Chrome中运行它。 您应该再次看到视差图层滚动离开。 尝试尝试不同的滚动速度。 例如，尝试将视口增加15个单位而不是5个单位。

### 移动视口

让我们在`Scroller`类中再添加一个方法，它将允许您将`viewport`从当前位置移动指定的距离。这将帮助我们使我们的主循环更加清晰。

打开`Scroller.js`并添加以下方法：
```js {5-8}
Scroller.prototype.getViewportX = function() {
  return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
  var newViewportX = this.viewportX + units;
  this.setViewportX(newViewportX);
};
```

就像我们之前所做的一切一样，这种新方法并不难理解。它只是计算出`viewport`的新位置，然后调用类`setViewportX()`方法来设置`viewport`的位置。

回到`index.html`并删除以下行：

```js {2-3}
function update() {
  var newViewportX = scroller.getViewportX() + 5;
  scroller.setViewportX(newViewportX);

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

将它们替换为使用`moveViewportXBy()`方法的这一行

```js {2}
function update() {
  scroller.moveViewportXBy(5);

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

保存更改并测试。

## 修改主入口点

本教程的第二部分即将结束。在我们结束之前，让我们打开`index.html`并做最后一个重构。

虽然我们在减少对全局变量的依赖方面做了令人钦佩的工作，但是我们的`index.html`文件仍然有一些全局变量。实际上，在大型应用程序中，最好将尽可能多的JavaScript从HTML页面中分离出来。虽然我们的HTML页面中已经没有多少JavaScript了，但是我们可以做得更好。让我们把代码封装在它自己的类`Main`中。这样，我们当前依赖的全局变量将成为新类的成员变量。

创建一个新文件并命名为`Main.js`。

为这个类创建一个构造函数，把HTML页面的`init()`函数的代码放在里面：
```js
function Main() {
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  this.scroller = new Scroller(this.stage);

  requestAnimationFrame(this.update.bind(this));
}
```

注意上面使用`this`关键字。 我们使用它来定义`stage`，`renderer`和`scroller`作为成员变量。

在我们调用JavaScript函数`requestAnimationFrame()`时也使用了这个关键字。

```js
requestAnimationFrame(this.update.bind(this));
```

让我们来编写这个类的`update`方法，它在重新绘制场景时被调用。这个方法的代码来自HTML页面上的`update`函数：
```js
Main.prototype.update = function() {
  this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  this.renderer.render(this.stage);
  requestAnimationFrame(this.update.bind(this));
};
```

我们再次在需要的地方使用了`this`关键字，并且利用了JavaScript的`bind()`函数来确保更新循环的作用域始终是正确的。

另外，请注意，上面的代码在调用`scroller`的`moveViewportXBy()`方法时使用了一个名为`SCROLL_SPEED`的常量。在此之前，我们只是传递了一个硬编码的值。我们把这个常数加到`Main`类中。在构造函数后直接添加以下行：
```js {4}
  requestAnimationFrame(this.update.bind(this));
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
```

好了，保存您的修改。

现在让我们打开`index.html`并删除我们刚刚在`Main`类中移动完的旧代码。
```js {2-21}
<script>
  function init() {
    stage = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(
      512,
      384,
      {view:document.getElementById("game-canvas")}
    );

    scroller = new Scroller(stage);

    requestAnimationFrame(update);
  }

  function update() {
    scroller.moveViewportXBy(5);

    renderer.render(stage);

    requestAnimationFrame(update);
  }
</script>
```

用一个新的`init()`函数替换您的代码，该函数只实例化`Main`类：

```js {2-4}
<script>
  function init() {
    main = new Main();
  }
</script>
```

最后，引入`Main.js`。

```html {5}
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.0.0/pixi.min.js"></script>
<script src="Far.js"></script>
<script src="Mid.js"></script>
<script src="Scroller.js"></script>
<script src="Main.js"></script>
```

## 总结

现在一切都变得更干净了，我们只有一个`Scroller`类，用于管理视差图层。  尽管我们这次的重点不是放在pixi.js上，但您至少现在应该了解扩展Pixi的显示对象类的优点。

## 下节预告
所有这些更改都处于理想的位置，现在我们可以处理更复杂的第三个视差层。 该图层将充当您游戏世界的地图，并由一系列精灵组成，而不是简单的重复纹理。 我们还将介绍pixi.js，涵盖各种小东西，包括精灵表单（sprite sheets，此处翻译可能有误），纹理帧和对象池。

请记住，本系列教程和本系列前一篇教程的源代码都可以在[GitHub](https://github.com/ccaleb/pixi-parallax-scroller)上找到。

[下节教程](/)再见。