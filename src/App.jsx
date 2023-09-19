import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import Chat from "./pages/Chat";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const [room, setRoom] = useState(null);

  // kullanicinin oturumundaki degisimi izler
  // eger kullanici varsa calistirdigi fonksiyona
  // parametre olarak gonderir
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // kullanicinin giris yapacagi odayi belirleme
    setRoom(e.target[0].value);
  };

  // Kullanici yoksa giris ekranini gosterir
  if (!isAuth) {
    return (
      <div className="container">
        <Auth />
      </div>
    );
  }

  return (
    <div className="container">
      {room ? (
        <Chat room={room} setRoom={setRoom} />
      ) : (
        <form onSubmit={handleSubmit} className="room-container">
          <h1>Chat Odasi</h1>
          <p>Hangi Odaya Gireceksiniz</p>
          <input type="text" />
          <button type="submit">Odaya Gir</button>
          <button
            onClick={() => signOut(auth)}
            className="logout"
            type="button"
          >
            Cikis Yap
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
