<template>
  <Animation :f0="frame0" :f1="frame1" :f2="frame2"/>
  <div id="main">
    <div class="timer" id="timer">
      {{ display }}
    </div>
    <div v-show="!playing && pomodoro && !paused" class="start-bg">
      <button @click="pomodoro=true; timer(pomo)" class="start" id="start">
        Iniciar pomodoro
      </button>
    </div>

    <div v-show="playing || paused" id="controlers1">
      <button @click="pause" class="playPause" id="playPause">
        <span v-if="!paused"><unicon name='pause' /></span>
        <span v-else><unicon name='play' /></span>
      </button>
      <button @click="restart" class="restart" id="restart"><unicon name='redo' /></button>
    </div>
    <div id="controlers2" v-show="!playing && !pomodoro && !paused">
      <button @click="shb=true ;timer(sh)" class="sh-b" id="sh-b">
        Descanso corto
      </button>
      <button @click="lgb=true;timer(lg)" class="lg-b" id="lg-b">
        Descanso largo
      </button>
    </div>
  </div>
</template>

<script>

import Animation from './Animation.vue'

export default {
  components:{Animation},
  data() {
    return {
      pomo: localStorage.getItem("pomodoro"),
      sh: localStorage.getItem("shb"),
      lg: localStorage.getItem("lgb"),
      playing: false,
      pomodoro: true,
      shb: false,
      lgb: false,
      Timer:0,
      alarm: new Audio(require("@/assets/alarm.wav")),
      oldClock: 0,
      newClock: 0,
      frame1: true,
      frame0: false,
      frame2: false,
      paused: false,
      countdown: null,
      animation: null,
    };
  },
  computed: {
    display() {
      let second = this.Timer;
      //if (this.pomodoro) {
      //  second = this.pomo;
      //  } else if (this.shb) {
      //  second = this.sh;
      //} else if (this.lgb){
      //  second = this.lg;
      //  }else{
      //    second=0
      //  }
      //console.log(second)
      let m = Math.floor(second / 60);
      let s = second - m * 60;
      if (m < 10) {
        m = `0${m}`;
      }
      if (s < 10) {
        s = `0${s}`;
      }
      return `${m}:${s}`;
    },
  },
  methods: {
    timer(time) {
      this.playing = true;
      this.paused = false;
      this.Timer=time
      var T=Date.now()
      console.log(T)
      //var nT
      //this.display(time);
      this.animate();
      this.countdown = setInterval(() => {
        if (this.Timer > 0) {
          var some = Date.now()
         var nT = new Date(some)
          console.log(nT.getHours()+':'+nT.getMinutes()+':'+nT.getSeconds())
          console.log(Math.floor((nT-T)/1000))
         // time-=Math.floor((nT-T)/1000);
          //updating the times on-the-fly
          //if (this.pomodoro) {
          //  this.pomo = time;
          //} else if (this.shb) {
          //  this.sh = time;
          //} else {
          //  this.lg = time;
         // }
         this.Timer=time - Math.floor((nT-T)/1000)
         if(this.Timer<0){
           this.Timer=0
           this.change()
         }
          //console.log(this.pomo)
          //this.display(time);
        } else {
          this.change()
        }
      }, 1000);
    },
    change(){
      
      this.playing = false;
          //chamging the state of the app (sorta)
          if (this.pomodoro) {
            this.Timer = localStorage.getItem("pomodoro");
            this.pomodoro = false;
          } else if (this.shb) {
            this.Timer= localStorage.getItem("shb");
            this.shb = false;
            this.pomodoro = !this.pomodoro;
          } else {
            this.Timer = localStorage.getItem("lgb");
            this.lgb = false;
            this.pomodoro = !this.pomodoro;
          }
            navigator.vibrate([100,50,150,50,50,500])
          
          clearInterval(this.countdown);
          clearInterval(this.animation);
          this.alarm.play();
    },
    pause() {
      this.paused = !this.paused;
      if (this.playing) {
        clearInterval(this.countdown);
        clearInterval(this.animation);
        this.frame0 = false;
        this.frame1 = true;
        this.frame2 = false;
        this.playing = false;
      } else {
        this.playing = false;
          this.timer(this.Timer);
      }
      //console.log(this.paused)
    },
    restart() {
      clearInterval(this.animation);
      this.frame0 = false;
      this.frame1 = true;
      this.frame2 = false;
      clearInterval(this.countdown);
      this.playing = false;
      if (this.pomodoro) {
        this.pomo = localStorage.getItem("pomodoro");
        //this.timer(this.pomo);
      } else if (this.shb) {
        this.sh = localStorage.getItem("shb");
        this.timer(this.sh);
      } else {
        this.lg = localStorage.getItem("lgb");
        this.timer(this.lg);
      }
    },
    animate() {
      let counter = 1;
      let end = false;
      this.animation = setInterval(() => {
        if (counter == 0) {
          this.frame0 = true;
          this.frame1 = false;
          this.frame2 = false;
        } else if (counter == 1) {
          this.frame0 = false;
          this.frame1 = true;
          this.frame2 = false;
        } else {
          this.frame0 = false;
          this.frame1 = false;
          this.frame2 = true;
        }
        if (counter == 2) {
          counter = 1;
          end = true;
        } else if (counter == 1) {
          if (end) {
            counter = 0;
          } else {
            counter = 2;
          }
        } else {
          counter = 1;
          end = false;
        }
      }, 175);
    },
  },
  mounted() {
    this.frame1 = true;
    this.frame0 = false;
    this.frame2 = false;
    this.Timer=this.pomo;
    if (this.pomo == null || this.sh == null || this.lg == null) {
      localStorage.setItem("pomodoro", 1500);
      localStorage.setItem("shb", 300);
      localStorage.setItem("lgb", 600);
      this.pomo = localStorage.getItem("pomodoro");
      this.sh = localStorage.getItem("shb");
      this.lg = localStorage.getItem("lgb");
      this.Timer=this.pomo;
    }
    //this.display(this.pomo);
  },
};
</script>

<style>
</style>