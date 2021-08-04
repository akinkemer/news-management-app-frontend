import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {store} from "../store"

let stompClient: Stomp.Client;
let isFirst: boolean = true;

export const connect = () => {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected " + frame);
    stompClient.subscribe("/announcementBroker", function (message) {
      if (isFirst) {
        store.dispatch({ type: "addAnnouncFromSocket", payload: JSON.parse(message.body) })
        isFirst = false;
      } else {
        setTimeout(()=>isFirst=true,5000);
      }
    });
  });
};
