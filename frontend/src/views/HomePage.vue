<!-- eslint-disable vue/valid-v-for -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inicio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="center-container">
        <div class="card-container">
          <ion-list>
            <ion-item v-for="restaurante in restaurantes">
              <ion-card>
                <img alt="Imagen Rest" :src="restaurante.imagen_url" />
                <ion-card-header>
                  <ion-card-title>{{ restaurante.nombre }}</ion-card-title>
                  <ion-card-subtitle>{{ restaurante.categoria }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                  {{ restaurante.descripcion }}
                </ion-card-content>
                <ion-button fill="clear">Ver menu</ion-button>
              </ion-card>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import RestaurantService from '@/api/RestaurantService';
import { Restaurant } from '@/interface/Restaurant';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonButton } from '@ionic/vue';
import { onMounted, ref } from 'vue';

const restaurantService = new RestaurantService();
var restaurantes = ref<Restaurant[]>([]);

onMounted(() => {
  loadRestaurants();
})

const loadRestaurants = async () => {
  restaurantes.value = await restaurantService.getRestaurants();
} 
</script>

<style scoped>
ion-title {
  font-weight: bold;
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

.avatar-container,
.login-text-container {
  text-align: center;
  padding-bottom: 5vh;
}

.card-container {
  width: 700px;
  padding: 20px;
  border-radius: 8px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>