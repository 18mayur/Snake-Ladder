const startBtn = document.querySelector(".btn");
const player1 = document.getElementById("name1");
const player2 = document.getElementById("name2");
const form = document.querySelector("form");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const red = document.querySelector(".check-1");
const green = document.querySelector(".check-2");
const blue = document.querySelector(".check-3");
const purple = document.querySelector(".check-4");
function validate() {
  let p1Name = player1.value;
  let p2Name = player2.value;
  let selectedCheckboxes = [];

  checkboxes.forEach((check) => {
    if (check.checked) {
      selectedCheckboxes.push(check.id);
    }
  });
  localStorage.setItem(
    "selectedCheckboxes",
    JSON.stringify(selectedCheckboxes)
  );

  let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  let num = /\d+/;
  if (p1Name.trim() == "" || p2Name.trim() == "") {
    alert("No Blank Values Allowed!");
    return false;
  } else if (p1Name.match(specialChars) || p2Name.match(specialChars)) {
    alert("Special Characters are Not Allowed !");
    return false;
  } else if (p1Name.match(num) || p2Name.match(num)) {
    alert("Numbers are Not allowed !");
    return false;
  } else {
    localStorage.setItem("player-1", p1Name);
    localStorage.setItem("player-2", p2Name);
    return true;
  }
}
