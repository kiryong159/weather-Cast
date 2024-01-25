export default function Rain({ imgName, Name }) {
  return (
    <div className="flex flex-col justify-center items-center h-[50px] lg:h-[100px]">
      <img
        className="lg:h-[84px]"
        src={`/image/${imgName}.svg`}
        alt={`${imgName}`}
      />
      <span
        className={`${
          String(Name.length) >= 3
            ? String(Name.length) >= 5
              ? "text-[12px]"
              : "text-[14px]"
            : "text-[15px]"
        }  lg:text-[22px] `}
      >
        {Name}
      </span>
    </div>
  );
}
