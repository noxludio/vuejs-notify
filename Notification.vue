<template>
  <v-touch v-if="mounted" ref="notification" class="vue-notification" :style="c_styles" :class="classes">
    <div v-if="title" class="vue-notification-title">{{title}}</div>
    <div v-if="msg" class="vue-notification-msg" v-html="msg"></div>
    <div v-if="component" class="vue-notification-component">
      <component :is="component" v-bind="componentProps" />
    </div>
    <div v-if="c_buttons && c_buttons.length > 0" class="vue-notification-buttons">
      <button v-for="button in c_buttons" :key="button.uid" @click="button._click">
        <span class="button-custom-element" v-if="button.customElement" v-html="button.customElement"></span>
        <span v-if="button.text">{{button.text}}</span>
      </button>
    </div>

  </v-touch>
</template>
<script>
export default {
  data(){
    return {
      title: null,
      msg: null,
      classes: null,
      timeout: 6000,
      position: 'bottom center',
      transition: 330,
      marginY: 10,
      marginX: 20,
      notifications: [],
      mounted: false,
      opacity: 0.9,
      componentProps: {},
      component: null,
      buttons: [],
      styles: {
        minWidth: 200,
        maxWidth: 350,
        width: null,
        transition: null,
        opacity: null,
        left: null,
        right: null,
        top: null,
        bottom: null,
        animation: null,
        pointerEvents: null
      },
      appear: {
        'top left':'fromLeft',
        'top right':'fromRight',
        'top center':'fromTop',
        'bottom left':'fromLeft',
        'bottom right':'fromRight',
        'bottom center':'fromBottom',
      },
      events: {
        close: [],
        mounted: []
      }
    }
  },
  computed: {
    fire(event, args){
      this.events[event]
      .filter( fn => typeof fn == 'function' )
      .forEach( fn => fn.apply(this, args) )
    },
    ypos(){
      return this.position.split(" ")[0]
    },
    c_buttons(){
      
      if(Array.isArray(this.buttons)){
        this.buttons.forEach( (btn,index) => { 
          btn.uid = btn.uid || Date.now()+index
          btn._click = (event) => {
            (btn.click || function(){}).apply(this, [this, event])
          }
        })
        return this.buttons
      } else return []
    },
    c_styles(){
      let styles = Object.assign({},this.styles)
      for (const key in styles) {
        if (styles.hasOwnProperty(key) && key != 'opacity' && typeof styles[key] == 'number') {
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
    },
    close(){
      this.styles.opacity = 0
      this.styles.pointerEvents = 'none'
      let index = this.notifications.findIndex( n => n._uid == this._uid)
      this.notifications.slice(index)
        .filter( item => item.position == this.position )
        .forEach( item => {
          item.styles[this.ypos] -= this.$el.clientHeight + this.marginY
      })
      setTimeout(()=>{
        this.notifications = this.notifications.filter( item => item._uid != this._uid )
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el);
      },this.transition)
    }
  },
  mounted(){
    this.styles.transition = `all ${this.transition}ms ease`
    this.styles.opacity = 0
    this.mounted = true;
    this.$nextTick( () => {
      this.styles.opacity = this.opacity
      this.styles.animation = `${this.appear[this.position]} ${this.transition}ms forwards`
      setTimeout(()=>this.styles.animation=null,this.transition)

      this.styles = Object.assign(this.styles, this.calcPos())

      this.notifications
        .filter( item => item.position == this.position )
        .forEach( item => {
          item.styles[this.ypos] += this.$el.clientHeight + this.marginY
        })

      this.notifications.unshift(this)
    })

    if(this.timeout && this.timeout > 0) {
      setTimeout(()=>{
        this.close()
      }, this.timeout)
    }
  }
  
}
</script>
<style>
.vue-notification {
  position: fixed;
  background: white;
  color: #292929;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 4px;
}

.vue-notification-title {
  font-weight: bold;
  padding: 3px 12px;
  border-bottom: 1px solid rgb(241, 241, 241);
  font-size: 12px;
}
.vue-notification-msg {
  font-size: 13px;
  padding: 5px 12px;
}
.vue-notification-buttons {
  padding: 5px;
  display: flex;
  justify-content: flex-end;
}
.vue-notification-buttons button {
  font-size: 12px;
  border: 1px solid rgb(223, 223, 223);
  padding: 2px 6px;
  background: white;
  border-radius: 4px;
  margin-left: 5px;
}

.vue-notification-buttons button .button-custom-element + span {
  margin-left: 5px;
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
