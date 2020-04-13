const PANEL_WIDTH = 300; //Panel 宽度rpx
const MARGIN_LEFT = -137; // Panel 左边距rpx
const DURATION = 300; //动画时间毫秒

Component({
  /**
   * Component properties
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: false
    },
    data: {
      type: Array,
      value: []
    }
  },
  /**
   * Component initial data
   */
  data: {
    panelQuantity: 0, // 当前显示panel的数量
    selectIndexes: [],
    transformStyle: 'translate3d(0, 0, 0)',
    panelAndChildIdx: []
  },

  observers: {
    'data': function(newData) {
      let panelQuantity = 0;
      newData.forEach((item) => {
        if (item && item.length) {
          panelQuantity++;
        }
      });
      this.setData({
        panelQuantity: panelQuantity
      });
      if (this.data.show) {
        this.computedStyle();
      }
    }
  },

  /**
   * Component methods
   */
  methods: {
    hide: function() {
      this.setData({
        transformStyle: 'translate3d(0, 0, 0)'
      });
      this.animateEnd(() => {
        this.setData({
          show: false
        });
        const selectIndexes = this.data.selectIndexes;
        const panelAndChildIdx = this.data.panelAndChildIdx;
        this.triggerEvent('hide', {
          selectIndexes,
          panelAndChildIdx
        })
      }) {
        selectIndexes: '选中的Drawer的子项的下标数组',
        panelAndChildIdx: '当前的Drawer下标对象'
      }
    },
    animateEnd: function(cb) {
      setTimeout(() => {
        cb();
      }, DURATION)
    },
    clickItem: function(e) {
      const dataset = e.currentTarget.dataset;
      const item = dataset.item;
      const panelAndChildIdx = dataset.panelAndChildIdx;
      let selectIndexes = this.data.selectIndexes;
      const data = this.data.data;

      const panelIndex = panelAndChildIdx[0];
      const panelChildIndex = panelAndChildIdx[1];

      let panelQuantity = this.data.panelQuantity;

      /**
       * 点击第一个Panel
       */
      if (panelIndex === 0) {
        selectIndexes = [];
      }

      selectIndexes[panelIndex] = {
        panelIndex,
        panelChildIndex
      }

      this.setData({
        selectIndexes: selectIndexes,
        panelAndChildIdx: panelAndChildIdx
      });

      this.triggerEvent('clickItem', {
        item,
        selectIndexes,
        panelAndChildIdx
      });

      /**
       * 点击最后一个Panel
       */
      if (panelIndex + 1 === data.length) {
        this.hide();
      }
    },
    computedStyle: function() {
      let allWidth = PANEL_WIDTH;
      const panelQuantity = this.data.panelQuantity;
      allWidth = allWidth * panelQuantity;

      if (panelQuantity <= 3) {
        allWidth = allWidth + MARGIN_LEFT * (panelQuantity - 1);
      } else {
        allWidth = allWidth + MARGIN_LEFT * (panelQuantity + (panelQuantity % 4));
      }

      const transformStyle = `translate3d(-${allWidth}rpx, 0, 0)`
      this.setData({
        transformStyle: transformStyle
      });
    }
  }
})