<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/signup">Registrarse</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="center-container">
        <div class="login-form">
          <div class="login-text-container"><h1>Login</h1></div>
          <div class="avatar-container">
            <img src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" width="150" />
          </div>
          <ion-item>
              <ion-input v-model="usuario" placeholder="Usuario"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="password" type="password" placeholder="Contraseña"></ion-input>
            <ion-button fill="clear" size="small" router-link="/forgot-password">La olvidó?</ion-button>
          </ion-item>
          <ion-button shape="round" color="success" expand="block" class="login-button" @click="login">Iniciar sesion</ion-button>
        </div>
      </div>
      <ion-toast :is-open="isOpenToast" :message="msgToast" :duration="5000" @didDismiss="setOpenToast(false)"></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonButtons, IonToast, useIonRouter } from '@ionic/vue';
import { ref } from 'vue';
import UserService from '@/api/UserService'; 

const usuario = ref("");
const password = ref("");
const msgToast = ref("");
const isOpenToast = ref(false);
const router = useIonRouter();
const userService = new UserService();

const login = async () => {
  if (usuario.value.length == 0 && password.value.length == 0) {
    msgToast.value = "Usuario y contraseña son obligatorios";
    setOpenToast(true);
    return;
  }

  try {
    const userAccount = await userService.login(usuario.value, password.value);

    if (!userAccount) {
      msgToast.value = "Crendenciales incorrectas";
      setOpenToast(true);
      return;
    }
    console.log(userAccount);
    router.navigate('/home');
  } catch (error) {
    console.log(error);
  }
};

const setOpenToast = (state: boolean) => {
  isOpenToast.value = state;
};
</script>

<style scoped>
ion-title {
  font-weight: bold;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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

.avatar-container, .login-text-container {
  text-align: center;
  padding-bottom: 5vh;
}

.login-form {
    width: 400px;
    padding: 20px;
    border-radius: 8px;
}

.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-button {
  font-weight: bold;
  height: 50px;
  margin-top: 24px;
}
</style>