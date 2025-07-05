document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservation-form");
  const nameInput = document.getElementById("name");
  const timeInput = document.getElementById("time");
  const list = document.getElementById("reservation-list");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value;
    const time = timeInput.value;

    firebase.database().ref("reservations").push({
      name,
      time,
      timestamp: Date.now()
    });

    form.reset();
  });

  // 실시간 목록 반영
  firebase.database().ref("reservations").on("value", function (snapshot) {
    list.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      const data = childSnapshot.val();
      const li = document.createElement("li");
      li.textContent = `${data.name} - ${data.time}`;
      list.appendChild(li);
    });
  });
});
