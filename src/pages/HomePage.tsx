import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero.png";
import Navbar from "../components/Navbar";
import Accordion from "../components/Accordion";
import Contact from "../components/Contact";
import { FaFutbol } from "react-icons/fa";

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const accordionItems = [
    {
      id: "1",
      title: "Bagaimana cara memesan e-ticket pertandingan?",
      content:
        "Untuk memesan e-ticket pertandingan, Anda perlu login terlebih dahulu, pilih pertandingan yang ingin ditonton, dan pilih kursi yang tersedia. E-ticket anda berhasil dipesan.",
    },
    {
      id: "2",
      title: "Apakah saya perlu mencetak e-ticket?",
      content:
        "Tidak perlu mencetak e-ticket. Anda cukup menunjukkan e-ticket di smartphone Anda ketika masuk ke stadion. Pastikan baterai smartphone Anda terisi penuh dan e-ticket sudah diunduh untuk antisipasi jika koneksi internet di stadion tidak stabil.",
    },
    {
      id: "3",
      title: "Berapa lama sebelum pertandingan saya harus tiba di stadion?",
      content:
        "Kami menyarankan Anda untuk tiba di stadion minimal 1 jam sebelum pertandingan dimulai untuk menghindari antrean panjang. Pintu stadion biasanya dibuka 2 jam sebelum kick-off.",
    },
    {
      id: "4",
      title: "Apa yang harus dilakukan jika e-ticket hilang?",
      content:
        "E-ticket tidak akan hilang selama Anda memiliki akses ke akun atau email Anda. Jika Anda tidak dapat mengakses e-ticket, silakan hubungi customer service kami minimal 6 jam sebelum pertandingan dengan menyertakan bukti identitas dan detail pemesanan.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-screen flex items-start mt-7 bg-gray-900 text-white">
        <div className="container mx-auto  flex flex-col md:flex-row items-center">
          <div className="md:w-2/5 mb-6 md:mb-0 pt-4">
            <div className="text-blue-400 font-bold mb-2">
              THE BEST ETICKET PROVIDERS AROUND THE WORLD
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Dapatkan Tiket Pertandingan Favorit Anda
            </h1>
            <p className="text-xl mb-6">
              Nikmati pengalaman luar biasa menonton pertandingan langsung di
              stadion dengan tiket resmi kami.
            </p>
            <Link
              to="/matches/user"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg inline-block"
            >
              Lihat Pertandingan
            </Link>
          </div>
          <div className="md:w-3/5 md:pl-16 flex justify-end">
            <div className="relative">
              <div className="absolute -top-6 -left-8 text-4xl text-white opacity-50">
                <FaFutbol />
              </div>

              {/* Ikon Bola 2 */}
              <div className="absolute -bottom-8 -right-6 text-4xl text-white opacity-50">
                <FaFutbol />
              </div>

              {/* Ikon Bola 3
              <div className="absolute -bottom-0 -left-4 text-4xl text-white opacity-50">
                <FaFutbol />
              </div> */}

              <img
                src={heroImage}
                alt="Football fan with smartphone"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-12 px-4 -mt-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Tiket Resmi"
              description="Semua tiket dijamin resmi dan terdaftar langsung di sistem stadium."
            />
            <FeatureCard
              title="Pemesanan Mudah"
              description="Proses pemesanan cepat dan mudah dengan berbagai metode pembayaran."
            />
            <FeatureCard
              title="Dukungan 24/7"
              description="Tim layanan pelanggan kami siap membantu Anda kapan saja."
            />
          </div>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="bg-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-white text-center">
            Hal yang sering ditanyakan
          </h1>
          <Accordion items={accordionItems} allowMultiple={false} />
        </div>
      </div>

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 border-t border-gray-600 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 FootieGate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
