<template>
  <Header />
  <Timer />
  <footer class="footer">
        
  </footer>
</template>

<script>
import Timer from "./components/Timer.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Timer,
    Header,
  },
  data() {
    return {
      pomo: localStorage.getItem("pomodoro"),
      sh: localStorage.getItem("shb"),
      lg: localStorage.getItem("lgb"),
      yr:new Date(),
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body {
  background-color: rgb(252, 242, 113);
  color: rgb(12, 22, 58);
  font-family: Montserrat;
  font-weight: bold;
}
header {
  display: flex;
  justify-content: space-between;
  padding: 10px 25px 10px 10px;
  margin: 0;
}
#main {
  margin: 15px auto;
  max-width: 250px;
  min-width: min-content;
  padding: 25px 25px;
  box-shadow: 2px 2px 10px 5px rgba(74, 74, 74, 0.301);
  border-radius: 10px;
  background-color: rgb(217, 219, 209);
}
.animation {
  padding: 25px 25px;
  margin: 15px auto;
  max-width: 300px;
  min-width: min-content;
}
footer {
  position:fixed;
  bottom: 0;
  padding: 0 25% 15px 25%;
  text-align: center;
  font-size: 0.75rem;
  width: 100%;
}
.start-bg {
  display: flex;
  align-items: center;
}
.start {
  margin-top: 20px;
  margin-bottom: 6px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: rgb(255, 180, 0);
  box-shadow: 0px 5px 0px 0px rgb(255, 150, 0);
  font-family: Montserrat;
  font-weight: bold;
}
.start:hover {
  background-color: rgb(255, 170, 0);
  box-shadow: inset 0px 5px 0px 0px rgb(255, 150, 0);
}
.playPause,
.restart,
.sh-b,
.lg-b {
  margin: 2%;
  margin-top: 20px;
  padding: 10px;
  width: 45%;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: rgb(255, 180, 0);
  box-shadow: 0px 5px 0px 0px rgb(255, 150, 0);
  font-family: Montserrat;
  font-weight: bold;
}
.playPause:hover,
.restart:hover,
.sh-b:hover,
.lg-b:hover {
  background-color: rgb(255, 170, 0);
  box-shadow: inset 0px 5px 0px 0px rgb(255, 150, 0);
}
.timer {
  width: 230px;
  display: inline-flex;
  font-size: 5rem;
  border-radius: 5px;
  padding: 5px 25px;
  box-shadow: inset 2px 2px 3px 0px rgba(74, 74, 74, 1);
  align-items: center;
  text-align: center;
  font-family: Digital-screen;
  background-color: rgb(131, 177, 72);
  color: rgba(0, 0, 0, 0.589);
}

.popup {
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer;
}
</style>
