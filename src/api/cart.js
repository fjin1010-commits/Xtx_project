import {supabase} from "@/utils/supabase"; 
import { useUserStore } from "@/stores/user";
import router from "@/router";
import { ElMessage } from "element-plus";



const loginChecked = () => {
  const userStore = useUserStore();
  if (!userStore.userInfo.id) {
    ElMessage.error("User not logged in");
    router.push("/login");
    return;
  }
};

export const getCartAPI = async (userId) => {
  loginChecked();
  const { data, error } = await supabase.from("cart").select("*").eq("userId", userId).order("added_at", { ascending: true });
  return { data, error };
};

export const addCartAPI = async (cartItem) => {
  loginChecked();
  const { data:exist } = await supabase
    .from("cart")
    .select("*")
    .eq("userId", cartItem.userId)
    .eq("skuId", cartItem.skuId);
  if (exist && exist.length > 0) {
    // 已存在，更新数量
    const newCount = exist[0].count + cartItem.count;
    const { data:updatedData, error } = await supabase
      .from("cart")
      .update({ count: newCount })
      .eq("userId", cartItem.userId)
      .eq("skuId", cartItem.skuId);
    return { data: updatedData, error };
  } else {
    const { data:insertData, error } = await supabase.from("cart").insert([cartItem]);
    return { data: insertData, error };
  }
};

export const removeCartAPI = async (cartItem) => {
  loginChecked();
  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("userId", cartItem.userId)
    .eq("skuId", cartItem.skuId);
  return { data, error };
}

export const updateCheckedStateAPI = async (cartItem, checked) => {
  loginChecked();
  const { data, error } = await supabase
    .from("cart")
    .update({ checked })
    .eq("userId", cartItem.userId)
    .eq("skuId", cartItem.skuId);
  return { data, error };
}

export const updateAllCheckedStateAPI = async (userId, checked) => {
  loginChecked();
  const { data, error } = await supabase
    .from("cart")
    .update({ checked })
    .eq("userId", userId);
  return { data, error };
} 
