import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";

export default function Auth() {
  const handleClick = () => {
    /*
     * kullanıcının sağlayıcı hesabını seçmesi için bir prencere açar
     * hesabı seçtikten sonra daha önce varsa giriş yapar
     * yoksa yeni bir hesap oluşturur ve ona giriş yapar
     * promise döndürür kullanıcı girerse kullancı bilgilerini döndürür
     * hata olursda hatayı yakalamak gerekir
     */

    signInWithPopup(auth, provider)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="auth">
      <h1>Chat Odasi</h1>
      <p>Devam Etmek Ucin Giris Yapin</p>
      <button onClick={handleClick}>
        <img
          src="https://img.freepik.com/freie-ikonen/suche_318-265146.jpg?q=10&h=200"
          alt=""
        />
        <span>Google ile girin</span>
      </button>
    </div>
  );
}
