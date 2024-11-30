import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess("so-cart", "checkout-summary");
checkoutProcess.init();

document
    .querySelector("#zip")
    .addEventListener("blur", checkoutProcess.calculateTotal.bind(checkoutProcess));

// Update the submit button event listener to use the correct ID from your HTML
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms["checkout"];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status) {
    checkoutProcess.checkout();
  }
});
