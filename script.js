document.addEventListener("DOMContentLoaded", function () {
  const donationSection = document.getElementById("donation-section");
  const historySection = document.getElementById("history-section");
  const donationBtn = document.getElementById("donation-btn");
  const historyBtn = document.getElementById("history-btn");

  donationBtn.addEventListener("click", function () {
    donationSection.classList.remove("hidden");
    historySection.classList.add("hidden");
    donationBtn.classList.add("active");
    historyBtn.classList.remove("active");
  });

  historyBtn.addEventListener("click", function () {
    historySection.classList.remove("hidden");
    donationSection.classList.add("hidden");
    historyBtn.classList.add("active");
    donationBtn.classList.remove("active");
  });

  const donateButtons = document.querySelectorAll(".donate-btn");
  const balanceElement = document.querySelector(".balance");

  donateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = button.closest(".donation-card");
      const input = card.querySelector(".donation-input");
      const amountElement = card.querySelector(".donation-amount");
      const donationAmount = parseFloat(input.value);

      if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      let balance = parseFloat(balanceElement.textContent.replace(" BDT", ""));

      if (donationAmount > balance) {
        alert("You don't have enough balance for this donation.");
        return;
      }

      balance -= donationAmount;
      balanceElement.textContent = `${balance} BDT`;

      const currentAmount = parseFloat(amountElement.textContent.replace(" BDT", ""));
      amountElement.textContent = `${currentAmount + donationAmount} BDT`;

      const historyEntry = document.createElement("div");
      historyEntry.classList.add("history-entry");
      const date = new Date();
      historyEntry.innerHTML = `
        <p>${donationAmount} BDT donated to ${card.querySelector("h3").textContent}</p>
        <p>Date: ${date.toLocaleString()}</p>
      `;
      historySection.appendChild(historyEntry);

      input.value = "";

      alert("Donation successful!");
    });
  });
});
