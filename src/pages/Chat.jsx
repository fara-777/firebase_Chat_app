import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Messages from "../components/Messages";
import { MdSend } from "react-icons/md";

export default function Chat({ room, setRoom }) {
  // kolleksiyonun referansini alma
  const messagesCol = collection(db, "messages");

  const [messages, setMessages] = useState([]);

  // mesaj gonderme fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    // mesaji kontrol etme
    if (!e.target[0].value) return;
    try {
      console.log("Firestore işlemi başladi");
      // belirtigimiz kolleksiyona yeni eleman ekleme
      await addDoc(messagesCol, {
        text: e.target[0].value,
        user: auth.currentUser.displayName,
        room,
        createdAt: serverTimestamp(),
      });
      console.log("Veri Firestore a başariyla eklendi.");
    } catch (error) {
      console.log("Firestore veri ekleme hatasi:", error);
    }
    e.target[0].value = "";
  };

  // gonderilen mesajlari alma
  useEffect(() => {
    // filtreleme ayarlarini yapma
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    // kolleksiyon degisimini izler
    onSnapshot(queryOptions, (snepshot) => {
      let comingMesages = [];
      // kolleksiyonu donum document verilerine erisme
      snepshot.forEach((doc) => {
        comingMesages.push(doc.data());
      });
      setMessages(comingMesages);
    });
  }, []);

  return (
    <>
      <div className="chat">
        <header>
          <p className="user">{auth.currentUser.displayName}</p>
          <p>{room}</p>
          <a onClick={() => setRoom(null)}>Farkli oda</a>
        </header>
        <main>
          {messages.map((msg) => (
            <Messages msg={msg} user={auth.currentUser.displayName} />
          ))}
        </main>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="mesajinizi yaziniz..." />
          <button className="send-icon">
            <MdSend />
          </button>
        </form>
      </div>
    </>
  );
}
