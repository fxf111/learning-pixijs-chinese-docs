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


<a href="http://www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/index.html">![](/scroller/ps-tut1-screenshot1.png)</a>



作为提醒，点击上面的图片。它将启动并运行当前版本的视差滚动。目前只有两个层，但我们将开始添加第三个，更复杂的层，在接下来的这个教程。我们将通过添加viewport的概念来添加第三层。在此过程中，我们还将执行一些重要的重构，以便将scroller包装在它自己的类中。

虽然本教程主要针对初学者，但希望您至少对面向对象编程概念有基本的了解。不要担心这句话会让您感到不舒服，因为对于不熟悉面向对象JavaScript的人来说，我仍然会在正确的方向上提供足够的提示。

## 开始

如果您还没有完成本系列的[第一个教程](/guide/parallax-scroller/part-1.md)，那么我建议您先从那里开始。


还需要记住的是，您需要运行本地Web服务器才能测试您的工作。 如果您尚未这样做，请参阅[第一个教程的“入门”](/guide/parallax-scroller/part-1.md#入门)部分，以获取有关如何设置Web服务器的详细信息。

## PIXI显示对象的扩展

正如我们之前发现的，pixi.js提供了几种可以使用的显示对象类型。 如果您还记得的话，我们在选择`PIXI.extras.TilingSprite`之前，先简单的体验过`PIXI.Sprite`。

这两个类有很多相同属性。例如，它们都提供了·`position`、`width`、`height`和`alpha`属性。另外，可以通过`addChild()`方法轻松地将它们添加到容器中。事实上，是`PIXI.Container`本身是一个显示对象，它还为您提供了`Sprite`和`TilingSprite`类所使用的许多相同属性。

由于继承的奇妙之处，所有这些通用功能都可用，其中一个类可以继承和扩展另一个类的功能。 为了帮助您理解这一点，请查看下图，该图显示了pixi.js提供的大多数显示对象。

![](/scroller/ps-tut2-screenshot1.png)

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

