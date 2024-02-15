"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/app/types/User";
const page = ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setisLoading] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const id: number = Number(params.userId);
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`http://localhost:3001/api/users/${id}`)
      .then((res) => {
        if (!res.data.id) {
          setIsFound(false);
          return
        }
        setIsFound(true);
        setUser(res.data);
      })
      .then(() => {
        setisLoading(false);
      });
  }, []);
  if ((!user?.id || !user) && isFound === false) {
    return <div className="flex justify-center">ERROR 404 USER NOT FOUND</div>;
  }
  console.log(user);
  if(isLoading){
    return("loading pa wait pre")
  }
  return (
    <div className="container mx-auto my-60">
      <div>
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
          <div className="flex justify-center">
            <img
              src="https://avatars0.githubusercontent.com/u/35900628?v=4"
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>

          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">
              {user?.firstName + " "} {user?.lastName}
            </h1>
            <p className="text-center text-sm text-gray-400 font-medium">
              UI Components Factory
            </p>
            <p>
              <span></span>
            </p>
            <div className="my-5 px-6">
              <a
                href="#"
                className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
              >
                Connect with{" "}
                <span className="font-bold">
                  {"@" + user?.firstName + user?.age}
                </span>
              </a>
            </div>
            <div className="flex justify-start content-center items-start my-5 px-6 pb-5 gap-2">
              <p className="">Contact me at </p>
              <span>
                <a href="/#" className="no-underline hover:underline ...">
                  {" " + user?.email}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
