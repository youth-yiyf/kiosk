// Firebase Realtime DB 참조
const db = firebase.database();

// 예약 정보 저장
function saveReservation() {
  const name = document.getElementById("user-name").value;
  const birth = document.getElementById("user-birth").value;
  const phone = document.getElementById("user-phone").value;
  const facility = selectedFacility || "미선택";
  const number = selectedFacilityNumber || "미선택";
  const time = selectedTimeSlot || "미선택";
  const today = new Date().toISOString().split("T")[0];

  if (!name || !birth || !phone || !time) {
    alert("모든 정보를 입력해 주세요.");
    return;
  }

  db.ref("reservations").push({
    name,
    birth,
    phone,
    facility,
    number,
    time,
    date: today,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}

// 예약 완료 시 호출
function completeReservation() {
  saveReservation();
  showScreen("success-screen");
}

// 실시간 예약 목록 렌더링 (검색 결과 등)
function renderReservationList(snapshot) {
  const data = snapshot.val();
  const listContainer = document.getElementById("reservation-list");
  listContainer.innerHTML = "";

  if (data) {
    Object.keys(data).forEach((key) => {
      const item = data[key];
      const div = document.createElement("div");
      div.textContent = `[${item.date}] ${item.name} (${item.phone}) - ${item.facility} ${item.number} / ${item.time}`;
      listContainer.appendChild(div);
    });
    document.getElementById("search-results").style.display = "block";
  } else {
    listContainer.textContent = "예약 내역이 없습니다.";
  }
}

// 예약 검색 (이름 + 생년월일 + 전화번호 일치)
function searchReservations() {
  const name = document.getElementById("search-name").value;
  const birth = document.getElementById("search-birth").value;
  const phone = document.getElementById("search-phone").value;

  db.ref("reservations").once("value", (snapshot) => {
    const filtered = {};
    snapshot.forEach((child) => {
      const item = child.val();
      if (
        item.name === name &&
        item.birth === birth &&
        item.phone === phone
      ) {
        filtered[child.key] = item;
      }
    });
    renderReservationList({ val: () => filtered });
  });
}

function clearSearch() {
  document.getElementById("search-name").value = "";
  document.getElementById("search-birth").value = "";
  document.getElementById("search-phone").value = "";
  document.getElementById("search-results").style.display = "none";
  document.getElementById("reservation-list").innerHTML = "";
}

// 선택 값 저장용 전역 변수
let selectedFacility = null;
let selectedFacilityNumber = null;
let selectedTimeSlot = null;

function selectFacility(el) {
  selectedFacility = el.querySelector(".facility-name").textContent;
  showScreen("facility-number-screen");
}

function selectFacilityNumber(num) {
  selectedFacilityNumber = num;
}

function selectTimeSlot(el) {
  const slots = document.querySelectorAll(".time-slot");
  slots.forEach(slot => slot.classList.remove("selected"));
  el.classList.add("selected");
  selectedTimeSlot = el.dataset.time;
}

function validateUserInfo() {
  const name = document.getElementById("user-name").value;
  const birth = document.getElementById("user-birth").value;
  const phone = document.getElementById("user-phone").value;

  if (!name || !birth || !phone) {
    alert("모든 정보를 입력해주세요.");
    return;
  }

  const box = document.getElementById("confirm-info-box");
  box.innerHTML = `
    <p><strong>이름:</strong> ${name}</p>
    <p><strong>생년월일:</strong> ${birth}</p>
    <p><strong>전화번호:</strong> ${phone}</p>
  `;
  showScreen("user-info-confirm-screen");
}

function goToFacilityScreen() {
  showScreen("facility-screen");
}

function goBackToUserInfo() {
  showScreen("user-info-screen");
}

function showScreen(id) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
