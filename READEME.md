# wx-drawer
小程序抽屉组件, 点击下载源代码可以查看例子

## 效果图
![效果图](https://s1.ax1x.com/2020/04/13/GjNTiV.gif)

## 引入
下载代码，直接按照小程序组件引入

json:
```json
{
  "usingComponents": {
    "drawer": "../../components/drawer/drawer"
  }
}
```

wxml:
```html
<drawer title="标题" show="{{show}}" data="{{data}}" bind:clickItem="clickItem" bind:hide="hide" />
```

## Props配置
| 参数    | 说明                                                          | 类型      | 可选值        | 默认值   |
|-------|-------------------------------------------------------------|---------|------------|-------|
| show  | 显示状态，是否可见                                                   | Boolean | true/false | false |
| data  | 渲染数据,必须提前确实二维数组里面的数组的个人;\[\[\],\[\],\[\]\],格式为\{text: 'a'\} | Array   | \-         | \[\]  |
| title | 标题                                                          | String  | \-         | ''    |


## 事件
| 事件名       | 说明               | 包含的参数                                                                                             |
|-----------|------------------|---------------------------------------------------------------------------------------------------|
| clickItem | 点击Drawer的子项触发该事件 | \{         selectIndexes: '选中的Drawer的子项的下标数组',         panelAndChildIdx: '当前的Drawer下标对象'       \} |
| hide      | Drawer隐藏触发该事件    | \{         selectIndexes: '选中的Drawer的子项的下标数组',         panelAndChildIdx: '当前的Drawer下标对象'       \} |
