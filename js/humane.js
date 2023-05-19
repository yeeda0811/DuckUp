const humaneChart = () => {
  //get HTML value
  const year = document.getElementById("year").innerHTML.substring(0, 3);
  const city = document.getElementById("city").innerHTML;
  const citycode = new Map([
    ["臺北市", "City000002"],
    ["新北市", "City000003"],
    ["基隆市", "City000004"],
    ["宜蘭縣", "City000005"],
    ["桃園市", "City000006"],
    ["新竹縣", "City000007"],
    ["新竹市", "City000008"],
    ["苗栗縣", "City000009"],
    ["臺中市", "City000010"],
    ["彰化縣", "City000011"],
    ["南投縣", "City000012"],
    ["雲林縣", "City000013"],
    ["嘉義縣", "City000014"],
    ["嘉義市", "City000015"],
    ["臺南市", "City000016"],
    ["高雄市", "City000017"],
    ["屏東縣", "City000018"],
    ["花蓮縣", "City000019"],
    ["臺東縣", "City000020"],
    ["澎湖縣", "City000021"],
    ["金門縣", "City000022"],
    ["連江縣", "City000023"],
  ]);

  //connect to API
  const baseURL =
    "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&";

  function gethumaneNum(year, month, city) {
    return axios.get(
      `${baseURL}rpt_year=${year}&rpt_month=${month}&rpt_country_code=${city}`
    );
  }

  Promise.all([
    gethumaneNum(year, 1, citycode.get(city)),
    gethumaneNum(year, 2, citycode.get(city)),
    gethumaneNum(year, 3, citycode.get(city)),
    gethumaneNum(year, 4, citycode.get(city)),
    gethumaneNum(year, 5, citycode.get(city)),
    gethumaneNum(year, 6, citycode.get(city)),
    gethumaneNum(year, 7, citycode.get(city)),
    gethumaneNum(year, 8, citycode.get(city)),
    gethumaneNum(year, 9, citycode.get(city)),
    gethumaneNum(year, 10, citycode.get(city)),
    gethumaneNum(year, 11, citycode.get(city)),
    gethumaneNum(year, 12, citycode.get(city)),
  ]).then((res) => {
    const humaneNum = [];
    res.forEach((element) => {
      element.data.forEach((item) => {
        if (typeof item.end_num === "undefined") {
          // console.log(element[0].end_num);
          humaneNum.push(0);
        } else {
          humaneNum.push(item.end_num);
        }
      });
    });
    const humaneRate = [];
    res.forEach((element) => {
      element.data.forEach((item) => {
        if (typeof item === "undefined") {
          humaneRate.push(0);
        } else {
          item.end_rate = item.end_rate.replace(/%/g, "");
          item.end_rate = parseFloat(item.end_rate);
          humaneRate.push(item.end_rate);
        }
      });
    });
    printHumChart(humaneNum, humaneRate);
  });
};

//function of generating chart
function printHumChart(humaneNum, humaneRate) {
  let humaneChart = echarts.init(document.getElementById("chart"));

  humaneChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
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
      data: ["人道處理數", "人道處理率"],
      textStyle: {
        color: "#543927",
        fontSize: 18,
        fontFamily: "微軟正黑體",
      },
    },
    xAxis: [
      {
        type: "category",
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
        name: "人道處理數(隻)",
        min: 0,
        max: 20,
        interval: 5,
        axisLabel: {
          formatter: "{value}隻",
          color: "#543927",
          fontSize: 16,
          fontFamily: "微軟正黑體",
        },
      },
      {
        type: "value",
        name: "人道處理率(%)",
        min: 0,
        max: 100,
        interval: 25,
        axisLabel: {
          formatter: "{value}%",
        },
      },
    ],
    series: [
      {
        name: "人道處理數",
        type: "bar",
        color: ["#543927"],
        tooltip: {
          valueFormatter: function (value) {
            return value + " 隻";
          },
        },
        data: humaneNum,
      },
      {
        name: "人道處理率",
        type: "line",
        color: ["#f9b132"],
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + " %";
          },
        },
        data: humaneRate,
      },
    ],
  });
}

export default humaneChart;
