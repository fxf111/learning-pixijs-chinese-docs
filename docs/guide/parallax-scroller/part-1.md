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


<a href="http://www.yeahbutisitflash.com/pixi-parallax-scroller/final/index.html">![](/scroller/ps-tut1-screenshot1.png)</a>

单击上面的图像将启动并运行视差滚动的最终版本。请注意它包含了三个视差层:远层、中间层和前景层。在第一个教程中，我们将实现一些基本的视差滚动，只关注远层和中间层。当然，为了做到这一点，我们将介绍pixi.js的基础知识。此外，如果你是JavaScript新手，你应该会发现这是一个开始学习HTML5游戏编程基础的好地方。

<a href="http://www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/index.html">![](/scroller/ps-tut1-screenshot1.png)</a>

在继续之前，请单击上面的图像，以查看您将在本教程中实际案例运行效果。你也可以从GitHub[下载本教程的源代码](http://github.com/ccaleb/pixi-parallax-scroller)。

## 起步

为了进行开发，您需要合适的代码编辑器或IDE。 我将使用Sublime Text 2，可以从[www.sublimetext.com/2](http://www.sublimetext.com/2)下载其试用版。

您还需要一个web浏览器来测试您的工作。任何现代浏览器都可以，但是我将使用谷歌Chrome，并在本教程中介绍它的一些开发工具。如果你没有安装Chrome，那就去安装吧。

[www.google.com/chrome.](http://www.google.com/chrome)

要测试您的工作，您需要在开发计算机上运行本地网络服务器。 Microsoft Windows用户可以设置IIS：[www.howtogeek.com/howto/windows-vista/how-to-install-iis-on-windows-vista](http://www.yeahbutisitflash.com/www.howtogeek.com/howto/windows-vista/how-to-install-iis-on-windows-vista)，而Mac OS X用户可以配置和运行内置的Apache服务器：h[ttp：//macdevcenter.com/pub/a/mac/2001/12/07/apache.html](http://macdevcenter.com/pub/a/mac/2001/12/07/apache.html)。 如果您安装了OS X Mountain Lion，则设置Web服务器的过程将比以前简单一些。 [查阅此资源](http://reviews.cnet.com/8301-13727_7-57481978-263/how-to-enable-web-sharing-in-os-x-mountain-lion/)以启动Apache并在Mountain Lion上运行。

设置Web服务器后，在其根目录中创建一个新文件夹，并将其命名为`parallax-scroller`。 如果您使用的是Windows，则Web服务器的根文件夹的路径将为`C：\inetpub\parallax-scroller`。 如果您使用的是OS X，则您的个人Web文件夹的路径将为`/Users/your_user_name/Sites`。 请记住用您的实际用户名替换`your_user_name`。

最后，在本教程中，我们将使用几个图形资源，你可以在这个网址为[www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/resources.zip](http://www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-1/resources.zip)下载此文件并将其解压缩到您的`parallax-scroller`文件夹中。

你在windows上看到的`parallax-scroller`文件夹包含这些东西。

![](/scroller/screenshot3.png)

Mac OS X 下是这样的。

![](/scroller/screenshot4.png)

现在启动Sublime Text 2或您自己喜欢的代码编辑器，我们要开始写代码了。


## 设置CANVAS画布

每个pixi.js项目都是从一个HTML文件开始的。在这里，我们将引入pixi.js，并创建一个HTML5 Canvas元素。canvas元素表示的是在HTML页面上呈现滚动块的区域。

首先，在`parallax-scroller`下创建一个名为`index.html`的html文件。

我们把下面的代码添加到`index.html`里：

```js
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

```js
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

```js
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
```js
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

```js
<body onload="init();">
  <div align="center">
    <canvas id="game-canvas" width="512" height="384"></canvas>
  </div>
  <script src="pixi.js-master/bin/pixi.dev.js"></script>
</body>
```

现在我们需要编写实际的`init()`函数。将该函数放在`<body>`元素的底部，让她在avaScript控制台输出一些文字，以确保成功捕获了页面的`onload`事件。

```js
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

