import { Animate } from "react-simple-animate";

function LogoutPage() {
    return (
        <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }} delay={0.1} duration={0.6}>
            <h1>Logout Succesful</h1>
        </Animate>
    );
}

export default LogoutPage;