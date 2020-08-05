1. 什么是插槽       
    可以类比电源插排，预先留有插口，符合规格的插头可以插入插口。

        // 子组件 Child
        <div>
            <slot>我是个默认插口</slot>
        </div>

        // 父组件
        <Child>
            <p>我是个p标签插头，可以插入默认插口</p>
        </Child>

2. 具名插槽     
   默认插口，只能有一个，当需要预留多个插口时，需要给每个插口取个名字（name），这就确定了规格。而每个插头需要用`v-slot`来实现匹配规格。

        // 子组件 Child
        <div>
            <slot name="first">
                我是第一个插口
            </slot>
            <slot>
                我是默认插口
            </slot>
            <slot name="last">
                我是最后一个插口
            </slot>
        </div>

        // 父组件
        <Child>
            <template v-slot:first>     // v-slot:first 可简写成 #first
                <p>我是个p标签，我要插入第一个插口中</p>
            </template>

            <a>我是个a标签，我要插入默认插口中</a>

            <template v-slot:last>
                <div>我是个div标签，我要插入最后一个插口中</p>
            </template>
        </Child>

3. 作用域插槽       
   适用场景：一个组件，想要实现大部分逻辑共用，只有部分数据模板的展示有区别。     
   此时存在一个问题，例如有一个列表组件，代码如下：

        // 列表组件 my-list
        <div>
            <h3 class="title">{{title}}</h3>
            <div class="list">
                <div v-for="item in items">
                    <!-- 列表项 start -->
                    // 此处会用到数据`item`
                    <!-- 列表项 end -->
                </div>
            </div>
        </div>

    `my-list`的循环逻辑在组件内，且列表项数据`item`也是组件内的数据。如果要差异化展示列表项，我们很容易想到利用插槽，将列表模板从父组件中传递进来，但父组件列表模板中如何使用子组件列表项数据`item`呢？其实，这就是作用域插槽要解决的问题。       

    要实现作用域插槽，我们需要将`my-list`进行如下改写：

        // 作用域插槽列表组件 my-list
        <div>
            <h3 class="title">{{title}}</h3>
            <div class="list">
                <div v-for="item in items">
                    <!-- 列表项 start -->
                    // 绑定到插槽上的属性称为`插槽prop`
                    <slot v-bind:item="item">
                        // 若无模板传入时，此处内容为默认展示模板
                        <span>{{item}}</span>
                    </slot>
                    <!-- 列表项 end -->
                </div>
            </div>
        </div>

    通过在插槽上绑定`插槽prop`，可以将列表组件插槽中所需要的数据暴露给父组件，以便组装列表项模板。

    父组件中调用：

        <div>
            <my-list :title="title" :items="students">
                // 通过template组装插槽模板，通过v-slot接收所有`插槽prop`
                <template v-slot="slotProps">
                    <span>{{slotProps.item.name}}</span>
                    <span>{{slotProps.item.age}}</span>
                </template>
            </my-list>
        </div>

    列表组件中定义好了插槽以及插槽prop，父组件就可以组装待插入的列表项模板了，包括两个关键：1. 通过`template`组装插槽模板，2. 通过`v-slot`定义的变量，接收所有`插槽prop`，以便在插槽模板中使用子组件中的数据。

    综上，什么是作用域插槽？
    > 为了实现子组件中部分模板的差异化展示，子组件通过`插槽prop`将差异部分所需数据暴露给父组件，父组件通过`v-slot`接收暴露出来的数据，并通过`template`组装差异模板，最终实现父组件控制子组件中部分模板的差异化展示。