function PairingSocket() {
  console.log(process.env.REACT_APP_API_URL);
  const ActionCable = require('actioncable');
  PairingSocket.cable = ActionCable.createConsumer(`${process.env.REACT_APP_SOCKET_URL}?jwt_token=${localStorage.getItem('jwt_token')}`);
  PairingSocket.cable.subscriptions.create({ channel: "PairingChannel"}, {
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

export default PairingSocket;
