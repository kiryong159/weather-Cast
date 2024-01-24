"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function HomeClient({ apikey }) {
  const { register, handleSubmit } = useForm();
  const [ocid, setOcid] = useState();

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate() - 1).padStart(2, "0");
  const combineDate = `${year}-${month}-${day}`;

  const onValid = async (data) => {
    const characterName = data.charaName;
    const urlString =
      "https://open.api.nexon.com/maplestory/v1/id?character_name=" +
      characterName;

    const findOcid = await fetch(urlString, {
      headers: { "x-nxopen-api-key": apikey },
    })
      .then((r) => r.json())
      .then((r) => {
        return r.ocid;
      });
    console.log(findOcid);

    const HexaUrl = `https://open.api.nexon.com/maplestory/v1/character/hexamatrix?ocid=${findOcid}&date=${combineDate}`;
    const findHexa = await fetch(HexaUrl, {
      headers: { "x-nxopen-api-key": apikey },
    })
      .then((r) => r.json())
      .then((r) => {
        return r;
      });
    // 기준일 r.date 핵사 r.cahra_hexa 어쩌구
    console.log(findHexa);

    const skillUrl = `https://open.api.nexon.com/maplestory/v1/character/skill?ocid=${findOcid}&date=${combineDate}&character_skill_grade=5`;
    const find5skill = await fetch(skillUrl, {
      headers: { "x-nxopen-api-key": apikey },
    })
      .then((r) => r.json())
      .then((r) => {
        return r;
      });
    console.log(find5skill);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("charaName")} className="bg-gray-200" type="text" />
        <button>제출</button>
      </form>
    </div>
  );
}
