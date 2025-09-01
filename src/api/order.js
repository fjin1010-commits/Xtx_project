import {supabase} from '@/utils/supabase'

export const addOrderAPI = async (order) => {
  const { data, error } = await supabase
    .from('order')
    .insert([order])
    .select(); // 这样会返回新插入的订单对象（含id）
  return { data, error };
}