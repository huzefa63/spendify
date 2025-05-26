import axios from "axios";

export async function verifyToken() {
  const token = localStorage.getItem("token");
  if(!token) return false;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.status === "verified") {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
