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