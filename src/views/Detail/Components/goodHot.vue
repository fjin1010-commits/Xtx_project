<script setup>
import { fetchHotGoodsAPI } from '@/api/detail';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: Number
  }
});

const route = useRoute();
const goodId = route.params.id;
const hotlist = ref({});
const typeMap = {
  1: '周日榜单',
  2: '24小时热榜'
}


const hotData = ref({
  id: goodId,
  type: props.type
})
 // 调试输出 (查看请求参数
const getHotList = async () => {
  const res = await fetchHotGoodsAPI(hotData.value);
  hotlist.value = res.result;
 
}

onMounted(() => {
  getHotList(); 
});
</script>


<template>
  <div class="goods-hot">
    <h3>{{ typeMap[props.type] }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotlist" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>