export const loginUser = async (email:string, password:string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if(!res.ok){
    throw new Error("Failed to get user.")
  }
  return res.json();
};
