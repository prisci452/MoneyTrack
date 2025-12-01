<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Usuario</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nombre</ion-label>
        <ion-input v-model="usuario.nombre"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Correo</ion-label>
        <ion-input v-model="usuario.email" type="email"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Contraseña</ion-label>
        <ion-input v-model="usuario.contrasena" type="password"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Edad</ion-label>
        <ion-input v-model.number="usuario.edad" type="number"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Presupuesto</ion-label>
        <ion-input v-model.number="usuario.presupuesto" type="number"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>Activo</ion-label>
        <ion-checkbox v-model="usuario.activo"></ion-checkbox>
      </ion-item>

      <ion-button expand="block" @click="guardarUsuario">Agregar</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonCheckbox, IonInput } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addUsuario, Usuario } from '../services/usuariosService';

const router = useRouter();

const usuario = ref<Usuario>({
  id: 0,
  activo: true,
  nombre: '',
  email: '',
  contrasena: '',
  edad: 0,
  presupuesto: 0
});

const guardarUsuario = async () => {
  try {
    await addUsuario(usuario.value);
    router.push('/usuarios');
  } catch (error) {
    console.error('Error guardando usuario:', error);
  }
};
</script>
