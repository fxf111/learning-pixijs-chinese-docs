(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{216:function(t,s,a){"use strict";a.r(s);var n=a(28),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"创建pixi应用和stage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建pixi应用和stage"}},[t._v("#")]),t._v(" 创建Pixi应用和"),a("code",[t._v("stage")])]),t._v(" "),a("p",[t._v("现在我们来使用Pixi。")]),t._v(" "),a("p",[t._v("第一步是使用Pixi上的Application对象创建一个矩形显示区域。 它会自动生成一个HTML "),a("code",[t._v("<canvas>")]),t._v("元素，然后在canvas画布上显示图像。 之后，您需要创建一个称为"),a("code",[t._v("stage（舞台）")]),t._v("的特殊Pixi"),a("code",[t._v("容器")]),t._v("对象。 就像您将在后面看到的那样，该舞台对象将根容器来保存您希望Pixi显示的所有东西的。")]),t._v(" "),a("p",[t._v("下面是创建Pixi应用程序和"),a("code",[t._v("stage（舞台）")]),t._v("需要编写的代码。将此代码添加到<script>标记之间的HTML文档中")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Create a Pixi Application")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PIXI"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Application")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("width"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" height"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Add the canvas that Pixi automatically created for you to the HTML document")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("p",[t._v("这是开始使用Pixi所需要编写的最基本的代码。它会在你的HTML页面上生成一个256像素×256像素的黑色canvas元素。下面是在浏览器中运行这段代码时的情况。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/01.png",alt:""}})]),t._v(" "),a("p",[t._v("没错，就是一个黑色方块！")]),t._v(" "),a("p",[a("code",[t._v("PIXI.Application")]),t._v("会自动选择使用Canvas或者是WebGL来渲染图形，这取决于您的浏览器支持情况。"),a("code",[t._v("PIXI.Application")]),t._v("有一个"),a("code",[t._v("options")]),t._v("对象。在本例中，它的"),a("code",[t._v("width")]),t._v("和"),a("code",[t._v("height")]),t._v("属性用来设置Canvas画布的宽度和高度（以像素为单位）。您可以在这个options对象中设置更多的可选属性;下面是如何使用它来设置反锯齿，透明度和分辨率。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PIXI"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Application")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    width"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("         "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// default: 800 宽度")]),t._v("\n    height"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// default: 600 高度")]),t._v("\n    antialias"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// default: false 反锯齿")]),t._v("\n    transparent"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// default: false 透明度")]),t._v("\n    resolution"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// default: 1 分辨率")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("p",[t._v("如果您需要修改Pixi的默认配置，请参阅"),a("a",{attrs:{href:"/TODO"}},[t._v("Pixi.application")]),t._v("文档。")]),t._v(" "),a("p",[t._v("这些选项有什么用?"),a("code",[t._v("antialias")]),t._v("使字体和图形边缘更加平滑。(WebGL的抗锯齿并不是在所有的平台上都可用，所以你需要在你的游戏目标平台上进行测试。)"),a("code",[t._v("transparent")]),t._v("使canvas背景透明。"),a("code",[t._v("resolution")]),t._v("用于不同分辨率和像素密度下。设置分辨率超出了本教程的范围，你可以在"),a("a",{attrs:{href:"http://www.goodboydigital.com/pixi-js-v2-fastest-2d-webgl-renderer/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Mat Grove's explanation"),a("OutboundLink")],1),t._v("了解详细用法。通常，"),a("code",[t._v("resolution")]),t._v("默认设置为1就可以了。")]),t._v(" "),a("p",[t._v("因为WebGL非常快，所以Pixi的"),a("code",[t._v("renderer")]),t._v("对象将默认为WebGL。如果您想使用canvas绘图API，可以将forceCanvas选项设置为true，如下所示：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("forceCanvas"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("如果创建画布后需要更改背景颜色，请将"),a("code",[t._v("app.renderer")]),t._v("对象的"),a("code",[t._v("backgroundColor")]),t._v("属性设置为十六进制颜色值：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("backgroundColor "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x061639")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("如果您想查看渲染器的宽度或高度，请使用"),a("code",[t._v("app.renderer.view.width")]),t._v("和"),a("code",[t._v("app.renderer.view.height")]),t._v("。")]),t._v(" "),a("p",[t._v("要更改画布的大小，请使用"),a("code",[t._v("renderer")]),t._v("的"),a("code",[t._v("resize")]),t._v("方法，并提供任何新的"),a("code",[t._v("width")]),t._v("和"),a("code",[t._v("height")]),t._v("值。但是，为了确保画布的大小调整到与分辨率匹配，请将"),a("code",[t._v("autoResize")]),t._v("设置为"),a("code",[t._v("true")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("autoResize "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resize")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("512")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("512")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("如果您想让canvas画布填充整个窗口，您可以应用下面的CSS样式并将渲染器的大小调整到浏览器窗口的大小。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("position "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"absolute"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("view"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("display "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"block"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("autoResize "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resize")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerWidth"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHeight"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("另外，请确保所有HTML元素的默认内边距和边距设置为0：")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token style"}},[a("span",{pre:!0,attrs:{class:"token language-css"}},[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("margin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("如果希望画布按比例缩放到任何浏览器窗口大小，可以使用这个"),a("a",{attrs:{href:"https://github.com/kittykatattack/scaleToWindow",target:"_blank",rel:"noopener noreferrer"}},[t._v("自定义的scaleToWindow函数"),a("OutboundLink")],1),t._v("。")])])}),[],!1,null,null,null);s.default=e.exports}}]);