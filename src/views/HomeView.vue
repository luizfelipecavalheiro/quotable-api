<template>
  <div class="background">
  <NavBar/>
  <main class="text-center">
    <select v-model="selectedComponent" class="form-select rounded-pill border-primary w-25 mt-4 mb-4 mx-auto"> <!-- Adiciona a classe mx-auto para centralizar o select horizontalmente -->
      <option value="RandomQuotes">Citações Aleatórias</option>
      <option value="RandomListQuotes">Lista de Citações Aleatórias</option>
      <option value="SearchQuotes">Procurar Citações</option>
      <option value="SearchAuthors">Procurar Autores</option>
    </select>
    <component :is="selectedComponent" />
  </main>
</div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import RandomQuotes from '../components/RandomQuotes.vue';
import RandomListQuotes from '../components/RandomListQuotes.vue';
import SearchQuotes from '../components/SearchQuotes.vue';
import SearchAuthors from '../components/SearchAuthors.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    RandomQuotes,
    RandomListQuotes,
    SearchQuotes,
    SearchAuthors,
  },
  data() {
    return {
      selectedComponent: 'RandomQuotes' // Define o componente inicial a ser mostrado
    };
  }
}
</script>

<style scoped>
.form-select {
  border-width: 2px; /* Espessura da borda */
  border-color: #007bff; /* Cor azul para a borda do select */
}

.rounded-pill {
  border-radius: 20px; /* Borda arredondada */
}



</style>
