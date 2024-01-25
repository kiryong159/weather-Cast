export default function Sky({ imgName, Name }) {
  return (
    <div className="flex flex-col justify-center items-center h-[50px] lg:h-[100px]">
      <img
        className="lg:h-[84px]"
        src={`/image/${imgName}.svg`}
        alt={`${imgName}`}
      />
      <span className="text-[16px] lg:text-[22px]">{Name}</span>
    </div>
  );
}
