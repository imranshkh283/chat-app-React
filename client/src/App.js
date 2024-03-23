import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <div>
      <p>Hello Socket!</p>
    </div>
  );
}

export default App;
