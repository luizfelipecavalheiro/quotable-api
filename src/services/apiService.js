import axios from 'axios';
import translate from "translate";

const API_URL = 'https://api.quotable.io';


// Função para buscar citações aleatórias
export async function fetchRandomQuotes({limit, maxLength, minLength, tags, author} = {}) {
    const validLimit = limit >= 1 && limit <= 50 ? limit : 1; //Min: 1   Max: 10   Default: 1

    const params = {
        limit: validLimit, //int
    };

    if (maxLength) {
        params.maxLength = maxLength; //int
    }

    if (minLength) {
        params.minLength = minLength; //int
    }

    if (tags) {
        const translatedTags = await translate(tags, { from: "pt", to: 'en' });
        params.tags = formatTags(translatedTags); //string
        console.log(params.tags);
    }

    if (author) {
        params.author = author; //string
    }

    try {
        const response = await axios.get(`${API_URL}/quotes/random`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching random quotes:', error);
        throw error;
    }
}

// Função para buscar lista citações aleatórias
export async function fetchRandomListQuotes({maxLength, minLength, tags, author, sortBy, order, limit} = {}) {
    const validLimit = limit >= 1 && limit <= 150 ? limit : 20; //Min: 1   Max: 150   Default: 20


    const params = {
      limit: validLimit, //int
    };

    if (maxLength) {
        params.maxLength = maxLength; //int
    }

    if(minLength) {
        params.minLength = minLength; //int
    }

    if (!tags && !author) {
        params.page = Math.floor(Math.random() * 532) + 1; // Gera número aleatório entre 1 e 532
    } else {
        if (tags) {
            const translatedTags = await translate(tags, { from: "pt", to: 'en' });
            params.tags = formatTags(translatedTags); //string
        }

        if (author) {
            params.author = author; //string
        }
    }

    if (sortBy) {
        params.sortBy = sortBy; //enum
    }

    if (order) {
        params.order = order; //enum
    }
  
    try {
      const response = await axios.get(`${API_URL}/quotes`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching random quotes list:', error);
      throw error;
    }
  }

// Função para buscar citações por autor
export async function fetchQuotesByAuthor({slug, sortBy, order, limit, page} = {}) {
    const validLimit = limit >= 1 && limit <= 150 ? limit : 20; //Min: 1   Max: 150   Default: 20
    const validPage = page >= 1 ? page: 1;

    const params = {
      limit: validLimit, //int
      page: validPage, //int
    };

    if (slug) { 
        params.slug = formatSlug(slug); //string
    }

    if (sortBy) {
        params.sortBy = sortBy; //enum
    }

    if (order) {
        params.oder = order; //enum
    }

    try {
        const response = await axios.get(`${API_URL}/authors`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching quotes by author:', error);
        throw error;
    }
}

function formatText(input) {
    // Converter para minúsculas
    const lowerCaseText = input.toLowerCase();
  
    // Substituir espaços por hífens
    const hyphenatedText = lowerCaseText.replace(/\s+/g, '-');
  
    // Remover caracteres especiais
    const cleanText = hyphenatedText.replace(/[^\w-]+/g, '');
  
    return cleanText;
}
  
function formatSlug(input) {
    // Verificar se há vírgulas na entrada
    if (input.includes(',')) {
      // Dividir a entrada em palavras separadas
      const words = input.split(/\s*,\s*/);
  
      // Formatar cada palavra individualmente
      const formattedWords = words.map(word => formatText(word));
  
      // Unir as palavras formatadas usando o caractere de pipe (|)
      return formattedWords.join('|');
    } else {
      // Se não houver vírgulas, apenas formate a entrada
      return formatText(input);
    }
}


// Função para buscar citacoes atraves de pesquisa do usuario
export async function fetchSearchQuotes({query, fields, fuzzyMaxEdits, fuzzyMaxExpansions, limit, page} = {}) {
    const translatedQuery = await translate(query, { from: "pt", to: 'en' });
    const validFields = fields || "content,author,tags";
    const validFuzzyMaxEdits = fuzzyMaxEdits >= 0 && fuzzyMaxEdits <= 2 ? fuzzyMaxEdits : 0; //Min: 0   Max: 2   Default: 0
    const validFuzzyMaxExpansions = fuzzyMaxExpansions >= 0 && fuzzyMaxExpansions <= 150 ? fuzzyMaxExpansions : 50; //Min: 0   Max: 150   Default: 50
    const validLimit = limit >= 0 && limit <= 150 ? limit : 20; //Min: 0   Max: 150   Default: 20 arrumar issooooo
    
    const validPage = page >= 1 ? page: 1;

    const params = {
      query: translatedQuery,
      fields: validFields, //string
      fuzzyMaxEdits: validFuzzyMaxEdits, //int
      fuzzyMaxExpansions: validFuzzyMaxExpansions, //int
      limit: validLimit, //int
      page: validPage, //int
    };

    try {
        const response = await axios.get(`${API_URL}/search/quotes`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching quotes by search:', error);
        throw error;
    }
}


// Função para buscar autores atraves de pesquisa do usuario
export async function fetchSearchAuthors({query, matchTreshold, limit, page} = {}) {
    const translatedQuery = await translate(query, { from: "pt", to: 'en' });
    const validMatchTreshold = matchTreshold >= 1 && matchTreshold <= 3 ? matchTreshold : 2; //Min: 1   Max: 3   Default: 2
    const validLimit = limit >= 0 && limit <= 150 ? limit : 20; //Min: 0   Max: 150   Default: 20
    const validPage = page >= 1 ? page: 1;

    const params = {
      query: translatedQuery,
      autocomplete: true,
      matchTreshold: validMatchTreshold,
      limit: validLimit,
      page: validPage,
    };

    try {
        const response = await axios.get(`${API_URL}/search/authors`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching authors by search:', error);
        throw error;
    }
}


export async function fetchTags() {
    try {
        const response = await axios.get(`${API_URL}/tags`);
        return response.data;
    } catch (error) {
        console.error('Error fetching authors by search:', error);
        throw error;
    }
}


function formatTags(input) {
    // Verificar se há palavras separadas por vírgulas ou "e"
    if (input.includes(',') || input.includes(' and ')) {
      // Substituir " e " por ","
      const commaSeparated = input.replace(/\s*and\s*/g, ',');
  
      // Dividir a entrada em palavras separadas
      const words = commaSeparated.split(',');
  
      // Formatar cada palavra individualmente
      const formattedWords = words.map(word => formatText(word));
  
      // Unir as palavras formatadas usando vírgula (,) 
      return formattedWords.join(',');
    } else if (input.includes(' or ')) {
      // Substituir " ou " por "|"
      const pipeSeparated = input.replace(/\s*or\s*/g, '|');
  
      // Dividir a entrada em palavras separadas
      const words = pipeSeparated.split('|');
  
      // Formatar cada palavra individualmente
      const formattedWords = words.map(word => formatText(word));
  
      // Unir as palavras formatadas usando pipe (|)
      return formattedWords.join('|');
    } else {
      // Se não houver vírgulas, "e" ou "ou", apenas formate a entrada
      return formatText(input);
    }
}