<template>
  <div>
    <div class="input-group">
      <label for="slug">slug:</label>
      <input type="text" id="slug" v-model="slug">
    </div>
    <div class="input-group">
      <label for="limit">Limit:</label>
      <input type="number" id="limit" v-model.number="limit">
    </div>
    <button @click="search">Pesquisar</button>

    <!-- Mostra os resultados filtrados -->
    <div v-if="showResult">
      <div v-for="(quote, index) in filterResponse" :key="index">
        <p><strong>Name:</strong> {{ quote.name }}</p>
        <p><strong>Bio:</strong> {{ quote.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { fetchQuotesByAuthor } from '@/services/apiService';

export default {
  name: 'QuotesByAuthor',

  setup() {
    // Variáveis para armazenar os valores dos campos
    const slug = ref('');
    const limit = ref(5); // Valor padrão para limit

    // Variável para armazenar o resultado da pesquisa
    const quotes = ref([]);

    // Variável para armazenar os resultados filtrados
    const filterResponse = ref([]);

    // Variável para controlar a exibição do resultado
    const showResult = ref(false);

    // Função para pesquisar citações
    const search = async () => {
      try {

        const response = await fetchQuotesByAuthor({ limit: limit.value, slug: slug.value });
        console.log(response);
        // Filtra a resposta para manter apenas 'author' e 'content'
        filterResponse.value = response.results.map(item => {
          return {
            name: item.name,
            bio: item.bio
          };
        });

        // Define showResult como true para exibir os resultados
        showResult.value = true;

      } catch (error) {
        console.error('Erro ao buscar citações:', error);
      }
    };

    // Retorna as variáveis e a função para o template
    return {
      slug,
      limit,
      quotes,
      filterResponse,
      showResult,
      search
    };
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
</style>