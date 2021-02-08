> BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，规定了内部的元素如何布局，并且与这个区域外部毫不相干(既不会影响外部元素的布局，也不会受外部元素布局的影响)。

## 如何创建 BFC
1. 根元素(`<html>`)；
2. position为绝对定位(absolute、fixed)；
3. float值不为none；
4. overflow值不为visible；
5. display值不为inline、block。

## BFC 的布局规则
1. BFC是一个隔离的独立容器，其里边的元素布局与外边的元素布局互不影响；
2. 设置了BFC的元素不会与旁边的浮动元素重叠；
3. 计算BFC的高度时，浮动子元素也参与计算。

## BFC 的应用
1. 避免margin重叠

        <div>
            <p>top</p>
            <p>bottom</p>
        </div>
  
上边两个 p 会产生margin重叠，利用规则1`BFC是一个隔离的独立容器，其里边的元素布局与外边的元素布局互不影响；`，我们可以让其中一个 p 被BFC容器包裹，形成互不影响，从而消除margin重叠。

        <divbody>
            <p>top</p>
            <div style="overflow: hidden;">
                <p>bottom</p>
            </div>
        </div>

2. 自适应两栏布局

        <div>
            <div style="float: left;">LEFT</div>
            <div style="overflow: hidden;">RIGHT</div>
        </div>

利用规则2`设置了BFC的元素不会与旁边的浮动元素重叠；`，我们可以让一个元素浮动，另一个元素创建BFC，实现左侧固定，右侧宽度自适应的两栏布局。

3. 清除浮动
利用规则3`计算BFC的高度时，浮动元素也参与计算`，实质上可以理解为，给浮动元素的父元素设置BFC，即可消除子元素浮动对父元素造成的高度塌陷问题。

        <div style="overflow: hidden;">
            <div style="float: left;">浮动的子元素</div>
            <div>正常子元素</div>
        </div>