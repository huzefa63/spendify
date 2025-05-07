import AppNav from "@/app/_components/AppNav"
import { cookies } from "next/headers"



async function AppNavWrapper() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;
    console.log(jwt);
    let user;
   
   try{
     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUser`,{
        headers:{
            Cookie:`jwt=${jwt}`,
        },
        credentials:'include'
    })
    user = await res.json();
    console.log(user)
   }catch(err){
    console.log(err);
   }
    // const user = await res.json();
    
    return (
        <AppNav user={user}/>
    )
}

export default AppNavWrapper
