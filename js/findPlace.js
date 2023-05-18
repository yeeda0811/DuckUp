let findPlace = echarts.init(document.getElementById("findPlace"));
let DogNum = 300;
let CatNum = 250;

findPlace.setOption({
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
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
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
      name: "尋獲隻數",
      min: 0,
      max: 400,
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
        20, 49, 70, 232, 256, 77, 136, 162, 326, 200, 64, 33,
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
        26, 59, 90, 24, 87, 77, 156, 122, 387, 188, 60, 23,
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
function select(){
	var selected = document.getElementById("dropdownMenu2").value;
	console.log(selected);
	console.log("selected");
}