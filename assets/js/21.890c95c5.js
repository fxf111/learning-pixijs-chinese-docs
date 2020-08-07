(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{364:function(s,t,a){"use strict";a.r(t);var n=a(42),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"分组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分组"}},[s._v("#")]),s._v(" 分组")]),s._v(" "),a("p",[s._v("在你创建游戏场景时，可以给精灵们分组，作为一个整体管理。Pixi有一个名为"),a("code",[s._v("Container")]),s._v("的对象，它可以把精灵们组合在一起。")]),s._v(" "),a("p",[s._v("假设您要显示三个精灵：一只猫，一只刺猬和一个老虎。创建并设置好它们的坐标——"),a("em",[s._v("但不要将它们添加到舞台上")]),s._v("。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//The cat")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" cat "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sprite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cat.png"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\ncat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//The hedgehog")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" hedgehog "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sprite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hedgehog.png"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nhedgehog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//The tiger")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" tiger "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sprite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"tiger.png"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\ntiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("p",[s._v("然后，创建一个"),a("code",[s._v("animals")]),s._v("容器（container）（用来把它们组合起来）：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" animals "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("PIXI"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Container")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("然后使用"),a("code",[s._v("addChild")]),s._v("把"),a("code",[s._v("它们三个添加到分组(group)")]),s._v("。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("animals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("addChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nanimals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("addChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("hedgehog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nanimals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("addChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("tiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("最后，把这个分组添加到场景中。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("stage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("addChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("animals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("（"),a("code",[s._v("stage")]),s._v("对象也是一个"),a("code",[s._v("容器(container)")]),s._v("，它是所有Pixi精灵的根容器）")]),s._v(" "),a("p",[s._v("下面就是这段代码的效果：")]),s._v(" "),a("p",[a("img",{attrs:{src:"/images/start/18.png",alt:""}})]),s._v(" "),a("p",[a("img",{attrs:{src:"/images/start/19.png",alt:""}})]),s._v(" "),a("p",[s._v("如上图所示，您可以将"),a("code",[s._v("animals")]),s._v("分组视为一个单元。把"),a("code",[s._v("容器(Container)")]),s._v("视为一种不包含纹理的特殊精灵。")]),s._v(" "),a("p",[s._v("您可以用"),a("code",[s._v("animals")]),s._v("的"),a("code",[s._v("children")]),s._v("属性列出它包含的所有精灵。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("animals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//Displays: Array [Object, Object, Object]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("你可以看到，"),a("code",[s._v("animals")]),s._v("分组包含3个精灵。")]),s._v(" "),a("p",[s._v("因为"),a("code",[s._v("animals")]),s._v("分组与精灵类似，所以它拥有精灵所有的属性，因此你可以改变它的"),a("code",[s._v("x")]),s._v("、"),a("code",[s._v("y")]),s._v("、"),a("code",[s._v("alpha")]),s._v("、"),a("code",[s._v("scale")]),s._v("等值。在父容器上更改的任何属性值都将以一种相对的方式影响子精灵。")]),s._v(" "),a("p",[s._v("因此，如果设置了分组的"),a("code",[s._v("x")]),s._v("和"),a("code",[s._v("y")]),s._v("坐标，则所有子精灵将相对于组的左上角重新定位。 请看下面，如果将动物的"),a("code",[s._v("x")]),s._v("和"),a("code",[s._v("y")]),s._v("坐标设置为"),a("code",[s._v("64")]),s._v("，会发生什么？")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("animals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("整个精灵分组将向右移动64个像素，向下移动64个像素。")]),s._v(" "),a("p",[a("img",{attrs:{src:"/images/start/20.png",alt:""}})]),s._v(" "),a("p",[a("code",[s._v("animals")]),s._v("分组也有其自己的尺寸，该尺寸基于包含的精灵所占据的面积。 您可以查看它的"),a("code",[s._v("width")]),s._v("和"),a("code",[s._v("height")]),s._v("，如下所示：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("animals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("width"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//Displays: 112")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("animals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("height"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//Displays: 112")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("img",{attrs:{src:"/images/start/21.png",alt:""}})]),s._v(" "),a("p",[s._v("如果改变分组的"),a("code",[s._v("width")]),s._v("和"),a("code",[s._v("height")]),s._v("会发生什么？")]),s._v(" "),a("p",[a("img",{attrs:{src:"/images/start/22.png",alt:""}})]),s._v(" "),a("p",[s._v("您可以将尽可能多"),a("code",[s._v("的容器")]),s._v("嵌套到其他"),a("code",[s._v("容器")]),s._v("中，以便在需要时创建多层结构。然而，一个可显示对象"),a("code",[s._v("DisplayObject")]),s._v("(例如一个"),a("code",[s._v("精灵")]),s._v("或另一个"),a("code",[s._v("容器")]),s._v(")只能拥有一个父级。如果您使用"),a("code",[s._v("addChild")]),s._v("使一个精灵成为另一个对象的子对象，Pixi将自动从当前父对象中删除它。")]),s._v(" "),a("h2",{attrs:{id:"局部坐标和全局坐标"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#局部坐标和全局坐标"}},[s._v("#")]),s._v(" 局部坐标和全局坐标")]),s._v(" "),a("p",[s._v("当您将一个精灵添加到"),a("code",[s._v("容器")]),s._v("中时，它的"),a("code",[s._v("x")]),s._v("和"),a("code",[s._v("y")]),s._v("坐标相对于分组的左上角。"),a("code",[s._v("x")]),s._v("和"),a("code",[s._v("y")]),s._v("就是"),a("strong",[s._v("局部坐标")]),s._v("。你知道猫在这幅图中的坐标吗？")]),s._v(" "),a("p",[a("img",{attrs:{src:"/images/start/20.png",alt:""}})]),s._v(" "),a("p",[s._v("让我们看一下：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//Displays: 16")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("16？是! 那是因为猫从该组的左上角仅偏移了16个像素。 16是猫的局部坐标。")]),s._v(" "),a("p",[s._v("精灵也有一个"),a("strong",[s._v("全局坐标")]),s._v("。全局坐标是从舞台左上角到精灵的定位点(通常是精灵的左上角)的距离。你可以在使用"),a("code",[s._v("toGlobal")]),s._v("方法查看一个精灵的全局坐标：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("parentSprite"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toGlobal")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("childSprite"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("这意味着你可以像这样找到"),a("code",[s._v("animals")]),s._v("分组中猫的全局坐标。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("animals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toGlobal")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//Displays: Object {x: 80, y: 80...};")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("code",[s._v("x")]),s._v("和"),a("code",[s._v("y")]),s._v("坐标是80。这就是猫的全局坐标相对于舞台左上角的坐标。")]),s._v(" "),a("p",[s._v("如果你想要查看一个精灵的全局位置，但又不知道它的父容器是谁，那怎么办呢?别急，每个精灵都有一个叫做"),a("code",[s._v("parent")]),s._v("的属性，它会告诉你精灵的父容器是谁。如果您直接向"),a("code",[s._v("舞台")]),s._v("添加一个精灵，那么"),a("code",[s._v("舞台")]),s._v("将是精灵的父容器。在上面的例子中，猫的父容器是"),a("code",[s._v("animals")]),s._v("。这意味着您可以通过编写这样的代码来获取猫的全局坐标。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toGlobal")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("即使你不知道猫的父容器是什么，你也能知道它的全局坐标。")]),s._v(" "),a("p",[s._v("还有一种方法可以计算全局坐标!这会是最好的一种方法，所以听好了!如果您想知道画布左上角到精灵的距离，而不知道或不关心精灵的父容器是什么，那么可以使用"),a("code",[s._v("getGlobalPosition")]),s._v("方法。下面我们就用它来查看老虎的全局坐标。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("tiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getGlobalPosition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("x\ntiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getGlobalPosition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("y\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("这这个例子中，x和y值是128。"),a("code",[s._v("getGlobalPosition")]),s._v("的特别之处在于它是高度精确的:它将在精灵的本地坐标发生变化时立即给出精灵的准确全局坐标。这是我要求Pixi开发团队专门为游戏添加的这一功能，以精确检测碰撞。(感谢Matt和团队的其他成员添加了它!)")]),s._v(" "),a("p",[s._v("如果要将全局坐标转换为本地坐标怎么办？ 您可以使用"),a("code",[s._v("toLocal")]),s._v("方法，如下所示：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("sprite"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toLocal")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sprite"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" anyOtherSprite"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("使用"),a("code",[s._v("toLocal")]),s._v("查看精灵和其他精灵之间的距离。下面我们来看看老虎和刺猬的相对位置。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("tiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toLocal")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("tiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" hedgehog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("x\ntiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toLocal")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("tiger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" hedgehog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("y\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("code",[s._v("x")]),s._v("值是32，"),a("code",[s._v("y")]),s._v("值是32。在示例图像中，可以看到老虎的左上角位于刺猬左上角向右、向下偏移32像素的位置。")]),s._v(" "),a("h2",{attrs:{id:"使用粒子容器particlecontainer对精灵进行分组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用粒子容器particlecontainer对精灵进行分组"}},[s._v("#")]),s._v(" 使用粒子容器ParticleContainer对精灵进行分组")]),s._v(" "),a("p",[s._v("Pixi有另一种高性能的方式来组合精灵，称为"),a("code",[s._v("粒子容器ParticleContaine")]),s._v("("),a("code",[s._v("PIXI.particles.ParticleContainer")]),s._v(")。任何在"),a("code",[s._v("ParticleContainer")]),s._v("中的精灵渲染速度都比在常规容器中快2到5倍。这对于游戏来说是一个巨大的性能提升。")]),s._v(" "),a("p",[s._v("像这样创建一个"),a("code",[s._v("ParticleContainer")]),s._v("：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" superFastSprites "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("PIXI"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("particles"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ParticleContainer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("然后使用"),a("code",[s._v("addChild")]),s._v("向它添加精灵，就像使用任何普通"),a("code",[s._v("容器")]),s._v("一样。")]),s._v(" "),a("p",[s._v("如果您决定使用"),a("code",[s._v("ParticleContainer")]),s._v("，则必须做出一些妥协。"),a("code",[s._v("ParticleContainer")]),s._v("中的精灵只有几个基本属性:"),a("code",[s._v("x")]),s._v("、"),a("code",[s._v("y")]),s._v("、"),a("code",[s._v("width")]),s._v("、"),a("code",[s._v("height")]),s._v("、"),a("code",[s._v("scale")]),s._v("、"),a("code",[s._v("pivot")]),s._v("、"),a("code",[s._v("alpha")]),s._v("、'visible等等。而且，它所包含的精灵包含子元素。一个"),a("code",[s._v("ParticleContainer")]),s._v("也不能使用Pixi的高级视觉效果，如过滤器和混合模式。每个"),a("code",[s._v("ParticleContainer")]),s._v("只能使用一个纹理(所以如果你想要不同外观的精灵，你必须使用雪碧图)。但是为了获得巨大的性能提升，这些妥协是随处可见的。")]),s._v(" "),a("p",[s._v("为什么精灵在"),a("code",[s._v("粒子容器")]),s._v("中的速度如此之快?因为精灵的位置是直接在GPU上计算的。你正在使用的最新版本的Pixi很可能比我在这里描述的有更多的特性丰富的"),a("code",[s._v("ParticleContainer")]),s._v("。有关详细信息，请参阅当前"),a("a",{attrs:{href:"http://pixijs.download/release/docs/PIXI.particles.ParticleContainer.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("ParticleContainer"),a("OutboundLink")],1),s._v("文档。")]),s._v(" "),a("p",[s._v("在创建"),a("code",[s._v("ParticleContainer")]),s._v("的时候，有四个可选参数:"),a("code",[s._v("size")]),s._v("、"),a("code",[s._v("properties")]),s._v("、"),a("code",[s._v("batchSize")]),s._v("和"),a("code",[s._v("autoResize")]),s._v("。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" superFastSprites "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ParticleContainer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("maxSize"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" properties"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" batchSize"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" autoResize"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("code",[s._v("maxSize")]),s._v("的默认值为1500。因此，如果想要显示更多的sprite，请将其设置为更大的数字。 "),a("code",[s._v("properties")]),s._v("参数是一个可以设置5个布尔值的对象："),a("code",[s._v("scale")]),s._v(", "),a("code",[s._v("position")]),s._v(", "),a("code",[s._v("rotation")]),s._v(", "),a("code",[s._v("uvs")]),s._v("和"),a("code",[s._v("alphaAndTint")]),s._v("。 "),a("code",[s._v("position")]),s._v("的默认值为"),a("code",[s._v("true")]),s._v("，但其他所有值均设置为"),a("code",[s._v("false")]),s._v("。 这意味着，如果您想在ParticleContainer中更改子画面的"),a("code",[s._v("rotation")]),s._v("，"),a("code",[s._v("scale")]),s._v("，"),a("code",[s._v("tint")]),s._v("或"),a("code",[s._v("uvs")]),s._v("，则必须将这些属性设置为"),a("code",[s._v("true")]),s._v("，如下所示：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" superFastSprites "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ParticleContainer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n  size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    rotation"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    alphaAndtint"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    scale"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    uvs"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("p",[s._v("但是，如果您认为不需要使用这些属性，请将它们设置为"),a("code",[s._v("false")]),s._v("可以最大限度地发挥性能。")]),s._v(" "),a("p",[s._v("什么是"),a("code",[s._v("uv")]),s._v("属性?只有当粒子需要在动画中改变纹理时，才将它设置为"),a("code",[s._v("true")]),s._v("。(所有的精灵的纹理必须在同一个雪碧图上）")]),s._v(" "),a("p",[s._v("（注意："),a("code",[s._v("UV映射")]),s._v("是3D图形显示术语，指的是被映射到3D表面上的纹理（图像）的"),a("code",[s._v("x")]),s._v("和"),a("code",[s._v("y")]),s._v("坐标。"),a("code",[s._v("U")]),s._v("是"),a("code",[s._v("x")]),s._v("轴，"),a("code",[s._v("V")]),s._v("是"),a("code",[s._v("y")]),s._v("轴。WebGL已经使用 "),a("code",[s._v("x")]),s._v("，"),a("code",[s._v("y")]),s._v("和"),a("code",[s._v("z")]),s._v("用来表示3D空间位置，因此选择"),a("code",[s._v("U")]),s._v("和"),a("code",[s._v("V")]),s._v("表示2D图像纹理的"),a("code",[s._v("x")]),s._v("和"),a("code",[s._v("y")]),s._v("。）")])])}),[],!1,null,null,null);t.default=e.exports}}]);