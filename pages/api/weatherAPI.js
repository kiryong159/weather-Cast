export default async function WeatherFetch(time, date, nx, ny) {
  const dotenv = require("dotenv");
  dotenv.config();
  const ApiKey = process.env.G_API_KEY;
  const url =
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"; /*URL*/

  var queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + `${ApiKey}`; /*Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("pageNo") +
    "=" +
    encodeURIComponent("1"); /*페이지 수*/
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("1000"); /*한페이지 결과*/
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /*응답 자료형식*/
  queryParams +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent(date); /*발표 일자*/
  queryParams +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent(time); /*발표 시각*/
  queryParams +=
    "&" +
    encodeURIComponent("nx") +
    "=" +
    encodeURIComponent(nx); /*세로(경도)*/
  queryParams +=
    "&" +
    encodeURIComponent("ny") +
    "=" +
    encodeURIComponent(ny); /*가로(위도)*/

  const result = await fetch(url + queryParams, {
    headers: { Accept: "application / json" },
    method: "GET",
  })
    .then((r) => r.json())
    .then((r) => {
      return r.response.body.items.item;
    });
  return result;
}

/* 
LGT 낙뢰 kA
PTY 강수형태 코드값 0없음 1비 2비/눈 3눈 5빗방울 6빗방울날림 7눈날림
RN1 1시간 강수량 mm  ※ -, null, 0값은 ‘강수없음’
SKY 하늘 상태 코드값 1맑음 3구름많음 4흐림
T1H 기온 ℃ 
REH 습도 %

UUU 동서바람성분 m/s
VVV 남북바람성분 m/s
VEC 풍향 deg
WSD 풍속 m/s

*/
