function Socket(props) {
  const ActionCable = require('actioncable');
  Socket.cable = ActionCable.createConsumer(`${process.env.REACT_APP_SOCKET_URL}?jwt_token=${localStorage.getItem('jwt_token')}`);
  Socket.cable.subscriptions.create(props , {
    connected() {
      console.log("Connected to the channel:", this);
      props.connected();
    },
    disconnected() {
      console.log("Disconnected");
      props.disconnected();
    },
    received(data) {
      console.log("Received some data:", data);
      props.received(data);
    }
  });
  return (
    <div></div>
  )
}

function AppearanceSocket(){
  Socket({
    channel: "AppearanceChannel",
    connected: ()=>{},
    disconnected: ()=>{},
    received: ()=>{}
  })
}

function PairingSocket(){
  Socket({
    channel: "PairingChannel",
    connected: ()=>{},
    disconnected: ()=>{},
    received: ()=>{}
  })
}

function NewMessageSocket(props){
  Socket({
    channel: "NewMessageChannel",
    connected: ()=>{},
    disconnected: ()=>{},
    received: ()=>{}
  })
}

export {PairingSocket, AppearanceSocket, NewMessageSocket};
