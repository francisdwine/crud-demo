import React, { PropsWithChildren, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import axios from "axios";
import { FileUpload } from "primereact/fileupload";
export default function CreateModal(
  props: PropsWithChildren<{
    visible: boolean;
    setVisible: (value: boolean) => void;
    setUsersRefresher: (value: boolean) => void;
    refresher: boolean;
  }>
) {
  const [enteredFirstName, setEnteredFirstName] = useState<string>("");
  const [enteredLastName, setEnteredLastName] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredAge, setEnteredAge] = useState<any>("");
  const uploadFile = useRef<File>();
  const toast = useRef<Toast>(null);
  const handleUpload = (e: any) => {
    const file = e.files[0];

    uploadFile.current = file;
  };
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Successfully Created User",
      life: 3000,
    });
  };
  const showError = (error: String) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  };
  const userCreateHandler = (e: any) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("firstName", enteredFirstName);
    formData.append("LastName", enteredLastName);
    formData.append("email", enteredEmail);
    formData.append("age", enteredAge);

    formData.append("file", uploadFile.current);
    console.log(uploadFile.current);
    axios
      .post("http://localhost:3001/api/users/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.error) {
          showError(res.data.message);
          return;
        }

        showSuccess();

        props.setUsersRefresher(!props.refresher);

        props.setVisible(false);
      })
      .catch(function (error) {
        showError(error);
      });
  };
  return (
    <div className="card flex justify-content-center ">
      <Toast ref={toast}></Toast>

      <Dialog
        header="Create User"
        visible={props.visible}
        style={{ width: "50vw" }}
        onHide={() => props.setVisible(false)}
      >
        <div className="card px-5 flex flex-col justify-content-center w-95/100">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">First Name</label>
            <InputText
              value={enteredFirstName}
              onChange={(e) => setEnteredFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Last Name</label>
            <InputText
              value={enteredLastName}
              onChange={(e) => setEnteredLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Email</label>
            <InputText
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <label htmlFor="username">Age</label>
            <InputText
              type="number"
              value={enteredAge}
              max={100}
              min={0}
              onChange={(e) => setEnteredAge(e.target.value)}
            />
          </div>
          <div>
            <FileUpload
              onSelect={(e) => {
                handleUpload(e);
              }}
              // onUpload={}
              name="demo[]"
              url={"/api/upload"}
              // multiple
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            />
          </div>

          <div className="flex justify-end align pt-5">
            <Button
              onClick={(e) => userCreateHandler(e)}
              label="Create"
              color="#9F2B68"
            ></Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
