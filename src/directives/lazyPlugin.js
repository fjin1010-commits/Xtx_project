import { useIntersectionObserver } from "@vueuse/core";


export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        console.log('img-lazy directive mounted', el, binding.value);
        const{stop} = useIntersectionObserver(
          el,
          ([entry]) => {
            if (entry.isIntersecting) {
              el.src = binding.value
              stop(); // 停止观察
            }
          },
        )
      }
    })
  }
}


