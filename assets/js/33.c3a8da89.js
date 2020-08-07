(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{375:function(t,s,a){"use strict";a.r(s);var n=a(42),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"旋转"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#旋转"}},[t._v("#")]),t._v(" 旋转")]),t._v(" "),a("p",[t._v("你可以给精灵的"),a("code",[t._v("rotation")]),t._v("属性设置为一个弧度值来让它旋转。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("rotation "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("但是绕着哪个点旋转呢？")]),t._v(" "),a("p",[t._v("您已经看到，精灵的左上角表示它的"),a("code",[t._v("x")]),t._v("和"),a("code",[t._v("y")]),t._v("位置。这个点叫做"),a("code",[t._v("锚点（anchor）")]),t._v("。如果你将精灵的"),a("code",[t._v("rotation")]),t._v("属性设置为类似于0.5的值，旋转将会在精灵的锚点附近发生。下图显示了锚点对我们的猫精灵产生的影响。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/images/start/07.png",alt:""}}),t._v(";")]),t._v(" "),a("p",[t._v("你可以看到"),a("code",[t._v("锚点")]),t._v("，猫的左耳，猫围绕这个"),a("code",[t._v("锚点")]),t._v("旋转。如果你想让精灵绕着它的中心旋转呢?改变精灵的"),a("code",[t._v("锚点")]),t._v("，使它位于精灵的中心，就像这样:")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("anchor"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ncat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("anchor"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("y "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[a("code",[t._v("anchor.x")]),t._v("和"),a("code",[t._v("anchor.y")]),t._v("值表示纹理尺寸的百分比，从0到1(0%到100%)。将它设置为0.5，使纹理在点上居中。点本身的位置不会改变，只会改变纹理的位置。")]),t._v(" "),a("p",[t._v("下图是一个已经旋转过的精灵，然后使锚点居中的效果。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/images/start/08.png",alt:""}})]),t._v(" "),a("p",[t._v("你可以看到精灵的纹理向上并向左移动。这是一个需要记住的重要副作用！")]),t._v(" "),a("p",[t._v("就像"),a("code",[t._v("position")]),t._v("和"),a("code",[t._v("scale")]),t._v("一样，您可以用一行代码来设置"),a("code",[t._v("锚点")]),t._v("的"),a("code",[t._v("x")]),t._v("和"),a("code",[t._v("y")]),t._v("值，如下所示：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("anchor"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("精灵还有一个类似于锚点的"),a("code",[t._v("pivot")]),t._v("属性。")]),t._v(" "),a("p",[a("code",[t._v("pivot")]),t._v("轴心点设置了精灵的原点。")]),t._v(" "),a("p",[t._v("如果你改变了它，然后旋转精灵，精灵会绕着原点旋转旋转。下面把精灵的"),a("code",[t._v("pivot.x")]),t._v("和"),a("code",[t._v("pivot.y")]),t._v("都设置为32：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("cat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pivot"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("假设精灵是64x64像素，精灵现在会绕着它的中心点旋转。")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("但是请注意")]),t._v(" "),a("p",[t._v("如果你改变一个精灵的原点，你也就改变了它的坐标。")])]),t._v(" "),a("p",[t._v("那么，"),a("code",[t._v("锚点")]),t._v("和"),a("code",[t._v("原点")]),t._v("有什么区别呢？他们太相似了!"),a("code",[t._v("锚点")]),t._v("改变了精灵图片纹理的原理，值的范围是0-1；"),a("code",[t._v("原点")]),t._v("改变了精灵的原点，使用的像素值。你应该使用哪一种?这取决于你。你可以试试这两种方法，看看你更喜欢哪一种。")])])}),[],!1,null,null,null);s.default=e.exports}}]);