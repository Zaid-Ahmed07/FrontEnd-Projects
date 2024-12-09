    const textArea = document.getElementById("inputText");
    const wordToReplace = document.getElementById("wordToReplace").value;
    const newWord = document.getElementById("newWord").value;
    const isCaseSensitive = document.getElementById("caseSensitive").checked;

    function replaceWord() {
    if (!wordToReplace) {
      alert("Please enter the word to replace.");
      return;
    }
  
    const flags = isCaseSensitive ? "g" : "gi";
    const regex = new RegExp(`\\b${wordToReplace}\\b`, flags);
  
    const matches = textArea.value.match(regex);
    if (!matches) {
      alert("No occurrences found.");
      return;
    }
  
    textArea.value = textArea.value.replace(regex, newWord);
    document.getElementById("occurrences").innerText = `Occurrences: 1`;
  }
  
  function replaceAllWords() {
    const textArea = document.getElementById("inputText");
    const wordToReplace = document.getElementById("wordToReplace").value;
    const newWord = document.getElementById("newWord").value;
    const isCaseSensitive = document.getElementById("caseSensitive").checked;
  
    if (!wordToReplace) {
      alert("Please enter the word to replace.");
      return;
    }
  
    const flags = isCaseSensitive ? "g" : "gi";
    const regex = new RegExp(`\\b${wordToReplace}\\b`, flags);
  
    const matches = textArea.value.match(regex);
    const occurrences = matches ? matches.length : 0;
  
    textArea.value = textArea.value.replace(regex, newWord);
    document.getElementById("occurrences").innerText = `Occurrences: ${occurrences}`;
  }