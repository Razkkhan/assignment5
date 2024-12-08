document.addEventListener("DOMContentLoaded", function () {
  const donationSection = document.getElementById("donation-section");
  const historySection = document.getElementById("history-section");
  const donationBtn = document.getElementById("donation-btn");
  const historyBtn = document.getElementById("history-btn");

  // Toggle sections between Donation and History
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

  // Donation functionality
  const donateButtons = document.querySelectorAll(".donate-btn");
  const balanceElement = document.querySelector(".balance");
  const modal = document.getElementById("donation-modal");
  const closeModal = document.getElementById("close-modal");

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

      let balance = parseFloat(balanceElement.textContent.replace(" BDT", "").trim()); // Get the numeric balance

      if (donationAmount > balance) {
        alert("You don't have enough balance for this donation.");
        return;
      }

      // Deduct balance and update
      balance -= donationAmount;
      balanceElement.innerHTML = `<img src="assets/coin.png" alt="coin icon" class="coin-icon"> ${balance} BDT`;

      // Update donation amount on the card
      const currentAmount = parseFloat(amountElement.textContent.replace(" BDT", "").trim());
      amountElement.innerHTML = `<img src="assets/coin.png" alt=""> ${currentAmount + donationAmount} BDT`;

      // Add a history entry
      const historyEntry = document.createElement("div");
      historyEntry.classList.add("history-entry");
      const date = new Date();
      historyEntry.innerHTML = `
        <p>${donationAmount} BDT donated to ${card.querySelector("h3").textContent}</p>
        <p>Date: ${date.toLocaleString()}</p>
      `;
      historySection.appendChild(historyEntry);

      // Clear input value
      input.value = "";

      // Show Modal
      modal.classList.remove("hidden");
    });
  });

  // Close modal functionality
  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
});
