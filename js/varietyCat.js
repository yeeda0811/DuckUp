var CatArray =[];
var CatVariety =[]
var Cat_count =[]
var Cat_obj = []
var Cat_item = []
var dataArray = []
var titleText = ""
var url="https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL";

fetch(url,{
    method:"GET",
}).then(response=>{
    return response.json();
}).then(json =>{
    const year = '2023';
    const regex_y = new RegExp(year); // 年份
    const city = 3; // 縣市代碼
    json.forEach(element => {
        // &&element.animal_area_pkid==city
        if(element.animal_kind=="貓"  && regex_y.test(element.animal_createtime) ){
            CatArray.push(element);
        }
    });
    CatVariety= CatArray.map(item =>{
        return item.animal_Variety.trim()
    })
    // console.log("CatVariety", CatVariety);

    Cat_count = CatVariety.reduce((obj,item)=>{
    if (item in obj) {
        obj[item]++
    } else {
        obj[item] = 1
    }
        return obj
    },{})
    // console.log("Cat count",Cat_count);
    Cat_obj = Object.keys(Cat_count);
    Cat_num = Object.values(Cat_count);
    // 處理空字串
    for(var i=0;i< Cat_obj.length; i++){
        if(Cat_obj[i]==''){
            Cat_obj[i]="未登記";  
        }
    }
    console.log("Cat_obj",Cat_obj);
    console.log("Cat_num",Cat_num);

    for(var i=0 ; i<Cat_obj.length; i++){
        const seriesData = {
            name : Cat_obj[i], 
            value : Cat_num[i]
        };
        dataArray[i] = seriesData;
    }
console.log("dataArray",dataArray);
var myChart = echarts.init(document.getElementById("chart"));
// 圖表設定與資料
var option = {
    tooltip:{
        trigger:"item",
        formatter : "{a} <br/> {b}: {c} ({d}%)",
    }, 
    legend : {
        orient:"vertical",
        left:10, 
        top:30, 
        data: Cat_obj,
    },
    series:[{
        name:"訪問來源", 
        type:"pie", 
        color:['#0CC0DF','#005B91','#C7A1E4','#E3FEFF','#86E0EF','#FCFCD4','#95B0B7', '#E1F7FB'],
        radius:["40%", "70%"], // 內半徑、外半徑 ->甜甜圈
        label:{
            show:false, 
            position:"center",
        },
        // spootlight -> 選取項目 name出現在中間
        emphasis:{
            label:{
                formatter:"{b}\n{c}"+" 隻",
                show:true,
                fontSize:"25px", 
                fontWeight:"bold", 
            }
        },
        data:dataArray,
    }],
    };

    myChart.setOption(option);
}).catch(error =>{
    console.log(error);
})
