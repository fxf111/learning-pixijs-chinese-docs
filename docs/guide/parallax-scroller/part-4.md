英文教程原作者[Christopher](http://www.yeahbutisitflash.com/?author=1)

[关注他@chriscaleb](https://twitter.com/intent/follow?screen_name=chriscaleb)

本系列教程已经针对[PixiJS v4](http://www.pixijs.com/)进行了更新。

欢迎来到本系列的第四篇也是最后一篇教程，本系列详细介绍了如何使用JavaScript和pixi.js构建视差滚动图。
在上一教程中，我们通过实现对象池并学习如何使用精灵表单来开始编写滚动器的前景层。
今天，我们实际上将构造前景层并编写代码以在视口中滚动其游戏地图。
## 你将会学到...

- 如何在内存中表示游戏地图
- 如何显示和滚动大型游戏地图
- 构造游戏地图所需的支持代码
## 你应该了解...

- 如何构建和使用对象池
- 对JavaScript或ActionScript的理解
- 基本的面向对象概念

我们将从中断的地方继续。继续使用在前三个教程中生成的代码。
不过，如果您愿意的话，可以从GitHub下载[第三个教程的源码](https://github.com/ccaleb/pixi-parallax-scroller)，
然后在GitHub上操作。


最终，我们将获得一个滚动的游戏地图，该地图几乎与Half Brick的出色的Monster Dash游戏中的地图相同。
请记住，我们的地图将由一系列不同高度和宽度的墙跨构建而成，并且我们将利用对象池来检索构成每个墙跨的各个切片。
我们还会为游戏锦上添花，随着时间的推移逐渐增加地图的滚动速度，就像在Monster Dash中一样
[![click to lanch demo](/images/scroller/ps-tut1-screenshot1.png)](/demo/parallax-scroller_tutorial4)

上图即是我们这篇教程的最终版本，只需单击该图像即可查看实际效果。

## 开始学习

如果您尚未完成之前的三个教程（[第1部分](/guide/parallax-scroller/part-1.html)，[第2部分](/guide/parallax-scroller/part-2.html)，
[第3部分](/guide/parallax-scroller/part-3.html)），那么我建议您先学习前三个教程。
另外，请记住，您需要运行本地网络服务器才能测试您的工作。
如果您尚未这样做，请参阅[第一个教程的“入门”](/guide/parallax-scroller/part-1.html#入门)部分，
以获取有关如何设置Web服务器的详细信息。
与上一教程一样，您需要花大约两个小时才能完成本教程。

## 墙片类型
我们已经介绍了构成前景层地图的各种墙壁切片类型。为了避免疑问，在此再次声明：
- 前缘
- 后缘
- 步
- 墙面装饰
- 窗口

您还可以在下图中查看每种墙切片类型：

![diagram-1](/images/scroller/scroller-4/diagram-1.png)

让我们编写一个名为SliceType的简单类，该类存储代表每种切片类型的常量。
另外，我们还将添加一种切片类型：墙间隙。
墙间隙本质上将代表一个不可见的切片，用于在我们的墙跨之间创建空间。


打开您的文本编辑器并创建一个新文件。向其中添加以下内容:
```javascript
function SliceType() {}

SliceType.FRONT      = 0;
SliceType.BACK       = 1;
SliceType.STEP       = 2;
SliceType.DECORATION = 3;
SliceType.WINDOW     = 4;
SliceType.GAP        = 5;
```
保存文件并将其命名为SliceType.js。


每个常量都有一个从零开始的整数。
这很重要，因为它将允许我们稍后在代码中使用这些常量来创建和访问查找表。


`我们的查询表将由数组表示，数组当然基于零索引。`


我们不要忘记在项目中包含班级的源文件。
移动到`index.html`文件并添加以下行：
```javascript
<script src="WallSpritesPool.js"></script>
<script src="SliceType.js"></script>
<script src="Main.js"></script>
```
保存您的更改。


## 前处理层
现在，让我们创建代表滚动器前景层的类。

就像我们的中层一样，我们的前景层将从Pixi的一个显示对象继承功能。
前两层是PIXI.extras.TilingSprite的专门版本，
而我们的前景层将继承自PIXI.Container。
我们不需要为前景层使用Pixi的平铺精灵功能，
这就是为什么我们选择PIXI.Container的原因。
PIXI.Container类为我们提供了足够的功能，
使我们能够像在其其他显示对象中一样，将专门的前景类添加到Pixi的显示列表中。

我们的前景层将代表我们的游戏地图。
由于我们的游戏地图包含一系列墙跨度，因此我们将其命名为“墙”。

`当然，还有许多其他合适的名称，包括：Front和Map。
但是，考虑到本教程的前景层所代表的内容，Walls感觉很合适。`


那么接下来，首先为您的课程创建一个新文件，然后向其中添加以下内容：
```javascript
function Walls() {
  PIXI.Container.call(this);
}
Walls.prototype = Object.create(PIXI.Container.prototype);
```
将文件保存并命名为：`Walls.js`.

