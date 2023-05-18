// let findPlace = echarts.init(document.getElementById("findPlace"));
// let DogNum = 300;
// let CatNum = 250;

// findPlace.setOption({
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
//         "一",
//         "二",
//         "三",
//         "四",
//         "五",
//         "六",
//         "七",
//         "八",
//         "九",
//         "十",
//         "十一",
//         "十二",
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
//       name: "尋獲隻數",
//       min: 0,
//       max: 400,
//       interval: 50,
//       axisLabel: {
//         formatter: "{value}隻",
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
//         20, 49, 70, 232, 256, 77, 136, 162, 326, 200, 64, 33,
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
//         26, 59, 90, 24, 87, 77, 156, 122, 387, 188, 60, 23,
//       ],
//     },
//   ],
//   tooltip: {
//     trigger: "axis",
//   },
//   toolbox: {
//     feature: {
//       saveAsImage: { show: true },
//     },
//   },
//   textStyle: {
//     color: "#543927",
//     fontSize: 16,
//     fontFamily: "微軟正黑體",
//   },
// });
function select() {
  var selected = document.getElementsByName("dropdownMenu2").value;
  console.log(selected);
  console.log("selected");
};
// $(document).ready(function () {
//   $("button").click(fuction(){
//     alert($(this).html());
//   $(this).hide();
//   $("p").hide();
// });
// });


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
    petNum.push(element.data[0].accept_num);
  });
  printActChart(petNum);
});


function printActChart(petNum) {
  let acceptNumChart = echarts.init(document.getElementById("findPlace"));

  acceptNumChart.setOption({
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
        name: "尋獲地點",
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
