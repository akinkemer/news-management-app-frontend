function Footer() {
  return (
    <footer className="text-center mt-auto py-3  bg-light">
      <div className="container pt-3">
        <section className="d-flex justify-content-center mb-2"></section>
      </div>
      <div
        className="text-center text-dark p-3"
        style={{ backgroundColor: "#dcdcdc" }}
      >
        © {new Date().getFullYear()} Copyright:
        <span className="text-dark" id="footer">
          News Management
        </span>
      </div>
    </footer>
  );
}
export default Footer;
