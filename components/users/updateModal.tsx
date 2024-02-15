import React, { PropsWithChildren, useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import axios from "axios";
export default function CreateModal(
 
  props: PropsWithChildren<{
    visible: boolean,
    setVisible: (value: boolean) => void,
    setUsersRefresher: (value: boolean) => void,
    refresher:boolean,
    selectedId:number,
  }>
) {
  const[modalRefresher,setModalRefresher]=useState<boolean>(false);
  const [enteredFirstName, setEnteredFirstName] = useState<string>("");
  const [enteredLastName, setEnteredLastName] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredAge, setEnteredAge] = useState<any>("");
  
  const toast = useRef<Toast>(null);
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Successfully Updated User",
      life: 3000,
    });
  };
  const showError = (error: String) => {
    toast.current?.show({
      severity: "error",
      summary: "Error Updating",
      detail: error,
      life: 3000,
    });
  };
  const userUpdateHandler = () => {
    console.log(props.selectedId)
    axios
      .put(`http://localhost:3001/api/users/${props.selectedId}`, {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        age: Number(enteredAge),
      })
      .then( (res)=> {
        if(res.data.error){
          showError(res.data.message);
          return
        }
        
        showSuccess();
       
        props.setUsersRefresher(!props.refresher)
        
        props.setVisible(false);
      })
      .catch((error)=> {
        // showError(error);
        console.log(error)
      });
  };

  useEffect(()=>{
    axios
      .get(`http://localhost:3001/api/users/${props.selectedId}`,)
      .then(async function (response) {
        console.log('dri')
        console.log(response.data)
        const {email,firstName,lastName,age}=response.data
        setEnteredAge(age)
        setEnteredEmail(email)
        setEnteredFirstName(firstName)
        setEnteredLastName(lastName)
        
      })
      .catch(function (error) {
        showError(error);
      });
  },[props.selectedId])
  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>

      <Dialog
        header="Update User"
        visible={props.visible}
        style={{ width: "50vw" }}
        onHide={() => props.setVisible(false)}
      >
        <div className="card px-5 flex flex-col justify-content-center w-95/100">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">First Name</label>
            <InputText
              value={enteredFirstName}
              onChange={(e) => {
                setEnteredFirstName(e.target.value);
                setModalRefresher(!modalRefresher);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Last Name</label>
            <InputText
              value={enteredLastName}
              onChange={(e) => {
                setEnteredLastName(e.target.value);
                setModalRefresher(!modalRefresher);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Email</label>
            <InputText
              value={enteredEmail}
              onChange={(e) => {
                setEnteredEmail(e.target.value);
                setModalRefresher(!modalRefresher);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <label htmlFor="username">Age</label>
            <InputText
            min={0}
            max={150}
              type="number"
              value={enteredAge}
              onChange={(e) => {
                setEnteredAge(e.target.value);
                setModalRefresher(!modalRefresher);
              }}
            />
          </div>
          <div className="flex justify-end align pt-5">
            <Button
              onClick={()=>userUpdateHandler()}
              label="Update"
              color="#9F2B68"
            ></Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
