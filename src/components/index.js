import picList from "./ImageView/picList.vue";
import XtxSku from "./XtxSku/index.vue";

const componentsPlugin = {
  install(app) {
    app.component("PicList", picList);
    app.component("XtxSku", XtxSku);
  }
}

export default componentsPlugin;