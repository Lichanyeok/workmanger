"use client";

import { useEffect, useState } from "react";
import Daybar from "./Daybar";
import Record from "./Record";
import TestModal from "../modal/TestModal";
import { useDidMountEffect } from "@/useDidMountEffect";
import Loading from "../assets/Loading";
import { signIn } from "next-auth/react";

export default function Calendar<T>(props: any) {
  const [monthVal, setMonthVal] = useState(0);
  const [today, setToday] = useState("");
  const [dateClickChecker, setDateClickChecker]: any = useState();
  const [onModal, setOnModal] = useState(false);
  const [cheCal, setCheCal]: any = useState([]);
  const [loading, setLoading] = useState(false);

  const useWidth = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const handleResize = () => setWindowWidth(window.innerWidth);
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);
    return windowWidth;
  };

  useEffect(() => {
    var currDate = new Date();
    setMonthVal(currDate.getMonth());
    setToday(toStringByFormatting(currDate));
    setDateClickChecker(currDate.getDate());
    checkWorkData(currDate.getMonth());
  }, []);

  useDidMountEffect(() => {
    checkWorkData(monthVal);
  }, [monthVal]);

  function leftPad(value: number): number | string {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function toStringByFormatting(source: any) {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join("/");
  }

  const getCalendar = () => {
    const currDateObj = new Date();
    const firstYear = currDateObj.getFullYear();

    let weekArr = new Array();
    let pushDate;
    for (var i = 1; i <= 365; i++) {
      pushDate = new Date(firstYear, 0, i);
      weekArr.push(toStringByFormatting(pushDate));
    }

    const monthArr = new Array();

    for (var i = 1; i <= 12; i++) {
      var loopDateObj = new Date(2023, i, 0);
      var idx = Number(loopDateObj.toString().split(" ", 3)[2]);

      monthArr.push(weekArr.splice(0, idx));

      let spaceCnt = new Date(monthArr[i - 1][1]).getDay();

      for (var j = 1; j < spaceCnt; j++) {
        monthArr[i - 1].unshift("");
      }
    }
    return monthArr;
  };

  async function checkWorkData(month: number) {
    if (props.session == "null" || props.session == undefined) {
      signIn();
    }
    setLoading(true);
    let calendar = getCalendar();
    let dates = calendar[month];

    let response = await fetch("api/checkWorkData", {
      method: "POST",
      body: JSON.stringify({ email: props.session.user.email, dates: dates }),
    });
    let result = await response.json();
    setLoading(false);
    setCheCal(result);
  }
  return (
    <div className="flex flex-col m-0 desktop:mt-4s h-max w-full mr-auto">
      <div className="flex flex-row mx-2">
        <button
          onClick={() => {
            if (monthVal != 0) {
              setMonthVal(monthVal - 1);
            }
          }}>
          back
        </button>
        <div className="m-5 text-3xl">{monthVal + 1}</div>
        <button
          onClick={() => {
            if (monthVal < 11) {
              setMonthVal(monthVal + 1);
            }
          }}>
          next
        </button>
      </div>
      <div className="grid grid-cols-3 h-screen w-screen desktop:h-max desktop:w-full text-xl desktop:text-lg">
        <div className="flex flex-col col-span-3 w-full mx-2 desktop:col-span-2">
          <Daybar />
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-7 animate-caload">
              {cheCal?.map((item: any, index: number) => {
                return (
                  <div
                    className="mt-2 w-full h-24"
                    key={index}
                    onClick={(e) => {
                      setToday(item.date);
                      setOnModal(true);
                      setDateClickChecker(item.date.split("/")[2]);
                    }}>
                    {dateClickChecker != item.date.split("/")[2] ? (
                      <h1>{item.date.split("/")[2]}</h1>
                    ) : (
                      <h1 className="text-2xl desktop:text-xl">
                        {item.date.split("/")[2]}
                      </h1>
                    )}
                    {item.checker ? (
                      <div className="w-fit px-2 mt-2 text-sm desktop:text-base">
                        <p className=" bg-marker rounded-lg ">오운완</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {useWidth() > 1280 ? (
          <Record date={today} session={props.session} />
        ) : onModal ? (
          <TestModal setOnModal={() => setOnModal(false)}>
            <Record date={today} session={props.session} />
          </TestModal>
        ) : null}
      </div>
    </div>
  );
}
