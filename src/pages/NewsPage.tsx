import { Animate } from "react-simple-animate";
function NewsPage() {
    return (
        <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }} delay={0.1} duration={0.6}>
            <div className="container"><h1>News</h1></div>
        </Animate>
    );
}

export default NewsPage;