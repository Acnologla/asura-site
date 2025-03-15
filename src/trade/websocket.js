let w = {
  ws: null,
};

export const connect = (token, messageCallback) => {
  const ws = new WebSocket(`ws://localhost:80/ws?token=${token}`);

  ws.onopen = () => {
    console.log("connected");
    ws.onclose = () => {
      console.log("disconnected");
      setTimeout(() => connect(token, messageCallback), 1500);
    };
  };

  ws.onerror = (error) => {
    console.log(error);
  };

  ws.onclose = (error) => {
    console.log(error);
  };
  ws.onmessage = (event) => {
    messageCallback(JSON.parse(event.data));
  };

  w.ws = ws;
  return w;
};
