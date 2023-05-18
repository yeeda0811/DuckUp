const baseURL =
  "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&";

function getPetNum(year, month, country) {
  return axios.get(
    `${baseURL}rpt_year=${year}&rpt_month=${month}&rpt_country_code=${country}`
  );
}

Promise.all([
  getPetNum(107, 1, "City000003"),
  getPetNum(107, 2, "City000003"),
  getPetNum(107, 3, "City000003"),
  getPetNum(107, 4, "City000003"),
  getPetNum(107, 5, "City000003"),
  getPetNum(107, 6, "City000003"),
  getPetNum(107, 7, "City000003"),
  getPetNum(107, 8, "City000003"),
  getPetNum(107, 9, "City000003"),
  getPetNum(107, 10, "City000003"),
  getPetNum(107, 11, "City000003"),
  getPetNum(107, 12, "City000003"),
]).then((res) => {
  const petNum = [];
  res.forEach((element) => {
    petNum.push(element.data[0].dead_num);
  });
  printActChart(petNum);
});

function printActChart(petNum) {
  let deadNumChart = echarts.init(document.getElementById("deadNum"));

  deadNumChart.setOption({
    legend: {
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
        max: 1000,
        interval: 100,
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
        type: "bar",
        color: ["#543927"],
        tooltip: {
          valueFormatter: function (value) {
            return value + " 隻";
          },
        },
        data: petNum,
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
}

// var option = echarts.init(document.getElementById("deadNum"));

// option.setOption({
//   tooltip: {
//     trigger: "axis",
//   },
//   toolbox: {
//     orient: "vertical",
//     feature: {
//       magicType: { show: true, type: ["line", "bar"] },
//       saveAsImage: { show: true },
//     },
//   },
//   legend: {
//     data: ["狗", "貓"],
//     textStyle: {
//       color: "#543927",
//       fontSize: 18,
//       fontFamily: "微軟正黑體",
//     },
//   },
//   xAxis: [
//     {
//       type: "category",
//       name: "月份",
//       data: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//       axisPointer: {
//         type: "shadow",
//       },
//       axisLabel: {
//         color: "#543927",
//         fontSize: 16,
//         fontFamily: "微軟正黑體",
//         lineHeight: 36,
//       },
//     },
//   ],
//   yAxis: [
//     {
//       type: "value",
//       name: "所內死亡數",
//       axisLabel: {
//         formatter: "{value} 隻",
//         color: "#543927",
//         fontSize: 16,
//         fontFamily: "微軟正黑體",
//       },
//     },
//   ],
//   series: [
//     {
//       name: "狗",
//       type: "bar",
//       color: ["#f9b132"],
//       tooltip: {
//         valueFormatter: function (value) {
//           return value + " 隻";
//         },
//       },
//       data: [
//         2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
//       ],
//     },
//     {
//       name: "貓",
//       type: "bar",
//       color: ["#0cc0df"],
//       tooltip: {
//         valueFormatter: function (value) {
//           return value + " 隻";
//         },
//       },
//       data: [
//         2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
//       ],
//     },
//   ],
//   textStyle: {
//     color: "#543927",
//     fontSize: 16,
//     fontFamily: "微軟正黑體",
//   },
// });
