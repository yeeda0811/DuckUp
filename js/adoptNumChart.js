const adoptNumChart = () => {
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

  var url =
    "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf";
  var dataArray = [];
  var monthArray = [];
  var adoptArray = [];
  var percentArray = [];
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.forEach((element) => {
        if (
          element.rpt_year == year &&
          element.rpt_month != 0 &&
          element.rpt_country_code == citycode.get(city)
        ) {
          dataArray.push(element);
        }
      });
      monthArray = dataArray.map((item) => {
        return item.rpt_month;
      });
      adoptArray = dataArray.map((item) => {
        return item.adopt_num;
      });
      percentArray = dataArray.map((item) => {
        return parseInt(item.adopt_rate.replace("%", ""));
      });
      console.log("monthArray", monthArray);
      console.log("adoptArray", adoptArray);
      console.log("percentArray", percentArray);
      // if needed -> bubble sort
      for (var i = 0; i < monthArray.length; i++) {
        for (var j = 0; j < monthArray.length - i - 1; j++) {
          // Checking if the item at present iteration
          // is greater than the next iteration
          if (monthArray[j] > monthArray[j + 1]) {
            // If the condition is true
            // then swap them
            var temp = monthArray[j];
            var temp_1 = adoptArray[j];
            var temp_2 = percentArray[j];
            monthArray[j] = monthArray[j + 1];
            adoptArray[j] = adoptArray[j + 1];
            percentArray[j] = percentArray[j + 1];
            monthArray[j + 1] = temp;
            adoptArray[j + 1] = temp_1;
            percentArray[j + 1] = temp_2;
          }
        }
      }

      console.log("monthArray_sort", monthArray);
      console.log("adoptArray_sort", adoptArray);
      console.log("percentArray_sort", percentArray);
      var myChart = echarts.init(document.getElementById("adopt"));
      // 圖表設定與資料
      var option = {
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
        legend: {
          data: ["領養隻數", "領養率"],
          textStyle: {
            color: "#543927",
            fontSize: 18,
            fontFamily: "微軟正黑體",
          },
        },
        xAxis: {
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
          name: "\n\n\n月份",
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
        yAxis: [
          {
            type: "value",
            name: "領養隻數",
            position: "left",
            axisLabel: {
              formatter: "{value}隻",
              color: "#543927",
              fontSize: 16,
              fontFamily: "微軟正黑體",
            },
          },
          {
            type: "value",
            name: "領養率",
            position: "right",
            axisLabel: {
              formatter: "{value} %",
              color: "#543927",
              fontSize: 16,
              fontFamily: "微軟正黑體",
            },
          },
        ],
        series: [
          {
            name: "領養隻數",
            type: "bar",
            itemStyle: { normal: { color: "#543927" } },
            data: adoptArray,
          },
          ,
          {
            name: "領養率",
            type: "line",
            symbolSize: 10,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#f9b132",
                lineStyle: {
                  width: 4,
                },
              },
            },
            data: percentArray,
          },
        ],
        textStyle: {
          color: "#543927",
          fontSize: 16,
          fontFamily: "微軟正黑體",
        },
      };

      myChart.setOption(option);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default adoptNumChart;
