### webpack

前端项目中往往需要加载很多静态文件，例如js、image等，由于二次请求的原因，会导致加载很慢以及包依赖严重。可以使用创建一个js，在js中导入相关的包，只有一次请求。

webpack是一个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。

#### 1.webpack的基本使用

webpack可以做什么事情？

+能够处理js之间的相互依赖关系

+能够处理js在不同浏览器的兼容问题

运行命令格式：webpack  要打包的文件路径 要输出的文件路径 

如果不想每次打包的时候都指定打包和输出的文件路径，可以创建webpack.config.js进行配置

```
const path = require('path')
//这个配置文件，起始就是一个js文件，通过Node中的模块操作，向外暴露了一个配置对象
module.exports = {
	entry:path.join(_dirname,"./main.js")//要打包的文件路径
	output:{//输出文件的相关的配置
		path.join(_dirname,"./dist")//指定打包的文件，输出到哪个目录
		filename:'bundle.js'//指定输出的文件的名称 
	}
}
```

当我们在控制台，直接输入webpack命令执行的时候，webpack做了一下几步：

1.发现并没有指定入口和出口，则直接根目录查询”webpack.config.js‘的配置文件

2.找到配置文件，就会去解析这个配置文件，得到配置对象

3.拿到配置对象，也就拿到了入口和出口。

#### 2.webpack-dev-server

作用：自动打包编译

安装：npm i webpack-dev-server -D把这个工具安装到项目的本地开发依赖

用法：和webpack命令用法一样

注意：由于是在项目中本地安装的，所以无法把它当做脚本命令在powershell中断中直接运行；（只有安装到全局 -g 的工具，才能正常执行）要在scripts中进行配置。webpack-dev-server如果想要正常运行 ，要求在本地项目中必须安装webpack。

webpack-dev-server帮我们打包生成的bundle.js文件，并没有放到实际的物理磁盘上，而是直接托管到了电脑的内存中，所以在项目的根目录中，根本找不到这个打包好的bundle.js；

可以认为，webpack-dev-server把打包好的文件，以一种虚拟的形式，托管到了项目中，虽然看不到，但是和dist src 平级，所以在引入bundle.js时，路径是根目录下的bundle.js

#### 3.配置处理css样式表

在main.js中用import导入

```
import "./css/index.css"
```

webpack默认只能打包处理JS类型的文件，无法处理其他的非JS类型的文件；

如果要处理非JS类型的文件，需要手动安装一些合适的第三方loader加载器；

如果想要打包处理css文件，需要:

1.安装 cnpm i style-loader  css-loader -D

2.打开webpack.config.js这个配置文件，在里面新增一个配置节点，叫做module的对象，有个rules数组属性，这个数组中存放了三方文件的匹配和处理规则；

```
module:{
	rules:[//所有第三方模块的匹配规则
		{test:/\.css$/,use:['style-loader','css-loader']}，//配置处理.css结尾文件的规则
	]
}
```

#### 4.配置处理url地址

limit给定的值是图片的大小，单位是byte，如果引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，如果小于给定的limit值，则会被转为base64格式的字符串。

```
module:{
	rules:[
		{test:/\.css$/,use:['style-loader','css-loader']}，

		//{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader'},//url-load可以传参数	
		{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=7631'}
]
}
```

防止图片重名(如两个不同文件夹下各有一个1.jpg)，会自动重命名，若不希望重命名则limit加上&name=[name].[ext]

```
{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=7631&name=[hash:8]-[name].[ext]'}
```

[hash:8]表示在原来名字前面加一个8位的哈希值，防止重名。