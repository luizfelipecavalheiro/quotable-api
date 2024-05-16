//import { fetchQuotesByAuthor } from '@/services/apiService';
import translate from "translate";
import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from './apiService.js';

translate.engine = "google"; // "google", "yandex", "libre", "deepl"
translate.key = process.env.DEEPL_KEY;

async function exemploFetchQuotesByAuthor() {
  try {
    const text = await translate("tecnologia", { from: "pt", to: "en" });
    
    console.log(text);
    const resultado = await fetchRandomListQuotes({ tags: "amor ou felicidade"});
    //const text = await translate(resultado.data, "pt");
    console.log(resultado);
  } catch (error) {
    console.error('Erro ao buscar citações por autor:', error);
  }
}

 //  <script setup>
    import { ref } from 'vue';
    //import translate from "translate";
    //import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from '../services/apiService.js';
        
        
        const searchTerm = ref(''); // Variável reativa para armazenar o valor do input

        console.log(searchTerm.value); // Exemplo de como acessar o valor do input

        async function shareOnX() {
            const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
            const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
            var text = encodeURIComponent(resultadoTraducao);
    
            window.open('https://x.com/intent/tweet?text=' + text, 'Compartilhar no X', 'width=600,height=400');
        }
    
    
        async function shareOnWhatsApp() {
            const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
            const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
            var text = encodeURIComponent(resultadoTraducao);
            const url = "https://api.whatsapp.com/send?text=" + text;
    
            window.open(url, 'Compartilhar no WhatsApp', 'width=600,height=400');
        }
    //</script>

exemploFetchQuotesByAuthor();