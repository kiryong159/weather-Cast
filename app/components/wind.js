export default function Wind({ Rotate, Name }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[50px] lg:h-[100px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -11 8 11"
          width="100"
          height="100"
          className={`p-1 scale-[75%] rotate-[${Rotate}deg]`}
        >
          <path d="M 0 0 L 4 -11 L 8 0 L 4 -3 L 0 0 Z" fill="#000000" />
        </svg>
        <span className="text-[14px] lg:text-[20px] whitespace-pre">
          {Name}
        </span>
      </div>
    </>
  );
}
