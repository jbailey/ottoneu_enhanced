function changeBatterTable(table) {
  $(table).find('th').eq(4).after('<th scope="col" class="rgHeader" style="text-align:right;">P/G</th>');
  // Hide column headers
  $(table).find("thead th").eq(9).hide();
  $(table).find("thead th").eq(10).hide();
  $(table).find("thead th").eq(15).hide();
  $(table).find("thead th").eq(19).hide();
  $(table).find("thead th").eq(20).hide();

  $(table).find('tr').each(function() {
    $(this).find('td').eq(9).hide();
    $(this).find('td').eq(10).hide();
    $(this).find('td').eq(15).hide();
    $(this).find('td').eq(19).hide();
    $(this).find('td').eq(20).hide();
  });
}

function changePitcherTable(table) {
  $(table).find('th').eq(4).after('<th scope="col" class="rgHeader" style="text-align:right;">P/IP</th>');
  // Hide column headers
  // $(table).find("thead th").eq(9).hide();
  // $(table).find("thead th").eq(10).hide();
  // $(table).find("thead th").eq(15).hide();
  // $(table).find("thead th").eq(19).hide();
  // $(table).find("thead th").eq(20).hide();

  // $(table).find('tr').each(function() {
  //   $(this).find('td').eq(9).hide();
  //   $(this).find('td').eq(10).hide();
  //   $(this).find('td').eq(15).hide();
  //   $(this).find('td').eq(19).hide();
  //   $(this).find('td').eq(20).hide();
  // });
};

function addPPGToBatterTable(table) {
  $(table).find('tbody').last().find("tr").each(function() {
    var points = $(this).find("td").eq(3).text();
    var games = $(this).find("td").eq(4).text();
    var ppg = (parseFloat(points) / parseFloat(games)).toFixed(2);
    $(this).find('td').eq(3).after('<td class="grid_line_regular" align="right">' + ppg + '</td>');
  });
};

function addPPIPToPitcherTable(table) {
  $(table).find('tbody').last().find("tr").each(function() {
    var points = $(this).find("td").eq(3).text();
    var ip = $(this).find("td").eq(9).text();
    // Put logic to convert decimal ip.  Ex. .2 to .667
    var ppip = (parseFloat(points) / parseFloat(ip)).toFixed(2);
    $(this).find('td').eq(3).after('<td class="grid_line_regular" align="right">' + ppip + '</td>');
  });
};

// MAIN LOGIC
var table = $("#FantasyBoard1_dg1_ctl00");
if (location.href.match(/stats=bat/) != undefined) {
  changeBatterTable(table);
  addPPGToBatterTable(table);
} else if (location.href.match(/stats=pit/) != undefined || location.href.match(/stats=sta/) != undefined || location.href.match(/stats=rel/) != undefined) {
  changePitcherTable(table);
  addPPIPToPitcherTable(table);
}