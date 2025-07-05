// Firebase DB 객체 생성 (최상단에서 한 번만)
const db = firebase.database();
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservation-form");
  const nameInput = document.getElementById("name");
  const timeInput = document.getElementById("time");
  const list = document.getElementById("reservation-list");

// 예약 저장
function saveReservation() {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  if (!name || !date) return alert("이름과 날짜를 모두 입력하세요.");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value;
    const time = timeInput.value;

  const newRef = db.ref("reservations").push();
  newRef.set({
    name: name,
    date: date,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}
    firebase.database().ref("reservations").push({
      name,
      time,
      timestamp: Date.now()
    });

// 실시간 예약 목록 업데이트
db.ref("reservations").on("value", (snapshot) => {
  const data = snapshot.val();
  const list = document.getElementById("reservation-list");
  list.innerHTML = ""; // 기존 목록 제거
    form.reset();
  });

  if (data) {
    for (let key in data) {
      const item = data[key];
  // 실시간 목록 반영
  firebase.database().ref("reservations").on("value", function (snapshot) {
    list.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      const data = childSnapshot.val();
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.date}`;
      li.textContent = `${data.name} - ${data.time}`;
      list.appendChild(li);
    }
  } else {
    // 예약이 없을 때
    const li = document.createElement("li");
    li.textContent = "예약이 없습니다.";
    list.appendChild(li);
  }
    });
  });
});
