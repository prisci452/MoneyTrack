<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Agregar Gasto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="add-expense-content">
      <div class="form-wrapper">
        <div class="form-card">
          <ion-item class="elegant-input">
            <ion-label position="stacked">Categoría</ion-label>
            <ion-select v-model="category_id" interface="popover" placeholder="Selecciona">
              <ion-select-option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="elegant-input">
            <ion-label position="stacked">Monto</ion-label>
            <ion-input v-model="amount" type="number" placeholder="$ 0.00"></ion-input>
          </ion-item>

          <ion-item class="elegant-input">
            <ion-label position="stacked">Fecha</ion-label>
            <ion-input v-model="date" type="date"></ion-input>
          </ion-item>

          <ion-item class="elegant-input">
            <ion-label position="stacked">Nota (opcional)</ion-label>
            <ion-input v-model="note" placeholder="Descripción del gasto"></ion-input>
          </ion-item>

          <ion-button expand="full" class="elegant-btn" @click="saveExpense">
            Guardar Gasto
          </ion-button>

          <ion-button expand="full" fill="clear" class="secondary-btn" @click="goToSummary">
            Ver Resumen
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
//import { expenses } from "../store/store.js";

const router = useRouter();

const categories = ref([
  { id: 1, name: "Comida" },
  { id: 2, name: "Transporte" },
  { id: 3, name: "Entretenimiento" },
]);

const category_id = ref("");
const amount = ref("");
const date = ref("");
const note = ref("");

let nextId = 1;

const saveExpense = () => {
  if (!category_id.value || !amount.value || !date.value) {
    alert("Completa todos los campos obligatorios");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user")) || { id: 1 };
  const categoryName = categories.value.find(c => c.id === category_id.value)?.name || "";

  expenses.value.push({
    id: nextId++,
    user_id: user.id,
    category_name: categoryName,
    amount: parseFloat(amount.value),
    date,
    note: note.value || ""
  });

  alert("Gasto guardado correctamente");

  category_id.value = "";
  amount.value = "";
  date.value = "";
  note.value = "";

  router.push("/resumen");
};

const goToSummary = () => router.push("/resumen");
</script>

<style scoped>
.add-expense-content {
  --background: #f4f5f8;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  min-height: 100vh;
}

.form-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-card {
  width: 90%;
  max-width: 450px;
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

.elegant-input {
  margin-bottom: 15px;
}

.elegant-btn {
  margin-top: 15px;
  --background: #5c67f2;
  --background-hover: #4a54e1;
  height: 45px;
  border-radius: 10px;
  font-weight: 600;
}

.secondary-btn {
  color: #5c67f2;
  margin-top: 5px;
}
</style>
