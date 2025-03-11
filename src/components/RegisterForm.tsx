import { useState } from "react";
import { authService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bg_bola1.jpeg";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register(email, password);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="flex w-full max-w-6xl mx-auto z-10 relative">
        {/* kIRI - branding */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center pl-8 text-white space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-wider">
              FootieGate
            </span>
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            MATCH DAY <br /> MAGIC
          </h1>
          <p className="text-lg font-medium">
            Where Every Seat Brings <br /> Unforgettable Moments.
          </p>
          <p className="text-sm max-w-md opacity-90">
            Join our community of fans and experience <br /> the thrill of live
            football.
          </p>
        </div>

        {/* kANANe - Register form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/50 backdrop-blur-md rounded-lg p-8 shadow-lg border border-white/30">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create an Account
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-800 text-sm mb-1 font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white/80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-800 text-sm mb-1 font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white/80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-800 text-sm mb-1 font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border  mb-6 border-gray-300 bg-white/80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 mt-2"
                >
                  {loading ? "Processing..." : "CREATE ACCOUNT"}
                </button>

                <div className="text-center mt-4">
                  <p className="text-gray-800 text-sm">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-blue-700 hover:underline font-medium"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
