import axios from "@/api/request";

export const login = (user,password,typeUser)=> axios({url:`/login?id=${user}&password=${password}&type=${typeUser}`,})