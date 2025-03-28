import { useState } from "react";
import { authService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bg_bola1.jpeg";
import Popup from "../components/Popup";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      if (email === import.meta.env.VITE_ADMIN_EMAIL) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Popup akan muncul di sini */}
      <Popup />
      <Popup/>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative h-full w-full flex items-center justify-center">
        <div className="flex w-full max-w-6xl mx-auto z-10">
          {/* Kiri - branding */}
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
              Where Every Seat Brings <br />
              Unforgettable Moments.
            </p>
            <p className="text-sm max-w-md opacity-90">
              Join our community of fans and experience <br /> the thrill of
              live football.
            </p>
          </div>

          {/* Kanan side - Login form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/50 backdrop-blur-md rounded-lg p-8 shadow-lg border border-white/30">
              <form onSubmit={handleSubmit}>
                {error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    {error}
                  </div>
                ) : null}

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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border mb-6 border-gray-300 bg-white/80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "SIGN IN"}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-gray-800 text-sm">
                      Are you new?{" "}
                      <a
                        href="/register"
                        className="text-blue-700 hover:underline font-medium"
                      >
                        Create an Account
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;