<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>👋 Bienvenido</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="login-content">
      <div class="login-wrapper">
        <p class="subtitle">Inicia sesión para continuar</p>

        <ion-item class="elegant-input">
          <ion-label position="floating">Correo electrónico</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>

        <ion-item class="elegant-input">
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>

        <ion-button expand="full" class="elegant-btn" @click="login">Ingresar</ion-button>
        <ion-button fill="clear" class="secondary-btn" @click="$router.push('/registro')">
          Crear cuenta
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = () => {
  if (!email.value.trim() || !password.value.trim()) {
    alert("Completa todos los campos 2 ");
    return;
  }

  // Usuario simulado
  const user = { id: 1, name: "Demo User", email: email.value };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Inicio de sesión exitoso");
  router.push("/resumen");
};
</script>

<style scoped>
.login-content {
  --background: #f4f5f8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la pantalla */
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}

.login-wrapper {
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 30px 25px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.subtitle {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  color: #333;
}

.elegant-input {
  margin-bottom: 15px;
}

.elegant-btn {
  margin-top: 20px;
  --background: #5c67f2;
  --background-hover: #4a54e1;
  color: #fff;
  font-weight: 600;
  height: 50px;
  border-radius: 12px;
}

.secondary-btn {
  margin-top: 15px;
  color: #5c67f2;
}
</style>
