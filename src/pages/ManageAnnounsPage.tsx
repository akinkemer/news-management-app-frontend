import { Animate } from "react-simple-animate";
function ManageAnnounsPage() {
    return (
        <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }} delay={0.1} duration={0.6}>
            <h1>Manage Announcements Page</h1>
        </Animate>
    );
}

export default ManageAnnounsPage;