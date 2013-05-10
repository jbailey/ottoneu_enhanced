function addHitterRateStats() {
  $('.stats').slice(0, 2).each(function (index) {
    $(this).find('th').eq(13).after('<th class="rounded" style="border-top-left-radius: 5px; border-top-right-radius: 5px;">P/G</th>');
    $(this).find('th').eq(14).after('<th class="rounded" style="border-top-left-radius: 5px; border-top-right-radius: 5px;">P/PA</th>');
    $(this).find("tr").each(function (idx) {
      var points = $(this).find("td").eq(13).text();
      var games = $(this).find("td").eq(2).text();
      var pa = $(this).find("td").eq(3).text();
      var ppg = (parseFloat(points) / parseFloat(games)).toFixed(2);
      var pppa = (parseFloat(points) / parseFloat(pa)).toFixed(2);

      $(this).find('td').eq(13).after('<td class="grid_line_regular" align="right">' + ppg + '</td>');
      $(this).find('td').eq(14).after('<td class="grid_line_regular" align="right">' + pppa + '</td>');
    })
  });
}

function addPitcherRateStats() {
  $('.stats').slice(0, 2).each(function (index) {
    $(this).find('th').eq(11).after('<th class="rounded" style="border-top-left-radius: 5px; border-top-right-radius: 5px;">P/IP</th>');
    $(this).find("tr").each(function (idx) {
      var points = $(this).find("td").eq(11).text();
      var ip = $(this).find("td").eq(3).text();

      var partial = Math.round((ip - Math.floor(ip)) * 100) / 100;
      ip = Math.floor(ip);
      if(partial == 0.1) {
        ip += 0.33;
      } else if(partial == 0.2) {
        ip += 0.67;
      }
      var ppip = (parseFloat(points) / parseFloat(ip)).toFixed(2);


      $(this).find('td').eq(11).after('<td class="grid_line_regular" align="right">' + ppip + '</td>');
    })
  });
}

if( $('th:contains("AB")').size() > 0) {
  // Batter
  addHitterRateStats();
} else if ($('th:contains("IP")').size() > 0) {
  // Pitcher
  addPitcherRateStats();
} else {
  alert("nothing");
}