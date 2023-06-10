"use client";

import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { json } from "stream/consumers";

export default function Record(props: any): any {
  const [workData, setWorkData]: any = useState();
  const [isEdit, setIsEdit]: any = useState(false);

  useEffect(() => {
    fetchData();
  }, [props.date]);

  async function fetchData() {
    console.log(props.date);
    if (props.date !== undefined && props.date !== "") {
      const response = await fetch("api/getRecord", {
        method: "POST",
        body: JSON.stringify({ date: props.date }),
      });
      const result = await response.json();
      console.log(result);
      if (result !== null) {
        setWorkData(result);
      } else {
        setWorkData(undefined);
      }
    }
    console.log("useEffect has worked");
  }

  const addRoutine = (index: any): any => {
    var addItem = { weight: "", times: "" };
    let newArr = [...workData.works];
    newArr[index].execution.push(addItem);
    let newObj = { ...workData };
    newObj.works = newArr;
    setWorkData(newObj);
  };

  const addWork = () => {
    var addItem = {
      work_name: "운동명",
      execution: [{ weight: "", times: "" }],
    };
    let newArr = [...workData.works];
    newArr.push(addItem);
    let newObj = { ...workData };
    newObj.works = newArr;
    setWorkData(newObj);
    console.log(workData);
  };

  const createWork = (date: any): any => {
    return {
      title: "하루를 정의해주세요.",
      id: "",
      date: date,
      works: [
        {
          work_name: "운동명",
          execution: [{ weight: "", times: "" }],
        },
      ],
    };
  };
  const editTrt = (data: any) => {
    console.log(data);
    fetch("/api/saveRecord", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {});
  };

  if (workData !== undefined) {
    return (
      <div className="sm:invisible flex flex-col items-center m-0 mt-5 h-max col-span-1">
        <div className="p-0 w-64 h-10 text-2xl text-center">
          {isEdit ? (
            <input
              placeholder={workData.title}
              className="w-64 mx-auto"
              onChange={(e) => {
                var addObj = { ...workData };
                addObj.title = e.target.value;
                setWorkData(addObj);
              }}
            />
          ) : (
            <p>{workData?.title}</p>
          )}
        </div>
        <div className="flex flex-col algin-left w-64">
          {workData?.works.map((item: any, index: any) => {
            return (
              <div key={index}>
                <div className="text-xl mt-2 w-full">
                  {isEdit ? (
                    <div className="flex ">
                      <input
                        name="title"
                        placeholder={item.work_name}
                        type="text"
                        className="w-48"
                        onChange={(e) => {
                          item.work_name = e.target.value;
                        }}
                      />
                      <button
                        className="text-sm"
                        onClick={() => {
                          addRoutine(index);
                        }}>
                        추가
                      </button>
                    </div>
                  ) : (
                    <p>{item.work_name}</p>
                  )}
                </div>
                <div className="text-s w-full my-2">
                  {item.execution.map((i: any, key: number) => {
                    return (
                      <div key={key}>
                        {i.weight === "" ? (
                          <div>
                            <input
                              onChange={(e) => {
                                i.weight = e.target.value;
                              }}
                              placeholder="무게"
                              name="weight"
                              className="w-12"></input>

                            <input
                              onChange={(e) => {
                                i.times = e.target.value;
                              }}
                              placeholder="횟수"
                              name="times"
                              className="w-12"></input>
                          </div>
                        ) : (
                          <ul>{`${i.weight} kg ${i.times} 회`}</ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {isEdit ? (
            <button
              className="text-sm text-right mr-10"
              onClick={() => {
                addWork();
              }}>
              운동추가
            </button>
          ) : (
            <div className="h-5"></div>
          )}
        </div>
        <div className="mt-5">
          <div>
            {isEdit ? (
              <button
                onClick={() => {
                  editTrt(workData);
                  setIsEdit(false);
                }}>
                완료
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEdit(true);
                }}>
                수정
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-full text-2xl">
        <button
          onClick={(e) => {
            setWorkData(createWork(props.date));
            setIsEdit(true);
          }}
          className="m-auto">
          운동추가
        </button>
      </div>
    );
  }
}
