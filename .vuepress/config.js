module.exports = {
    title: "",
    base: "/",
    themeConfig: {
        repo: "novcy/blog",
        nav: [
            {text: "首页",link: "/"},
            {text: "文章",link: "/post/"},
            {text: "杂谈",link: "/record/"},
            {text: "关于",link: "/about"}
        ],
        sidebar: {
            "/post": [
                {
                    title: "React",
                    collapsable: true,
                    children: [
                        ['/post/react/',"react hooks"],
                    ]
                },
                {
                    title: "Vue",
                    collapsable: true,
                    children: [
                        ['/post/vue/','vue组件开发']
                    ]
                },
                {
                    title: "Typescript",
                    collapsable: true,
                    children: [
                        ['/post/typescript/','typescript基础（1）'],
                    ]
                },
                {
                    title: 'docker',
                    collapsable: false,
                    children: [
                        ['/post/docker/','docker入门']
                    ]
                }
            ]
        }
    }
}