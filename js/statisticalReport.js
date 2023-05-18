function getPetNum(year, month, country) {
  return axios.get(
    `${baseURL}rpt_year=${year}&rpt_month=${month}&rpt_country_code=${country}`
  );
}

Promise.all([
  getPetNum(107, 1, "City000003"),
  getPetNum(107, 2, "City000003"),
  getPetNum(107, 3, "City000003"),
  getPetNum(107, 4, "City000003"),
  getPetNum(107, 5, "City000003"),
  getPetNum(107, 6, "City000003"),
  getPetNum(107, 7, "City000003"),
  getPetNum(107, 8, "City000003"),
  getPetNum(107, 9, "City000003"),
  getPetNum(107, 10, "City000003"),
  getPetNum(107, 11, "City000003"),
  getPetNum(107, 12, "City000003"),
]).then((res) => {
  const petNum = [];
  res.forEach((element) => {
    petNum.push(element.data[0].accept_num);
  });
  printActChart(petNum);
});

$.ajax({

  type: 'GET',
  url: 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&',
  dataType: 'json',
  success: function (data) {
    var item;
    $.each(data, function (i, result) {
      item =
        "<tr><td>" + result['rpt_country'] + "</td><td>" + result['accept_num']
        + "</td><td>" + result['adopt_num'] + "</td></tr>";
      $('.table').append(item);
    });
  },

});