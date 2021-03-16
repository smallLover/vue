### vue基础

#### 1.模板语法

##### 1.1 插值

文本：直接使用{{}}插值

原始HTML：v-html

属性：v-bind绑定属性,缩写为:

##### 1.2 指令

v-bind：参数，例如：

```
<a v-bind:href="url">...</a>
```

href为参数，表示href应该与表达式url绑定

动态绑定属性：v-bind[属性]，例如v-bind[focus]等价于v-bind:focus

#### 2.计算属性和侦听器

通过计算生成的属性，虽然在用的时候直接调用方法也能达到这个效果。但是计算属性的优势在于计算属性是基于它们的响应式依赖进行缓存的，只有依赖的值发生改变时才会重新进行求值，而函数则是每次都是进行计算。

侦听器:通过监听某个属性的值是否发生变化而执行某个方法

```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

#### 3. class与style的绑定

v-bind：class进行class的绑定，考虑到在设置dom元素样式的时候要频繁的切换class,在vue中，可以使用如下模板：

```
 v-bind:class="{ active: isActive, 'text-danger': hasError }"
 data: {
  isActive: true,
  hasError: false
}
```

前面是要绑定的class的名称,后面的值决定是不是要添加到class属性中。上述代码的渲染结果为：

```
<div class="static active"></div>
```

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

也可以给class绑定一个对象，在对象中定义要绑定的class名称

```
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

当在一个自定义组件上使用 `class` property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。

```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
<my-component class="baz boo"></my-component>
```

HTML将被渲染为：

```
<p class="foo bar baz boo">Hi</p>
```

绑定样式也可以像绑定class一样

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

#### 4.事件处理

v-on进行事件的监听，缩写@

事件修饰符：

```
<!-- 阻止单击事件继续传播,阻止事件冒泡，不向上传播 -->
<a v-on:click.stop="doThis"></a>

<!--.prevent 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

