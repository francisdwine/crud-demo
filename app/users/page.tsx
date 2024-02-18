"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PrimeIcons } from "primereact/api";
import CreateModal from "@/components/users/createModal";
import UpdateModal from "@/components/users/updateModal";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import { User } from "../types/User";

const UsersPage = () => {
  // modal props
  const [cVisible, setCVisible] = useState(false);
  const [uVisible, setUVisible] = useState(false);

  const [selectedId, setSelectedId] = useState(0);

  const [users, setUsers] = useState<User[]>([]);
  const [usersRefresher, setUsersRefresher] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const paginatorLeft = <Button type="button" icon={PrimeIcons.PLUS} text />;

  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  // const DUMMY_DATA: User[] = [
  //   {
  //     id: 2,
  //     firstName: "francis",
  //     lastName: "dwine",
  //     age: 2,
  //     email: "francisbendulo@gmail.com",
  //   },
  // ];
    
    
  useEffect(() => {
    setIsDataLoading(true);
    var delayInMilliseconds = 5000; //1 second

    setTimeout(function () {
      //your code to be executed after 1 second
    }, delayInMilliseconds);
    const res=axios
      .get("http://localhost:3001/api/users/")
      .then((res) => {
        if(!res.data.error){
        setUsers(res.data);
        }
        setIsDataLoading(false);
      })
      .catch((err) => {
        console.log("error because:" + err);
      });
    
  }, [usersRefresher]);

  const deleteHandler = (e: any, id: number): void => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/api/users/${id}`)
      .then((res) => {
        setUsersRefresher(!usersRefresher);
      })
      .catch((err) => {
        console.log("error because:" + err);
      });
  };

  return (
    <Fragment>
      <div className="flex justify-end px-10 py-5">
        <Button
          iconPos="right"
          severity="secondary"
          onClick={() => {
            setCVisible(true);
          }}
          icon={PrimeIcons.PLUS}
          label="create user"
        />
      </div>
      <UpdateModal
        visible={uVisible}
        setVisible={setUVisible}
        selectedId={selectedId}
        refresher={usersRefresher}
        setUsersRefresher={setUsersRefresher}
      ></UpdateModal>
      <CreateModal
        visible={cVisible}
        setVisible={setCVisible}
        refresher={usersRefresher}
        setUsersRefresher={setUsersRefresher}
      ></CreateModal>
      <div className="card px-10 shadow-lg m-5 rounded-lg">
        {isDataLoading && (
          <>
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </>
        )}
        {!isDataLoading && (
          <DataTable
            value={users}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
          >
            <Column
              field="firstName"
              header="First Name"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="lastName"
              header="Last Name"
              style={{ width: "20%" }}
            ></Column>
            <Column field="age" header="Age" style={{ width: "20%" }}></Column>
            <Column
              field="email"
              header="Email"
              style={{ width: "20%" }}
            ></Column>
            <Column
              body={(props, data) => (
                <div className="flex flex-row gap-2">
                  <Button
                    onClick={(e) => {
                      setSelectedId(props.id);
                      setUVisible(true);
                    }}
                    label="Update"
                    outlined
                  ></Button>
                  <Button
                    onClick={(e) => {
                      deleteHandler(e, props.id);
                    }}
                    severity="danger"
                    label="Delete"
                    outlined
                  ></Button>
                </div>
              )}
              header="Actions"
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        )}
      </div>
    </Fragment>
  );
};

export default UsersPage;
