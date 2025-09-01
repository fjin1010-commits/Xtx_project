<script setup>
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';
import { useAddressStore } from '@/stores/address';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useOrderStore } from '@/stores/order';
import router from '@/router';

const route = useRoute();
const userId = route.params.userId;
  // 订单对象 // 地址对象
const orderStore = useOrderStore();
const cartStore = useCartStore();
const addressStore = useAddressStore();
const showDialog = ref(false);
const addFlag = ref(false);
const formRef = ref(null);
const newAddress = ref({
  userId: userId,
  receiver: '',
  number: '',
  address: ''
});

const rules = {
  receiver: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
};

const addAddress = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await addressStore.addAddress(newAddress.value);
    }
    addFlag.value = false;
    newAddress.value = { userId: userId, receiver: '', number: '', address: '' };
  });
  
  
};

const getAddressList = async (userId) => {
  await addressStore.fetchAddressList(userId);
  showDialog.value = true;
};

const selectedAddress = computed(() => {
  return addressStore.addressList.find(i => i.selected) || null;
})

const switchAddress = async (item) => {
  await addressStore.isDefaultAddress(userId,item.addressId);
  await addressStore.fetchAddressList(userId); // 新增：同步最新状态
};

const orderInfo = ref({
  user_id:'',
  receiver: '',
  number: '',
  address: '',
  delivery_type: '',
  pay_type: '',
  post_fee: 0,
  total_amount: 0,
});

const deliveryType = ref('不限送货时间：周一至周日'); // 默认值
const setDeliveryType = (type) => { 
  deliveryType.value = type;
};

const postFee = computed(()=>{
  if(paymentType.value === '货到付款'){
    return 5;
  }
  return 0;
})
const paymentType = ref('在线支付'); // 默认值
const setPaymentType = (type) => {
  paymentType.value = type;
  if(paymentType.value === '货到付款'){
    // 货到付款需加5元手续费
}};

const submitOrder = async () => {
  orderInfo.value.user_id = userId;
  orderInfo.value.receiver = selectedAddress.value.receiver;
  orderInfo.value.number = selectedAddress.value.number;
  orderInfo.value.address = selectedAddress.value.address;
  orderInfo.value.post_fee = postFee.value;
  orderInfo.value.delivery_type = deliveryType.value;
  orderInfo.value.pay_type = paymentType.value;
  orderInfo.value.total_amount = cartStore.selectedTotalPrice + orderInfo.value.post_fee;
  await orderStore.createOrder(orderInfo.value);
  if (orderStore.orderInfo && orderStore.orderInfo.order_id) {
    router.push(`/payment/${orderStore.orderInfo.order_id}`);
  }
};

</script>




<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!selectedAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ selectedAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ selectedAddress.number }}</li>
                <li><span>收货地址：</span>{{ selectedAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="getAddressList(userId)">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in cartStore.selectedItems" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.image" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.price * i.count }}</td>
                <td>&yen;{{ i.price * i.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn" :class="{active: deliveryType === '不限送货时间：周一至周日'}" href="javascript:;" @click="setDeliveryType('不限送货时间：周一至周日')">不限送货时间：周一至周日</a>
          <a class="my-btn" :class="{active: deliveryType === '工作日送货：周一至周五'}" href="javascript:;" @click="setDeliveryType('工作日送货：周一至周五')">工作日送货：周一至周五</a>
          <a class="my-btn" :class="{active: deliveryType === '双休日、假日送货：周六至周日'}" href="javascript:;" @click="setDeliveryType('双休日、假日送货：周六至周日')">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn" :class="{active: paymentType === '在线支付'}" href="javascript:;" @click="setPaymentType('在线支付')">在线支付</a>
          <a class="my-btn" :class="{active: paymentType === '货到付款'}" href="javascript:;" @click="setPaymentType('货到付款')">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ cartStore.selectedTotalItem }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ cartStore.selectedTotalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ postFee}}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ (parseInt(cartStore.selectedTotalPrice) + parseInt(postFee)).toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="submitOrder">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
   <el-dialog v-model="addFlag" title="添加收货地址" width="30%" center>
  <el-form :model="newAddress" :rules="rules" label-width="80px" ref="formRef">
    <el-form-item label="收货人">
      <el-input v-model="newAddress.receiver" prop="receiver" placeholder="请输入收货人"></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="newAddress.number" prop="number" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input v-model="newAddress.address" prop="address" placeholder="请输入详细地址"></el-input>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="addFlag = false">取消</el-button>
      <el-button type="primary" @click="addAddress">确定</el-button>
    </span>
  </template>
</el-dialog>

  <!-- 添加地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" :class="{ active: item.selected === true }" @click="switchAddress(item,item.addressId)" v-for="item in addressStore.addressList" :key="item.addressId">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }}</li>
          <li><span>联系方式：</span>{{ item.number }}</li>
          <li><span>收货地址：</span>{{ item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">  
        <el-button>取消</el-button>
        <el-button type="primary" @click="showDialog = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>