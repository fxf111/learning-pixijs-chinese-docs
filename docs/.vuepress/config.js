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
                text: '学习',
                ariaLabel: '学习',
                items: [
                    { text: 'API', link: '/api/PIXI' },
                    { text: '琐碎', link: '/pages/folder2/test4.md' },
                ]
            },
            { text: '功能演示', link: '/pages/folder1/test3.md' },
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
            '/api/': [
                {
                    title: 'PixiJS',
                    sidebarDepth: 2,
                    children: [
                        ['PIXI.md', 'PIXI']
                    ]
                }
            ],
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
                    ]
                }
            ]
        }
    }
}