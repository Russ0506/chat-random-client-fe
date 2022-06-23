function AppearanceSocket() {
  console.log(process.env.REACT_APP_API_URL);
  const ActionCable = require('actioncable');
  AppearanceSocket.cable = ActionCable.createConsumer(`${process.env.REACT_APP_SOCKET_URL}?jwt_token=${localStorage.getItem('jwt_token')}`);
  AppearanceSocket.cable.subscriptions.create({ channel: "AppearanceChannel"}, {
    connected() {
      console.log("Connected to the channel:", this);
    },
    disconnected() {
      console.log("Disconnected");
    },
    received(data) {
      console.log("Received some data:", data);
    }
  });
  return (
    <div></div>
  )
}

export default AppearanceSocket;
