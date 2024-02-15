"use server";
import { useState, useEffect } from "react";
import  Link  from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Card } from "primereact/card";
import { User } from "./types/User";
import { Avatar } from "primereact/avatar";
import { Metadata } from "next";
const header = (firstLetter: string) => (
  <div className="flex justify-center">
    <Avatar
      label={firstLetter}
      style={{ height: "100px", width: "100px", fontSize: "1000" }}
      shape="circle"
    />
  </div>
);
const footer = (id:string) => (
  <div>
    <Link href={"/users/"+id}>
      <Button style={{backgroundColor:'black', border:'none', }}label="View Profile"></Button>
    </Link>
  </div>
);

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:3001/api/users/", {
    next: { revalidate: 10 },
  });

  return res.json();
}

export default async function Home() {
  let [userData] = await Promise.all([getUsers()]);
  return (
    <main className={styles.main}>
      <div className="grid grid-cols-4 gap-4">
        {userData.map((user) => (
          <Card
            title={user.firstName}
            header={header(user.firstName[0])}
            footer={footer(user.id.toString())}
          >
            <h1>Details</h1>
            <p className="m-0">
              Full Name: {user.firstName + " " + user.lastName}
            </p>
            <p className="m-0">Email: {user.email}</p>
            <p className="m-0">Age: {user.age}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
