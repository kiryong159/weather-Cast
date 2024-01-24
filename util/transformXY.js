export default function lamcproj(lon, lat, x, y, code) {
  var RE = 6371.00877;
  var GRID = 5.0; // 격자 간격
  var SLAT1 = 30.0; // 표준 위도 1
  var SLAT2 = 60.0; // 표준 위도 2
  var OLON = 126.0; // 기준점 경도
  var OLAT = 38.0; // 기준점 위도
  var XO = 43; // 기준점 X좌표
  var YO = 136; // 기준점 Y좌표

  var DEGRAD = Math.PI / 180.0;
  var RADDEG = 180.0 / Math.PI;
  var re = RE / GRID;
  var slat1 = SLAT1 * DEGRAD;
  var slat2 = SLAT2 * DEGRAD;
  var olon = OLON * DEGRAD;
  var olat = OLAT * DEGRAD;

  var sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  // 위경도 -> (X,Y)
  if (code == 0) {
    var ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    var theta = lon * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    x = Math.round(ra * Math.sin(theta) + XO);
    y = Math.round(ro - ra * Math.cos(theta) + YO);

    return { x: x, y: y };
  }

  // (X,Y) -> 위경도
  if (code == 1) {
    var xn = x - XO;
    var yn = ro - y + YO;
    ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) -ra;
    var alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;
    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) -theta;
      } else theta = Math.atan2(xn, yn);
    }
    var alon = theta / sn + olon;
    var calcLat = alat * RADDEG;
    var calcLon = alon * RADDEG;
    return { long: calcLon, lat: calcLat };
  }
}
/* 예시

/ 위경도 -> (X,Y) 변환
var lon = 126.929810;
var lat = 37.488201;
var x, y;

x = y = 0;
code = 0;

// lamcproj() 함수 호출
var res = lamcproj(lon, lat, code, map);

// x, y 출력
console.log("x = %d, y = %d", res.x, res.y); // x = 59, y = 125

----------------------------------------

// (X,Y) -> 위경도 변환
var x = 59;
var y = 125;
var lon, lat;

lon = lat = 0;
code = 1;

// lamcproj() 함수 호출
var res = lamcproj(x, y, code, map);

// lon, lat 출력
console.log("lon = %f, lat = %f", res.lon, res.lat); // lon = 126.929810, lat = 37.488201


*/
