import axios from "axios";

export async function handleUpdateUser({data,url}){
      const token = localStorage.getItem("token");
      try {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url || ''}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === "success") {
          return true;
        }
        if(res.data.status === 'passwordUpdated') {
            localStorage.setItem('token',res.data?.jwt);
            return true;
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
}
