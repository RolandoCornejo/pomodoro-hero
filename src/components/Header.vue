<template>
  <transition name="fade">
    <div @click.self="showsett" v-if="settings" class="background">
      <form @submit.prevent="save" class="settings">
        <h1>Configuración</h1>
        <hr />
        <div class="row">
          <div class="titulo">
            <label>Pomodoro</label>
          </div>
          <div class="campos">
            <input type="number" min="0" max="60" required v-model="mpomo" />
            <label>:</label>
            <input type="number" min="0" max="60" required v-model="spomo" />
          </div>
        </div>
        <div class="row">
          <div class="titulo">
            <label>Descanso Corto</label>
          </div>
          <div class="campos">
            <input type="number" min="0" max="60" v-model="msh" />
            <label>:</label>
            <input type="number" min="0" max="60" v-model="ssh" />
          </div>
        </div>
        <div class="row">
          <div class="titulo">
            <label>Descanso largo</label>
          </div>
          <div class="campos">
            <input type="number" min="0" max="60" v-model="mlg" />
            <label>:</label>
            <input type="number" min="0" max="60" v-model="slg" />
          </div>
        </div>
        <button @click="save" class="start">Guardar</button>
      </form>
    </div>
  </transition>
  <transition name="fade">
    <div @click.self="showinfo" v-if="info" class="background">
      <div class="settings" style="text-align: center">
        <img
          class="perfil"
          :src="perfil"
          alt="Foto de desarrollador Rolando Cornejo"
        />
        <h3>Rolando Cornejo</h3>
        <hr />
        <h5>
          Estudiante de Ingenieria en Ciencias de la Computacion en UDB,
          desarrollador web
        </h5>
        <h5>
          contacto:
          <a href="mailto:rolandojose11@gmail.com">rolandojose11@gmail.com</a>
        </h5>
        <br />
        <p>Cómprame un café ☕</p>
        <hr />
        <a href="https://paypal.me/RolandoC123" target="_blank">
          <button class="strike">
            <unicon
              name="paypal"
              fill="royalblue"
              width="30"
              height="30"
            />Donar en Paypal
          </button></a
        >

        <a href="https://strike.me/rolandc" target="_blank">
          <button class="strike">
            <unicon
              name="bitcoin"
              fill="orange"
              width="30"
              height="30"
            />Bitcoin con strike
          </button></a
        ><br />
        <div>Copyright © 2021 Rolando Cornejo.</div>
        <div>
          <a href="https://github.com/RolandoCornejo/pomodoro-hero/blob/main/LICENSE" target="_blank">
            <img src="https://www.gnu.org.ua/graphics/agplv3-88x31.png" alt="licensia AGPLv3">
          </a>
        </div>
        <div>Hecho Con &#10084;&#65039; en El Salvador</div>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div v-show="welcome == 2" class="background">
      <div class="settings">
        <ul>
          <li>
            Utiliza el área de tareas para llevar el conteo de las actividades
            que ya trealizaste en esta sesion
          </li>
          <li>
            Toca o haz click en la tarea que ya completaste para tacharla de la
            lista
          </li>
          <li>
            Utiliza el boton de basura para eliminar todas las tareas en tu
            lista
          </li>
          <li>
            Para eliminar solo una tarea, toca dos veces o haz doble click en la
            tarea que deseas eliminar
          </li>
        </ul>
        <button @click="next" class="start">¡Empecemos!</button>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div v-show="welcome == 1" class="background">
      <div class="settings">
        <h1>¡Bienvenido a Pomodoro Hero!</h1>
        <ul>
          <li>
            Ayuda a chickn' a llegar a su destino completando tareas y pomodoros
          </li>
          <li>
            Esta aplicacion te ayudará a concentrarte y ser más productivo con
            la tecnica Pomodoro, trabajas 25 minutos y luego descansas 5 o 10
            minutos.
          </li>
          <li>
            En un futuro con cada pomodoro o tarea completada ganarás puntos y
            podrás competir con tus amigos y otros usuarios por el primer lugar
            en la tabla de clasificaciones
          </li>
        </ul>
        <button @click="next" class="start">Entendido</button>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div v-show="showError" class="background">
      <div class="settings">
        <h1>ERROR</h1>
        <p>Escribe tu tarea antes de añadirla</p>
        <button @click="closeError" class="start">Entendido</button>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div v-show="welcome % 30 == 0" class="background">
      <div class="settings">
        <img
          class="perfil"
          :src="perfil"
          alt="Foto de desarrollador Rolando Cornejo"
        />
        <h1>¡Hola! 👋🏻👋🏻</h1>
        ¿Te está gustando Pomodoro Hero?
        <p>
          Soy Rolando, el creador de Pomodoro Hero, ayudame a mantener este
          proyecto libre de anuncios con una propina
        </p>
        <a href="https://paypal.me/RolandoC123" target="_blank">
          <button class="strike">
            <unicon
              name="paypal"
              fill="royalblue"
              width="30"
              height="30"
            />Donar en Paypal
          </button></a
        >
        <a href="https://strike.me/rolandc" target="_blank">
          <button class="strike">
            <unicon
              name="bitcoin"
              fill="orange"
              width="30"
              height="30"
            />Bitcoin con strike
          </button></a
        >
        <button @click="next" class="start">En otra ocasión</button>
      </div>
    </div>
  </transition>

  <header>
    <p class="Title">
      <img :src="logo" alt="Pomodoro hero logo" style="vertical-align: sub" />
      Pomodoro Hero
    </p>

    <div class="options">
      <a
        href="https://github.com/RolandoCornejo/pomodoro-hero/"
        target="_blanck"
        class="settingbtn"
        id="settings"
        aria-label="Configuracion"
      >
        <unicon name="github" width="30" height="30" />
      </a>
      <button
        @click="showinfo"
        class="settingbtn"
        id="info"
        aria-label="Información"
      >
        <unicon name="info-circle" width="30" height="30" />
      </button>
      <!--<a
        href="https://strike.me/rolandc"
        target="_blank"
        rel="noopener noreferrer"
        ></a>-->
      <button
        @click="showsett"
        class="settingbtn"
        id="settings"
        aria-label="Configuracion"
      >
        <unicon name="setting" width="30" height="30" />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: ["showError"],
  data() {
    return {
      pomo: parseInt(localStorage.getItem("pomodoro")),
      sh: parseInt(localStorage.getItem("shb")),
      lg: parseInt(localStorage.getItem("lgb")),
      settings: false,
      info: false,
      welcome: localStorage.getItem("welcome"),
      mpomo: 0,
      spomo: 0,
      msh: 0,
      ssh: 0,
      mlg: 0,
      slg: 0,
      logo: require("@/assets/favicon-32x32.png"),
      perfil: require("@/assets/perfil.jpg"),
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
      alert("Datos guardados");
    },
    showsett() {
      this.settings = !this.settings;
    },
    showinfo() {
      this.info = !this.info;
    },
    next() {
      this.welcome++;
      localStorage.setItem("welcome", this.welcome);
    },
    closeError() {
      $this.$emit("closeError", false);
    },
  },
  mounted() {
    if (this.welcome == null) {
      localStorage.setItem("welcome", 1);
      this.welcome = localStorage.getItem("welcome");
    } else {
      this.welcome++;
      localStorage.setItem("welcome", this.welcome);
    }
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
.perfil {
  width: 50%;
  height: 50%;
  border-radius: 100px;
  position: relative;
}
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
  z-index: 1;
}
.settings {
  background-color: white;
  margin: 10vh auto;
  padding: 25px;
  max-width: 325px;
  border-radius: 10px;
}
input {
  width: 40.5%;
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
  margin-right: 25px;
}
.strike {
  color: white;
  background-color: black;
  width: max-content;
  margin: 2px auto;
  border-radius: 10px;
  padding: 5px;
  font-family: Montserrat;
}
</style>
