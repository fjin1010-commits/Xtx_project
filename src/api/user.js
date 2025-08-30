import { supabase } from "@/utils/supabase";

export const signUpAPI = async ({ account, password }) => {
  const { data, error } = await supabase
    .from("user")
    .insert([{ account, password }])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {data,error};
};

export const signInAPI = async ({ account }) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("account", account)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {data,error};
}