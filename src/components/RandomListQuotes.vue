<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-xl-6">
        <div class="text-center mb-3"> <!-- Adicionando classe text-center para centralizar o conteúdo -->
          <div class="input-group mb-3">
            <label for="tags" class="input-group-text">Tags:</label>
            <input type="text" id="tags" class="form-control rounded-pill" v-model="tags">
          </div>
          <div class="input-group mb-3">
            <label for="author" class="input-group-text">Autor:</label>
            <input type="text" id="author" class="form-control rounded-pill" v-model="author">
          </div>
          <div class="input-group mb-3">
            <label for="limit" class="input-group-text">Limite:</label>
            <input type="number" id="limit" class="form-control rounded-pill" v-model.number="limit">
          </div>
          <button @click="search" class="btn btn-primary rounded-pill btn-sm w-25" :class="{ 'btn-loading': loading }">
            <span v-if="!loading">Pesquisar</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Pesquisando...
            </span>
          </button>
        </div>

        <!-- Mostra os resultados filtrados -->
        <div v-if="showResult" class="mt-3">
          <div class="row">
            <div v-for="(quote, index) in filterResponse" :key="index" class="col-md-6 mb-3">
              <div :class="{ 'card': true, 'text-center': shouldCenter(index) }">
                <div class="card-body">
                  <p class="card-text">"{{ quote.content }}"</p>
                  <p class="card-text"><strong>{{ quote.author }}</strong></p>
                  <div class="text-center"> 
                    <button @click="shareOnWhatsApp(quote)" class="btn btn-outline-success btn-sm">
                      <i class="fab fa-whatsapp"></i>
                    </button>
                    <button @click="shareOnX(quote)" class="btn btn-outline-primary btn-sm">
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button @click="copyToClipboard(quote)" class="btn btn-outline-secondary btn-sm">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import translate from 'translate';
import { fetchRandomListQuotes } from '@/services/apiService';

export default {
  name: 'RandomListQuotes',

  setup() {
    // Variáveis para armazenar os valores dos campos
    const tags = ref('');
    const author = ref('');
    const limit = ref(5); // Valor padrão para limit

    // Variável para armazenar os resultados filtrados
    const filterResponse = ref([]);

    // Variável para controlar a exibição do resultado
    const showResult = ref(false);

    // Variável para controlar a exibição do spinner de carregamento
    const loading = ref(false);

    // Função para pesquisar citações
    const search = async () => {
      try {
        // Define loading como true para mostrar o spinner de carregamento
        loading.value = true;

        const response = await fetchRandomListQuotes({ limit: limit.value, tags: tags.value, author: author.value });

        // Traduz as frases para o português
        filterResponse.value = await Promise.all(response.results.map(async item => {
          const content = await translate(item.content, { from: 'en', to: 'pt' });
          const author = item.author;
          return { content, author };
        }));

        // Define showResult como true para exibir os resultados
        showResult.value = true;

      } catch (error) {
        console.error('Erro ao buscar citações:', error);
      } finally {
        // Define loading como false para esconder o spinner de carregamento
        loading.value = false;
      }
    };

    // Função para copiar o texto completo (content + author) para a área de transferência
    const copyToClipboard = async (quote) => {
      try {
        const textToCopy = `${quote.content} - ${quote.author}`; // Adicionando o nome do autor ao final da frase
        await navigator.clipboard.writeText(textToCopy);
        alert('Texto copiado para a área de transferência!');
      } catch (error) {
        console.error('Erro ao copiar texto:', error);
      }
    };

    const shareOnWhatsApp = async (quote) => {
      try {
        const text = encodeURIComponent(`${quote.content} - ${quote.author}`);
        const url = `https://api.whatsapp.com/send?text=${text}`;
        window.open(url, 'Compartilhar no WhatsApp', 'width=600,height=400');
      } catch (error) {
        console.error('Erro ao compartilhar via WhatsApp:', error);
      }
    };

    const shareOnX = async (quote) => {
      try {
        const text = encodeURIComponent(`${quote.content} - ${quote.author}`);
        const url = `https://x.com/intent/tweet?text=${text}`;
        window.open(url, 'Compartilhar no X', 'width=600,height=400');
      } catch(error) {
        console.error('Erro ao compartilhar via X:',error);
      }
    };

    const shouldCenter = (index) => {
      const center = filterResponse.value.length % 2 !== 0 && (filterResponse.value.length === 1 || index === filterResponse.value.length - 1);
      console.log('Index:', index, 'Should Center:', center);
      return center;
    };

    // Retorna as variáveis e a função para o template
    return {
      tags,
      author,
      limit,
      filterResponse,
      showResult,
      search,
      loading,
      copyToClipboard,
      shouldCenter,
      shareOnWhatsApp,
      shareOnX
    };
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
.form-control {
  border-width: 1px; /* Espessura da borda */
  border-color: #2f94ff; /* Cor azul para a borda do select */
}
</style>
