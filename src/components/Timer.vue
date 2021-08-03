<template>
  <div id="main">
    <div class="timer" id="timer">
      {{display}}
    </div>
    <div v-show="!playing && pomodoro && !paused" class="start-bg">
      <button @click="timer(pomo)" class="start" id="start">
        Start pomodoro
      </button>
    </div>

    <div v-show="playing || paused" id="controlers1">
      <button @click="pause" class="playPause" id="playPause">
        <span v-if="!paused">Pause</span>
        <span v-else>Play</span>
      </button>
      <button @click="restart" class="restart" id="restart">Restart</button>
    </div>
    <div id="controlers2" v-show="!playing && !pomodoro && !paused">
      <button @click="timer(sh)" class="sh-b" id="sh-b">
        Start short break
      </button>
      <button @click="timer(lg)" class="lg-b" id="lg-b">
        Start long break
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pomo: localStorage.getItem("pomodoro"),
      sh: localStorage.getItem("shb"),
      lg: localStorage.getItem("lgb"),
      playing: false,
      pomodoro: true,
      shb: false,
      lgb: false,
      alarm: new Audio(require("@/assets/alarm.wav")),
      oldClock: 0,
      newClock: 0,
      frame1: true,
      frame0: false,
      frame2: false,
      paused: false,
      countdown:null,
    };
  },
  computed: {
    display() {
        let second =0
      if (this.pomodoro) {
        second=this.pomo;
      } else if (this.shb) {
        second= this.sh;
      } else {
        second= this.lg;
      }
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
      //this.display(time);
      //this.animate();
      this.countdown = setInterval(() => {
        if (time > 0) {
          time--;
          //updating the times on-the-fly
          if (this.pomodoro) {
            this.pomo = time;
          } else if (this.shb) {
            this.sh = time;
          } else {
            this.lg = time;
          }
          //console.log(this.pomo)
          //this.display(time);
        } else {
          this.alarm.play();

          //chamging the state of the app (sorta)
          if (this.pomodoro) {
            this.pomo = localStorage.getItem("pomodoro");
            this.pomodoro = !this.pomodoro;
          } else if (this.shb) {
            this.sh = localStorage.getItem("shb");
            this.shb = !this.shb;
            this.pomodoro = !this.pomodoro;
          } else {
            this.lg = localStorage.getItem("lgb");
            this.lgb = !this.lgb;
            this.pomodoro = !this.pomodoro;
          }

          this.playing = false;
          clearInterval(this.countdown);
        }
      }, 1000);
    },
    pause() {
      this.paused = !this.paused;
      if (this.playing) {
        clearInterval(this.countdown);
        //clearInterval(animation);
        this.frame0 = false;
        this.frame1 = true;
        this.frame2 = false;
        this.playing = false;
      } else {
        this.playing = false;
        if (this.pomodoro) {
          this.timer(this.pomo);
        } else if (this.shb) {
          this.timer(this.sh);
        } else {
          this.timer(this.lg);
        }
      }
      //console.log(this.paused)
    },
    restart() {
      //clearInterval(animation);
      //this.frame0 = false;
      //this.frame1 = true;
      //this.frame2 = false;
      clearInterval(this.countdown);
      if (this.pomodoro) {
        this.pomo = localStorage.getItem("pomodoro");
        this.timer(this.pomo);
      } else if (this.shb) {
        this.sh = localStorage.getItem("shb");
        this.timer(this.sh);
      } else {
        this.lg = localStorage.getItem("lgb");
        this.timer(this.lg);
      }
    },
    
  },
  mounted() {
    this.frame1 = true;
    this.frame0 = false;
    this.frame2 = false;
    if (this.pomo == null || this.sh == null || this.lg == null) {
      localStorage.setItem("pomodoro", 1500);
      localStorage.setItem("shb", 300);
      localStorage.setItem("lgb", 600);
      this.pomo = localStorage.getItem("pomodoro");
      this.sh = localStorage.getItem("shb");
      this.lg = localStorage.getItem("lgb");
    }
    //this.display(this.pomo);
  },
};
</script>

<style>
</style>