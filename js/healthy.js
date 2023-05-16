let dogChart = echarts.init(document.getElementById("dogHealthy"));
let mDogNum = 200;
let fDogNum = 88;

dogChart.setOption({
  series: [
    {
      name: "犬",
      type: "pie",
      color: ["#f9b132", "#ffcf82"],
      label: {
        color: "#543927",
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "微軟正黑體",
      },
      radius: "80%",
      data: [
        { value: mDogNum, name: "健康" },
        { value: fDogNum, name: "不健康" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(249, 177, 50, 0.5)",
        },
      },
    },
  ],
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} ({d}%)",
    backgroundColor: "rgba(249, 177, 50, 0.5)",
    textStyle: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "微軟正黑體",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true },
    },
  },
});

let catChart = echarts.init(document.getElementById("catHealthy"));
let mCatNum = 259;
let fCatNum = 75;
catChart.setOption({
  series: [
    {
      name: "貓",
      type: "pie",
      color: ["#0cc0df", "#e7f2f1"],
      label: {
        color: "#543927",
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "微軟正黑體",
      },
      radius: "80%",
      data: [
        { value: mCatNum, name: "健康" },
        { value: fCatNum, name: "不健康" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(12, 192, 223, 0.5)",
        },
      },
    },
  ],
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} ({d}%)",
    backgroundColor: "rgba(12, 192, 223, 0.5)",
    textStyle: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "微軟正黑體",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true },
    },
  },
});
