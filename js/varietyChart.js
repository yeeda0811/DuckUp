const varietyChart = () => {
    var year =
      parseInt(document.getElementById("year").innerHTML.substring(0, 3)) +
      1911 +
      ""
    var regex_y = new RegExp(year); // 年份
    var url="https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL";

    Dog();
    Cat();
    function Cat(){
        // console.log("in cat");
        var CatArray =[];
        var CatVariety =[];
        var Cat_count =[];
        var Cat_obj = [];
        var Cat_num = [];
        var dataArray = [];
    
        fetch( url,{
            method:"GET",
        }).then(response=>{
            return response.json();
        }).then(json =>{
            const regex_y = new RegExp(year); // 年份
            json.forEach(element => {
                if(element.animal_kind == "貓"  && regex_y.test(element.animal_createtime) ){
                    CatArray.push(element);
                }
            });
            CatVariety= CatArray.map(item =>{
                return item.animal_Variety.trim()
            })
            console.log("CatVariety", CatVariety);
    
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
        
        var myChart = echarts.init(document.getElementById("catVariety"));
        var option = {
            toolbox: {
                feature: {
                  saveAsImage: { show: true },
                },
            },
            tooltip:{
                trigger:"item",
                formatter : "{a} <br/> {b}: {c} ({d}%)",
            }, 
            legend : {
                orient:"vertical",
                icon: 'circle',     
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
    }
    
    function Dog(){
        // console.log("in dog");
        var DogArray =[];
        var DogVariety =[];
        var Dog_count =[];
        var Dog_obj = [];
        var Dog_num = [];
        var dataArray = [];
    
        fetch(url,{
            method:"GET",
        }).then(response=>{
            return response.json();
        }).then(json =>{
            json.forEach(element => {
                if(element.animal_kind=="狗"&& regex_y.test(element.animal_createtime) ){
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
            var myChart = echarts.init(document.getElementById("dogVariety"));
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
                toolbox: {
                    feature: {
                      saveAsImage: { show: true },
                    },
                },
                legend : {
                    type:'scroll', 
                    orient:"vertical",
                    left:10, 
                    icon: 'circle',
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
    }
}
export default varietyChart;
