// ==UserScript==
// @name       Ottoneu P/G and P/IP
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Adds columns for points per game and points per inning for lineups page.
// @match      http://*/*
// @copyright  2012+, Jayson Bailey
// ==/UserScript==
var $ = unsafeWindow.jQuery;

if(document.URL.indexOf("lineup") != -1 || document.URL.indexOf("organizer") != -1) {
  $("table").eq(1).find(".statHeaders").append('<th class="notRounded">P/G</th>');
  $("table").eq(1).find("tr").eq(0).find("th").eq(1).attr('colspan', 12);
  $("table").eq(2).find(".statHeaders").append('<th class="notRounded">P/IP</th>');
  $("table").eq(2).find("tr").eq(0).find("th").eq(1).attr('colspan', 12);
  
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
    
    
    if(Number(fInnings)) {
      ppg = round2(fPoints / fInnings);
      $(row).append('<td>' + ppg + '</td>');
    }
  }
  
  $("table").eq(1).find("tr").each(function(idx) { calcPPG(this); });
  $("table").eq(2).find("tr").each(function(idx) { calcPPIP(this); });
}