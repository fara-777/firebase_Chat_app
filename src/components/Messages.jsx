export default function Messages({ msg, user }) {
  // oturumu acik olan kullaniciyi ekrana basar
  if (user === msg.user) {
    return <p className="msg-user">{msg.text}</p>;
  }
  // farkli kullanicin gondersini ekrana basar
  return (
    <p className="msg-other">
      <span>{msg.user}:</span>
      <span>{msg.text}</span>
    </p>
  );
}
