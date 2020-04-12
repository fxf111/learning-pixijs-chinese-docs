英文教程原作者[Christopher](http://www.yeahbutisitflash.com/?author=1)

[关注他@chriscaleb](https://twitter.com/intent/follow?screen_name=chriscaleb)

本系列教程已经针对[PixiJS v4](http://www.pixijs.com/)进行了更新。

欢迎回到本系列教程的第三部分，本系列将介绍如何使用JavaScript和pixi.js制作视差滚动地图。到目前为止已经介绍了很多。在第一个教程中，您学习了一些pixi.js基础知识，并将视差滚动应用到几个重复的层中。而在第二部分中，通过向代码库应用一些面向对象的概念，将现有的滚动功能包装到它自己的类中。现在我们将专注于第三个更复杂的视差层.

## 你将会学到...

- 使用纹理和精灵表单（sprite sheets）
- 对象池（object pooling）的基础知识

## 你应该了解...

- 熟悉pixi.js基础知识
- 了解JavaScript或ActionScript
- 基本的面向对象概念

我们继续做上节教程未完成的部分。您可以使用在前两个教程中生成的代码，也可以从GitHub下载[第二个教程的源代码](https://github.com/ccaleb/pixi-parallax-scroller/tree/master/tutorial-2)并在那里工作。您还可以在GitHub上找到本教程[第三部分的全部源代码](https://github.com/ccaleb/pixi-parallax-scroller/tree/master/tutorial-3)，不过我还是鼓励您按照本教程中详细介绍的步骤来操作，并且只有在遇到问题时才会参考源代码。

本系列教程的灵感来自于《Cannabalt》和《Monster Dash》等无尽的奔跑游戏，这两款游戏都很好地利用了视差滚动。玩家操作英雄奔跑和跳跃时，视差滚动提供了令人眼花缭乱的深度错觉。

在接下来的两个教程中，我们将构建一个与Monster Dash中非常相似的滚动游戏地图。 Monster Dash的游戏地图是根据一系列宽度和高度不同的墙跨度构建的。 游戏的目的是通过跨墙跳来尽可能长地生存。 游戏地图的滚动速度会随着时间增加而增加。


<a href="http://www.yeahbutisitflash.com/pixi-parallax-scroller/final/index.html">![](/images/scroller/ps-tut1-screenshot1.png)</a>

点击上图，即可查看本节教程的demo。

## 开始

如果您还没有通过前两个教程，那么我建议您先完成它们。第一个教程可以在[这里](/guide/parallax-scroller/part-1.md)找到，第二个教程可以在[这里](/guide/parallax-scroller/part-2.md)找到。

在本教程中，我们将使用一些新的图形资源。我已经为了提供了一个zip文件，你可以在[www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-3/resources.zip](www.yeahbutisitflash.com/pixi-parallax-scroller/tutorial-3/resources.zip)这里下载。下载此文件并将它解压缩到项目的`resources`文件夹中。

如果你用的windows，那么`resources`文件夹应该是这样的：

![](/images/scroller/ps-tut3-screenshot1.png)

Mac下则应该是这样的：
![](/images/scroller/ps-tut3-screenshot2.png)

另外，请记住，为了测试您的工作，您需要运行一个本地web服务器。如果您还没有这样做，请参阅第一篇教程的[入门](/guide/parallax-scroller/part-1.md#入门)部分，了解关于如何设置web服务器的详细信息。

值得注意的是，本教程比前两篇要长。你可能需要留出大约两个小时来完成它。

## 游戏地图
从上面的演示中可以看到，墙跨的宽度和高度是不同的。每个跨度由一系列的窗户和墙壁装饰组成。墙壁装饰本身是由管道和通风口组成的。

所以墙内是如何构成的?那么每个跨度都是由一系列缝合在一起的垂直切片构建而成的。 每个切片的大小为64 x 256像素。 下图显示了跨度示例。

![](/images/scroller/diagram-1.png)

墙跨的高度是通过垂直移动每个切片的位置来实现的。你可以在下面的图表中看到，第二面墙的切片部分位于视口的可视区域之下，给人的感觉是它比第一面墙低。

![](/images/scroller/diagram-2.png)

在大多数情况下，墙跨内的每个切片将位于相同的垂直位置以产生完美的平面。 但是，有一个例外。 Monster Dash具有阶梯状的墙跨度，可让玩家掉落到正下方的表面上。 它是这样生成的：

![](/images/scroller/diagram-3.png)

如果你仔细看看上面的图表，你会注意到我们这里实际上有两个跨墙(第一个跨墙比第二个跨墙高)，由中间代表台阶的一个薄片连接。

您可能会惊讶于我们的整个游戏地图将仅由八种不同类型的垂直切片构成！ 您可以在下面看到这八个：

![](/images/scroller/diagram-4.png)

在墙跨度内这些切片的顺序很重要。 让我们进一步谈谈。
## 墙跨度（间距）的解剖

典型的墙跨由三个主要部分组成：

- 前边(a front edge)
- 中间部分(a mid section)
- 后边(a back edge)

前边由单个垂直切片表示。后面的边也是。然而中间的部分可以由一个或多个切片组成。切片越多，特定的墙跨度就会越长。在我们正在进行的演示中，我们将包括一些跨越30多个切片的墙壁。下图会进一步说明墙跨的三个主要部分。

![](/images/scroller/diagram-5.png)

墙壁的中间部分由以下两部分连接：

- 窗户
- 墙的装饰

因此，一堵墙的中间部分（分为6段）的结构应如下所示：

`窗户, 装饰, 窗户, 装饰, 窗户, 装饰`

墙跨的中间部分的长度将不均匀，以确保我们从窗户开始和结束。因此，在上面的例子中，不是6片长，我们实际上有一个7片长的中间部分：
`窗户, 装饰, 窗户, 装饰, 窗户, 装饰，窗户`

为了让墙壁在视觉上尽可能有趣，窗户(windows)可以是亮的，也可以是暗的，我们可以随机选择三种不同的墙壁装饰(decorations)。因此，一堵墙的中段将由五种不同类型的垂直切片组成。

为了增加多样性，在确定墙跨的前边缘(front edge)时，我们将从两种垂直切片中进行选择。 墙的后边缘(end edge)将从与前面相同的两个切片类型中选择，只有我们将水平翻转该切片，以使其正确地连接到跨度的末端。 阶梯墙很少出现，因此在将阶梯(step)放入墙跨中时将仅使用一种垂直切片。

为了澄清所有这些问题，这里再次列出了所有八个切片类型，但是这次我标记了每个切片的用途：

![](/images/scroller/diagram-6-1024x531.png)

在本教程中，有必要在单独的选项卡中打开上面的图并参考它。
::: tip
不要将垂直切片类型数量与用于构建特定墙壁跨度的垂直切片数量相混淆。例如，一堵墙可以跨越30个垂直的切片，但实际上只由8种垂直的切片构成。
:::

## 精灵表格（SPRITE SHEETS）

如前所述，我们的墙跨度是由八种不同类型的墙切片构建的。 在我们的项目中表示这些切片的最直观的方法是为每个片创建一个单独的PNG文件。尽管这是一种处理方式，但实际上我们会将所有切片添加到一个叫做精灵表格的PNG文件中。

::: tip
精灵图表也经常被称为纹理贴图集。在本教程中，我们使用精灵图表这个名称
:::

我已经在本教程的`resources.zip`文件中为您提供了精灵表格。它是一个名为`wall.png`的文件，如下所示。正如您所看到的，所有8个切片都被打包到一个位图中。

![](/images/scroller/sprite-sheet.png)

`resources`文件中，还有一个精灵表格附带的文件`wall.json`。将其加载到文本编辑器中并查看。这个文件使用JSON数据格式来定义精灵表格中独立的位图切片的名称和位置。当使用精灵表格时，它里面的每个单独的位图被称为一个帧。

::: tip
我们的整个精灵表格将作为纹理加载到我们的代码中(你的中间层（mid layer）和远层（far layer）也都作为纹理加载)。因此，你可以把帧（frame）当作子纹理。
:::

您不需要完全了解JSON文件，因为Pixi会为您完成所有这些工作。 但是，有必要对您正在处理的内容有一些了解。 下面是JSON数据的一个片段，其中显示了代表第一个墙边缘切片的帧(frame)。 我为您强调了一些事项（高亮行）：


```json {1,3}
"edge_01":
{
  "frame": {"x":128,"y":0,"w":64,"h":256},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":64,"h":256},
  "sourceSize": {"w":64,"h":256}
},
```

第一行包含与帧(frame)关联的唯一名称(`edge_01`)：

``` json
"edge_01":
```

每当我们想从精灵表格中直接获取此墙切片的位图图像时，就会在代码中使用该名称。

如果您不熟悉JSON数据格式，那么可以在这个[Wikipedia条目](http://en.wikipedia.org/wiki/JSON)(需翻墙)中查阅相关内容。

下面这个高亮的代码行定义了帧(frame)的矩形区域：

``` json {1}
"frame": {"x":128,"y":0,"w":64,"h":256},
```

本质上，这是用来定位精灵表格上帧相关的位图。

JSON文件中还有其他七个墙切片类型的条目。 每个切片将由唯一的帧名称表示。在使用精灵表格时，您需要从JSON文件中获取与每个帧关联的名称。在下方，您可以再次看到精灵表格，但是这次，我还提供了与每种墙片类型关联的帧名称。 您可能还希望在单独的浏览器选项卡中将此图像保持打开状态。

![](/images/scroller/sprite-sheet-with-names.png)

如果您向下滚动至`wall.json`的最底部，则会看到一个包含一些元数据的部分：

``` json {4}
"meta": {
  "app": "http://www.codeandweb.com/texturepacker ",
  "version": "1.0",
  "image": "wall.png",
  "format": "RGBA8888",
  "size": {"w":256,"h":512},
  "scale": "1",
  "smartupdate": "$TexturePacker:SmartUpdate:fc102f6475bdd4d372c..."
}
```

这些数据中包含精灵表格实际使用的PNG文件的相对路径。 Pixi将使用该数据加载PNG文件。

同样，不要太担心实际的JSON数据，因为pixi.js会为您处理它和精灵表格的加载。您需要记住的只是唯一的帧名。

## 纹理打包器（TEXTUREPACKER）

我使用了一个工具来生成本教程的精灵表格和关联的JSON文件。这个工具就是[TexturePacker](http://www.codeandweb.com/texturepacker)，它适用于Windows、Mac OS X和Linux。它可以导出多种精灵表格数据格式，包括pixi.js使用的`JSON(HASH)`格式。在本教程中，我不会介绍如何使用TexturePacker，但是它非常容易使用。付费版非常物有所值，对于那些想先学习基础知识的人，还有免费版供你选择。

## 加载精灵表格
好了，现在我们已经了解了一些关于精灵表格的知识，让我们来加载它们。我们将首先向您的项目的主应用程序类中添加一些代码。在文本编辑器中打开`Main.js`。

在文件末尾，添加以下方法以加载精灵表格：

```js
Main.prototype.loadSpriteSheet = function() {
  var loader = PIXI.loader;
  loader.add("wall", "resources/wall.json");
  loader.once("complete", this.spriteSheetLoaded.bind(this));
  loader.load();
};
```

我们的方法利用了`PIXI.loaders.Loader`类，该类可用于加载图像，精灵表格和位图字体文件。我们直接从`PIXI.loader`属性获取加载器的实例。我们使用loader添加了要加载的每个资源。 目前，我们只需添加`wall.json`文件。我们传递希望与文件关联的唯一ID作为第一个参数，资源的相对路径作为第二个参数。

一旦加载了精灵表格，`PIXI.loaders.Loader`类就会触发`complete`事件。 为了响应该事件，我们只需将`complete`事件关联到我们的回调方法`spriteSheetLoaded()`。我们稍后再来编写`spriteSheetLoaded()`方法。

最后，调用`PIXI.loaders.Loader`实例的`load()`方法，来加载我们的精灵表格。 加载完毕后，Pixi将提取它的帧并将它们存储在一个内部的纹理缓存中，以便以后访问。

::: tip
目前，远层和中间层图像都是在它们的构造函数中加载的。 但是，我们实际上可以预先加载这些图像，并在实例化`Far`和`Mid`类时避免短暂的延迟。 尝试将它们添加到我们的`Loader`实例中：

```js {2-3}
loader.add("wall", "resources/wall.json");
loader.add("bg-mid", "resources/bg-mid.png");
loader.add("bg-far", "resources/bg-far.png");
```
无需对`Far`或`Mid`类进行任何编辑，因为调用`PIXI.Texture.fromImage()`方法时，加载纹理时会先从纹理缓存中查找，如果不存在，再去实际加载。
:::

现在让我们编写`spriteSheetLoaded()`方法。在文件末尾添加以下内容:

```js
Main.prototype.spriteSheetLoaded = function() {
};
```

该方法的主体目前是空的，但实际上我们需要做一些事情。 目前，我们创建了`Scroller`类的实例，并在主应用程序类的构造函数中启动了主循环。 但是，我们现在要等到精灵表格加载完成之后再进行这些操作。 让我们将该代码移到我们的`spriteSheetLoaded()`方法中。

向上滚动到构造函数并删除下面高亮的两行：
```js {9,11}
function Main() {
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  this.scroller = new Scroller(this.stage); // 删除

  requestAnimationFrame(this.update.bind(this)); //删除
}
```

现在回到spriteSheetLoaded()方法，并将上面删除的那两行代码添加到这里：

```js {2,3}
Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimationFrame(this.update.bind(this));
};
```

最后，回到构造函数，并调用`loadSpriteSheet()`方法：

```js {9}
function Main() {
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  this.loadSpriteSheet();
}
```

现在保存更改并刷新浏览器。 查看Chrome的JavaScript控制台，确保代码没有报错。

::: tip
请记住，按F12键（在Mac上为Cmd + Opt + i）以打开“开发工具”窗口，然后单击“console”选项卡。
:::


## 测试精灵表格
虽然我们已经成功地加载了精灵表格，但我们还没有真正地向自己证明它的帧(我们的八种垂直墙片类型)已经存储在Pixi的纹理缓存中。让我们使用这些帧来创建一些精灵。

我们将在`spriteSheetLoaded()`方法中执行我们的测试。将以下代码添加到里面：

```js {5-8}
Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimationFrame(this.update.bind(this));

  var slice1 = PIXI.Sprite.fromFrame("edge_01");
  slice1.position.x = 32;
  slice1.position.y = 64;
  this.stage.addChild(slice1);
};
```

在上面的代码中，我们利用了`PIXI.Sprite`类的`fromFrame()`静态方法。 它使用纹理缓存中与指定帧ID匹配的纹理创建一个新的精灵。 我们指定的是`edge_01`帧，它会展示墙跨度前面的一个切片。

保存您的代码并刷新浏览器以查看您的墙壁切片。它在屏幕上的位置现在并不重要，所以现在不要担心。

让我们添加第二个垂直切片。 这次，我们将使用墙中间部分的切片类型。 更准确地说，我们将使用精灵表格中名为`decoration_03`的帧。

```js {10-13}
Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimationFrame(this.update.bind(this));

  var slice1 = PIXI.Sprite.fromFrame("edge_01");
  slice1.position.x = 32;
  slice1.position.y = 64;
  this.stage.addChild(slice1);

  var slice2 = PIXI.Sprite.fromFrame("decoration_03");
  slice2.position.x = 128;
  slice2.position.y = 64;
  this.stage.addChild(slice2);
};
```

再次保存并测试您的代码。您现在应该看到两个垂直的墙壁切片位于舞台上，类似于下面的屏幕截图。

![](/images/scroller/tut3-testing-sprite-sheet.png)

希望您现在对精灵表格的帧已成功加载和缓存感到满意。从`spriteSheetLoaded()`方法中删除测试代码。现在你的`spriteSheetLoaded()`应该是这样的：
```js {1-4}
Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimationFrame(this.update.bind(this));
};
```

保存您的更改。

## 一些GPU理论

我还没有解释为什么我们选择将墙壁切片打包到精灵表格中，而不是简单地将八个独立的png加载到内存中。原因是性能。Pixi的WebGL渲染器利用您的计算机的图形处理单元(GPU)来加速图形性能。然而，为了保证最佳的性能，我们至少对GPU的工作原理有一些了解。

GPU最好是一次处理大量数据。 Pixi试图通过单批发送描述显示对象（display object）的数据来适应您的GPU。 但是，它只能批量处理具有相似状态的显示对象。 当遇到一个不同状态的显示对象时，状态发生了变化，GPU会停止绘制当前的批处理。在你的程序中发生的状态变化越少，那么GPU为了渲染你的显示列表而需要预成形的绘制操作就越少。GPU需要执行的绘制操作越少，渲染速度就越快。

::: tip
我刚才提到的绘制操作通常称为绘制调用。
:::

不幸的是，每次遇到具有不同纹理的显示对象时，都会发生状态更改。精灵表格可以帮助避免状态变化，因为所有图像都存储在一个单一的纹理中。GPU可以很愉快地从精灵表格绘制每一帧(或子纹理)，而不需要单独的绘制调用。

然而，可以存储在GPU上的纹理大小是有限制的。大多数现代gpu可以存储2048像素大小的纹理。因此，如果你打算使用一个精灵表格，那么请确保它的尺寸不超过GPU的纹理大小限制。谢天谢地，我们的精灵表格的大小没有问题。

因此，我们的精灵表格可以大大提高我们的性能，而不是将每个墙壁切片的图像存储在一个单独的纹理。

## 表示游戏地图

所以我们已经成功地加载了我们的精灵表格，并成功地展示了它的一些帧，但是我们实际上如何构建一个包含我们的墙跨的大型地图。

我想最易于理解的方法是创建精灵数组，其中每个精灵代表我们地图上的垂直墙壁切片。然而，考虑到每个切片的宽度很窄，我们的整个地图将很容易由几千个精灵组成。一次要在内存中保存许多精灵。另外，如果我们只是简单地将所有这些精灵放到我们的显示列表中，那么它将会给渲染器带来巨大的压力，并可能影响你的游戏帧率。

另一种方法是实例化并仅显示将在视口中可见的精灵。 随着地图滚动，最左侧的精灵最终将离开屏幕。 发生这种情况时，我们可以从显示列表中删除该精灵，然后在视口最右侧之外添加一个新的精灵。 通过这种方法，我们可以为用户提供正在滚动整个地图的错觉，而实际上我们只需要处理视图中当前可见的部分。

虽然第二种方法当然比第一种更好，但它需要为精灵分配固定的内存和释放位置:为从右边进入的每个新精灵分配内存，那个精灵的内存必须在离开视口并被移除后释放。为什么很糟糕呢?嗯，分配内存需要宝贵的CPU周期，这可能会影响游戏的性能。如果必须不断地分配内存，这一点尤其重要。

释放对象之前使用的内存也是一个潜在的CPU占用问题。JavaScript运行时使用垃圾收集器来释放以前被不再需要的对象使用的内存。但是，您无法直接控制何时进行垃圾收集，如果必须释放大量内存，则此过程可能需要几毫秒。因此不断实例化精灵并将精灵从你的显示列表中移除会导致频繁的垃圾收集，而这又会影响你的游戏性能。

还有第三种方法可以解决前两种方法的问题。它被称为对象池，在不触发JavaScript垃圾收集器的情况下更聪明地使用内存。

## 对象池（OBJECT POOLING）

要理解对象池，请考虑这个简单的示例。射击游戏中，玩家的飞船可能会在游戏过程中发射十万个炮弹，但由于飞船的射速，任何时候都只能在屏幕上显示20个炮弹。 因此，在游戏代码内仅创建20个炮弹实例并在游戏过程中重新使用这些炮弹是有意义的。

这20枚炮弹可以存储在一个数组中。每次玩家触发时，我们都会从数组中移除一个炮弹并将其添加到屏幕中。当炮弹离开屏幕(或击中敌人)时，我们将它添加回数组，以便稍后再次使用。重要的是，我们从不需要创建新的炮弹实例。相反，我们只使用预先创建的20个实例池。在本例中，数组作为我们的对象池，是非常有意义的。

::: tip
如果你想了解更多关于对象池的信息，可以看看[维基百科上的条目](http://en.wikipedia.org/wiki/Object_pool_pattern)(需翻墙)。
:::

我们可以将对象池应用于游戏地图，并具有以下内容：窗户切片池； 一堆墙面装饰片； 一堆前壁边缘； 后墙边缘； 和一堵墙台阶。

因此，尽管我们的游​​戏地图最终可能包含数百个窗户，但实际上我们只需要创建足够的窗户精灵即可覆盖视口的宽度。 当要在视口中显示窗户时，我们只需从窗户对象池中检索窗户精灵即可。 当该窗口滚动到视图之外时，我们将从显示列表中将其删除，然后将其返回到对象池。 我们将完全相同的原理应用于墙的边缘，装饰和台阶。

有了足够的理论。 让我们开始构建一个对象池类来容纳我们的墙切片精灵。

## 创建对象池类

因为我们的游戏地图代表了一系列的墙壁，所以我们将创建一个名为`WallSpritesPool`的类来作为我们各种墙壁部件的对象池。

::: tip
更通用的类名可能是`MapSpritesPool`或`ObjectPool`。但是，就本教程而言，`WallSpritesPool`是有意义的。
:::

在文本编辑器中创建一个新文件，并添加以下构造函数:

```js {1-3}
function WallSpritesPool() {
  this.windows = [];
}
```

保存该文件并将其命名为`WallSpritesPool.js`。

在构造函数中，我们定义了一个名为`windows`的空数组。这个数组将作为映射窗户精灵的对象池。

## 添加窗户精灵到窗户(对象)池

我们的数组需要预先填充一些窗户(window)精灵。请记住，有两种类型的窗户，我们的墙跨度可以支持一个有光的窗户和一个没有光的窗户，所以我们需要确保我们添加了充足的两种类型的精灵。将以下代码添加到构造函数，来填充一些窗户精灵到池中：

```js {4-15}
function WallSpritesPool() {
  this.windows = [];

  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
}
```

上面的代码将12个窗户精灵添加到对象池中。前6个精灵代表有灯光的窗口(`window_01`)，而其他6个精灵代表没有灯光的窗口(`window_02`)。

当我们使用对象池中的精灵时，获得前6个精灵是有灯光的窗户，后6个事没有灯光的窗户。我们希望获得的窗户类型是随机的，我们需要打乱它们的顺序。

下面的方法用来打乱传递给它的数组。把它添加到你的代码中：

```js
WallSpritesPool.prototype.shuffle = function(array) {
  var len = array.length;
  var shuffles = len * 3;
  for (var i = 0; i < shuffles; i++)
  {
    var wallSlice = array.pop();
    var pos = Math.floor(Math.random() * (len-1));
    array.splice(pos, 0, wallSlice);
  }
};
```

现在在构造函数中调用`shuffle()`方法:

```js {17}
function WallSpritesPool() {
  this.windows = [];

  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_01"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  this.windows.push(PIXI.Sprite.fromFrame("window_02"));
  
  this.shuffle(this.windows);
}
```

现在，我们进行一些重构，因为有一种更为简洁的方法来填充数组。 由于我们实际上是在数组中添加了两组精灵（带灯光的窗户和无灯光的窗户），因此可以删除以下高亮代码行：

```js {4-15}
function WallSpritesPool() {
  this.windows = [];

  this.windows.push(PIXI.Sprite.fromFrame("window_01")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_01")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_01")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_01")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_01")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_01")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_02")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_02")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_02")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_02")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_02")); // 删除
  this.windows.push(PIXI.Sprite.fromFrame("window_02")); // 删除
  
  this.shuffle(this.windows);
}
```

添加下面高亮代码行：

```js {4,5,10-16}
function WallSpritesPool() {
  this.windows = [];

  this.addWindowSprites(6, "window_01");
  this.addWindowSprites(6, "window_02");
  
  this.shuffle(this.windows);
}

WallSpritesPool.prototype.addWindowSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++)
  {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.windows.push(sprite);
  }
};

WallSpritesPool.prototype.shuffle = function(array) {
  var len = array.length;
  var shuffles = len * 3;
  for (var i = 0; i < shuffles; i++)
  {
    var wallSlice = array.pop();
    var pos = Math.floor(Math.random() * (len-1));
    array.splice(pos, 0, wallSlice);
  }
};
```

保存你的更改。

`addWindowSprites()`方法允许我们将一些精灵添加到`windows`数组中，这些数组使用了与精灵表格的帧。因此，很容易将一组6个有灯光的窗户精灵和一组6个没有灯光的窗户精灵添加到我们的池中。

在继续之前，我们应该再做一个重构。让我们将代码从构造函数移到它自己的方法中。向上滚动到构造函数并删除以下高亮行：

```js {2-7}
function WallSpritesPool() {
  this.windows = [];

  this.addWindowSprites(6, "window_01");
  this.addWindowSprites(6, "window_02");
  
  this.shuffle(this.windows);
}
```

将删除的那些代码放在一个新方法中：

```js {4-11}
function WallSpritesPool() {
}

WallSpritesPool.prototype.createWindows = function() {
  this.windows = [];

  this.addWindowSprites(6, "window_01");
  this.addWindowSprites(6, "window_02");

  this.shuffle(this.windows);
};
```

最后，在构造函数中调用`createWindows()`方法:

```js {2}
function WallSpritesPool() {
  this.createWindows();
}

WallSpritesPool.prototype.createWindows = function() {
  this.windows = [];

  this.addWindowSprites(6, "window_01");
  this.addWindowSprites(6, "window_02");

  this.shuffle(this.windows);
};
```

现在，我们有了创建窗户精灵，然后把他们添加到数组并打乱顺序的代码。保存您当前的更改，让我们继续。

## 为什么是12个窗户精灵？

从技术上讲，我们可以在我们的池中使用少于12个窗户精灵。毕竟，我们只需要足够的精灵来覆盖视口的宽度。我选择12个窗户精灵的原因是为了给墙壁跨度上有光和无光窗户的图案增加一些随机性。我可以在合理的范围内使用任意数量的精灵，只要它提供足够的窗户精灵让我在视口内生成一个墙跨度。

## 借用和归还精灵

我们的对象池是窗户精灵的集合，但是我们尚未提供允许从池中获取精灵或将其返回给池的公共方法。

::: tip
所有方法和属性都可以在JavaScript中公开访问。 这可能使得难以识别属于您的类的API的方法和属性以及处理实现细节的方法和属性。 当我将某事物称为“公共”时，是指我打算将其用于该类之外（例如：这个类的实例）的其他地方。
:::

我们将为此提供以下两种方法：

- `borrowWindow()`
- `returnWindow()`

`borrowWindow()`方法将从池中删除一个窗户精灵，并返回一个对它的引用，供您使用。使用完精灵后，可以通过调用`returnWindow()`并将精灵作为参数传递，将它放回池中。

好的，让我们编写`borrowWindow()`方法。在类的构造函数之后添加以下内容:

```js {5-7}
function WallSpritesPool() {
  this.createWindows();
}

WallSpritesPool.prototype.borrowWindow = function() {
  return this.windows.shift();
};
```

如您所见，这是一个相当简单的方法，它只是从`windows`数组删除第一个精灵并返回这个精灵。

::: tip
我们的`borrowWindow()`方法不会检查池中是否还有精灵。在本系列教程中，我们不必担心这个问题，但是在尝试从精灵池中返回一些内容之前，最好检查一下精灵池是否为空。有多种处理空池的策略。一种常见的方法是在池耗尽时动态增加池的大小。
:::

现在将`returnWindow()`方法直接添加到它下面：

```js {5-7}
WallSpritesPool.prototype.borrowWindow = function() {
  return this.windows.shift();
};
	
WallSpritesPool.prototype.returnWindow = function(sprite) {
  this.windows.push(sprite);
};
```

与`borrowWindow()`一样，`returnWindow()`方法也很简单。它将一个精灵作为参数，并将该精灵添加到`windows`数组的末尾。

现在，我们有了一种从对象池中获取窗户精灵的方法，也有了将精灵插入到对象池中的方法。

保存你的更改。

## 快速回顾一下

让我们回过头来看一下`WallSpritesPool`类。代码不多，你需要了解它们是做什么的。你当前的代码应该是这样的：

```js
function WallSpritesPool() {
  this.createWindows();
}

WallSpritesPool.prototype.borrowWindow = function() {
  return this.windows.shift();
};
	
WallSpritesPool.prototype.returnWindow = function(sprite) {
  this.windows.push(sprite);
};

WallSpritesPool.prototype.createWindows = function() {
  this.windows = [];

  this.addWindowSprites(6, "window_01");
  this.addWindowSprites(6, "window_02");

  this.shuffle(this.windows);
};

WallSpritesPool.prototype.addWindowSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++)
  {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.windows.push(sprite);
  }
};

WallSpritesPool.prototype.shuffle = function(array) {
  var len = array.length;
  var shuffles = len * 3;
  for (var i = 0; i < shuffles; i++)
  {
    var wallSlice = array.pop();
    var pos = Math.floor(Math.random() * (len-1));
    array.splice(pos, 0, wallSlice);
  }
};
```

这个类创建了一个数组，包含6个有灯光的窗户精灵和6个没有灯光的窗户精灵。数组充当窗户的精灵池，精灵池的顺序被随机打乱了。这个类提供了两个公共方法——`borrowWindow()`和`returnWindow()`——它们允许从精灵池中获取窗户精灵，和把它们返回到池中。

就是这样。当然，我们仍然需要考虑其他的墙面切片类型(前墙边缘，后墙边缘，墙面装饰和墙台阶)，但是我们很快就会将它们添加到我们的`WallSpritesPool`类中。首先，让我们对这些做一些测试，以确保一切都如预期的那样工作。

## 测试对象池

移至index.html文件，并引入包含`WallSpritesPool`类的源文件：

```html {5}
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.0.0/pixi.min.js"></script>
<script src="Far.js"></script>
<script src="Mid.js"></script>
<script src="Scroller.js"></script>
<script src="WallSpritesPool.js"></script>
<script src="Main.js"></script>
```

保存更改。

现在打开`Main.js`。我们对它做一些修改，来测试我们的对象池。

我们将首先向`spriteSheetLoaded()`方法添加一些代码。创建一个对象池实例和一个数组，我们将使用它来保存从池中获得的墙壁切片精灵。

```js {5-6}
Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimationFrame(this.update.bind(this));

  this.pool = new WallSpritesPool();
  this.wallSlices = [];
};
```

在上面的代码中，我们将对象池实例存储在一个名为`pool`的成员变量中，而数组的成员变量名为`wallSlices`。

现在，让我们编写一些代码来从池中获取指定数量的窗户精灵并将它们添加到舞台中。在类的末尾添加以下测试方法：

```js {1-12}
Main.prototype.borrowWallSprites = function(num) {
  for (var i = 0; i < num; i++)
  {
    var sprite = this.pool.borrowWindow();
    sprite.position.x = -32 + (i * 64);
    sprite.position.y = 128;

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};
```
除了将窗户精灵添加到舞台之外，上面的`borrowWallSprites()`方法还将每个精灵添加到`wallSlices`成员变量中。这样做的原因是，我们需要能够在第二个测试方法中访问这些窗口精灵，我们现在将编写这个测试方法。添加以下:

```js {1-10}
Main.prototype.returnWallSprites = function() {
  for (var i = 0; i < this.wallSlices.length; i++)
  {
    var sprite = this.wallSlices[i];
    this.stage.removeChild(sprite);
    this.pool.returnWindow(sprite);
  }

  this.wallSlices = [];
};
```

这个`returnWallSprites()`方法将删除添加到舞台上的所有窗户切片，并将这些精灵返回到对象池。

保存您的更改。

通过这两个方法，我们可以验证是否可以从对象池中借用窗户精灵，并将这些精灵返回到池中。我们将使用Chrome的JavaScript控制台窗口。

::: tip
像往常一样，按F12 (Cmd + Opt + i在Mac上)打开开发工具窗口，然后单击Console选项卡。
:::

首先，确保在控制台窗口中没有报告错误。如果有，那么在继续下面教程之前修复它们。

现在让我们通过从对象池中检索9个窗口来创建一个非常粗糙的墙。在控制台中输入以下内容：

```js
main.borrowWallSprites(9);
```

::: tip
请记住，可以通过主全局变量访问我们的主应用程序类，我们可以使用该全局变量来调用`borrowWallSprites()`方法。
:::

就像下面的截图一样，你会看到9个窗户精灵横跨舞台。所有9个精灵都是从你的对象池中借来并添加到舞台上的。还要注意，亮窗和不亮窗的顺序很可能是随机出现的。这是由于池中的windows数组在创建后被打乱了。

![](/images/scroller/tut3-testing-object-pool.png)

现在让我们验证一下是否可以将这些精灵返回到对象池。在控制台中输入以下内容：

```js
main.returnWallSprites();
```

您的这些精灵应该从舞台上消失，并将返回到对象池。

我们需要确信，精灵确实已经回到了对象池中。最简单的方法是从池中请求更多的窗户精灵，并检查它们是否也出现在屏幕上。我们再从池里拿出九个窗户精灵：

```js
main.borrowWallSprites(9);
```

然后把它们放回池中:

```js
main.returnWallSprites();
```

现在，我们已经从对象池中总共获得了18个精灵。记住，池只包含12个窗户精灵。因此，我们有一些证据证明精灵是从池中借来的，并在完成后成功返回。如果它们没有被返回，那么当对象池的内部数组变为空时，我们最终会收到一个运行时错误。

由于JavaScript中的所有内容都是公开可访问的，所以我们可以很容易地随时检查对象池的内部数组。尝试从控制台中检查数组的大小

```js
main.pool.windows.length
```

应该返回的长度是12。现在借用四个窗口精灵从池使用：

```js
main.borrowWallSprites(4);
```

再次检查对象池的大小:

```js
main.pool.windows.length
```

它现在应该只包含8个精灵。最后，通过调用`returnWallSprites()`将精灵返回池中。再次检查对象池的大小并确认其长度已返回到12。

让我们继续，注意要保留添加到主应用程序类中的测试代码，因为我们还会用到它。


## 向对象池添加墙壁装饰