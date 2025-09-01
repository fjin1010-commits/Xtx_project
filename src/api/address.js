import {supabase} from '../utils/supabase';

export const getAddressListAPI = async (userId) => {
  const { data, error } = await supabase
    .from('address')
    .select('*')
    .eq('userId', userId)
    .order('created_at', { ascending: true });
  return { data, error };
};

export const selectedAddressAPI = async (userId, addressId) => {
  await allFalseAPI(userId);
  const { data, error } = await supabase
    .from('address')
    .update({ selected: true })
    .eq('userId', userId)
    .eq('addressId', addressId)
  return { data, error };
};

export const allFalseAPI = async (userId) => {
  const { data, error } = await supabase
    .from('address')
    .update({ selected: false })
    .eq('userId', userId);
  return { data, error };
}

export const addAddressAPI = async (address) => {
  const { data, error } = await supabase
    .from('address')
    .insert([address]);
  return { data, error };
}

export const ifOneAddressAPI = async ( userId) => {
 const { data: list } = await getAddressListAPI(userId);
  if (list && list.length === 1) {
    const { data, error } = await supabase
      .from('address')
      .update({ selected: true })
      .eq('userId', userId)
      .eq('addressId', list[0].addressId); // 只更新这一条
    return { data, error };
  }
}