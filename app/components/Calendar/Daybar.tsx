export default function Daybar() {
  const dayCss = "m-5 mt-0";
  return (
    <div className="grid grid-cols-7 justify-items-center font-semibold">
      <div className={dayCss}>일</div>
      <div className={dayCss}>월</div>
      <div className={dayCss}>화</div>
      <div className={dayCss}>수</div>
      <div className={dayCss}>목</div>
      <div className={dayCss}>금</div>
      <div className={dayCss}>토</div>
    </div>
  );
}
