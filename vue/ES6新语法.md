## ES6新语法

### 1. let、const关键字以及展开收集运算符

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



### 2. 解构

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

#### 2.2 解构参数

实参与形参的配对也是赋值，所以也是可以解构的

```
funvtion foo([x,y]) {
	console.log(x,y)
}
foo([1])  //1 undifined
```

```
function f6({x=10}={},{y} = {y:10}){
	console.log(x,y)
}
f6()	//10 10
F6({},{})  //10 undefined
```



```
{x=10}={},{y} = {y:10}
```

区别x的值默认是10，若传入参数了，则使用参数值作为x的值。f6()没有传参，所以使用默认值x=10。y没有默认值，参数的默认值是10，如传入了参数，则y的值为参数的值，所以第二个是undifined.

总结：x是对变量赋予默认值 y 是对参数赋予默认值。

### 3.箭头函数

在说明箭头函数作用之前，首先了解this指向问题。

#### 3.1 Javascript中的this详解

```

var obj = {
  foo: function () { console.log(this.bar) },
  bar: 1
};

var foo = obj.foo;
var bar = 2;

obj.foo() // 1
foo() // 2
```

​	这种差异的原因，就在于函数体内部使用了`this`关键字。this指的是函数运行时所在的环境(也可以理解为调用者)。对于`obj.foo()`来说，`foo`运行在obj环境，所以`this`指向`obj`；对于`foo()`来说，foo运行在全局环境，所以this`指向全局环境。所以，两者的运行结果不一样。

内存的数据结构：

```
var obj = { foo:  5 };
```

首先在内幕才能生成一个对象`{ foo:5 }`，然后把地址给变量obj,**`foo`**属性的值保存在属性描述对象的`value`属性里面。

当属性的值是一个函数时，引擎会将函数单独保存在内存中，然后将函数的地址赋给`foo`属性的`value`属性。函数是一个单独的值，所以可以在不同的环境中执行。JavaScript 允许在函数体内部，引用当前环境的其他变量。如:

```
var f = function () {
  console.log(x);
};
```

函数体里面使用了变量`x`。该变量由运行环境提供。所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，`this`就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。

#### 3.2 函数的三种调用模式

**1）函数模式**

定义的函数，如果单独调用，不与任何对象关联。函数模式this指向window

```
function fn(num1, num2) {
    console.log(this); 
}
// 直接在全局调用
fn();// window

// 在某个函数内部调用
!function(){
    fn(); // window
}()
```

**2）方法模式**

定义的函数, 如果将函数作为一个对象的成员，那么利用对象调用它就是方法模式

```
var obj = {
    say: function() {
        console.log(this);
    }
};
// 直接在全局调用
obj.say(); // obj

