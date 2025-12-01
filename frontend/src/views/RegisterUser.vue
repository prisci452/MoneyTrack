<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title> Crear Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="register-content">
      <div class="register-wrapper">
        <p class="subtitle">Regístrate para continuar</p>

        <ion-item class="elegant-input">
          <ion-label position="floating">Nombre completo</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>

        <ion-item class="elegant-input">
          <ion-label position="floating">Correo</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>

        <ion-item class="elegant-input">
          <ion-label position="floating">Edad</ion-label>
          <ion-input v-model.number="age" type="number"></ion-input>
        </ion-item>

        <ion-item class="elegant-input">
          <ion-label position="floating">Ingreso mensual</ion-label>
          <ion-input v-model.number="total_income" type="number"></ion-input>
        </ion-item>

        <ion-item class="elegant-input">
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>

        <ion-button expand="full" class="elegant-btn" @click="register">Crear Cuenta</ion-button>
        <ion-button fill="clear" class="secondary-btn" @click="$router.push('/')">
          Ya tengo cuenta
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
const name = ref("");
const email = ref("");
const age = ref(null);
const total_income = ref(null);
const password = ref("");

const register = () => {
  if (!name.value || !email.value || !age.value || !total_income.value || !password.value) {
    alert("Completa todos los campos");
    return;
  }

  const user = { id: 1, name: name.value, email: email.value };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Cuenta creada correctamente");
  router.push("/resumen");
};
</script>

<style scoped>
.register-content {
  --background: #f4f5f8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la pantalla */
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}

.register-wrapper {
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
  color: white;
  font-weight: 600;
  height: 50px;
  border-radius: 12px;
}

.secondary-btn {
  margin-top: 15px;
  color: #5c67f2;
}
</style>
