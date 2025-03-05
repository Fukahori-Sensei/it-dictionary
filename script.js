let jsonData = {}; // JSONデータを格納する変数

// JSONファイルを読み込む
fetch("./computer_terms.json")
    .then(response => response.json())
    .then(data => {
        jsonData = data;
    })
    .catch(error => console.error("JSONの読み込みエラー:", error));

// 検索ボックスの入力に応じて候補リストを表示
function searchTerms() {
    
    let query = document.getElementById("searchBox").value.trim().toLowerCase();
    let suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";
    if (query === "") {
        return;
    }

    let filteredTerms = jsonData.computer_terms.filter(term =>
        term.term.includes(query) || term.english.toLowerCase().includes(query)
    );

    filteredTerms.forEach(term => {
        let li = document.createElement("li");
        li.classList.add("suggestion-item");
        li.textContent = `${term.term} (${term.english})`;
        li.onclick = () => showDetails(term);
        suggestionsContainer.appendChild(li);
    });
}

// 選択した用語の詳細を表示
function showDetails(term) {
    let detailsContainer = document.getElementById("details");
    detailsContainer.innerHTML = `<h2>${term.kana} (${term.english})</h2><br>
                                  <p><strong>JPN: </strong> ${term.definitions.JPN}</p>
                                  <p><strong>ENG: </strong> ${term.definitions.ENG}</p>
                                  <p><strong>VIE: </strong> ${term.definitions.VIE}</p>
                                  <p><strong>NEP: </strong> ${term.definitions.NEP}</p>
                                  <p><strong>MYA: </strong> ${term.definitions.MYA}</p>
                                  <p><strong>BEN: </strong> ${term.definitions.BEN}</p>`;
    detailsContainer.style.display = "block";
}

// リセットボタンクリック
function clear(){
    document.getElementById("searchBox").innerText = "";
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("details").innerHTML = "";
}

// 頭文字検索処理
function filterByLetter(letter) {
    let suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";

    if (letter === "ALL") {
        // すべての用語を表示
        displaySuggestions(jsonData.computer_terms);
        return;
    }

    let filteredTerms = jsonData.computer_terms.filter(term =>
        term.english.startsWith(letter)
    );

    displaySuggestions(filteredTerms);
}

function displaySuggestions(terms) {
    let suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";
    document.getElementById("details").innerHTML = "";

    if (terms.length === 0) {
        suggestionsContainer.innerHTML = "<li><ruby>該当<rp>（</rp><rt>がいとう</rt><rp>）</rp></ruby>する<ruby>用語<rp>（</rp><rt>ようご</rt><rp>）</rp></ruby>がありません。</li>";
        return;
    }

    terms.forEach(term => {
        let li = document.createElement("li");
        li.classList.add("suggestion-item");
        li.textContent = `${term.term} (${term.english})`;
        li.onclick = () => showDetails(term);
        suggestionsContainer.appendChild(li);
    });

}
