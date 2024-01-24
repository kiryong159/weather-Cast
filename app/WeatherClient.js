"use client";

import WeatherFetch from "@/pages/api/weatherAPI";
import lamcproj from "@/util/transformXY";
import { useState } from "react";
import Rain from "./components/rain";
import Sky from "./components/sky";
import Wind from "./components/wind";

export default function WeatherClient() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  /*   console.log("강수형태", data.slice(6, 12));
  console.log("하늘 상태", data.slice(18, 24));
  console.log("기온", data.slice(24, 30));
  console.log("습도", data.slice(30, 36));
  console.log("풍속", data.slice(54, 60)); 
  console.log("풍향", data.slice(48, 54));*/

  /*   const 낙뢰 = data.slice(0, 6); 
  const 시간강수량 = data.slice(12, 18); 
  const 동서바람성분 = data.slice(36, 42);
  const 남북바람성분 = data.slice(42, 48);*/
  const 강수형태 = data.slice(6, 12);
  const 하늘상태 = data.slice(18, 24);
  const 기온 = data.slice(24, 30);
  const 습도 = data.slice(30, 36);
  const 풍향 = data.slice(48, 54);
  const 풍속 = data.slice(54, 60);

  const date = new Date();
  let time = "";
  if (date.getHours() === 0) {
    time = "2300";
  } else {
    time = String(date.getHours() - 1)
      .padStart(2, "0")
      .padEnd(4, "0");
  }
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const combineDate = year + month + day;

  async function onChange(e) {
    setData([]);
    const value = e.target.value;
    setLocation(value);
    if (value === "none") {
      return setData([]);
    }
    if (value === "서울") {
      const 서울 = await WeatherFetch(time, combineDate, 60, 127).then((r) =>
        setData(r)
      );
    }
    if (value === "부산") {
      const 부산 = await WeatherFetch(time, combineDate, 98, 76).then((r) =>
        setData(r)
      );
    }
    if (value === "대구") {
      const 대구 = await WeatherFetch(time, combineDate, 89, 90).then((r) =>
        setData(r)
      );
    }
    if (value === "인천") {
      const 인천 = await WeatherFetch(time, combineDate, 55, 124).then((r) =>
        setData(r)
      );
    }
    if (value === "광주") {
      const 광주 = await WeatherFetch(time, combineDate, 58, 74).then((r) =>
        setData(r)
      );
    }
    if (value === "대전") {
      const 대전 = await WeatherFetch(time, combineDate, 67, 100).then((r) =>
        setData(r)
      );
    }
    if (value === "울산") {
      const 울산 = await WeatherFetch(time, combineDate, 102, 84).then((r) =>
        setData(r)
      );
    }
    if (value === "세종시") {
      const 세종시 = await WeatherFetch(time, combineDate, 66, 103).then((r) =>
        setData(r)
      );
    }
    if (value === "경기도") {
      const 경기도 = await WeatherFetch(time, combineDate, 60, 120).then((r) =>
        setData(r)
      );
    }
    if (value === "강원도") {
      const 강원도 = await WeatherFetch(time, combineDate, 73, 134).then((r) =>
        setData(r)
      );
    }
    if (value === "충청북도") {
      const 충청북도 = await WeatherFetch(time, combineDate, 69, 107).then(
        (r) => setData(r)
      );
    }
    if (value === "충청남도") {
      const 충청남도 = await WeatherFetch(time, combineDate, 68, 100).then(
        (r) => setData(r)
      );
    }
    if (value === "전라북도") {
      const 전라북도 = await WeatherFetch(time, combineDate, 63, 89).then((r) =>
        setData(r)
      );
    }
    if (value === "전라남도") {
      const 전라남도 = await WeatherFetch(time, combineDate, 51, 67).then((r) =>
        setData(r)
      );
    }
    if (value === "경상북도") {
      const 경상북도 = await WeatherFetch(time, combineDate, 89, 91).then((r) =>
        setData(r)
      );
    }
    if (value === "경상남도") {
      const 경상남도 = await WeatherFetch(time, combineDate, 91, 77).then((r) =>
        setData(r)
      );
    }
    if (value === "제주도") {
      const 제주도 = await WeatherFetch(time, combineDate, 52, 32).then((r) =>
        setData(r)
      );
    }
  }

  const onClick = () => {
    setData([]);

    navigator.geolocation.getCurrentPosition((position) => {
      const select = document.querySelector("select");
      select.value = "none";
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const XY = lamcproj(longitude, latitude, 0, 0, 0);
      const roundLati = Math.round(latitude * 100) / 100;
      const roundLongi = Math.round(longitude * 100) / 100;
      setLocation(`경도 : ${roundLongi} , 위도 : ${roundLati}`);
      const 현재 = WeatherFetch(time, combineDate, XY.x, XY.y).then((r) =>
        setData(r)
      );
    });
  };

  return (
    <div className="w-[320px] lg:w-[1024px] mx-auto flex flex-col justify-center items-center space-y-5 mt-[70px] overflow-x-hidden">
      <h1 className="text-center text-4xl font-bold">초단기 예보 조회</h1>
      <div className="w-[308px] lg:w-[900px] grid grid-cols-2 gap-5">
        <div className="py-3 px-4 flex flex-col items-center space-y-2 bg-green-50 rounded-md shadow-md font-bold">
          <span>지역 선택</span>
          <select onChange={onChange}>
            <option value="none">--------</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
            <option value="인천">인천</option>
            <option value="광주">광주</option>
            <option value="대전">대전</option>
            <option value="울산">울산</option>
            <option value="세종시">세종시</option>
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="제주도">제주도</option>
          </select>
        </div>
        <button
          className="p-4 bg-blue-50 rounded-md shadow-md font-bold "
          onClick={onClick}
        >
          접속위치 로 정보받기
        </button>
      </div>

      <div className="bg-blue-50">
        {data.length !== 0 ? (
          <div className="space-y-5 w-full shadow-md rounded-md  p-1 py-3 lg:p-3">
            {/* 위치 정보 */}
            <div className="w-full flex justify-center items-center p-2">
              <h1
                className={`${
                  location.length > 10 ? "text-[15px]" : "text-[25px]"
                } lg:text-[45px] font-bold`}
              >
                {location} 의 예보
              </h1>
            </div>
            {/* 시간 */}
            <div className="w-[308px] lg:w-[900px] grid grid-cols-7 gap-2 lg:gap-5 text-center font-bold">
              <div className="text-[13px] lg:text-[16px]">시간</div>
              {강수형태.map((item, index) => (
                <div className="text-[13px] lg:text-[19px]" key={index}>
                  {String(item.fcstTime).substring(0, 2)}시
                </div>
              ))}
            </div>
            {/* 강수 형태 */}
            <div className="w-[308px] lg:w-[900px] grid grid-cols-7 gap-2 lg:gap-5 text-center items-center">
              <div className="font-bold text-[13px] lg:text-[16px]">강수</div>
              {강수형태.map((item, index) => (
                <div key={index}>
                  {item.fcstValue === "0" ? (
                    <Rain imgName="clear1" Name="없음" />
                  ) : item.fcstValue === "1" ? (
                    <Rain imgName="rain_md1" Name="비" />
                  ) : item.fcstValue === "2" ? (
                    <Rain imgName="rain_snow" Name="비/눈" />
                  ) : item.fcstValue === "3" ? (
                    <Rain imgName="snow_sm1" Name="눈" />
                  ) : item.fcstValue === "5" ? (
                    <Rain imgName="rain_sm1" Name="빗방울" />
                  ) : item.fcstValue === "6" ? (
                    <Rain imgName="rain1" Name="빗방울 날림" />
                  ) : item.fcstValue === "7" ? (
                    <Rain imgName="snow1" Name="눈날림" />
                  ) : null}
                </div>
              ))}
            </div>
            {/* 하늘 상태 */}
            <div className="w-[308px] lg:w-[900px] grid grid-cols-7 gap-2 lg:gap-5 text-center items-center">
              <div className="font-bold text-[13px] lg:text-[16px]">하늘</div>
              {하늘상태.map((item, index) => (
                <div key={index}>
                  {item.fcstValue === "1" ? (
                    <Sky imgName="clear1" Name="맑음" />
                  ) : item.fcstValue === "3" ? (
                    <Sky imgName="cloud_md1" Name="구름많음" />
                  ) : item.fcstValue === "4" ? (
                    <Sky imgName="cloud1" Name="흐림" />
                  ) : null}
                </div>
              ))}
            </div>
            {/* 기온 */}
            <div className="w-[308px] lg:w-[900px] grid grid-cols-7 gap-2 lg:gap-5 text-center ">
              <div className="font-bold text-[13px] lg:text-[16px] h-[25px] lg:h-[50px] flex justify-center items-center">
                기온
              </div>
              {기온.map((item, index) =>
                item.fcstValue > 0 ? (
                  <div
                    key={index}
                    className="text-red-400 text-[13px] lg:text-[19px] my-auto"
                  >
                    {item.fcstValue}℃
                  </div>
                ) : (
                  <div
                    key={index}
                    className="text-blue-500 text-[13px] lg:text-[19px] my-auto"
                  >
                    {item.fcstValue}℃
                  </div>
                )
              )}
            </div>
            {/* 습도 */}
            <div className="w-[308px] lg:w-[900px] grid grid-cols-7 gap-2 lg:gap-5 text-center">
              <div className="font-bold text-[13px] lg:text-[16px] h-[25px] lg:h-[50px] flex justify-center items-center">
                습도
              </div>
              {습도.map((item, index) => (
                <div key={index} className="text-[13px] lg:text-[19px] my-auto">
                  {item.fcstValue}%
                </div>
              ))}
            </div>
            {/* 풍향 */}
            <div className="w-[308px] lg:w-[900px] grid grid-cols-7 gap-2 lg:gap-5 text-center items-center">
              <div className="font-bold text-[13px] lg:text-[16px]">풍향</div>
              {풍향.map((item, index) => {
                const TransValue = Math.floor(
                  (Number(item.fcstValue) + 11.25) / 22.5
                );
                const wind =
                  TransValue === 0 ? (
                    <Wind Rotate="180" Name="북풍" />
                  ) : 1 ? (
                    <Wind Rotate="225" Name="북동풍" />
                  ) : 2 ? (
                    <Wind Rotate="225" Name="북동풍" />
                  ) : 3 ? (
                    <Wind Rotate="225" Name="북동풍" />
                  ) : 4 ? (
                    <Wind Rotate="270" Name="동풍" />
                  ) : 5 ? (
                    <Wind Rotate="315" Name="남동풍" />
                  ) : 6 ? (
                    <Wind Rotate="315" Name="남동풍" />
                  ) : 7 ? (
                    <Wind Rotate="315" Name="남동풍" />
                  ) : 8 ? (
                    <Wind Rotate="0" Name="남풍" />
                  ) : 9 ? (
                    <Wind Rotate="45" Name="남서풍" />
                  ) : 10 ? (
                    <Wind Rotate="45" Name="남서풍" />
                  ) : 11 ? (
                    <Wind Rotate="45" Name="남서풍" />
                  ) : 12 ? (
                    <Wind Rotate="90" Name="서풍" />
                  ) : 13 ? (
                    <Wind Rotate="135" Name="북서풍" />
                  ) : 14 ? (
                    <Wind Rotate="135" Name="북서풍" />
                  ) : 15 ? (
                    <Wind Rotate="135" Name="북서풍" />
                  ) : 16 ? (
                    <Wind Rotate="180" Name="북풍" />
                  ) : null;

                return <div key={index}>{wind}</div>;
              })}
            </div>
            {/* 풍속 */}
            <div className="w-[308px] lg:w-[900px] grid grid-cols-7 gap-2 lg:gap-5 text-center">
              <div className="font-bold text-[13px] lg:text-[16px] h-[25px] lg:h-[50px] flex justify-center items-center">
                풍속
              </div>
              {풍속.map((item, index) => (
                <div key={index} className="text-[13px] lg:text-[16px] my-auto">
                  {item.fcstValue}m/s
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* 
Y = 위도(latitude)는 적도를 기준으로 북쪽 또는 남쪽으로 얼마나 떨어져 있는지를 나타내는 좌표입니다.
X = 경도(longitude)는 본초 자오선을 기준으로 동쪽 또는 서쪽으로 얼마나 떨어져 있는지를 나타내는 좌표입니다.
*/

/* 
      <p>LGT 낙뢰 kA</p>
      <p>
        PTY 강수형태 코드값 0없음 1비 2비/눈 3눈 5빗방울 6빗방울날림 7눈날림
      </p>
      <p>RN1 1시간 강수량 mm ※ -, null, 0값은 ‘강수없음’</p>
      <p>SKY 하늘 상태 코드값 1맑음 3구름많음 4흐림</p>
      <p>T1H 기온 ℃ </p>
      <p>REH 습도 %</p>

      <p>UUU 동서바람성분 m/s</p>
      <p>VVV 남북바람성분 m/s</p>
      <p>VEC 풍향 deg</p>
      <p>WSD 풍속 m/s</p>

      풍향
      0-45 N-NE
      45-90 NE-E
      90-135 E-SE
      135-180 SE-S
      180-225 S-SW
      225-270 SW-W
      270-315 W-NW
      315-360 NW-N
(풍향값 + 22.5 * 0.5) / 22.5) = 변환값(소수점 이하 버림)


 */
