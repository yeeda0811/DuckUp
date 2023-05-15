let acceptNumChart = echarts.init(document.getElementById("acceptNum"));
let DogNum = 233;
let CatNum = 175;

acceptNumChart.setOption({
  legend: {
    data: ["狗", "貓"],
    textStyle: {
      color: "#543927",
      fontSize: 18,
      fontFamily: "微軟正黑體",
    },
  },
  xAxis: [
    {
      type: "category",
      name: "月份",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        color: "#543927",
        fontSize: 16,
        fontFamily: "微軟正黑體",
        lineHeight: 36,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "收容隻數",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value}隻",
        color: "#543927",
        fontSize: 16,
        fontFamily: "微軟正黑體",
      },
    },
  ],
  series: [
    {
      name: "狗",
      type: "bar",
      color: ["#f9b132"],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 隻";
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: "貓",
      type: "bar",
      color: ["#0cc0df"],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 隻";
        },
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
  ],
  tooltip: {
    trigger: "axis",
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
});
