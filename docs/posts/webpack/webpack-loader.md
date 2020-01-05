## 前言
这篇文章假设你已经用过的webpack,并对webpack的loader有一个基本的了解，如果对webpack不了解，建议从[官方文档](https://www.webpackjs.com/)开始。

接下来从三个方面来讲讲loader:
- 什么是webpack loader
- webpack loader开发的原则
- webpack loader开发实践

## loader介绍
webpack loader只是一个导出为函数的 JavaScript 模块。loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。然后，把返回处理结果应该是 String 或者 Buffer（被转换为一个 string）。另外还可以传递一个可选的 SourceMap 结果（格式为 JSON 对象）。

loader的调用顺序是从倒序的。比如：我们处理less文件的时候，我们会这样写：
```javascrip
module: {
  rules: [
   {test: /.less$/, use:['style-loader', 'css-loader', 'style-loader']}
 ]
}
```
会先调用less-loader将less文件转化为css，再调用css-loader处理css代码，最后再调用style-loader将css处理为style样式。

## loader开发的规范
- 单一职责
  一个loader只处理单一任务，避免多任务耦合。
- 链式
- 模块化
- 无状态
- 工具库
- 模块依赖
- loader依赖
- 共用模块
-  绝对路径
- 同等依赖

## loader开发实践[本地开发loader](https://github.com/cuzvin/learn-webpack-loader)
本地开发loader为避免修改需要重复发布loader到npm，可以有两种方式：
- 使用npm link方式
- 使用webpack的提供的方法

1. resolveLoader方法
因为webpack的使用的loader默认使用的`node_modules`里面的文件，所以提供`resolveLoader`方法，可以引用其他文件，比如：
```javascript
resolveLoader: {
    modules: [path.resolve(__dirname, 'loader/**'), 'node_modules']
}
```
2. 使用路径追踪到本地loader所在的地址
   
   比如：我在本地根路径下新建文件`loaders/my-loader.js`
   ```javascript
   module: {
       rules: [
           {test: /\.js$/, loader: path.resolve(__dirname,'loaders/my-loader.js')}
       ]
   }
   ```