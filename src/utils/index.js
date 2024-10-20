// Lyrics of the song
const lyrics = `
Árbol, hoja, salto, luz
Aproximación
Mueble, lana, gusto, pie
Té, mar, gas, mirada
Nube, loba, dedo, cal
Gesticulador
Hijo, cama, menta, sien
Rey, fin, sol, amigo, cruz
Alga, dado, cielo, riel
Estalactita, mirador
Corazón
Hombre, rayo, felpa, sed
Extremidad, insolación
Parecer
Clavo, coito, Dios
Temor
Mujer, por
`;

// Allowed characters are letters, numbers, dots (.), and hyphens (-)
const normalizeWord = (word) => {
  return word
    .normalize("NFD") // Remove accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-zA-Z0-9.-]/g, '') // Remove anything that's not allowed
    .toUpperCase();
};

// Generate CBU alias without repeating words
export const generateAlias = ({ minLength = 6, maxLength = 20, separator = '-', numWords = 3 }) => {
  // Split lyrics into individual words, normalize them and filter out empty words
  let words = lyrics.split(/\s+/).map(normalizeWord).filter(Boolean);

  let alias = '';
  let usedWords = new Set(); // Track used words

  // Pick words randomly and add the separator between them
  for (let i = 0; i < numWords; i++) {
    let word;

    // Try to pick a word that hasn't been used yet
    do {
      word = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.has(word) && usedWords.size < words.length);

    // If adding the word would exceed the maxLength, stop adding words
    if (alias.length + word.length + (i > 0 ? separator.length : 0) > maxLength) {
      break;
    }

    // Add the word, with a separator if it's not the first word
    alias += (i > 0 ? separator : '') + word;
    usedWords.add(word); // Mark this word as used
  }

  // Ensure the alias meets the minimum length requirement by adding more unique words
  while (alias.length < minLength && usedWords.size < words.length) {
    let word;

    // Try to find a word not already used
    do {
      word = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.has(word));

    // Add the word if it fits the length constraint
    if (alias.length + word.length + separator.length <= maxLength) {
      alias += separator + word;
      usedWords.add(word);
    }
  }

  return alias;
};

// Example usage:

// Generate an alias with dots, 3 words
// console.log(generateAlias({ minLength: 6, maxLength: 20, separator: '.', numWords: 3 }));

// Generate an alias with hyphens, 4 words, and a length between 6 and 20
// console.log(generateAlias({ minLength: 6, maxLength: 20, separator: '-', numWords: 4 }));

// Generate an alias with dots, 3 words
// console.log(generateAlias({ minLength: 6, maxLength: 20, separator: '', numWords: 3 }));
