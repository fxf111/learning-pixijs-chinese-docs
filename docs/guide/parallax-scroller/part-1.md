英文教程原作者[Christopher](http://www.yeahbutisitflash.com/?author=1)

[关注他@chriscaleb](https://twitter.com/intent/follow?screen_name=chriscaleb)

本系列教程已经针对[PixiJS v4](http://www.pixijs.com/)进行了更新。

你是否玩过诸如[Canabalt](http://www.adamatomic.com/canabalt/)和[Monster Dash](https://chrome.google.com/webstore/detail/monster-dash/cknghehebaconkajgiobncfleofebcog?hl=en)等无尽的奔跑游戏，并想知道如何创建自己的滚动游戏地图?在本教程中，我们将首先使用JavaScript和[pixi.js 2D渲染引擎](http://www.pixijs.com/)构建一个类似的视差滚动条。

## 你将会学到...

- pixi.js的基础
- 如何使用纹理和平铺精灵
- 如何实现简单的视差滚动

## 你应该了解...

- 对JavaScript或ActionScript有基本的了解

JavaScript是无处不在。由于浏览器的日益成熟和大量的JavaScript库，我们开始真正看到HTML5游戏开发的蓬勃发展。但是，由于有这么多可用的库，因此选择合适的库来解决这一难题就成为了部分挑战。

本系列教程将向您介绍JavaScript游戏开发的基础知识，并重点介绍pixi.js。Pixi.js是一个新的2D渲染框架，支持WebGL和HTML5 Canvas。到最后，你将制作如下水平视差滚动游戏地图。


<a href="http://www.yeahbutisitflash.com/pixi-parallax-scroller/final/index.html">![](/images/scroller/ps-tut1-screenshot1.png)</a>

单击上面的图像将启动并运行视差滚动的最终版本。请注意它包含了三个视差层:远层、中间层和前景层。在第一个教程中，我们将实现一些基本的视差滚动，即只处理远层和中间层。当然，为了完成这件事情，我们会给你介绍一些pixi.js的基础知识。此外，如果你是JavaScript新手，这还是一个学习HTML5游戏编程基础的好地方。

<a href="http://www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/index.html">![](/images/scroller/ps-tut1-screenshot1.png)</a>

在我们开始之前，请单击上面的图像，查看当前这部分教程的成果。你可以从GitHub[下载本教程的源代码](http://github.com/ccaleb/pixi-parallax-scroller)。

## 入门

开发这个项目，需要合适的代码编辑器或IDE。 我使用的Sublime Text 2，你们可以从[www.sublimetext.com/2](http://www.sublimetext.com/2)下载其试用版。

不只如此，您还需要一个web浏览器来测试您的工作。任何现代浏览器都可以，但是我要使用的Chrome，并在本教程中介绍它的一些开发工具。如果你没有安装Chrome，就先安装一个吧。

[www.google.com/chrome.](http://www.google.com/chrome)

要测试您的工作，您需要在开发计算机上运行本地网络服务器。 Microsoft Windows用户可以设置IIS：[www.howtogeek.com/howto/windows-vista/how-to-install-iis-on-windows-vista](http://www.yeahbutisitflash.com/www.howtogeek.com/howto/windows-vista/how-to-install-iis-on-windows-vista)，而Mac OS X用户可以配置和运行内置的Apache服务器：h[ttp：//macdevcenter.com/pub/a/mac/2001/12/07/apache.html](http://macdevcenter.com/pub/a/mac/2001/12/07/apache.html)。 如果您安装了OS X Mountain Lion，则设置Web服务器的过程将比以前简单一些。 [查阅此资源](http://reviews.cnet.com/8301-13727_7-57481978-263/how-to-enable-web-sharing-in-os-x-mountain-lion/)以启动Apache并在Mountain Lion上运行。

设置Web服务器后，在其根目录中创建一个新文件夹，并将其命名为`parallax-scroller`。 如果您使用的是Windows，则Web服务器的根文件夹的路径将为`C：\inetpub\parallax-scroller`。 如果您使用的是OS X，则您的个人Web文件夹的路径将为`/Users/your_user_name/Sites`。 请记住用您的实际用户名替换`your_user_name`。

最后，在本教程中，我们将使用几个图形资源，你可以在这个网址为[www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/resources.zip](http://www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/resources.zip)下载此文件并将其解压缩到您的`parallax-scroller`文件夹中。

你在windows上看到的`parallax-scroller`文件夹包含这些东西。

![](/images/scroller/screenshot3.png)

Mac OS X 下是这样的。

![](/images/scroller/screenshot4.png)

现在启动Sublime Text 2或您自己喜欢的代码编辑器，我们要开始写代码了。


## 设置CANVAS画布

每个pixi.js项目都是从一个HTML文件开始的。在这里，我们将引入pixi.js，并创建一个HTML5 Canvas元素。canvas元素表示的是在HTML页面上呈现滚动块的区域。

首先，在`parallax-scroller`下创建一个名为`index.html`的html文件。

我们把下面的代码添加到`index.html`里：

```html
<html>
  <head>
    <meta charset="UTF-8">
    <title>Parallax Scrolling Demo</title>
  </head>
  <body>
  </body>
</html>
```

现在一切都很简单。我们有了一个基本的HTML页面，其中有`<head>`和`<body>`元素。

现在让我们将HTML5 Canvas元素添加到页面中。只需在`<body>`元素之间添加以下代码行，然后保存文件

```html
<body>
  <div align="center">
    <canvas id="game-canvas" width="512" height="384"></canvas>
  </div>
</body>
```

我们设置了一个宽512像素，高384像素的canvas元素。 pixi.js库将在此区域呈现我们游戏的视觉效果。 还要注意，我们为画布分配了一个ID，并将其命名为`game-canvas`。 

现在我们在浏览器中打开这个`index.html`。windows下访问这个地址`http://localhost/parallax-scroller/index.html`，Mac OS X下访问这个地址`http://localhost/~your_user_name/parallax-scroller/index.html`。

::: warning 
如果您使用的是Mac，请记住用您的实际用户名替换`your_user_name`。
:::

您会发现在浏览器上看不到任何画布区域。 这是因为它与页面颜色完全相同。 让我们修改CSS样式，使他们颜色不同。 在文件的`<head>`元素中添加以下行：

```html
<html>
  <head>
    <meta charset="UTF-8">
    <title>Endless Runner Game Demo</title>
    <style>
      body { background-color: #000000; }
      canvas { background-color: #222222; }
    </style>
  </head>
  <body>
  </body>
</html>
```

保存刚刚修改的`index.html`，刷新浏览器。这次，您应该清楚地看到您的画布区域：它将在黑色页面的顶部显示为灰色，并位于页面的水平中心。

## 引入Pixi

现在我们的画布已经设置好了，让我们引入Pixi，在body底部加入以下代码
```html
<body>
  <div align="center">
    <canvas id="game-canvas" width="512" height="384"></canvas>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.0.0/pixi.min.js"></script>
</body>
```

Pixi.js托管在CDN上。 请注意，URL中的`4.0.0`，这是我们使用的Pixi库的版本。 您可以将其替换为以后希望使用的任何发行版本。

保存上述更改，让我们检查一下是否一切运行正常。只需按F12 (Mac上是Cmd + Opt + i)打开`开发者工具`窗口，然后单击`Console`选项卡。

如果Chrome由于页面中输入错误的路径而无法加载pixi.js库，那么您将在控制台窗口中看到类似的错误。

```
x GET file:///Users/ccaleb/Documents/javascript/tutorial/part1/parallax-scroller/pixi.js-master/bin/pixie.js index.html:14
```

## 添加主入口点

当HTML页面的内容已经完全加载完毕时，它的`<body>`元素将触发一个`onload`事件。此时我们可以确定我们的canvas画布已经初始化，pixi.js库已经完全加载。我们可以触发我们选择的JavaScript来响应这个事件，并开始直接使用pixi.js。让我们在触发`onload`事件时，调用一个名为`init()`的函数来实现这一点。

```html
<body onload="init();">
  <div align="center">
    <canvas id="game-canvas" width="512" height="384"></canvas>
  </div>
  <script src="pixi.js-master/bin/pixi.dev.js"></script>
</body>
```

现在我们需要编写实际的`init()`函数。将该函数放在`<body>`元素的底部，让她在avaScript控制台输出一些文字，以确保成功捕获了页面的`onload`事件。

```html
<body onload="init();">
  <div align="center">
    <canvas id="game-canvas" width="512" height="384"></canvas>
  </div>
  <script src="pixi.js-master/bin/pixi.dev.js"></script>
  <script>
    function init() {
      console.log("init() successfully called.");
    }
  </script>
</body>
```

保存并刷新浏览器。

如果一切顺利，那么您应该在JavaScript控制台看到以下内容：

```
> init() successfully called.
```

虽然你的`init()`函数目前做的很少，但它最终将负责初始化和启动你的视差滚动。基本上所有的东西都将通过这个主入口点运行。

## 初始化PIXI.JS

现在我们有了一个`init()`函数，让我们来初始化`pixi.js`，很简单，只有两步。

- 创建舞台
- 选择和初始化渲染器实例

我们先创建一个舞台，然后初始化一个渲染器实例。如果您是FLASH开发人员，你应该熟悉舞台的概念。基本上，舞台代表你所有的游戏图形内容。另一方面，渲染器通过舞台其绘制到HTML页面的画布上。

让我们创建一个舞台实例，并将其赋值给全局变量`stage`。 另外，在使用时，请删除我们之前添加的日志语句：

```js
function init() {
  stage = new PIXI.Container();
}
```

现在我们已经创建了一个舞台，我们需要选择一个渲染器。 Pixi.js支持两个渲染器：WebGL和HTML5 Canvas。 您可以使用`PIXI.WebGLRenderer`或`PIXI.CanvasRenderer`类实例化渲染器。 但是，最好让Pixi自动检测浏览器的支持情况并选择正确的渲染器。 默认情况下，Pixi将尝试使用WebGL，如果WebGL不可用，它将使用canvas渲染。 让我们继续，让Pixi使用其`PIXI.autoDetectRenderer()`函数选择适当的渲染器：

```js
function init() {		
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );
}
```
autoDetectRenderer()函数的作用是:设置舞台要想要呈现的画布宽度和高度，以及对画布本身的引用。它返回`WebGLRenderer`或`PIXI。CanvasRenderer`的一个实例。，我们将其存储在一个名为`renderer`的全局变量中。

给`PIXI.autoDetectRenderer`传递的第三个参数，是一个JavaScript对象，这个对象的`view`属性是canvas元素对象的引用。

保存上面的代码。

::: warning
虽然我们使用硬编码的值宽度和高度，我们同样可以直接从canvas元素本身轻松获得这两个值。 获取宽度的方法如下：

```js
var width = document.getElementById("game-canvas").width;
```
:::


## 渲染

为了看到你的舞台内容，你需要指示你的渲染器把舞台的内容绘制到画布上。这是通过调用渲染器的`render()方`法并将舞台stage作为参数传递给它。下面是一个简单示例

```js
function init() {		
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );
  renderer.render(stage);
}
```

现在，我们成功地将您的舞台渲染在浏览器上。当然，我们还没有在舞台上添加任何东西，所以啥也看不到。

## 添加要显示的物体

现在你的舞台设置好了，让我们继续，给它添加一些东西。毕竟，我们不想永远盯着空白屏幕。

我们把这些要显示的东西以树状形式组合成一个显示项目列表。你的场景stage作为像是项目列表的根部显示节点，所有添加到场景的物体，都会被渲染。当然还有一个堆叠顺序，这意味这些项目将根据其深度索引决定是否显示在其他项目的前面。

有几种显示对象类型可以添加到显示列表中。最常见的是`PIXI.Sprite`。

由于本教程都是关于创建视差滚动背景的，因此我们尝试添加代表最远后层的图像。 首先，添加一行代码以加载我在`resources`文件夹中提供的`bg-far.png`文件

```js
function init() {		
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");

  renderer.render(stage);
}
```

图像可以被加载并存储为纹理，然后附加到一个或多个精灵上。 在上面的行中，我们调用了`PIXI.Texture.fromImage()`方法加载`bg-far.png`文件来创建`PIXI.Texture`实例。 我们将纹理赋值给名为`farTexture`的局部变量，以供进一步使用。


现在，让我们创建一个精灵`sprite`，并给它添加纹理。 然后，我们将精灵放置在舞台的左上方：

```js
function init() {		
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new PIXI.Sprite(farTexture);
  far.position.x = 0;
  far.position.y = 0;

  renderer.render(stage);
}
```

`PIXI.Sprite`类用于创建一个精灵。它只接收一个参数，就是你想使用的纹理。我们使用了一个名为`far`的全局变量，并用他保存新创建的sprite实例。

还要注意我们如何使用`position`属性将精灵的x和y坐标设置到舞台的左上角。 舞台的坐标是从左到右，从上到下，这意味着舞台的左上角位置是（0,0），右下角位置是（512,384）。

精灵有一个轴心点（pivot point），可以围绕它旋转。轴心点也用于精灵的定位(将其视为手柄)。精灵的默认轴心点被设置在左上角。这就是为什么当我们将精灵定位在舞台左上角时，我们将它的位置设为(0,0)。

最后一步是将精灵添加到舞台上。这是使用PIXI.Stage类的`addChild()`方法完成的。 如下所示：

```js
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new PIXI.Sprite(farTexture);
  far.position.x = 0;
  far.position.y = 0;
  stage.addChild(far);

  renderer.render(stage);
}
```

保存并刷新浏览器。您可能希望看到您的背景图层，但可能会发现它丢失了。 那为什么呢？ 毕竟，在将背景添加到显示列表后，我们会立即调用渲染器的`render()`方法。 嗯，这是问题根源所在。 实际上，我们应该在纹理进行完全加载完成后，再去渲染精灵。

目前，我们可以通过简单地等待一小段时间然后手动强制呈现内容来纠正此问题。 那应该给纹理足够的时间来加载。 我们将使用Chrome的JavaScript控制台来实现此目的。 只需在JavaScript控制台窗口中输入以下内容：
```js
renderer.render(stage);
```

::: tip
JavaScript控制台可以访问程序中的任何全局变量。因此，我们可以访问`renderer`和`stage`变量，也可以调用属于它们的方法。
:::

恭喜你！ 现在，您应该可以看到背景层紧贴在屏幕顶部。

现在继续添加中间层：

```js {7-13}
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new PIXI.Sprite(farTexture);
  far.position.x = 0;
  far.position.y = 0;
  stage.addChild(far);

  var midTexture = PIXI.Texture.fromImage("resources/bg-mid.png");
  mid = new PIXI.Sprite(midTexture);
  mid.position.x = 0;
  mid.position.y = 128;
  stage.addChild(mid);

  renderer.render(stage);
}
```

保存文件并刷新浏览器。要查看这两个层，您将再次需要手动渲染您的内容。在JavaScript控制台中输入以下内容
```js
renderer.render(stage);
```

因为中间层是在第二阶段添加的，它被放置在一个比背景层更高的深度。每次调用`addChild()`都会将其显示对象直接添加到前一个显示对象的上面。

::: tip
请记住，这部分只处理中远层。 在后面的教程中，我们将会制作更复杂的前景层。
:::

## 主循环
现在我们有了两个背景层，我想我们可以尝试实现一些视差滚动，并且还可以找到一种渲染内容的方法，而无需从JavaScript控制台手动进行。

为了避免疑问，让我们快速澄清一下视差滚动到底是什么。这是一种在视频游戏中使用的滚动技术，背景图形层在屏幕上的移动速度比前景层慢。这样做会在2D游戏中创造出一种深度的幻觉，并为玩家提供一种额外的沉浸感。

有了这些信息，我们可以将其应用于我们的两个Sprite层，以产生水平视差滚动器，在其中我们将背景层在屏幕上的移动速度比中间层慢。 为了滚动每个图层，我们将必须创建一个主循环，在该循环中我们不断更改每个图层的位置。 为此，我们将利用JavaScript原生函数`requestAnimationFrame()`的帮助，调用指定的方法绘制画布/舞台。

首先调用`requestAnimationFrame()`
```js {9}
  var midTexture = PIXI.Texture.fromImage("resources/bg-mid.png");
  mid = new PIXI.Sprite(midTexture);
  mid.position.x = 0;
  mid.position.y = 128;
  stage.addChild(mid);

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

您刚刚添加的行表示您想在下次重新绘制舞台内容时调用名为`update()`的函数。如果您连续不断地调用`requestAnimationFrame()`，那么这通常会导致`update()`函数每秒钟被调用60次，也就是通常所说的每秒60帧(FPS)。我们指定的`update()`函数来充当主循环。

我们还没有一个`update()`函数，但是在编写之前，删除下面高亮显示的代码行，因为我们的主循环会来处理渲染。

```js {7}
  var midTexture = PIXI.Texture.fromImage("resources/bg-mid.png");
  mid = new PIXI.Sprite(midTexture);
  mid.position.x = 0;
  mid.position.y = 128;
  stage.addChild(mid);

  renderer.render(stage); // 删除这行代码

  requestAnimationFrame(update);
}
```

好吧，让我们编写主循环，让它稍微改变两层的位置，并渲染舞台的内容，以便我们可以看到每帧重绘时的差异。在`init()`函数后面直接添加`update()`函数。

```js {1-8}
function update() {
  far.position.x -= 0.128;
  mid.position.x -= 0.64;

  renderer.render(stage);

  requestAnimationFrame(update);
}
</script>
```

`main()`中的前两行更新了远和中精灵的x位置。 请注意，我们将远端层向左移动0.128像素，而将中间层向左移动0.64像素。 要将某物向左移动，我们使用负值。如果想要向右移动，则使用正值。 还要注意，我们将精灵移动了不到一像素。 Pixi的渲染器可以使用亚（子）像素值存储和处理位置。 当您想在屏幕上缓慢移动内容时，这是理想的选择。

在循环的最后，我们再次调用`requestAnimationFrame()`函数，以确保可以再次调用`update()`绘制画布。正是这个函数确保我们的主循环被不断地调用，从而确保视差层在屏幕上稳定地移动。

![](/images/scroller/ps-tut1-screenshot5.png)

保存您的工作并刷新浏览器。您应该看到这两个图层现在都已自动呈现到屏幕上。 同样，当两层都在移动时，中间层实际上将比远端层移动得更快，从而给场景带来纵深感。但是，您应该发现了一个明显的问题：随着每个精灵从屏幕的左侧移出，它会在右侧留下一个空白区域。 换句话说，不会给人一种环境连续滚动的错觉。 幸运的是我们有一个解决方案。

## 使用平铺

到目前为止，我们已经使用`PIXI.Sprite`类来表示要显示对象。 但是pixi.js实际上提供了其他几个显示对象来满足不同的需求。

如果您查看`bg-far.png`和`bg-mid.png`，那么您应该注意到这两个图像都被设计为水平重复。检查每幅图像的左右边缘。你应该注意到，极右边缘完美地回到了极左边。

因此，让我们通过对代码进行一些调整来利用切片精灵的优势。 我们将首先关注远端层。 从`setup()`函数中删除以下行：
```js {2}
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new PIXI.Sprite(farTexture); // 删除此行
  far.position.x = 0;
  far.position.y = 0;
  stage.addChild(far);
}
```

替换为新的代码
```js {2}
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new PIXI.extras.TilingSprite(farTexture, 512, 256); // 替换为这一行代码
  far.position.x = 0;
  far.position.y = 0;
  stage.addChild(far);
}
```

在`setup()`函数中，插入并设置以下两个属性
```js {5,6}
  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
  far = new PIXI.extras.TilingSprite(farTexture, 512, 256);
  far.position.x = 0;
  far.position.y = 0;
  far.tilePosition.x = 0; // 插入此行
  far.tilePosition.y = 0; // 插入此行
  stage.addChild(far);
}
```

在继续之前，让我们先讨论`TilingSprite`类构造函数及其`tilePosition`属性。

您会立即注意到`TilingSprite`类构造函数需要3个参数，而`Sprite`类只需要一个参数

```js
far = new PIXI.extras.TilingSprite(farTexture, 512, 256);
```

它的第一个参数与前面相同:一个对您希望使用的纹理的引用。第二个和第三个参数分别期望平铺精灵的宽度和高度。通常，您将这两个参数设置为纹理的宽度和高度，在`bg-far.png`的情况下是512 x 256像素。

::: tip
在我们对纹理的宽度和高度进行硬编码后，您实际上可以查询纹理以发现其尺寸。 这是我们代码的替代版本：
```js
far = new PIXI.extras.TilingSprite(
  farTexture,
  farTexture.baseTexture.width,
  farTexture.baseTexture.height
);
```
:::

我们还利用了切片精灵的`tilePosition`属性，该属性用于偏移精灵纹理的位置。换句话说，通过调整偏移量，您可以在水平和/或垂直方向上移动纹理，并使纹理环绕这个精灵。 本质上，您可以模拟滚动而无需实际更改精灵的位置。

我们将精灵的`tilePosition`属性设置为(0,0)，页面上的精灵看起来没啥变化

```js
far.tilePosition.x = 0;
far.tilePosition.y = 0;
```

现在剩下要做的就是通过不断更新精灵的`tilePosition`属性的水平偏移量来模拟滚动。为此，我们修改一下`update()`函数。删除下面内容
```js {2}
function update() {
  far.position.x -= 0.128; 
  mid.position.x -= 0.64;

  renderer.render(stage); 

  requestAnimationFrame(update);
}
```

然后用以下内容替换它

```js {2}
function update() {
  far.tilePosition.x -= 0.128;
  mid.position.x -= 0.64;

  renderer.render(stage);

  requestAnimationFrame(update);
}
```

保存并再次刷新浏览器。您将看到，正如预期的那样，远层现在无缝地滚动和重复。

好的，让我们继续对中间层做同样的修改。`init()`更改后如下所示：
```js {18,21,22}
function init() {
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");	
  far = new PIXI.extras.TilingSprite(farTexture, 512, 256);
  far.position.x = 0;
  far.position.y = 0;
  far.tilePosition.x = 0;
  far.tilePosition.y = 0;
  stage.addChild(far);

  var midTexture = PIXI.Texture.fromImage("resources/bg-mid.png");
  mid = new PIXI.extras.TilingSprite(midTexture, 512, 256);
  mid.position.x = 0;
  mid.position.y = 128;
  mid.tilePosition.x = 0;
  mid.tilePosition.y = 0;
  stage.addChild(mid);

  requestAnimationFrame(update);
}
```

现在继续对`update()`函数进行以下更改
```js {3}
function update() {
  far.tilePosition.x -= 0.128;
  mid.tilePosition.x -= 0.64;

  renderer.render(stage);

  requestAnimationFrame(update);
}
```
保存并测试代码。这一次，你应该看到两个层都完美地滚动。

## 总结
我们已经介绍了pixi.js的一些基础知识，并了解了如何使用`PIXI.extras.TilingSprite`来创建无限滚动的图层。我们还看到了如何使用`addChild()`将精灵堆叠在一起以产生令人难以置信的视差滚动。我鼓励您继续使用Pixi，并查看它附带的文档和代码示例。它们都可以在[PixiJS官方网站](http://www.pixijs.com/)上找到。

## 下节预告
虽然我们已经启动并运行了水平视差滚动器，但仍然有些复杂。 下次，我们将介绍视口和世界定位的概念，如果您最终希望将滚动条添加到游戏中，那么这两者都非常重要。

重构我们现有的代码库也将花费一些宝贵的时间。 我们将采用一种更加面向对象的架构，摆脱目前对全局变量的依赖。 在下一个教程结束时，所有滚动功能都将巧妙地包含在其自己的类中。

我希望这篇介绍教程对你有用，我希望在[第二部分教程](/guide/parallax-scroller/part-2.md)还能再见你。