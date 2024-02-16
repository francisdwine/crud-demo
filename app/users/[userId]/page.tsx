// "use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/app/types/User";

function getProfileData(id: string) {
  const res = axios
    .get(`http://localhost:3001/api/users/${id}`)
    .then((res) => {
      if (!res.data.id) {
        console.log;
        return;
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  return res;
}
const page = async ({ params }: { params: { userId: string } }) => {
  const id: number = Number(params.userId);
  const user: User | void = await getProfileData(id.toString());

  if (!user?.id) {
    return (
      <div>
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
  <div className="rounded-lg bg-white p-8 text-center shadow-xl">
    <h1 className="mb-4 text-4xl font-bold">404</h1>
    <p className="text-gray-600">Oops! The page you are looking for could not be found.</p>
    <a href="/" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Go back to Home </a>
  </div>
</div>
      </div>
    );
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
              {user!.firstName + " "} {user!.lastName}
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
                  {"@" + user!.firstName + user!.age}
                </span>
              </a>
            </div>
            <div className="flex justify-start content-center items-start my-5 px-6 pb-5 gap-2">
              <p className="">Contact me at </p>
              <span>
                <a href="/#" className="no-underline hover:underline ...">
                  {" " + user!.email}
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
