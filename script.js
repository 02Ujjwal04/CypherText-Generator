
const morseCodeMap = {
      'A': '.-',   'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
      'I': '..',   'J': '.---', 'K': '-.-',  'L': '.-..', 'M': '--', 'N': '-.',   'O': '---', 'P': '.--.',
      'Q': '--.-', 'R': '.-.',  'S': '...',  'T': '-',    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....',
      '7': '--...', '8': '---..', '9': '----.',
      '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.',
      ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
      '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
    };
    
    const reverseMorseCodeMap = Object.entries(morseCodeMap)
      .reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});
    
    const convertToMorseBtn = document.getElementById('convertToMorseBtn');
    const convertToTextBtn = document.getElementById('convertToTextBtn');
    const inputField = document.getElementById('input');
    const outputField = document.getElementById('output');
    const copyButton = document.getElementById('copyButton');
  
    convertToMorseBtn.addEventListener('click', convertToMorse);
    convertToTextBtn.addEventListener('click', convertToText);
    outputField.addEventListener('input', checkCopyButton);
    copyButton.addEventListener('click', copyOutput);
  
    function convertToMorse() {
      const input = inputField.value.toUpperCase();
      const output = document.getElementById('output');
      let morseCode = '';
      
      for (let i = 0; i < input.length; i++) {
        const character = input[i];
        const morseCharacter = morseCodeMap[character];
        
        if (morseCharacter) {
          morseCode += morseCharacter + ' ';
        }
      }
      
      output.innerHTML = `
        <div class="result-label"></div>
        <div><strong>${morseCode.trim()}</strong></div>
      `;
      
      inputField.value = ''; // Clear input field
      copyButton.disabled = false;
    }
    
    function convertToText() {
      const input = inputField.value.trim();
      const output = document.getElementById('output');
      const morseWords = input.split(' ');
      let text = '';
      
      for (let i = 0; i < morseWords.length; i++) {
        const morseWord = morseWords[i];
        const characters = morseWord.split(' ');
        
        for (let j = 0; j < characters.length; j++) {
          const morseCharacter = characters[j];
          const character = reverseMorseCodeMap[morseCharacter];
          
          if (character) {
            text += character;
          }
        }
        
        text += ' ';
      }
      
      output.innerHTML = `
        <div class="result-label"></div>
        <div>${text.trim()}</div>
      `;
      
      inputField.value = ''; // Clear input field
      copyButton.disabled = false;
    }
    
    function checkCopyButton() {
      copyButton.disabled = outputField.textContent === '';
    }
    
    function copyOutput() {
      const range = document.createRange();
      range.selectNode(outputField);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      copyButton.disabled = true;
    }
