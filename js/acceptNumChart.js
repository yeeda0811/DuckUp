const baseURL =
  "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&";

//抓html裡面的年份跟縣市，做縣市和代碼對照表，把參數傳進getPetNum()，傳進Promise.all()
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
  let acceptNumChart = echarts.init(document.getElementById("acceptNum"));

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
