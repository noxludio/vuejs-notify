<template>
  <v-touch v-if="mounted" ref="notification" class="vue-notification" :style="c_styles">
    <div class="vue-notification-message">
      {{msg}}
    </div>
  </v-touch>
</template>
<script>
export default {
  data(){
    return {
      msg:     null,
      timeout: 6000,
      position: 'bottom center',
      transition: 330,
      marginY: 10,
      marginX: 20,
      opacity: 1,
      notifications: [],
      mounted: false,
      styles: {
        transition: null,
        opacity: null,
        left: null,
        right: null,
        top: null,
        bottom: null,
        animation: null
      },
      appear: {
        'top left':'fromLeft',
        'top right':'fromRight',
        'top center':'fromTop',
        'bottom left':'fromLeft',
        'bottom right':'fromRight',
        'bottom center':'fromBottom',
      }
    }
  },
  computed: {
    c_styles(){
      let styles = Object.assign({},this.styles)
      for (const key in styles) {
        if (styles.hasOwnProperty(key) && typeof styles[key] == 'number') {
          styles[key] = styles[key] + 'px'
        }
      }
      return styles
    },
    center() {
      return (window.innerWidth/2)-(this.$el.clientWidth/2)
    }
  },
  methods: {
    calcPos(){
      let pos = {}
      let yx = this.position.split(' ')
      let x = yx[1] === 'center' ? 'left' : yx[1]
      let y = yx[0]
      pos[y] = this.marginY
      pos[x] = yx[1] === 'center' ? this.center : this.marginX
      return pos
    }
  },
  mounted(){

    this.mounted = true;
    this.styles.transition = `all ${this.transition}ms ease`
    this.styles.opacity = 0
    
    
    this.$nextTick( () => {
      
      this.styles.opacity = this.opacity
      this.styles.animation = `${this.appear[this.position]} ${this.transition}ms forwards`
      setTimeout(()=>this.styles.animation=null,this.transition)

      this.styles = Object.assign(this.styles, this.calcPos())
      let ypos = this.position.split(" ")[0]
      let filtered = this.notifications
        .filter( item => item.position == this.position )
        .forEach( item => {
          item.styles[ypos] += this.$el.clientHeight + this.marginY
        })

      console.log(filtered);

      this.notifications.unshift(this)
    })



    if(this.timeout !== 0) {
      setTimeout(()=>{
        
        this.opacity = 0
        setTimeout(()=>{
          this.$destroy()
          this.$el.parentNode.removeChild(this.$el);
        },this.transition)
  
      }, this.timeout)
    }
  }
  
}
</script>
<style>
.vue-notification {
  position: fixed;
  padding: 16px;
  background: white;
  color: #292929;
  min-width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

@keyframes fromLeft {
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(0%)
  }
}
@keyframes fromRight {
  from {
    transform: translateX(100%)
  }
  to {
    transform: translateX(0%)
  }
}
@keyframes fromTop {
  from {
    transform: translateY(-100%)
  }
  to {
    transform: translateY(0%)
  }
}
@keyframes fromBottom {
  from {
    transform: translateY(100%)
  }
  to {
    transform: translateY(0%)
  }
}

</style>
