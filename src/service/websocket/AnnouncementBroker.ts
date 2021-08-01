import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient:Stomp.Client;

export const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("Connected " + frame);
      stompClient.subscribe(
        "/announcementBroker",
        function (message) {
          console.log("message",JSON.parse(message.body));
        }
      );
    });
  };
