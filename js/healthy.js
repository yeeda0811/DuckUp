const healthyChart = () => {
  const year =
    parseInt(document.getElementById("year").innerHTML.substring(0, 3)) +
    1911 +
    "";

  //connect to API
  const baseURL =
    "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&";

  function getDog() {
    return axios.get(`${baseURL}animal_kind=%E7%8B%97`);
  }

  function getCat() {
    return axios.get(`${baseURL}animal_kind=%E8%B2%93`);
  }

  Promise.all([getDog(), getCat()]).then((res) => {
    const hDog = [];
    const uhDog = [];
    const hCat = [];
    const uhCat = [];
    res[0].data.forEach((element) => {
      if (element.animal_createtime.includes(year)) {
        if (element.animal_remark === "") {
          hDog.push(element);
        } else {
          uhDog.push(element);
        }
      }
    });
    res[1].data.forEach((element) => {
      if (element.animal_createtime.includes(year)) {
        if (element.animal_remark === "") {
          hCat.push(element);
        } else {
          uhCat.push(element);
        }
      }
    });
    printDogChart(hDog, uhDog);
    printCatChart(hCat, uhCat);
  });

  //function of generating dog chart
  function printDogChart(hDog, uhDog) {
    let dogChart = echarts.init(document.getElementById("dogHealthy"));
    let hDogNum = hDog.length;
    let uhDogNum = uhDog.length;
    dogChart.setOption({
      series: [
        {
          name: "",
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
            { value: hDogNum, name: "健康" },
            { value: uhDogNum, name: "不健康" },
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
  }

  //function of generating cat chart
  function printCatChart(hCat, uhCat) {
    let catChart = echarts.init(document.getElementById("catHealthy"));
    let hCatNum = hCat.length;
    let uhCatNum = uhCat.length;

    catChart.setOption({
      series: [
        {
          name: "",
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
            { value: hCatNum, name: "健康" },
            { value: uhCatNum, name: "不健康" },
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
  }
};

export default healthyChart;
