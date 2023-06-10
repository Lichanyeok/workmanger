export default function Loading() {
  let style =
    "m-1 mt-2 desktop:mt-3 w-full desktop:w-full  h-24 desktop:h-28 bg-midnight rounded-lg";
  return (
    <div className="h-screen desktop:h-5/6 w-screen desktop:w-full animate-blink ">
      <div className={style}></div>
      <div className={style}></div>
      <div className={style}></div>
      <div className={style}></div>
      <div className={style}></div>
    </div>
  );
}
