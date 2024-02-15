import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Avatar } from "primereact/avatar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
export default function TitleBar() {
  const startContent = (
    <React.Fragment>
      <div className="flex flex-wrap align-items-center gap-3">
        <Link href="/">
          <Image alt="logo" src="/logo.png" width={50} height={10}></Image>
        </Link>

        <div>
          <h1 className=" lg:text-4xl sm:text-3xl xs:text-3xl font-extrabold leading-none tracking-tight text-white md:text-4xl  dark:text-white">
            User Management App
          </h1>
        </div>
      </div>
    </React.Fragment>
  );

  const centerContent = <></>;

  const endContent = (
    <React.Fragment>
      <Link href="/users">
        <Button
          severity='secondary'
          style={{ color: "white",backgroundColor:"black",border:'none'}}
          label="Dashboard"
          
        ></Button>
      </Link>
      
    </React.Fragment>
  );

  return (
    <div className="card">
      <Toolbar
        start={startContent}
        center={centerContent}
        end={endContent}
        className=" bg-red-600 shadow-2 p-6 rounded-3xl"
      />
    </div>
  );
}
