import {
  provinceList,
  cityList,
  areaList
} from '../../data/area.js'

Page({
  data: {
    data: [
      [],
      [],
      []
    ],
    show: false
  },
  onLoad: function() {

  },
  show: function() {
    this.data.data[0] = provinceList;
    this.setData({
      show: true
    })
    setTimeout(() => {
      this.setData({
        data: this.data.data
      })
    }, 300)
  },
  clickItem: function(e) {
    const data = this.data.data;
    const item = e.detail.item;
    const panelAndChildIdx = e.detail.panelAndChildIdx;
    const panelIndex = panelAndChildIdx[0];
    const panelChildIndex = panelAndChildIdx[1];

    if (panelAndChildIdx[0] === 0) {
      // procince change, get city data
      data[panelIndex + 1] = cityList[item.value]
      data[2] = []
    } else if (panelIndex + 1 < data.length) {
      // city change, get area data
      data[panelIndex + 1] = areaList[item.value]
    }
    this.setData({
      data: data
    });
  },
  hide: function(e) {
    console.log(e);
    const selectIndexes = e.detail.selectIndexes;

    const arr = selectIndexes.map((item, index) => {
      return this.data.data[item.panelIndex][item.panelChildIndex];
    })
    console.log(arr)
    wx.showToast({
      title: JSON.stringify(arr),
      icon: 'none'
    })
    this.setData({
      show: false
    })
  }
})