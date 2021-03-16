### ES6新语法

#### 1. let、const关键字以及展开收集运算符

var声明的变量只有全局作用域和函数作用域，也就是只有在函数内部声明的变量才是局部变量，其他变量都是全局变量，let关键字使得变量具有块级作用域，即{}包裹的区域内有效。

const关键字类似于java中的final，声明一个常量，不可再次进行赋值。

值得注意的是：const只是表明不能再次进行赋值，并不是不可变。将一个对象或者数组作为const，它的内容仍然是可以修改的。

```
const MY_OBJECT = {'key': 'value'};
```

如下会报错：

```
MY_OBJECT = {'OTHER_KEY': 'value'};
```

下面这个声明会成功执行

```
MY_OBJECT.key = 'otherValue'
```

数组也类似：

```
const MY_ARRAY = [];
// 可以向数组填充数据
MY_ARRAY.push('A'); // ["A"]
```

...就是展开收集运算符,用在数组前面表示把数组展开为各个独立的值

```
var a = [2,3,4]
var b = [1,...a,5]  //[1,2,3,4,5]
```

...也可以表示把剩下的值收集到一个数组中

```
function foo(x,y,...z) {
	console.log(x,y,z)
}
foo(1,2,3,4,5)   // 1 2 [3,4,5]
```



#### 2. 解构

可以理解为一个结构化的赋值方法

解构数组中的值：

```
const input = [1, 2];
const [first, second] = input;
console.log(first)//1
```

在此示例中，方括号`[ ]`表示被解构的数组，`first`、`second` 表示要将数组中的值存储在其中的变量。注意，你不需要指定要从中提取值的索引，因为索引可以暗示出来。

解构对象中的值：

```js
const o = {
  a: 'foo',
  b: 30,
  c: "Johnson"
};
const {a, b, c} = o;
```

也可以进行重命名

```
let { a: x, b: y, c: z } = o
console.log(x)//'foo'
```

这里的语法令人困惑，这里的冒号不是接口指示类型的，等价于：

```
let x = o.a;
let y = o.b;
```

如果想指定它的类型，仍然需要写上完整的模式：

```
let {a, b}: {a: string, b: number} = o;
```

#### 2.1 赋值

1）重复赋值

```
var {a:x,a:y} = {a:1}
x;//1
y;//1
```

2) 左边参数比右边少

数组：

```
var array = [1,2,3]
var[,b] = array;
var[a] = array;
console.log(a,b)  //1,2
```

对象：

```
 const o = {
            a: 'foo',
            b: 30,
            c: "Johnson"
        };
 let { a,c } = o
 console(a,c)   //'foo' 'Johnson'
```

对象中都是一一对应关系

3） 左边参数比右边多

```
var[，，,b] = array;
let { a,d } = o
console,log(b,d)  //undifined undifined
```

使用收集符

```
var a = [2,3,4]
var [b,...c] = a
console.log(b,c)// 2 [3,4]
```

4) 默认值赋值

```
 const o = {
            a: 'foo',
            b: 30,
            c: "Johnson"
        };
 let { a=3,c=4,d=5 } = o
 console.log(a,c,d) //'foo' "Johnson" 5 
```

