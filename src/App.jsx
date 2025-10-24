import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Factory, Leaf, Users, Award, TrendingUp, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isScrolled ? 'text-emerald-800' : 'text-white'}`}>
                  PT. MULTI AGRONABATINDO NIAGA
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-emerald-600' : 'text-emerald-100'}`}>
                  Edible Oil & Trading Company
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Vision & Mission', 'Directors', 'Activities', 'Products', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-'))}
                  className={`font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white hover:text-emerald-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={isScrolled ? 'text-gray-700' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-gray-700' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'About', 'Vision & Mission', 'Directors', 'Activities', 'Products', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-'))}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            PT. Multi Agronabatindo Niaga
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100">
            Leading Palm Oil Trading & Plantation Company Since 1990
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 bg-white text-emerald-800 rounded-lg font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Learn More
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-emerald-800 transition-all transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Latar Belakang
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Multi Agronabatindo Niaga adalah salah satu perusahaan swasta nasional di Indonesia yang 
                berkedudukan di Ruko Tata Plaza Blok B No. 15 Jl. Kapten Muslim Kec. Medan Helvetia, 
                Sumatera Utara. Merupakan perusahaan trading yang aktifitas utamanya bergerak dalam bidang 
                membeli, memproses dan menjual minyak sawit melalui transportasi darat, laut ke pihak pembeli. 
                Selain itu perusahaan kami juga beraktifitas dalam perkebunan kelapa sawit.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                PT. Multi Agronabatindo Niaga berdiri pada tahun <span className="font-bold text-emerald-700">1990</span> adalah 
                salah satu perusahaan trading kelapa sawit yang didukung oleh staff & tenaga ahli serta memiliki 
                karyawan yang professional dibidangnya, yang bergabung dan berkembang bersama perusahaan.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Di era Globalisasi dan kemajuan teknologi, perekonomian dan perindustrian yang membutuhkan 
                mobilitas kerja yang efisien dan efektif, PT. Multi Agronabatindo Niaga siap membantu dalam 
                menyediakan kebutuhan minyak kepala sawit. Kami juga siap bersaing secara sehat dan ketat 
                dengan perusahaan lainnya yang bergerak di bidang yang sama untuk dapat memenuhi kebutuhan 
                jasa trading dan suplier sebagaimana keinginan pelanggan ataupun rekanan.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kami selalu menekankan pada persediaan minyak sawit yang berkualitas, sehingga kami siap 
                melaksanakan kerjasama jangka panjang dan saling menguntungkan dengan memberikan pelayanan 
                yang terbaik, optimal dalam menjaga kepercayaan dan kepuasan untuk memenuhi kebutuhan 
                pelanggan atau rekanan.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <Factory className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">35+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <Users className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">100+</h3>
                <p className="text-gray-600">Professional Staff</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <Award className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Certified</h3>
                <p className="text-gray-600">Quality Standards</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <TrendingUp className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Leading</h3>
                <p className="text-gray-600">Market Position</p>
              </div>
            </div>
          </div>

          {/* Plantation Image Section */}
          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}></div>
                <div className="relative z-10 text-center text-white p-8">
                  <Leaf className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <h3 className="text-3xl font-bold mb-2">Perkebunan Kelapa Sawit</h3>
                  <p className="text-emerald-100 text-lg">Jln besar Medan-Aceh No. 56 Aceh Timur / Aceh Tamiang</p>
                  <p className="text-emerald-200 mt-4">Topografi Tanah Rata & Bergelombang Landai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision---mission" className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Visi & Misi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-200 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">VISI</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-emerald-50">
                    Maju dan berkembang sebagai perusahaan trading, distributor dan suplier yang dapat 
                    menyediakan permintaan pelanggan / rekanan.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-emerald-50">
                    Menjaga dan meningkatkan kualitas dan kuantitas jasa dan barang yang dibutuhkan.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-emerald-50">
                    Menjadi yang terdepan sebagai perusahaan perdagangan, distributor dan suplier dengan 
                    memberikan nilai kepuasan terbaik bagi pelanggan / rekanan melalui pelayanan dan produk 
                    yang berkualitas.
                  </p>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">MISI</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-emerald-50">
                    Membuka peluang dan usaha yang produktif dalam membantu perekonomian Indonesia.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-emerald-50">
                    Mengadakan kerjasama yang saling menguntungkan antara Produsen, Distributor, Agen, 
                    Suplier dan Konsumen.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-emerald-50">
                    Meningkatkan hasil yang optimal, menjaga kepercayaan pelanggan dan memuaskan pelanggan 
                    dari segi jasa pelayanan, kualitas dan kuantias barang yang dibutuhkan.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section id="directors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Direksi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Leadership Team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Director 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">G. SLAMET RIADI</h3>
                <p className="text-emerald-600 font-semibold mb-4">Direktur Utama</p>
                <div className="w-16 h-1 bg-emerald-400 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Pemilik PT. Multi Agronabatindo Niaga perusahaan trading dengan motivasi 
                  mengimplementasi dan mengorganisir visi dan misi perusahaan. Menjadikan perusahaan 
                  salah satu perusahaan trading terbesar di Indonesia dan Asia.
                </p>
              </div>
            </div>

            {/* Director 2 */}
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">SLAMET RAHARDJO</h3>
                <p className="text-emerald-600 font-semibold mb-4">Direktur</p>
                <div className="w-16 h-1 bg-emerald-400 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Mengelolah perusahaan, menyusun strategi bisnis untuk kemajuan perusahaan. Bekerja 
                  dengan penuh keyakinan, keahlian, ketekunan dan kepedulian dengan lingkungan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Aktivitas Usaha</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Our Business Operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Activity 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <Leaf className="w-24 h-24 text-white opacity-80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-900 mb-3">Perkebunan Kelapa Sawit</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Pembelian dan pemilihan buah sawit dengan kualitas export dari kemitraan para petani sawit.
                </p>
                <p className="text-sm text-emerald-700 font-semibold">
                  Lokasi: Jln Medan-Aceh No. 56, Aceh Timur/Tamiang
                </p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <Factory className="w-24 h-24 text-white opacity-80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-900 mb-3">Pengolahan & Produksi</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Proses pengolahan buah kelapa sawit dengan mesin modern untuk menghasilkan CPO dan 
                  Palm Kernel berkualitas tinggi.
                </p>
                <p className="text-sm text-emerald-700 font-semibold">
                  Fasilitas: Station Ripple Mill, Clarification Station
                </p>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <Globe className="w-24 h-24 text-white opacity-80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-900 mb-3">Trading & Distribusi</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Pendistribusian CPO melalui transportasi darat dan laut dengan storage tank 5.000 mton 
                  sesuai standar PORAM.
                </p>
                <p className="text-sm text-emerald-700 font-semibold">
                  Kapasitas: Storage Tank 5.000 mton x 2
                </p>
              </div>
            </div>
          </div>

          {/* Processing Details - NEW SECTION */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-emerald-900 mb-8 text-center">Proses Pengolahan Produk</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Process 1 */}
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Pembelian & Pengiriman TBS</h4>
                    <p className="text-gray-700">
                      Pembelian dan pemilihan buah sawit (TBS) dengan kualitas export dari kemitraan 
                      para petani sawit, kemudian pengiriman/pendistribusian buah sawit ke pabrik 
                      kelapa sawit untuk proses pengolahan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process 2 */}
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Proses Pengolahan</h4>
                    <p className="text-gray-700">
                      Proses pengolahan buah kelapa sawit menggunakan mesin modern dengan digital 
                      pressing untuk menghasilkan CPO sesuai standar internasional dan Palm Kernel 
                      dengan prosentasi produksi yang tinggi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process 3 */}
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Quality Control</h4>
                    <p className="text-gray-700">
                      Laboratorium dengan peralatan modern untuk memastikan kualitas CPO sesuai 
                      standar PORAM. Setiap batch diuji untuk parameter FFA, moisture, impurities, 
                      dan lainnya.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process 4 */}
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Pemuatan & Distribusi</h4>
                    <p className="text-gray-700">
                      Proses pemuatan CPO dari tangki pabrik ke kapal cargo atau truck losing. 
                      Memerlukan waktu 36-48 jam tergantung kapasitas pompa. Transportasi laut 
                      menggunakan kapal sesuai standar kelaikan laut.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Facilities */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6 text-center">Fasilitas Pengolahan</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-emerald-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Station Palm Kernel / Ripple Mill</h4>
                    <p className="text-gray-600 text-sm">
                      Mesin produksi dengan prosentasi tinggi untuk menghasilkan Inti Sawit berkualitas. 
                      Dilengkapi dengan Mechanical Mechenery equipment dan conveyor Screw.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-emerald-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Storage Tank 5.000 mton x 2</h4>
                    <p className="text-gray-600 text-sm">
                      Penampung hasil produksi siap untuk dipasarkan domestik dan export. 
                      Produksi/Quality sudah sesuai dengan Standar PORAM.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-emerald-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Station Clarification Pure Oil</h4>
                    <p className="text-gray-600 text-sm">
                      Proses pemurnian CPO dengan digital pressing sesuai standar internasional. 
                      Termasuk Sludge Tank, COT, CST tank dan fasilitas pendukung lainnya.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-emerald-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Transportasi Laut</h4>
                    <p className="text-gray-600 text-sm">
                      Kapal cargo sesuai standard kelaikan laut untuk pengiriman internasional. 
                      Proses pemuatan memerlukan waktu 36-48 jam tergantung kapasitas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Hasil Produk</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-200 mx-auto mb-6"></div>
            <p className="text-xl text-emerald-100">Quality Palm Oil Products</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Factory className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Kemasan Derigen</h3>
              <p className="text-emerald-100 text-center mb-6">
                Jerry can packaging untuk distribusi dalam jumlah besar
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Kapasitas besar</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Mudah transportasi</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Standar industri</span>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Kemasan Botol</h3>
              <p className="text-emerald-100 text-center mb-6">
                Packaging botol untuk konsumen retail dan rumah tangga
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Higienis</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Praktis</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Berkualitas tinggi</span>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Kemasan Flexi Bag</h3>
              <p className="text-emerald-100 text-center mb-6">
                Container flexi bag untuk pengiriman export internasional
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Kapasitas container</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Export ready</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span className="text-sm">Standar PORAM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Our Facilities & Operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                title: 'Perkebunan Kelapa Sawit', 
                desc: 'Aceh Timur / Tamiang',
                detail: 'Topografi tanah rata & bergelombang landai'
              },
              { 
                title: 'Station Ripple Mill', 
                desc: 'Produksi Palm Kernel',
                detail: 'Mechanical equipment modern'
              },
              { 
                title: 'Storage Tank', 
                desc: 'Kapasitas 5.000 mton x 2',
                detail: 'Standar PORAM'
              },
              { 
                title: 'Clarification Station', 
                desc: 'Pemurnian CPO',
                detail: 'Digital pressing system'
              },
              { 
                title: 'Quality Control Lab', 
                desc: 'Laboratorium modern',
                detail: 'Testing & analysis'
              },
              { 
                title: 'Loading Port', 
                desc: 'Fasilitas pelabuhan',
                detail: 'Kapal cargo & truck losing'
              },
              { 
                title: 'Buah Sawit (TBS)', 
                desc: 'Fresh Fruit Bunches',
                detail: 'Kualitas export grade'
              },
              { 
                title: 'Proses Pengolahan', 
                desc: 'Processing facility',
                detail: 'Modern machinery'
              },
              { 
                title: 'Transportasi', 
                desc: 'Darat & laut',
                detail: 'Fleet & cargo ships'
              }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center h-64">
                  <Factory className="w-20 h-20 text-white opacity-50 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-6 text-white w-full">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.desc}</p>
                    <p className="text-xs text-emerald-200 mt-2">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Perkebunan</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Lokasi strategis di jalur Medan-Aceh</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Topografi tanah rata dan bergelombang landai</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Kemitraan dengan petani sawit lokal</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Buah sawit kualitas export grade</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Fasilitas Produksi</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Station Ripple Mill dengan conveyor modern</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Clarification station untuk pemurnian CPO</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Laboratorium quality control lengkap</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Storage tank kapasitas 10.000 mton total</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Company Legality - Separate Section Above Contact */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold mb-8 text-center">Legalitas Perusahaan</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <Award className="w-12 h-12 mx-auto mb-3 text-emerald-300" />
                <p className="text-sm text-emerald-200 mb-1">Akta Pendirian</p>
                <p className="font-bold">No. 02 - 04 Maret 1999</p>
              </div>
              <div className="text-center bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <Award className="w-12 h-12 mx-auto mb-3 text-emerald-300" />
                <p className="text-sm text-emerald-200 mb-1">Daftar Perseroan</p>
                <p className="font-bold">C-10726 HT.01.01 TH.99</p>
              </div>
              <div className="text-center bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <Award className="w-12 h-12 mx-auto mb-3 text-emerald-300" />
                <p className="text-sm text-emerald-200 mb-1">NIB</p>
                <p className="font-bold">1801230035033</p>
              </div>
              <div className="text-center bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <Award className="w-12 h-12 mx-auto mb-3 text-emerald-300" />
                <p className="text-sm text-emerald-200 mb-1">NPWP</p>
                <p className="font-bold">01.906.860.0-123.000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Get in Touch With Us</p>
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Information Cards */}
            <div className="space-y-6 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
              {/* Head Office Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-emerald-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-4">Head Office</h3>
                    <div className="space-y-3 text-gray-700">
                      <p className="flex items-start">
                        <MapPin className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Jl. Kapten Muslim Komp. Ruko Tata Plaza<br />
                        Blok B No. 15, Kel. Dwi Kora<br />
                        Kec. Medan Helvetia, Kota Medan 20123<br />
                        Sumatera Utara</span>
                      </p>
                      <p className="flex items-center">
                        <Mail className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                        <a href="mailto:man@multiagroniaga.com" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                          man@multiagroniaga.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Office Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-emerald-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-4">Branch Office</h3>
                    <div className="space-y-3 text-gray-700">
                      <p className="flex items-start">
                        <MapPin className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Jl. Putri Hijau Komp. Graha Niaga<br />
                        Blok C 11 Lantai – 3<br />
                        Medan 20114<br />
                        Sumatera Utara</span>
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                        <a href="tel:061-4555092" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                          061 - 4555092
                        </a>
                      </p>
                      <p className="flex items-center">
                        <Mail className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                        <a href="mailto:man@multiagroniaga.com" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                          man@multiagroniaga.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); /* TODO: Connect to PHP backend for email submission */ }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">
                      Full Name <span className="text-emerald-300">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
                      Email Address <span className="text-emerald-300">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-white text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-white text-sm font-semibold mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Enter your company"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-white text-sm font-semibold mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  >
                    <option value="" className="text-gray-900">Select a service</option>
                    <option value="CPO Trading" className="text-gray-900">CPO Trading</option>
                    <option value="Palm Kernel" className="text-gray-900">Palm Kernel</option>
                    <option value="Plantation Partnership" className="text-gray-900">Plantation Partnership</option>
                    <option value="Export Services" className="text-gray-900">Export Services</option>
                    <option value="Distribution" className="text-gray-900">Distribution Services</option>
                    <option value="Other" className="text-gray-900">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-sm font-semibold mb-2">
                    Message <span className="text-emerald-300">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Please describe your inquiry..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-500 text-white p-4 rounded-lg flex items-center gap-2 animate-fade-in">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="bg-red-500 text-white p-4 rounded-lg flex items-center gap-2 animate-fade-in">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span className="font-semibold">Failed to send message. Please try again or email us directly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-white text-emerald-900 font-bold py-4 px-8 rounded-lg transition-all transform shadow-lg flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:bg-emerald-50 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-emerald-900 mb-4 text-center">Find Us</h3>
              <p className="text-center text-gray-600 mb-6">Visit our office in Medan for direct consultation</p>
              
              {/* Map Container */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.9938317671497!2d98.67702906952805!3d3.593087199012858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313170e8e8e8e9%3A0xabcdef1234567890!2sGraha%20Niaga%2C%20Jl.%20Putri%20Hijau%2C%20Medan!5e0!3m2!1sen!2sid!4v1729766800000!5m2!1sen!2sid"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>

              {/* Map Info */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Jl. Putri Hijau Komp. Graha Niaga Blok C 11 Lantai – 3
                </h4>
                <p className="text-lg text-gray-700 mb-4">
                  Medan 20114, Sumatera Utara
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Graha+Niaga+Jl.+Putri+Hijau+Medan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Globe className="w-5 h-5" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">PT. MAN</h3>
                  <p className="text-xs text-emerald-300">Since 1990</p>
                </div>
              </div>
              <p className="text-sm text-emerald-200">
                Leading palm oil trading and plantation company in Indonesia
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => scrollToSection('activities')} className="hover:text-white transition-colors">Activities</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li className="flex items-start">
                  <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>man@multiagroniaga.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>061 - 4555092</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Medan, Sumatera Utara</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 pt-8 text-center text-sm text-emerald-300">
            <p>&copy; 2025 PT. Multi Agronabatindo Niaga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;