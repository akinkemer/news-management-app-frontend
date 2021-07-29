import { Animate } from "react-simple-animate";

function MainPage() {
    return (
        <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }} delay={0.1} duration={0.8}>
            <h1>Main Page</h1>
        </Animate>
    );
}

export default MainPage;