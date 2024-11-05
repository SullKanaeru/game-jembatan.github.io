let time = 0;
let torchPosition = "left"; // Start with torch on the left side

function moveSelected() {
  const leftList = document.getElementById("left-list");
  const rightList = document.getElementById("right-list");
  const selectedPeople = document.querySelectorAll(".selected");

  if (selectedPeople.length < 1 || selectedPeople.length > 2) {
    document.getElementById("message").innerText =
      "Hanya 2 orang yang bisa menyeberang.";
    return;
  }

  // Calculate crossing time as the slowest person in the selection
  let maxTime = 0;
  selectedPeople.forEach((person) => {
    const personTime = parseInt(person.getAttribute("data-time"));
    if (personTime > maxTime) maxTime = personTime;
  });

  // Update time and check if the limit has been exceeded
  time += maxTime;
  document.getElementById("time").innerText = `Waktu: ${time} menit`;

  if (time > 17) {
    document.getElementById("message").innerText =
      "Yah.. kamu melebihi batas waktu";
    return;
  }

  // Move selected people to the other side
  selectedPeople.forEach((person) => {
    person.classList.remove("selected");
    if (torchPosition === "left") {
      rightList.appendChild(person);
    } else {
      leftList.appendChild(person);
    }
  });

  // Toggle torch position
  torchPosition = torchPosition === "left" ? "right" : "left";

  // Check if all people are on the right side
  if (leftList.children.length === 0) {
    document.getElementById("message").innerText =
      "Selamat! Kamu membantu mereka menyeberang jembatan";
  } else {
    document.getElementById("message").innerText = "";
  }
}

// Toggle selection of people
document.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("selected");
  });
});
