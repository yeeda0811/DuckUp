const acceptNumChart = () => {
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

  function getPetNum(year, month, city) {
    return axios.get(
      `${baseURL}rpt_year=${year}&rpt_month=${month}&rpt_country_code=${city}`
    );
  }

  Promise.all([
    getPetNum(year, 1, citycode.get(city)),
    getPetNum(year, 2, citycode.get(city)),
    getPetNum(year, 3, citycode.get(city)),
    getPetNum(year, 4, citycode.get(city)),
    getPetNum(year, 5, citycode.get(city)),
    getPetNum(year, 6, citycode.get(city)),
    getPetNum(year, 7, citycode.get(city)),
    getPetNum(year, 8, citycode.get(city)),
    getPetNum(year, 9, citycode.get(city)),
    getPetNum(year, 10, citycode.get(city)),
    getPetNum(year, 11, citycode.get(city)),
    getPetNum(year, 12, citycode.get(city)),
  ]).then((res) => {
    const petNum = [];
    res.forEach((element) => {
      if (typeof element.data[0] === "undefined") {
        petNum.push(0);
      } else {
        petNum.push(element.data[0].accept_num);
      }
    });
    printActChart(petNum);
  });

  //function of generating chart
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
};

export default acceptNumChart;
