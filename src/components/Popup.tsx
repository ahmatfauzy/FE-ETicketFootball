import React, { useEffect, useState } from "react";

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isPopupClosed = localStorage.getItem("popupClosed");
    if (isPopupClosed !== "true") {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("popupClosed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Pemberitahuan</h2>
        <p className="mb-4 text-sm leading-relaxed">
          Berikut adalah akun untuk akses Admin Dashboard. <br /> <br />
          <strong>Email:</strong> admin@gmail.com <br />
          <strong>Password:</strong> admin <br />
          <span className="text-gray-500 text-xs block mt-2">
            *Pop-up ini hanya muncul sekali saja, jadi mohon diingat.
          </span>
        </p>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default Popup;
