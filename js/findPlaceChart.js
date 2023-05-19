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

  var CatArray = [];
  var City = []
  var Animals_count = []
  var Cat_obj = []
  var dataArray = []
  var baseURL = "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&";

  function getPetNum(year, city) {
    return axios.get(
      `${baseURL}rpt_year=${year}&rpt_country_code=${city}`
    );
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
  ]).then(response => {
    const year = '2023';
    const regex_y = new RegExp(year); // 年份
    const city = 3; // 縣市代碼
    json.forEach(element => {
      // &&element.animal_area_pkid==city
      if (element.animal_kind == "貓" && regex_y.test(element.animal_createtime)) {
        CatArray.push(element);
      }
    });
    City = CatArray.map(item => {
      return item.animal_Variety.trim()
    })
    // console.log("City", City);

    Animals_count = City.reduce((obj, item) => {
      if (item in obj) {
        obj[item]++
      } else {
        obj[item] = 1
      }
      return obj
    }, {})
    // console.log("Cat count",Animals_count);
    Cat_obj = Object.keys(Animals_count);
    Cat_num = Object.values(Animals_count);
    // 處理空字串
    for (var i = 0; i < Cat_obj.length; i++) {
      if (Cat_obj[i] == '') {
        Cat_obj[i] = "未登記";
      }
    }
    console.log("Cat_obj", Cat_obj);
    console.log("Cat_num", Cat_num);

    for (var i = 0; i < Cat_obj.length; i++) {
      const seriesData = {
        name: Cat_obj[i],
        value: Cat_num[i]
      };
      dataArray[i] = seriesData;
    }
    console.log("dataArray", dataArray);
    var myChart = echarts.init(document.getElementById("chart"));
    // 圖表設定與資料
    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/> {b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: 10,
        top: 30,
        data: Cat_obj,
      },
      series: [{
        name: "訪問來源",
        type: "pie",
        color: ['#0CC0DF', '#005B91', '#C7A1E4', '#E3FEFF', '#86E0EF', '#FCFCD4', '#95B0B7', '#E1F7FB'],
        radius: ["40%", "70%"], // 內半徑、外半徑 ->甜甜圈
        label: {
          show: false,
          position: "center",
        },
        // spootlight -> 選取項目 name出現在中間
        emphasis: {
          label: {
            formatter: "{b}\n{c}" + " 隻",
            show: true,
            fontSize: "25px",
            fontWeight: "bold",
          }
        },
        data: dataArray,
      }],
    };

    myChart.setOption(option);
  }).catch(error => {
    console.log(error);
  })

};

export default findPlaceChart;
