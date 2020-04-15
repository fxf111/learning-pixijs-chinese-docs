module.exports = {
    base: '/',
    title: 'Pixi.js中文网', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'Pixi.js中文网', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {    
        logo: '/pixijs-v5-logo-1.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '文档',
                ariaLabel: '文档',
                items: [
                    {text: '学习', ariaLabel: '学习', items: [
                        { text: '入门教程', link: '/guide/start/1.introduction'},
                        { text: '进阶教程', link: '/guide/parallax-scroller/part-1'}
                    ]},
                    {
                        text: '其它', 
                        items: [
                            { text: 'API', link: 'http://b.aitrade.ga/pixi.js-cn' },
                            { text: '琐碎', link: '/pages/folder2/test4.md' },
                        ]
                    }
                ]
            },
            { text: '示例', link: '/pages/example/container.md' },
            // { text: '功能演示', link: '/pages/folder1/test3.md' },
            { text: 'Github', link: 'https://github.com/fxf111/pixijs' },
        ],
        sidebar: {
            '/pages/folder1/':[
                {
                    title: '测试菜单1',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['test1.md', '子菜单1'],
                        ['test3.md', '子菜单2']
                    ]
                },
                {
                    title: '测试菜单2',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['test2.md', '子菜单1']
                    ]
                }
            ],
            '/pages/example/': [
                {
                    title: '基础示例',
                    sidebarDepth: 4,    // 可选的, 默认值是 1
                    children: [
                        ['container.md', '容器'],
                        ['transparent-background.md', '透明背景'],
                        ['tinting.md', '着色'],
                    ]
                }
            ],
            // '/api/': [
            //     {
            //         title: 'PixiJS',
            //         sidebarDepth: 2,
            //         children: [
            //             ['PIXI.md', 'PIXI']
            //         ]
            //     }
            // ],
            '/guide/': [
                {
                    title: '起步',
                    sidebarDepth: 4,
                    children: [
                        ['start/1.introduction.md', '简介'],
                        ['start/2.setup.md', '安装'],
                        ['start/3.stage.md', '创建应用和stage（舞台）'],
                        ['start/4.sprite.md', 'sprites（精灵）'],
                        ['start/5.positioning-sprites.md', '定位精灵'],
                        ['start/6.size-and-scale.md', '大小和缩放'],
                        ['start/7.rotation.md', '旋转'],
                        ['start/8.make-sprite-from-a-tileset-sub-image.md', '使用雪碧图制作精灵'],
                        ['start/9.make-sprite-from-texture-atlas.md', '使用纹理贴图集制作精灵'],
                        ['start/10.moving-sprites.md', '移动精灵'],
                        ['start/11.game-states.md', '游戏状态'],
                        ['start/12.keyboard-movement.md', '键盘移动'],
                        ['start/13.grouping-sprites.md', '精灵分组'],
                        ['start/14.graphic-primitive.md', '图形绘制'],
                        ['start/15.collision-detection.md', '碰撞检测'],
                        ['start/16.case-study-treasure-hunter.md', '案例：寻宝猎人'],
                        ['start/17.sprite-more.md', '精灵的额外知识'],
                        ['start/18.taking-it-further.md', '进一步使用'],
                        ['start/19.support.md', '支持这个项目'],
                    ]
                },
                {
                    title: '进阶',
                    sidebarDepth: 2,
                    children: [
                        {
                            title: '制作视差滚动',
                            sidebarDepth: 2,
                            children: [
                                ['parallax-scroller/part-1.md', '第一部分'],
                                ['parallax-scroller/part-2.md', '第二部分'],
                                ['parallax-scroller/part-3.md', '第三部分'],
                                ['parallax-scroller/part-4.md', '第四部分']
                            ]
                        }, {
                            title: 'proclive.io PIXI教程',
                            sidebarDepth: 2,
                            children: [
                              ['proclive.io/shooting-tutorial.md', '旋转鼠标射击游戏'],
                              ['proclive.io/pixi-js-drag-drop.md',  '拖放教程'],
                              ['proclive.io/pixi-js-reverse-mask-tutorial.md',  '反面罩教程']
                            ]
                        }
                    ]
                }
            ]
        }
    }
}