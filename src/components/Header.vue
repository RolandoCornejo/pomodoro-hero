<template>
  <transition name="fade">
    <div @click.self="showsett" v-if="settings" class="background">
      <form  @submit.prevent="save" class="settings">
        <h1>Configuración</h1>
        <hr />
        <div class="row">
          <div class="titulo">
            <label>Pomodoro</label>
          </div>
          <div class="campos">
            <input type="number" v-model="mpomo" />
            <label>:</label>
            <input type="number" v-model="spomo" />
          </div>
        </div>
        <div class="row">
          <div class="titulo">
            <label>Descanso Corto</label>
          </div>
          <div class="campos">
            <input type="number" v-model="msh" />
            <label>:</label>
            <input type="number" v-model="ssh" />
          </div>
        </div>
        <div class="row">
          <div class="titulo">
            <label>Descanso largo</label>
          </div>
          <div class="campos">
            <input type="number" v-model="mlg" />
            <label>:</label>
            <input type="number" v-model="slg" />
          </div>
        </div>
        <button @click="save" class="start">Guardar</button>
      </form>
    </div>
  </transition>
  <transition name=fade>
  <div @click.self="showinfo" v-if="info" class="background">
    <div class="settings" style="text-align: center">
      <div>Con &#10084;&#65039; desde &#127480;&#127483;</div>
      <div>© 2021 Rolando Cornejo. Derechos Reservados</div>
    </div>
  </div>
  </transition>
  <header>
    <h3 class="Title">
      <img :src="logo" alt="Pomodoro hero logo" /> Pomodoro Hero
    </h3>
    <div class="options">
      <button @click="showinfo" class="settingbtn" id="settings">
        <unicon name="question-circle" width="30" height="30" />
      </button>
      <!--<a
        href="https://strike.me/rolandc"
        target="_blank"
        rel="noopener noreferrer"
        ></a>-->
      <button @click="showsett" class="settingbtn" id="settings">
        <unicon name="setting" width="30" height="30" />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      pomo: parseInt(localStorage.getItem("pomodoro")),
      sh: parseInt(localStorage.getItem("shb")),
      lg: parseInt(localStorage.getItem("lgb")),
      settings: false,
      info: false,
      mpomo: 0,
      spomo: 0,
      msh: 0,
      ssh: 0,
      mlg: 0,
      slg: 0,
      logo: require("@/assets/favicon-32x32.png"),
    };
  },
  methods: {
    save() {
      localStorage.setItem(
        "pomodoro",
        parseInt(this.mpomo * 60) + parseInt(this.spomo)
      );
      localStorage.setItem("shb", this.msh * 60 + this.ssh);
      localStorage.setItem("lgb", this.mlg * 60 + this.slg);
      this.settings = false;
      alert("Datos guerdados");
    },
    showsett() {
      this.settings = !this.settings;
    },
    showinfo() {
      this.info = !this.info;
    },
  },
  mounted() {
    if (this.pomo == null || this.sh == null || this.lg == null) {
      localStorage.setItem("pomodoro", 1500);
      localStorage.setItem("shb", 300);
      localStorage.setItem("lgb", 600);
      this.pomo = localStorage.getItem("pomodoro");
      this.sh = localStorage.getItem("shb");
      this.lg = localStorage.getItem("lgb");
    }
    this.mpomo = Math.floor(this.pomo / 60);
    this.spomo = this.pomo - this.mpomo * 60;
    this.msh = Math.floor(this.sh / 60);
    this.ssh = this.sh - this.msh * 60;
    this.mlg = Math.floor(this.lg / 60);
    this.slg = this.lg - this.mlg * 60;
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.308);
  z-index: 2;
}
.settings {
  background-color: white;
  margin: 25vh auto;
  padding: 25px;
  max-width: 325px;
  border-radius: 10px;
}
input {
  width: 45%;
  margin: 0 5px;
  text-align: center;
  padding: 5px;
  font-size: 1.15rem;
  border: none;
  border-bottom: black solid 1px;
}
.row {
  padding: 5px;
  display: inline-block;
}
.titulo {
  font-style: bolder;
  font-size: 1.25rem;
}
.settingbtn {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  width: 15px;
  margin-left: 15px;
}
.title {
  display: inline;
  vertical-align: center;
}
</style>
