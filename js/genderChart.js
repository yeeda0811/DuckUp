const year = "2018"; //改成抓HTML的年份
const baseURL =
  "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&";

function getMaleDog() {
  return axios.get(`${baseURL}animal_kind=%E7%8B%97&animal_sex=M`);
}

function getFemaleDog() {
  return axios.get(`${baseURL}animal_kind=%E7%8B%97&animal_sex=F`);
}

function getMaleCat() {
  return axios.get(`${baseURL}animal_kind=%E8%B2%93&animal_sex=M`);
}

function getFemaleCat() {
  return axios.get(`${baseURL}animal_kind=%E8%B2%93&animal_sex=F`);
}

Promise.all([getMaleDog(), getFemaleDog(), getMaleCat(), getFemaleCat()]).then(
  (res) => {
    const mDog = [];
    const fDog = [];
    const mCat = [];
    const fCat = [];
    res[0].data.forEach((element) => {
      if (element.animal_createtime.includes(year)) {
        mDog.push(element);
      }
    });
    res[1].data.forEach((element) => {
      if (element.animal_createtime.includes(year)) {
        fDog.push(element);
      }
    });
    res[2].data.forEach((element) => {
      if (element.animal_createtime.includes(year)) {
        mCat.push(element);
      }
    });
    res[3].data.forEach((element) => {
      if (element.animal_createtime.includes(year)) {
        fCat.push(element);
      }
    });
    printDogChart(mDog, fDog);
    printCatChart(mCat, fCat);
  }
);

function printDogChart(mDog, fDog) {
  let dogChart = echarts.init(document.getElementById("dogGender"));
  let mDogNum = mDog.length;
  let fDogNum = fDog.length;
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
          { value: mDogNum, name: "公犬" },
          { value: fDogNum, name: "母犬" },
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

function printCatChart(mCat, fCat) {
  let catChart = echarts.init(document.getElementById("catGender"));
  let mCatNum = mCat.length;
  let fCatNum = fCat.length;

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
          { value: mCatNum, name: "公貓" },
          { value: fCatNum, name: "母貓" },
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
