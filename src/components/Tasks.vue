<template>
  <div class="tasks">
    <form @submit.prevent="">
      <h3>Tareas</h3>
      <input type="text" class="tarea" placeholder="Escriba una tarea" v-model="nombre" />
      <div>
        <button @click="add" class="btn" aria-label="Añadir">
          <unicon name="plus" width="20" height="20" />
        </button>
        <button @click="deletes" class="btn" aria-label="Borrar lista">
          <unicon name="trash-alt" width="20" height="20" />
        </button>
      </div>
    </form>
    <div class="lista">
      <div
        v-for="elemento in tasks"
        :key="tasks.indexOf(elemento)"
        class="element"
      >
        <button
          type="checkbox"
          @click="tachar(tasks.indexOf(elemento))"
          class="elemento"
        >
          <unicon
            v-if="!elemento.estado"
            name="square-full"
            width="24"
            height="24"
          /><unicon
            v-if="elemento.estado"
            name="check-square"
            width="24"
            height="24"
          />
        </button>
        <p
          :class="elemento.estado ? 'completado' : 'incompleto'"
          @click="tachar(tasks.indexOf(elemento))"
          @dblclick="eliminar(tasks.indexOf(elemento))"
        >
          {{ elemento.nombre }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem("tasks")),
      nombre: "",
    };
  },
  methods: {
    add() {
      if (this.nombre.trim() == "") {
        $this.$emit("error", true);
      } else {
        let Ntasks = { nombre: this.nombre, estado: false };
        this.tasks.push(Ntasks);
        this.nombre = "";
      }
    },
    tachar(i) {
      this.tasks[i].estado = !this.tasks[i].estado;
    },
    deletes() {
      this.tasks = [];
    },
    eliminar(i) {
      this.tasks.splice(i, 1);
    },
  },
  mounted() {
    if (this.tasks == null) {
      console.log("mounted");
      localStorage.setItem("tasks", JSON.stringify([]));
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  },
  beforeUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  },
};
</script>

<style >
.tarea {
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 2rem;
  border: none;
  box-shadow: inset 2px 2px 3px 0px rgba(74, 74, 74, 1);
  align-items: center;
  text-align: center;
  font-family: Digital-screen;
  background-color: rgb(131, 177, 72);
  color: rgba(0, 0, 0, 0.589);
  width: 100%;
}
.tasks {
  align-content: center;
  background-color: #d9dbd1;
  box-shadow: 2px 2px 10px 5px rgba(74, 74, 74, 0.301);
}
.btn {
  margin-left: 25px;
  margin-top: 10px;
  padding: 5px;
  width: 35%;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: rgb(255, 180, 0);
  box-shadow: 0px 5px 0px 0px rgb(255, 150, 0);
  font-family: Montserrat;
  font-weight: bold;
}
.completado {
  text-decoration: line-through;
  font-size: 1.75rem;
}
.incompleto {
  text-decoration: none;
  font-size: 1.75rem;
}
.completado:hover,
.incompleto:hover {
  cursor: pointer;
}
.elemento {
  vertical-align: text-bottom;
  background-color: unset;
  border: none;
}
.lista {
  margin-top: 20px;
  font-family: Digital-screen;
  background-color: rgb(131, 177, 72);
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.589);
  box-shadow: inset 2px 2px 3px 0px rgba(74, 74, 74, 1);
}
.element {
  padding: 5px 5px;
  margin: 1px solid rgb(138, 189, 255);
  font-size: 2rem;
  display: flex;
}
</style>