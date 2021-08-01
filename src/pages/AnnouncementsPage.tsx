import { useEffect } from "react";
import { Animate } from "react-simple-animate";
import { connect } from "../service/websocket/AnnouncementBroker";

function AnnouncementsPage() {
  useEffect(() => {
    connect();
  });
  return (
    <Animate
      play
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      delay={0.1}
      duration={0.6}
    >
      <h1>announcements</h1>
    </Animate>
  );
}

export default AnnouncementsPage;
