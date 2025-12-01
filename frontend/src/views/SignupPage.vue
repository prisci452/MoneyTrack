<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/">
          </ion-back-button>
        </ion-buttons>
        <ion-title>Registro</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="center-container">
        <div class="login-form">
          <div class="login-text-container">
            <h1>Crear cuenta nueva</h1>
          </div>
          <ion-item>
            <ion-input v-model="nombreCompleto" placeholder="Nombre completo"></ion-input>
          </ion-item>
          <ion-item>
            <ion-radio-group v-model="generoSelected">
              <ion-radio value="F">Femenino</ion-radio>
              <ion-radio value="M">Masculino</ion-radio>
            </ion-radio-group>
          </ion-item>
          <ion-item>
            <div>
              <div v-for="pasatiempo in pasatiempos" :key="pasatiempo.id">
                <ion-checkbox :value="pasatiempo.id" :checked="pasatiempo.selected" @ionChange="seleccionarPasatiempo(pasatiempo)">
                  {{ pasatiempo.nombre }}
                </ion-checkbox>
              </div>
            </div>
          </ion-item>
          <ion-item>
            <ion-select placeholder="Seleccionar departamento" v-model="departamentoSelected">
              <ion-select-option v-for="departamento in departametos" :key="departamento.id" :value="departamento.id">
                {{ departamento.nombre }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-input v-model="usuario" placeholder="Usuario"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="password" type="password" placeholder="Contraseña"></ion-input>
          </ion-item>
          <ion-button @click="guardarCuenta" color="primary" expand="block" class="signup-button">Guardar</ion-button>
        </div>
      </div>
      <ion-alert :is-open="isOpenAlert" header="Confirmación" sub-header="Crear cuenta" message="La cuenta se ha creado correctamente." :buttons="alertButtons"></ion-alert>
      <ion-toast :is-open="isOpenToast" :message="msgToast" :duration="5000" @didDismiss="setOpenToast(false)"></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonBackButton, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonRadio, IonRadioGroup, IonCheckbox, IonAlert, IonToast, useIonRouter } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { Hobby } from '@/interface/Hobby';
import { User } from '@/interface/User';
import { Departamento } from '@/interface/Departamento';
import UserService from '@/api/UserService';
import PasatiempoService from '@/api/PasatiempoService';
import DepartamentoService from '@/api/DepartamentoService';

const router = useIonRouter();
const userService = new UserService();
const pasatiempoService = new PasatiempoService();
const departamentoService = new DepartamentoService();
const nombreCompleto = ref("");
const usuario = ref("");
const password = ref("");
const departamentoSelected = ref();
const generoSelected = ref("");
const msgToast = ref("");
const isOpenToast = ref(false);
const isOpenAlert = ref(false);
const pasatiempos= ref<Hobby[]>([]);
const departametos = ref<Departamento[]>([]);

onMounted(async() => {
  pasatiempos.value = await pasatiempoService.getPasatiempos();
  departametos.value = await departamentoService.getDepartamentos();
});

const obtenerPasatiemposSeleccionados = () => {
  return pasatiempos.value.filter(p => p.selected);
};

const guardarCuenta = async () => {
  if (nombreCompleto.value.length == 0 || usuario.value.length == 0 || password.value.length == 0 || departamentoSelected.value.length == 0 || generoSelected.value.length == 0) {
    msgToast.value = "Debe completar todos los campos";
    setOpenToast(true);
    return;
  }
  const pasatiemposSelected = obtenerPasatiemposSeleccionados();

  try {
    const nuevoUsuario: User = {
      nombre_completo: nombreCompleto.value,
      genero: generoSelected.value,
      pasatiempos: pasatiemposSelected,
      iddepartamento: departamentoSelected.value,
      usuario: usuario.value,
      password: password.value
    };

    const wasInserted = await userService.addUser(nuevoUsuario);

    if (wasInserted) {
      clearInputs();
      setOpenAlert(true);
    } else {
      msgToast.value = "Error, no se pudieron guardar los datos";
      setOpenToast(true);
    }
  } catch (error) {
    console.log(error);
    msgToast.value = "Ha ocurrido un error";
    setOpenToast(true);
  }
}


const alertButtons = [{ text: 'OK', role: 'confirm', handler: () => router.back() }];
const setOpenAlert = (state: boolean) => isOpenAlert.value = state;
const setOpenToast = (state: boolean) => isOpenToast.value = state;
const seleccionarPasatiempo = (pasatiempo: Hobby) => pasatiempo.selected = !pasatiempo.selected;

const clearInputs = () => {
  nombreCompleto.value = "";
  generoSelected.value = "";
  departamentoSelected.value = undefined;
  usuario.value = "";
  password.value = "";
  pasatiempos.value.forEach(pasatiempo => pasatiempo.selected = false);
} 
</script>

<style scoped>
.login-form {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.login-text-container {
  text-align: center;
  padding-bottom: 5vh;
}

ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  --border-width: 0;
  --highlight-color-focused: transparent;
}

ion-item:last-of-type {
  margin-bottom: 0;
}

.signup-button {
  font-weight: bold;
  height: 50px;
  margin-top: 24px;
}
</style>