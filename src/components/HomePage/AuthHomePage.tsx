import axios from "axios";
import { useEffect, useState } from "react";
import ProfessorInformation from "../../ProfessorInfomation";


export interface IGUserList{
    _id: string;
    name: string;
    email: string;
    role: string;
    _v: number;                 
}

function AuthHomePage() {
    const [users, setUsers] = useState<IGUserList[]>([]);
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("Access token not found. Please log in.");
            return;
        }
        async function fetchData(){
            axios.get("http://localhost:3000/users/list", {
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(response => {
                const userList: IGUserList[] = response?.data?.users || [];
                setUsers(userList)
            })
            .catch(error => {
                alert("Error user fetching userlist");
            });
        }
            fetchData();

    }, []);

  return (
    <div>
      {users?.map((user, index) => {
        return (
          <ProfessorInformation
            email={user?.email}
            id={user?._id}
            name={user?.name}
            key={index}
          />
        );
      })}
    </div>
  );
}

function setUsers(userList: any) {
    throw new Error("Function not implemented.");
}

export default AuthHomePage;