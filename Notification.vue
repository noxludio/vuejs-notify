<template>
  <v-touch v-if="mounted"  ref="notification" class="vue-notification" :style="c_styles" :class="classes" @pan="pan" :pan-options="{ direction: 'horizontal' }">
    <div @click="notifyClicked">
      <div v-if="title"  class="vue-notification-title" v-html="title"></div>
      <div v-if="msg" class="vue-notification-msg" v-html="msg"></div>
      <div v-if="component" class="vue-notification-component">
        <component :is="component" v-bind="componentProps" />
      </div>
      <div v-if="c_buttons && c_buttons.length > 0" class="vue-notification-buttons">
        <button v-for="button in c_buttons" :key="button.uid" @click="(button[_uid+'_click']||noop)()">
          <span class="button-custom-element" v-if="button.html" v-html="button.html"></span>
          <span v-if="button.text">{{button.text}}</span>
        </button>
      </div>
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
      opacity: 1,
      componentProps: {},
      component: null,
      buttons: [],
      compButtons: [],
      treshold: 130,
      holding: false,
      temp_transition: null,
      timeout_ended: false,
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
        transform: null,
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
        'before-close': [],
        mounted: [],
        click: []
      }
    }
  },
  computed: {
    ypos(){
      return this.position.split(" ")[0]
    },
    c_buttons(){
      
      if(Array.isArray(this.buttons)){
        this.buttons.forEach( (btn,index) => { 
          btn.uid = btn.uid || Date.now()+index
          btn[this._uid+'_click'] = (event) => {
            (btn.click || function(){}).apply(this, [this, event, btn])
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
    },
    isOffScreen(){
      return this.styles[this.ypos] > window.innerHeight
    }
  },
  methods: {
    notifyClicked(clickEvent){
      this.fire('click', [this, clickEvent])
    },
    fire(eventName, args){

      args = Array.isArray(args) ? args : [args]

      this.events[eventName]
      .filter( fn => typeof fn == 'function' )
      .forEach( fn => fn.apply(this, args) )
    },
    on(eventName, fn){
      this.events[eventName].push(fn)
    },
    noop(){},
    pan(event){
      // console.log(event)

      if(this.temp_transition === null) {
        this.temp_transition = this.styles.transition
      }
      this.styles.transition = null
      this.styles.transform = `translateX(${event.deltaX}px)`
      this.holding = true

      if(event.isFinal){

        this.holding = false


        this.styles.transition = this.temp_transition
        this.temp_transition = null
        let target = 0
        
        if(this.timeout_ended) this.close()

        if(Math.abs(event.deltaX) > this.treshold) {
          target = event.deltaX > 0 ? 100 : -100
          this.close()
        }
        
        setTimeout(()=>{
          this.styles.transform = `translateX(${target}%)`
        },1)
      }
      

    },
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

      this.fire('before-close', this)

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
        this.$el.remove();
      },this.transition)
    }
  },
  mounted(){
    this.styles.transition = `all ${this.transition}ms ease`
    this.styles.opacity = 0
    this.mounted = true;
    this.$nextTick( () => {
      this.fire('mounted', this)
      this.styles.opacity = this.opacity
      this.styles.animation = `${this.appear[this.position]} ${this.transition}ms forwards`
      setTimeout(()=>this.styles.animation=null,this.transition)
      Object.assign(this.styles, this.calcPos())

      this.notifications
        .filter( item => item.position == this.position )
        .forEach( item => {
          item.styles[this.ypos] += this.$el.clientHeight + this.marginY
          // if(item.isOffScreen) item.close()
      })

      if(this.notifications.length > 40) {
        let overflow = this.notifications.pop()
        overflow.$destroy()
        if(overflow.$el) overflow.$el.remove();
      }

      this.notifications.unshift(this)
    })

    if(this.timeout && this.timeout > 0) {
      setTimeout(()=>{
        this.timeout_ended = true
        if(!this.holding) this.close()
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
  --button-background-hover: rgb(236, 236, 236);
  --button-background-shadow: rgb(236, 236, 236);
  --title-border-color: rgb(241, 241, 241);
  --button-background: white;
  --button-border: 1px solid rgb(190, 189, 189);
  --button-color: #292929;
}
.vue-notification.warning {
  color: #711d1c;
  background: rgb(255, 224, 151);
  border: 1px solid rgb(247, 188, 86);
  --button-background-hover: rgb(247, 188, 86);
  --button-background-shadow: rgb(247, 188, 86);
  --title-border-color: rgb(247, 188, 86);
  --button-background: #ffe3a2;
  --button-border: 1px solid rgb(208, 159, 76);
  --button-color: #711d1c;
}
.vue-notification.error {
  color: #ffffff;
  background: rgb(218, 75, 75);
  border: 1px solid transparent;
  --button-background-hover: rgb(218, 75, 75);
  --button-background-shadow: #de5d5d;
  --title-border-color: rgb(193, 58, 58);
  --button-background: #de5d5d;
  --button-border: 1px solid rgb(183, 66, 66);
  --button-color: white;
}
.vue-notification.success {
  color: white;
  background: rgb(78, 189, 114);
  border: 1px solid #63b76e;
  --button-background-hover: rgb(93, 220, 134);
  --button-background-shadow: rgb(93, 220, 134);
  --title-border-color: #40ab63;
  --button-background: #53ce7b;
  --button-border: 1px solid #3f9c63;
  --button-color: #ffffff;
}
.vue-notification.info {
  color: #ffffff;
  background: rgb(96, 75, 218);
  border: 1px solid transparent;
  --title-border-color: rgb(74, 56, 179);
  --button-background-hover: rgb(96, 75, 218);
  --button-background-shadow: #705dde;
  --button-background: #705dde;
  --button-border: 1px solid rgb(76, 61, 167);
  --button-color: white;
}

.vue-notification-title {
  font-weight: bold;
  padding: 3px 12px;
  border-bottom: 1px solid var(--title-border-color);
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
  background: var(--button-background);
  border: var(--button-border);
  color: var(--button-color);
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 5px;
  transition: all .14s ease;
}
.vue-notification-buttons button:hover {
  background: var(--button-background-hover);
}
.vue-notification-buttons button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--button-background-shadow);
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
