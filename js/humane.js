var chartDom = document.getElementById('chart');
var myChart = echarts.init(chartDom);
var option;

option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true },
    },
  },
  textStyle: {
    color: "#543927",
    fontSize: 16,
    fontFamily: "微軟正黑體",
  },
  legend: {
    data: ["狗", "貓", '狗人道處理率', '貓人道處理率'],
    textStyle: {
      color: "#543927",
      fontSize: 18,
      fontFamily: "微軟正黑體",
    },
  },
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        color: "#543927",
        fontSize: 16,
        fontFamily: "微軟正黑體",
        lineHeight: 36,
      },
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '人道處理數(隻)',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value}隻',
        color: "#543927",
        fontSize: 16,
        fontFamily: "微軟正黑體",
      }
    },
    {
      type: 'value',
      name: '人道處理率(%)',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ],
  series: [
    {
      name: '狗',
      type: 'bar',
      color: ["#f9b132"],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 隻";
        },
      },
      data: [150, 200, 180, 250, 210, 78, 99, 130, 122, 200, 211, 70]
    },
    {
      name: '貓',
      type: 'bar',
      color: ["#0cc0df"],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 隻";
        },
      },
      data: [80, 122, 56, 25, 100, 78, 60, 132, 76, 70, 21, 88]
    },
    {
      name: '狗人道處理率',
      type: 'line',
      color: ["#f9b132"],
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
      data: [60, 65, 70, 80, 80, 83, 85, 87, 91, 89, 93, 95]
    },
    {
      name: '貓人道處理率',
      type: 'line',
      color: ["#0cc0df"],
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
      data: [50, 53, 68, 80, 57, 64, 74, 80, 84, 97, 94, 96]
    }
  ]
};

option && myChart.setOption(option);