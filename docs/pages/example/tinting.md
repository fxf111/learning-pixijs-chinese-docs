**着色(Tinting)**
---
<iframe id="container" src="/example/tinting.html" style="width: 1000px;height: 500px;border:0"></iframe>

```js
const app = new PIXI.Application();
document.body.appendChild(app.view);

// 存放精灵
const aliens = [];

const totalDudes = 20;

for (let i = 0; i < totalDudes; i++) {
    // 创建一个新的精灵，它使用我们刚刚生成的作为其源的图像名
    const dude = PIXI.Sprite.from('examples/assets/eggHead.png');

    // 设置定位点，使纹理以精灵为中心
    dude.anchor.set(0.5);

    // 为这个家伙设置一个随机的比例-没有一点他们都是一样的大小！
    dude.scale.set(0.8 + Math.random() * 0.3);

    // 最后让我们把这家伙设成一个随机的位置。
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;

    dude.tint = Math.random() * 0xFFFFFF;

    // 创建一些控制移动的额外属性：
    // 以弧度创建随机方向。这是一个介于0和PI*2之间的数字，相当于0-360度
    dude.direction = Math.random() * Math.PI * 2;

    // 为这家伙创造一个2-4之间的随机速度
    dude.turningSpeed = Math.random() - 0.8;

    // create a random speed for the dude between 2 - 4
    dude.speed = 2 + Math.random() * 2;

    // 最后我们把这个家伙推到数组中，这样以后就可以很容易地访问它了
    aliens.push(dude);

    app.stage.addChild(dude);
}

// 为小家伙们创造一个包围圈
const dudeBoundsPadding = 100;
const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2);

app.ticker.add(() => {
    // 遍历这些家伙并更新他们的位置
    for (let i = 0; i < aliens.length; i++) {
        const dude = aliens[i];
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * dude.speed;
        dude.y += Math.cos(dude.direction) * dude.speed;
        dude.rotation = -dude.direction - Math.PI / 2;

        // 通过测试他们的界限来包装他们。
        if (dude.x < dudeBounds.x) {
            dude.x += dudeBounds.width;
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
            dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
            dude.y += dudeBounds.height;
        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
            dude.y -= dudeBounds.height;
        }
    }
});
```