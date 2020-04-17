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


目前为止，除了从PIXI.Container继承功能外，我们的课程并没有做太多事情。
在我们开始在我们的类中添加更多代码之前，首先将其包含在我们的项目中，
然后将其连接到我们的Scroller类，该类既包含中间层又包含中间层。

打开index.html并添加以下行：
```javascript
<script src="SliceType.js"></script>
<script src="Walls.js"></script>
<script src="Main.js"></script>
```
保存你的更改。

现在打开Scroller.js并在其构造函数中实例化Walls类。此外，将实例添加到显示列表中：

```javascript
function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);

  this.front = new Walls();
  stage.addChild(this.front);

  this.viewportX = 0;
```
再次保存你的更改。


## 整合对象库
`Walls`类将大量使用您的对象池。请记住，您的对象池可让您借用墙切片精灵，并在完成后将它们返回到池中。
例如，如果您要建造一面包含窗户的墙，则可以通过调用对象池的`roweWindow()`方法从对象池中获取窗户精灵。
一旦不再使用窗口精灵，您可以通过调用`returnWindow()`将其返回到池中。
对于其他墙切片类型，对象池具有类似的方法。


让我们在Walls类中创建对象池的实例。打开Walls.js并在其中添加以下行：

```javascript
function Walls() {
  PIXI.Container.call(this);

  this.pool = new WallSpritesPool();
}
```
保存你的更改。

在上一教程中，我们利用两个查找表来帮助构建测试墙跨度。
 第一个查找表包含对对象池中“借用”方法的引用，这些引用是构建特定范围所必需的。 
 另一个表包含对将每个slice Sprite返回到池所需的相应“ return”方法的引用。

我们将在此处编写类似的内容，但将以通用的方式进行编写，允许我们创建所需的任何墙跨度，而不是单个特定跨度。 
第一个查询表将包含对我们对象池的五个“借用”方法的引用（每种墙壁切片类型一个）。
第二个表将包含对池的五个“返回”方法的引用。
这将提供一种方便的方式来管理壁厚类型的借入和归还。

让我们写一个简单的方法来设置两个查找表。 将以下内容添加到`Walls.js`：

```javascript
Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.prototype.createLookupTables = function() {
  this.borrowWallSpriteLookup = [];
  this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
  this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
  this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
  this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
  this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

  this.returnWallSpriteLookup = [];
  this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
  this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
  this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
  this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
  this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
};
```
在上面的方法中，我们创建了两个成员变量。 
第一个，`rownWallSpriteLookup`是一个数组，其中包含对我们对象库的每个“借用”方法的引用。 
第二个参数`returnWallSpriteLookup`也是一个数组，其中包含对每个对象池的“return”方法的引用。

请注意，使用我们的`SliceType`类的常量来索引每个对象池的方法。
例如，我们使用`SliceType.FRONT`将对对象池的`borrowFrontEdge()`方法的引用放置在查找表数组的索引位置0处：
`this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;`


在本教程的后面部分，我们将使用`SliceType`类的常量，用于在渲染前景层的内容时，访问和调用正确的“借用”和“返回”方法。 
实际上，我们很快就会编写两种支持方法来帮助我们做到这一点。 
但是首先，我们要确保通过在类的构造函数中调用`createLookupTables()`来创建查找表。

添加以下行：

```javascript
function Walls() {
  PIXI.Container.call(this);

  this.pool = new WallSpritesPool();
  this.createLookupTables();
}
```

保存你的更改。

## 借用和返还墙板的方法

现在我们有了两个查找表，我们可以编写两种非常简单的支持方法：
一种方法允许我们从对象池中借用特定的墙切片精灵，
另一种方法将墙切片精灵返回给池。

在`Walls.js`类的末尾添加以下两个方法：

```javascript
Walls.prototype.borrowWallSprite = function(sliceType) {
  return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

Walls.prototype.returnWallSprite = function(sliceType, sliceSprite) {
  return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};
```
第一种方法，roweWallSprite()，将墙面切片类型作为参数，然后从对象池返回该类型的子画面。 
第二个参数returnWallSprite()需要两个参数：墙切片类型和以前借用的该类型的精灵。 
它获取精灵并将其返回到对象池。 
如果您查看这两种方法的实现，您会发现传递给每个方法的切片类型用于查找和调用适当的对象池方法。


