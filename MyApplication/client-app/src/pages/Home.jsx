import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        height: "100vh",
        background: "linear-gradient(to bottom right, #f8fafc, #e8f0ff)",
        paddingTop: "60px",
      }}
    >
      <div className="container">
        <div className="card shadow-lg border-0 p-5 mx-auto" style={{ maxWidth: "800px", borderRadius: "20px" }}>
          <h1 className="fw-bold mb-3 text-primary">
            Welcome to the Multi-Vendor Marketplace
          </h1>
          <p className="lead text-secondary mb-4">
            Manage vendors, products, and users in one place. Register or log in
            to access your personalized dashboard.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link className="btn btn-primary btn-lg px-4" to="/register">
              Get Started
            </Link>
            <Link className="btn btn-outline-primary btn-lg px-4" to="/vendors">
              Explore Vendors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
