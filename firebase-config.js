// Firebase 웹 앱 초기화 정보 (Firebase 콘솔에서 복사한 값으로 바꾸세요)
const firebaseConfig = {
  apiKey: "AIzaSyBnW7copyPKtw-t_I3nCCyK5h5yZyUKtcA",
  authDomain: "youthreservationapp.firebaseapp.com",
  databaseURL: "https://youthreservationapp-default-rtdb.firebaseio.com",
  projectId: "youthreservationapp",
  storageBucket: "youthreservationapp.firebasestorage.app",
  messagingSenderId: "205168190902",
  appId: "1:205168190902:web:0156a544807a9479870d17",
  measurementId: "G-18GLC0NZX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
