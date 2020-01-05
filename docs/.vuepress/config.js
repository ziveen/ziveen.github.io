module.exports = {
    title: "孜文",
    descrition: "点滴前端",
    theme: 'vuepress-theme-blog-enhance',
    themeConfig: {
        nav: [
            {text: "主页", link: "/"}
        ],
        footer:{
            contact: [
                {type: "github",link: "https://github.com/natto605"}
            ]
        },
        directories: [
            {
                id: "post",
                dirname: "posts",
                path: "/",
                itemLayout: "Post",
                itemPermalink: '/:year/:month/:day/:slug',
                pagination: {
                    lengthPerPage: 8,
                },
            }
        ]
    }
}