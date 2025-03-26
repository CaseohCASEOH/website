document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('coverter-form');
    const amount = document.getElementById('amount');
    const fromcurrency = document.getElementById('from-currency');
    const tocurrency = document.getElementById('to-currency');
    const result = document.getElementById('result');
    let toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

    const apiurl = "https://api.exchangerate-api.com/v4/latest/USD";

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            if (data && data.rates) {
                const currencies = Object.keys(data.rates);
                currencies.forEach(currency => {
                    const option = document.createElement('option');
                    option.value = currency;
                    option.textContent = currency;
                    fromcurrency.appendChild(option);
                    tocurrency.appendChild(option.cloneNode(true));
                });
            } else {
                result.textContent = "Failed To Get The Currencies";
            }
        })
        .catch(() => {
            result.textContent = "Failed To Get The Currencies";
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const amountt = amount.value;
            const fromcurrency2 = fromcurrency.value;
            const tocurrency2 = tocurrency.value;

            fetch(`https://api.exchangerate-api.com/v4/latest/${fromcurrency2}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.rates && data.rates[tocurrency2] !== undefined) {
                        const rate = data.rates[tocurrency2];
                        const resultt = (amountt * rate).toFixed(2);
                        result.textContent = `${amountt} ${fromcurrency2} = ${resultt} ${tocurrency2}`;
                    } else {
                        result.textContent = "Failed To Covert The Currency";
                    }
                })
                .catch(() => {
                    result.textContent = "Failed To Covert The Currency";
                });
        });

        function togglennode(event) {
            if (this.checked) {
                document.body.classList.remove('dark-mode');
            } else {
                document.body.classList.add('dark-mode');
            }
        }
    
        if (toggleSwitch) { // Check if toggleSwitch exists
            toggleSwitch.addEventListener('change', togglennode);
        } else {
            console.error("Toggle switch not found!");
        }
})
