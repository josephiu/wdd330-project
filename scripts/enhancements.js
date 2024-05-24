let cryptoData = [];
let chart;

export function fetchCryptoPrices() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            displayCryptoPrices(cryptoData);
            updateChart(cryptoData);
        })
        .catch(error => console.error('Error fetching the crypto prices:', error));
}

export function displayCryptoPrices(cryptos) {
    const pricesDiv = document.getElementById('prices');
    pricesDiv.innerHTML = '';
    cryptos.forEach(crypto => {
        const cryptoCard = document.createElement('div');
        cryptoCard.className = 'crypto-card';
        cryptoCard.innerHTML = `
            <img src="${crypto.image}" alt="${crypto.name}" class="crypto-image">
            <div class="crypto-info">
                <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
                <p>Price: $${crypto.current_price.toFixed(2)}</p>
                <button onclick="quickView('${crypto.name}', '${crypto.image}', ${crypto.current_price}, '${crypto.symbol.toUpperCase()}', ${crypto.market_cap}, ${crypto.total_volume}, ${crypto.high_24h}, ${crypto.low_24h}, ${crypto.price_change_percentage_24h})">Quick View</button>
            </div>
        `;
        pricesDiv.appendChild(cryptoCard);
    });
}

export function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCryptos = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchTerm));
    displayCryptoPrices(filteredCryptos);
    updateChart(filteredCryptos);
}

export function handleSort(event) {
    const sortOption = event.target.value;
    let sortedCryptos;

    switch (sortOption) {
        case 'name-asc':
            sortedCryptos = [...cryptoData].sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedCryptos = [...cryptoData].sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            sortedCryptos = [...cryptoData].sort((a, b) => a.current_price - b.current_price);
            break;
        case 'price-desc':
            sortedCryptos = [...cryptoData].sort((a, b) => b.current_price - a.current_price);
            break;
    }
    displayCryptoPrices(sortedCryptos);
    updateChart(sortedCryptos);
}

export function handleSignup(event) {
    event.preventDefault();
    document.getElementById('thank-you-message').style.display = 'block';
    event.target.reset();
}

export function setupCharts() {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Crypto Prices',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

export function updateChart(cryptos) {
    const labels = cryptos.map(crypto => crypto.name);
    const data = cryptos.map(crypto => crypto.current_price);
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

window.quickView = function(name, imageUrl, price, symbol, marketCap, totalVolume, high24h, low24h, priceChangePercentage24h) {
    const modal = document.getElementById('quick-view-modal');
    document.getElementById('quick-view-image').src = imageUrl;
    document.getElementById('quick-view-name').innerText = `${name} (${symbol})`;
    document.getElementById('quick-view-price').innerHTML = `
        <p>Price: $${price.toFixed(2)}</p>
        <p>Market Cap: $${marketCap.toLocaleString()}</p>
        <p>Total Volume: $${totalVolume.toLocaleString()}</p>
        <p>24h High: $${high24h.toFixed(2)}</p>
        <p>24h Low: $${low24h.toFixed(2)}</p>
        <p>24h Change: ${priceChangePercentage24h.toFixed(2)}%</p>
    `;
    modal.style.display = 'block';

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}


// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderWithTemplate(template, parentElement, data, callback) {
    const content = template.content.cloneNode(true); // Clone the content of the template
    parentElement.appendChild(content); // Append the cloned content to the parent element
  
    //if there is a callback...call it and pass data
    if (callback) {
      callback(data);
    }
  }
  
  
  export async function loadTemplate(path) {
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
  }
  
  
  
  // this code ensure that the covert to text is well done
  export async function convertToText(response) {
    return response.text();
  }
  
  
  
   // function to dynamically load the header and footer into a page and  catch error
  
  export async function loadHeaderFooter() {
    try {
      const headerTemplate = await loadTemplate("../public/partials/header.html");
      const headerElement = document.querySelector("#main-header");
      const footerTemplate = await loadTemplate("../public/partials/footer.html");
      const footerElement = document.querySelector("#main-footer");
  
      renderWithTemplate(headerTemplate, headerElement);
      renderWithTemplate(footerTemplate, footerElement);
    } catch (error) {
      console.error("Error loading header/footer:", error);
    }
  }

  