// 在某个函数内部调用
!function(){
    obj.say(); // obj
}()
```

**3) 构造器模式**

定义的函数, 使用 new 来调用创建对象就是构造器模式。

构造器模式this指向new创建的实例对象

#### 3.2 箭头函数

箭头函数 与 普通函数 其他的区别

1、箭头函数没有自己的this。箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值。通常来说，箭头函数内部的this就是外层代码块的this。

2、箭头函数 this 不可变。call()、apply()、bind()、这些方法也 无法改变 箭头函数 this 的指向。

3、箭头函数 不能用 new 关键字来实例化对象，不然会报错。

4、箭头函数没有arguments对象。

例子：

```
window.name='window';
var obj = {
    name:'obj',
    show_name: function (){
        console.log(this.name);
    }    
}
obj.show_name();
```

`show_name()`的调用者是obj，所以this指向obj对象

```
window.name='window';
var obj = {
    name:'obj',
    show_name:() =>{
        console.log(this.name);
    }    
}
obj.show_name(); //window
```

`这里show_name()`方法没有自己的this，可以"理解为obj内部都没有自己的this"(其他元素跟show_name平级)，也就是说obj内部没有自己的this,obj的上下文就是window，所以指向window

```
window.name = 'window';
var obj = {
    name:'obj',
    show_name:function (){
        function fn (){
            console.log(this.name);
        }
        fn();
    },
}
obj.show_name(); //window
```

这里fn()调用的上下文是window，所以结果为window

```
window.name = 'window';
var obj = {
    name:'obj',
    show_name:function (){
        var fn = () => {
            console.log(this.name);
        }
        fn();
    },
}
obj.show_name(); //obj
```

### 4.模块

#### 4.1 export

没有用export标式的一切都在模块的作用域内私有，也就是java中的protect,用export标示的就是public。

导出的两种形式：

1）放在声明前面（与java中的public用法一样）

```
export function foo(){
}
export var aw = 42
export {1,2,3}
```

2) 命名导出:先声明在导出

```
var a = 42
var bar = [1,2,3]
export {a,bar}
```

注意：导出本质上是导出的变量本身的引用或者指针，所以导出的是最终的值，不管是在哪个地方导出的。

default：用default标示的是导出的是当时的值，而不是最终的值，就是export default 声明的变量或者表达式是什么样，导出的就是什么样，即使后面发生变化。因为此时导出的是**当时的表达式**，而不是地址的引用。

### 5. 类

#### 5.1 原型

**1）铁三角**

```
function Person() {};
var p = new Person();
```

![preview](https://segmentfault.com/img/bVX0J2?w=764&h=336/view)

实例对象的原型对象`_proto_`与构造函数的原型属性均指向原型，原型中有一个属性`constructor`指向对应的构造函数。

原型链：`p --> Person.prototype`

**2）原型的原型对象**

原型也是对象，因此也有原型对象，指向`Object.__proto__`

![preview](https://segmentfault.com/img/bVX0J8?w=1612&h=362/view)

**3）构造函数的原型**

构造函数Person作为实例对象时，`Person = new Function()`隐式调用，因此`Person --> Function.prototype`

由于Function.prototype也是对象，`Function.prototype = new Object()`隐式调用，因此`Function.prototype --> Object.prototyp`

![preview](https://segmentfault.com/img/bVX0Ka?w=1604&h=612/view)

**4）完成的原型链**

![preview](https://segmentfault.com/img/bVX0Kj?w=1600&h=872/view)

几个结论：
（1）对象都有原型对象，对象默认继承自其原型对象
（2）所有的函数都是 Function 的实例
（3）所有的原型链尾端都会指向`Object.prototype`

**5）原型链的改写**

当实例对象被创建时，其原型链就已经确定了，当其对应的原型属性指向改变时，也无法改变原型链

```
function Person({name="小A", age=21}={}) {
  this.name = name;
  this.age = age;
};

// 情况1：在修改原型属性前实例化对象
var p1 = new Person();

// 重写原型对象
Person.prototype = {
  sayName: function() {
    console.log(this.name);
  }
}

// 情况2：在修改原型属性后实例化对象
var p2 = new Person();

p2.sayName(); // "小A"
p1.sayName(); // p1.sayName is not a function
```

![preview](https://segmentfault.com/img/bVX050?w=1618&h=592/view)

**instanceof操作符**

 A instanceof B来说，它的判断规则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。不理解没关系

#### 5.2 类

类构造函数中的属性是实例特有，其余是所有实例共有的，相当于挂载在prototype上。

使用类与使用function实现一个类有几点不同：

1.类如果没有new，则无法调用类构造函数

2.类方法是不可枚举的（hasOwnProperty方法：可以通过hasOwnProperty()方法进行判断属性是否是实例属性，也就是说class的hasOwnProperty为false）

3.类总是使用严格模式的

### ****s6类class的关键super、static、constructor、new.target****

1、super关键字
super用在调用的时候有两种情况：
第一种：super作为函数调用时，代表父类的构造函数
第二种：super作为对象时，在普通方法中，指向父类的**原型对象**；在**静态方法**中，指向父类。

如果子类调用constructor，那么子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象

2、static关键字
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为静态方法
静态方法调用直接在类上进行，而在类的实例上不可被调用

3、new.target关键字
new.target属性允许你检测函数或构造方法是否通过是通过new运算符被调用的。在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined。