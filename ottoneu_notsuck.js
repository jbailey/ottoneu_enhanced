var hittersTable = $("table[border='1']")[0];
var pitchersTable = $("table[border='1']")[1];
$(hittersTable).attr("id", "hittersTable");
$(pitchersTable).attr("id", "pitchersTable");

// Add P/G to hitting table
$(hittersTable).find("tr").eq(0).find("th").eq(1).attr('colspan', 13);
$(hittersTable).find(".statHeaders").eq(0).append('<th class="notRounded">P/G</th>');

// Add P/IP to pitching table
$(pitchersTable).find("tr").eq(0).find("th").eq(1).attr('colspan', 12);
$(pitchersTable).find(".statHeaders").eq(0).append('<th class="notRounded">P/IP</th>');

function round2(num) {
  return Math.round(num * 100) / 100;
}

function calcPPG(row) {
  strGames = $(row).find("td").eq(5).html();
  strPoints = $(row).find("td").eq(15).html();
  if(strPoints != null && strPoints.indexOf(',') != -1) {
    strPoints = strPoints.replace(/\,/,'');
  }
  fGames = parseFloat(strGames);
  fPoints = parseFloat(strPoints);

  if(Number(fGames)) {
    ppg = round2(fPoints / fGames);
    $(row).append('<td>' + ppg + '</td>');
  }
}

function calcPPIP(row) {
  strInnings = $(row).find("td").eq(5).html();
  strPoints = $(row).find("td").eq(13).html();
  if(strPoints != null && strPoints.indexOf(',') != -1) {
    strPoints = strPoints.replace(/\,/,'');
  }
  fInnings = parseFloat(strInnings);
  fPoints = parseFloat(strPoints);

  var partial = Math.round((fInnings - Math.floor(fInnings)) * 100) / 100;
  fInnings = Math.floor(fInnings);
  if(partial == 0.1) {
    fInnings += 0.33;
  } else if(partial == 0.2) {
    fInnings += 0.67;
  }


  if(Number(fInnings)) {
    ppg = round2(fPoints / fInnings);
    $(row).append('<td>' + ppg + '</td>');
  }
}

$(hittersTable).find("tr").each(function(idx) { calcPPG(this); });
$(pitchersTable).find("tr").each(function(idx) { calcPPIP(this); });
