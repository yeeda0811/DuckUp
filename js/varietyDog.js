var DogArray =[];
var DogVariety =[]
var Dog_count =[]
var Dog_obj = []
var Dog_item = []
var dataArray = []
var url="https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL";
fetch(url,{
    method:"GET",
}).then(response=>{
    return response.json();
}).then(json =>{
    const year ='2022';
    const regex_y = new RegExp(year);  // 年份
    const city=2;   // 縣市代碼
    json.forEach(element => {
        // &&element.animal_area_pkid==city
        if(element.animal_kind=="狗"&& regex_y.test(element.animal_createtime) &&element.animal_area_pkid==city ){
            DogArray.push(element);
        }     
    });
     DogVariety= DogArray.map(item =>{
        return item.animal_Variety.trim()
    })
    console.log("DogVariety", DogVariety);

    Dog_count = DogVariety.reduce((obj,item)=>{
    if (item in obj) {
        obj[item]++
    } else {
        obj[item] = 1
    }
        return obj
    },{})
    console.log("Dog count",Dog_count);
    Dog_obj = Object.keys(Dog_count);
    Dog_num = Object.values(Dog_count);

    // 處理混種狗 = 混種犬問題
    let delSum=0; // 混種犬 ＆＆ 其他犬數量
    for(var i=0;i< Dog_obj.length; i++){
        if(Dog_obj[i]=="混種犬" || Dog_obj[i]=="其他犬"){
              delSum+=Dog_num[i];
              Dog_obj.splice(i,1);
              Dog_num.splice(i,1);
        }
        // 未登記
        if(Dog_obj[i]==''){
            Dog_obj[i]="未登記";  
        }
    }
    for(var i=0;i< Dog_obj.length; i++){
        if(Dog_obj[i]=="混種狗"){
            Dog_num[i] = delSum+parseInt(Dog_num[i]);
        }
    }
    console.log("Dog_obj",Dog_obj);
    console.log("Dog_num",Dog_num);
        // if needed -> bubble sort
    for (var i = 0; i <Dog_num.length; i++) {
        for (var j = 0; j < (Dog_num.length - i - 1); j++) {
            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (Dog_num[j] < Dog_num[j + 1]) {
                // If the condition is true
                // then swap them
                var temp = Dog_num[j]
                var temp_1 = Dog_obj[j]
                Dog_num[j] = Dog_num[j + 1]
                Dog_obj[j] =Dog_obj[j + 1]
                Dog_num[j + 1] = temp
                Dog_obj[j + 1] = temp_1
            }
        }
    }
    for(var i=0 ; i<Dog_obj.length; i++){
        const seriesData = {
            name : Dog_obj[i], 
            value : Dog_num[i]
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
            // a,  ,b, c, d 有特殊對應名稱
            // a = 資料所屬系列名稱
            // b = 資料項的名稱
            // c = 資料項的數值 
            // d = 資料項的佔比 
        }, 
        legend : {
            orient:"vertical",
            left:10, 
            top:30, 
            data: Dog_obj ,
        },
        series:[{
            name:"訪問來源", 
            type:"pie", 
            color:['#F9B132','#504538','#B7A99A', '#4B8178', '#A58456','#FFECCB','#4B8178', '#502E22'],
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