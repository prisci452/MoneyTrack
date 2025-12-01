<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>📈 Resumen de Gastos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="summary-content">
      <div class="summary-wrapper">
        <ion-list>
          <ion-item v-for="exp in userExpenses" :key="exp.id">
            <ion-label>
              <h2>{{ exp.category_name }}</h2>
              <p>{{ exp.date }}</p>
              <p>{{ exp.note }}</p>
            </ion-label>
            <div class="expense-amount">${{ exp.amount }}</div>
            <ion-button color="danger" size="small" @click="deleteExpense(exp.id)">
              Eliminar
            </ion-button>
          </ion-item>

          <ion-item v-if="userExpenses.length === 0">
            <ion-label>No hay gastos registrados.</ion-label>
          </ion-item>
        </ion-list>

        <ion-button expand="full" class="elegant-btn" @click="goAddExpense">
          Agregar Gasto
        </ion-button>

        <ion-button expand="full" fill="clear" class="secondary-btn" @click="goLogin">
          Cerrar Sesión
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonList } from "@ionic/vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
//import { expenses } from "../store/store.js";

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user")) || { id: 1 };

const userExpenses = computed(() =>
  expenses.value.filter(e => e.user_id === user.id)
);

const goAddExpense = () => router.push("/agregar-gasto");

const goLogin = () => {
  localStorage.removeItem("user");
  router.push("/");
};

const deleteExpense = (id) => {
  const index = expenses.value.findIndex(e => e.id === id);
  if (index !== -1) expenses.value.splice(index, 1);
};
</script>

<style scoped>
.summary-content {
  --background: #f4f5f8;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  min-height: 100vh;
}

.summary-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ion-list {
  width: 90%;
  max-width: 450px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  padding: 10px;
  margin-bottom: 15px;
}

.elegant-btn {
  width: 90%;
  max-width: 450px;
  margin-top: 10px;
  --background: #5c67f2;
  --background-hover: #4a54e1;
  height: 45px;
  border-radius: 10px;
  font-weight: 600;
}

.secondary-btn {
  width: 90%;
  max-width: 450px;
  margin-top: 10px;
  color: #5c67f2;
}

.expense-amount {
  font-weight: bold;
  color: #28a745;
  margin-right: 10px;
}
</style>
