const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const loader = document.querySelector("#loading");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// showing loading
const displayLoading = () => {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
};

// hiding loading
const hideLoading = () => {
  loader.classList.remove("display");
};

// Fetch exchange rates and update the DOM
async function calculate() {
  displayLoading();
  const currency_one = currencyEl_one.value;
  try {
    let response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency_one}`
    );
    let data = await response.json().then((data) => {
      hideLoading();
      const currency_two = currencyEl_two.value;

      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
    return data;
  } catch (error) {
    alert(error);
  }
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", () => {
  // Check for negative numbers
  if (amountEl_one.value <= 0) {
    alert("Must be a number larger than 0");
  } else {
    calculate();
  }
});
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
