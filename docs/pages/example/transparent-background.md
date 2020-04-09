**透明背景(Transparent Background)**
---

<iframe id="container" src="/example/transparent-background.html" style="width: 1000px;height: 500px;border:0"></iframe>

```js
const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

// 从图像路径创建新的精灵。
const bunny = PIXI.Sprite.from('examples/assets/bunny.png');

// 将精灵的锚点居中
bunny.anchor.set(0.5);

// 将精灵移到屏幕中央
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

app.ticker.add(() => {
    // 为了好玩，让我们旋转兔子先生一点
    bunny.rotation += 0.1;
});
```