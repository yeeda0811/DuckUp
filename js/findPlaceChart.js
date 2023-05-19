const findPlaceChart = () => {
  const year = document.getElementById("year").innerHTML.substring(0, 3);

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

  var baseURL =
    "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&";

  function getPetNum(year, city) {
    return axios.get(`${baseURL}rpt_year=${year}&rpt_country_code=${city}`);
  }
  Promise.all([
    getPetNum(year, "City000002"),
    getPetNum(year, "City000003"),
    getPetNum(year, "City000004"),
    getPetNum(year, "City000005"),
    getPetNum(year, "City000006"),
    getPetNum(year, "City000007"),
    getPetNum(year, "City000008"),
    getPetNum(year, "City000009"),
    getPetNum(year, "City000010"),
    getPetNum(year, "City000011"),
    getPetNum(year, "City000012"),
    getPetNum(year, "City000013"),
    getPetNum(year, "City000014"),
    getPetNum(year, "City000015"),
    getPetNum(year, "City000016"),
    getPetNum(year, "City000017"),
    getPetNum(year, "City000018"),
    getPetNum(year, "City000019"),
    getPetNum(year, "City000020"),
    getPetNum(year, "City000021"),
    getPetNum(year, "City000022"),
    getPetNum(year, "City000023"),
  ])
    .then((res) => {
      // console.log(res);
      const allCitys = [];
      let petNum = 0;
      let cityName = "";
      res.forEach((element) => {
        element.data.forEach((element) => {
          if (element.rpt_month !== 0) {
            petNum += element.accept_num;
          }
          cityName = element.rpt_country;
        });
        allCitys.push({ value: petNum, name: cityName });
        petNum = 0;
      });
      printFpChart(allCitys);
    })
    .catch((error) => {
      console.log(error);
    });

  function printFpChart(allCitys) {
    let dogChart = echarts.init(document.getElementById("chart"));
    dogChart.setOption({
      series: [
        {
          name: "",
          type: "pie",
          color: [
            "#F9B132",
            "#504538",
            "#B7A99A",
            "#4B8178",
            "#A58456",
            "#FFECCB",
            "#4B8178",
            "#502E22",
          ],
          label: {
            color: "#543927",
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "微軟正黑體",
          },
          radius: "80%",
          data: allCitys,
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
          fontSize: 14,
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
  }
};

export default findPlaceChart;
