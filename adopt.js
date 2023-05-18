var url="https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf";
  
var dataArray =[];
var monthArray = []; 
var adoptArray =[];
var percentArray = [];
var year = 0;
var city = '';

fetch(url,{
     method:"GET",
 }).then(response=>{
     return response.json();
 }).then(json =>{
   year = 111; // 年份
   city = 'City000003'; // 縣市代碼
   
   json.forEach(element => {
     if(element.rpt_year==year  && element.rpt_country_code==city){
         dataArray.push(element);
     }
   });
   monthArray = dataArray.map(item =>{
         return item.rpt_month
   })
   adoptArray =dataArray.map(item =>{
         return item.adopt_num
   })
   percentArray =dataArray.map(item =>{
         return parseInt(item.adopt_rate.replace('%',''))
   })
   console.log("monthArray", monthArray);
   console.log("adoptArray", adoptArray);
   console.log("percentArray", percentArray);
   // if needed -> bubble sort
   for (var i = 0; i <monthArray.length; i++) {
     for (var j = 0; j < (monthArray.length - i - 1); j++) {
         // Checking if the item at present iteration 
         // is greater than the next iteration
         if (monthArray[j] > monthArray[j + 1]) {
             // If the condition is true
             // then swap them
             var temp = monthArray[j]
             var temp_1 = adoptArray[j]
             var temp_2 =  percentArray[j]
             monthArray[j] = monthArray[j + 1]
             adoptArray[j] =adoptArray[j + 1]
             percentArray[j] = percentArray[j + 1]
             monthArray[j + 1] = temp
             adoptArray[j + 1] = temp_1
             percentArray[j + 1] = temp_2
         }
     }
   }
         
   console.log("monthArray_sort", monthArray);
   console.log("adoptArray_sort", adoptArray);
   console.log("percentArray_sort", percentArray);
 var myChart = echarts.init(document.getElementById("adopt"));
 // 圖表設定與資料
 var option = {
     tooltip:{
         trigger:"axis",
         axisPointer: {
           type: 'cross'
         }
     }, 
     legend : {
         data:["領養隻數","領養率"],
     }, 
     xAxis: {
         type :"category", 
         data : monthArray ,
         name:"\n\n\n月份"
     }, 
     yAxis :[{
         type:"value",
         name:"領養隻數" ,
         position :'right',
         axisLine:{
           show:true,
           lineStyle: {
             color: '#F9B132'
           }
         },
         axisLabel: {
           formatter: '{value} 隻'
         } 
     },{
         type:"value",
         name:"領養率" ,
         position :'left',
         axisLine:{
           show:true,
           lineStyle: {
             color: '#0CC0DF'
           }
         },
         axisLabel: {
           formatter: '{value} %'
         } 
     }], 
     series:
     [{
         name:"領養隻數", 
         type:"bar", 
         barWidth:50,
         itemStyle: {normal: {color: '#F9B132'}},
         data:adoptArray,
     },,
     {
       name: "領養率",
       type: 'line',
       symbolSize:10,
       yAxisIndex: 1,
       itemStyle: {
         normal: {
           color: '#0CC0DF', 
           lineStyle:{
             width:4
           }
       }},
       data: percentArray
   }]
 };

 myChart.setOption(option);
}).catch(error =>{
  console.log(error);
})
