const firebaseConfig = {
  apiKey: "AIzaSyCIpW9ryhmYvPP4wzF4igOqR3gx0R-WJuc",
  authDomain: "my-homepage-446b0.firebaseapp.com",
  projectId: "my-homepage-446b0",
  storageBucket: "my-homepage-446b0.firebasestorage.app",
  messagingSenderId: "73111119306",
  appId: "1:73111119306:web:37d4ff6e78e6f9baf71b33"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 注册
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("注册成功"))
    .catch(e => alert("注册失败：" + e.message));
}

// 登录
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("登录成功");
      document.getElementById("auth-section").style.display = "none";
      document.getElementById("editor-section").style.display = "block";
      loadPosts();
    })
    .catch(e => alert("登录失败：" + e.message));
}

// 上传内容
function uploadContent() {
  const content = document.getElementById("content").value;
  const user = auth.currentUser;
  if (!user) return alert("请先登录");

  db.collection("posts").add({
    uid: user.uid,
    content: content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("上传成功");
    loadPosts();
  });
}

// 加载内容
function loadPosts() {
  db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
    const div = document.getElementById("posts");
    div.innerHTML = "";
    snapshot.forEach(doc => {
      div.innerHTML += `<p>${doc.data().content}</p><hr>`;
    });
  });
}
