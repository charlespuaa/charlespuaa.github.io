// Colors per day
const dayColors = {
  Monday: { bg: "#A8C0D8", border: "#5b7992" },
  Tuesday: { bg: "#A3B18A", border: "#588157" },
  Wednesday: { bg: "#E4C59E", border: "#C29D75" },
  Thursday: { bg: "#D08C60", border: "#BF6F50" },
  Friday: { bg: "#9E6B3F", border: "#6D4A33" },
  Saturday: { bg: "#D88C9A", border: "#B56576" },
  Sunday: { bg: "#f4a261", border: "#d77a3d" },
};

document.querySelectorAll(".week").forEach((btn) => {
  btn.addEventListener("click", () => {
    dropBox(btn.getAttribute("data-day"));
  });
});

function dropBox(day) {
  const cont = document.querySelector(".container");

  // Remove old boxes
  document.querySelectorAll(".box").forEach((bx) => {
    bx.style.top = "-250px";
    setTimeout(() => bx.remove(), 1500);
  });

  // Create new box
  const newBox = document.createElement("div");
  newBox.className = "box moving-box";
  newBox.style.position = "absolute";
  newBox.style.left = "70%";
  newBox.style.transform = "translateX(-50%)";
  newBox.style.top = "-200px";
  newBox.style.backgroundColor = "transparent";
  newBox.style.border = `10px solid ${dayColors[day].border}`;
  newBox.dataset.targetBg = dayColors[day].bg;

  cont.appendChild(newBox);

  // Drop the box and fade it
  setTimeout(() => {
    newBox.style.top = "350px";
    newBox.style.opacity = "0"; // fades out
  }, 100);

  setTimeout(() => {
    checkOverlap();
  }, 100);
}

function checkOverlap() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((b1) => {
    let overlap = false;
    boxes.forEach((b2) => {
      if (b1 !== b2 && boxesCollide(b1, b2)) {
        overlap = true;
      }
    });
    if (overlap) {
      b1.style.backgroundColor = b1.dataset.targetBg;
      b1.style.opacity = "0.9";
    } else {
      b1.style.backgroundColor = "transparent";
      b1.style.opacity = "1";
    }
  });
  requestAnimationFrame(checkOverlap);
}

function boxesCollide(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}
