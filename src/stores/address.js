import { defineStore } from "pinia";
import { getAddressListAPI, addAddressAPI, selectedAddressAPI} from "@/api/address";

export const useAddressStore = defineStore("address", {
  state: () => ({
    addressList: [],
  }),
  actions: {
    async fetchAddressList(userId) {
      const { data, error } = await getAddressListAPI(userId);
      if (data) {
        this.addressList = data;
      }

      return { data, error };
    },
    async addAddress(address) {
      await addAddressAPI(address);
      await getAddressListAPI(address.userId);
    },
    async isDefaultAddress(userId,addressId){
      await selectedAddressAPI(userId,addressId);
      this.selectedAddress = addressId;
    }
  },
});
