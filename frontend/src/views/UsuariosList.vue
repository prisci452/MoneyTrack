<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Usuarios</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" router-link="/usuarios/nuevo">
        Agregar Usuario
      </ion-button>

      <ion-list>
        <ion-item v-for="usuario in usuarios" :key="usuario.id">
          <ion-label>
            <strong>{{ usuario.nombre }}</strong> - {{ usuario.email }} <br>
            Edad: {{ usuario.edad }} | Presupuesto: ${{ usuario.presupuesto }} | Activo: {{ usuario.activo ? 'Sí' : 'No' }}
          </ion-label>

          <ion-buttons end>
            <ion-button color="danger" @click="eliminar(usuario.id)">Eliminar</ion-button>
          </ion-buttons>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonButtons } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { getUsuarios, deleteUsuario, Usuario } from '../services/usuariosService';

const usuarios = ref<Usuario[]>([]);

const cargarUsuarios = async () => {
  try {
    const lista = await getUsuarios();
    console.log('Usuarios recibidos del backend:', lista);
    usuarios.value = lista;
  } catch (error) {
    console.error('Error cargando usuarios:', error);
  }
};

const eliminar = async (id: number) => {
  if (confirm('¿Desea eliminar este usuario?')) {
    try {
      await deleteUsuario(id);
      await cargarUsuarios();
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  }
};

onMounted(cargarUsuarios);
</script>
