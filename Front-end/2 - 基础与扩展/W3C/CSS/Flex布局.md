# Flex布局
> 以下内容主要参考 [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。
仅供自己参考查阅使用。

## 1. 什么是Flex布局
> Flex布局（Flexible Box，弹性布局），用来为盒模型提供最大的灵活性。

* 任何容器都可以指定为 Flex 布局，包括行内元素(inline-flex)。

![flex.png](https://i.loli.net/2019/06/16/5d05b6d75c3bf17731.png)

* 设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

## 2. 基本概念
- **容器：** 指定为flex布局的元素。
- **项目：** **容器**的直接子元素(孙子元素不是直接子元素)。
- **主轴：** **项目**排列的方向。
- **交叉轴：** 与**主轴**垂直的方向。

## 3. 容器属性

### 1). flex-direction：规定主轴的方向，即项目的排列方向。

`flex-direction: column-reverse | column | row | row-reverse;` 

![flex-direction.png](https://i.loli.net/2019/06/18/5d0835f7e689a17376.png)

### 2). flex-wrap：规定主轴上项目的换行方式。

`flex-wrap: nowrap(不换行) | wrap(换行，第一行在下方) | wrap-reverse(换行，第一行在上方);`

### 3). flex-flow：flex-direction和flex-wrap的简写，默认为row nowrap。

### 4). justify-content：主轴上的对齐方式。
`justify-content: flex-start | flex-end | center | space-between | space-around;`

![justify-content.png](https://i.loli.net/2019/06/18/5d083820548ac86028.png)

### 5). align-items：交叉轴上的对齐方式。
`align-items: flex-start | flex-end | center | baseline | stretch;`

![align-items.png](https://i.loli.net/2019/06/18/5d08389bc492477095.png)

### 6). align-content：多根主轴时，它们在交叉轴上的对齐方式。若只有一根主轴，该属性无效。
`align-content: flex-start | flex-end | center | space-between | space-around | stretch;`

![align-content.png](https://i.loli.net/2019/06/18/5d0839aaa0ae556400.png)

## 4. 项目属性
### 1). order：项目的排列顺序。数值越小，排列越靠前，默认为0。
`order: <integer>;`

![屏幕快照 2019-06-18 上午9.13.57.png](https://i.loli.net/2019/06/18/5d083aedd8d4515581.png)

### 2). flex-grow：项目的放大比例，默认为0，即存在剩余空间也不放大。
`flex-grow: <number>; /* default 0 */`

![flex-grow.png](https://i.loli.net/2019/06/18/5d083b785e8b926074.png)
均为1时，等分剩余空间；一个为2其它为1，则前者等分的大小是后者的2倍。

### 3). flex-shrink：项目的缩小比例，默认为1，即空间不足时将缩小。
`flex-shrink: <number>; /* default 1 */`

![flex-shrink.jpg](https://i.loli.net/2019/06/18/5d083c698797265542.jpg)
数值越大，缩小比例越大，为0时不缩小。

### 4). flex-basis：分配多余空间之前，项目占据主轴大小。默认值为auto，即项目本来的大小。(flex利用该属性计算是否存在剩余空间)
`flex-basis: <length> | auto;`

设为固定值(如100px)时，项目占据固定空间。

### 5). flex：是flex-grow、flex-shrink、flex-basis的简写，默认值`0 1 auto`，即不可自动放大、可自动缩小、默认占据本来大小。
三个快捷值：
* `flex: auto;`，表示`1 1 auto`，即可自动放大、可自动缩小、默认占据本来大小。当旁边元素未设置flex时(取默认值0 1 auto)，会被挤压。
* `flex: none;`，表示`0 0 auto`，即不可自动放大、不可自动缩小、默认占据本来大小。
* `flex: 1;`，表示`0 0 0%`，即可自动放大、可自动缩小、默认不占据空间。不会挤压旁边元素，适合做等分、自适应。

### 6). align-self：指定该项目在交叉轴的对齐方式，可覆盖容器的`align-item`设置。默认auto，表示继承容器的设置。
`align-self: auto | flex-start | flex-end | center | baseline | stretch;`


# Flex实战示例
> 场景一：行数不定列数固定(父容器宽度固定)，采用space-between或space-around排布，最后一行元素个数不够时无法局左排布。

    // 解决方法1：利用伪元素after或before设置父元素
    .father:after{
        content:"";
        display:block;
    }
    // 通常由于父元素设置space-between后会覆盖子元素的一部分margin值，可调整margin值使子元素间隔一致
    .son {
        margin: xx;
    }

    // 解决方法2：给最后一个子元素设置margin-right
    .son:last-child {
        margin-right: auto;
    }

> 场景二：实现左右宽度固定、中间宽度自适应的散列布局

    <div class="wrapper" style="height: 200px;background: #ccc;">
      <div class="left" style="height: 100%;width: 300px;background: cadetblue;">这是左栏</div>
      <div class="center" style="height: 100%;background: chocolate;">
        这是中栏，且自适应宽度。这是中栏，且自适应宽度。这是中栏，且自适应宽度。
      </div>
      <div class="right" style="height: 100%;width: 300px;background: cadetblue;">这是右栏</div>
    </div>

    <!-- 方法一：flex，使用快捷值auto -->
    .wrapper {
      display: flex;
    }
    .center {
      flex: auto; /* 相当于 1 1 auto */
    }
    /* flex布局 子元素(项目)默认flex: 0 1 auto; 1表示可缩小，
    所以希望项目宽度固定时，设置width属性无效，需设置flex属性 */
    .left, .right {
      flex: 0 0 300px;
    }

    <!-- 方法二：flex，使用快捷值1 -->
    .wrapper {
      display: flex;
    }
    .center {
      flex: 1; /* 相当于 1 1 0% */
    }
    /* flex布局 flex:1 center默认不占据宽度，所以不会挤压left、right的width，
    此时width属性有效效，不需为left、right设置flex属性 */
    .left, .right {
      
    }

    <!-- 方法三：float：此时html标签顺序应该为 left、right、center，
      因为浮动是在当前位置的水平方向浮动，若center在right前边，将会把right挤到下边一行 -->
    .left {
      float: left;
    }
    .right {
      float: right;
    }

    <!-- 方法四：利用 CSS3 的calc函数 -->
    .wrapper {
      /* inline元素换行导致的间隙，可通过父级字体设为0解决 */
      font-size: 0;
    }
    .left, .right, .center {
      display: inline-block;
      font-size: 14px;
    }
    .left, .right {
      vertical-align: bottom;
    }
    .center {
      width: calc(100% - 600px);
    }

    <!-- 方法五：绝对定位 -->
    .wrapper {
      position: relative;
    }
    .left {
      position: absolute;
      left: 0;
    }
    .right {
      position: absolute;
      right: 0;
    }
    .center {
      position: absolute;
      left: 300px;
      right: 300px;
    }

    <!-- 方法六：table布局 -->
    .wrapper {
      display: table;
    }
    .left, .right, .center {
      dispaly: table-cell;
    }
    .left, .right {
      width: 300px;
    }

    <!-- 方法七：grid 布局：此时无需设置单个元素的宽高 -->
    .wrapper {
      display: grid;
      width: 100%;
      grid-template-rows: 200px;
      grid-template-columns: 300px auto 300px;
    }