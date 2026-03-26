import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Factory, Leaf, Users, Award, TrendingUp, Globe, FileText, Shield } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ChatWidget from './ChatWidget';

// Import images
import oilPalmPlantation from './assets/images/oil-palm-plantation.png';
import palmOilProcessingMill from './assets/images/palm-oil-processing-mill.jpg';
import cpoStorageTanks from './assets/images/cpo-storage-tanks.png';
import processingMachinery from './assets/images/processing-machinery.png';
import qualityControlLab from './assets/images/quality-control-laboratory.png';
import vesselLoadingOperations from './assets/images/vessel-loading-operations.png';
import freshFruitBunchesTransport from './assets/images/fresh-fruit-bunches-transport.png';
import refineryProcessingSystem from './assets/images/refinery-processing-system.png';
import distributionFleetStorage from './assets/images/distribution-fleet-storage.png';
import plantationFacilityOverview from './assets/images/plantation-facility-overview.png';
import laboratoryTestingEquipment from './assets/images/laboratory-testing-equipment.png';
import exportContainerLoading from './assets/images/export-container-loading.png';
import refinedPalmOilBottles from './assets/images/refined-palm-oil-bottles.png';
import bulkPalmOilContainers from './assets/images/bulk-palm-oil-containers.png';
import packagedCookingOil from './assets/images/packaged-cooking-oil.png';
import direktorUtama from './assets/images/direkturutama.png';
import direktur from './assets/images/direktur.jpg';

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animate class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="text-left">
                <h1 className={`text-sm sm:text-base md:text-xl font-bold leading-tight ${isScrolled ? 'text-emerald-800' : 'text-white'}`}>
                  PT. MULTI AGRONABATINDO<br className="sm:hidden" /> NIAGA
                </h1>
                <p className={`text-[10px] sm:text-xs ${isScrolled ? 'text-emerald-600' : 'text-emerald-100'}`}>
                  Edible Oil & Trading Company
                </p>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Vision & Mission', 'Directors', 'Activities', 'Products', 'Gallery', 'Contact'].map((item) => (
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
              {['About', 'Vision & Mission', 'Directors', 'Activities', 'Products', 'Gallery', 'Contact'].map((item) => (
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${oilPalmPlantation})`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-emerald-900/70"></div>
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
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Latar Belakang
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
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

            <div className="grid grid-cols-2 gap-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <Factory className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">35+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <Users className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">100+</h3>
                <p className="text-gray-600">Professional Staff</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <Award className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Certified</h3>
                <p className="text-gray-600">Quality Standards</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <TrendingUp className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Leading</h3>
                <p className="text-gray-600">Market Position</p>
              </div>
            </div>
          </div>

          {/* Plantation Image Section */}
          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={plantationFacilityOverview}
                  alt="Perkebunan Kelapa Sawit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center z-10 text-center text-white p-8">
                  <div>
                    <Leaf className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-3xl font-bold mb-2">Perkebunan Kelapa Sawit</h3>
                    <p className="text-emerald-100 text-lg">Jln besar Medan-Aceh No. 56 Aceh Timur / Aceh Tamiang</p>
                    <p className="text-emerald-200 mt-4">Topografi Tanah Rata & Bergelombang Landai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="py-12 sm:py-16 md:py-20 pb-16 sm:pb-20 md:pb-24 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Visi & Misi</h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-emerald-400 to-emerald-200 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-on-scroll opacity-0 translate-y-10 md:translate-y-0 md:translate-x-[-50px] delay-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">VISI</h3>
              </div>
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></span>
                  <p className="text-emerald-50 text-sm sm:text-base md:text-lg leading-relaxed">
                    Maju dan berkembang sebagai perusahaan trading, distributor dan suplier yang dapat
                    menyediakan permintaan pelanggan / rekanan.
                  </p>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></span>
                  <p className="text-emerald-50 text-sm sm:text-base md:text-lg leading-relaxed">
                    Menjaga dan meningkatkan kualitas dan kuantitas jasa dan barang yang dibutuhkan.
                  </p>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></span>
                  <p className="text-emerald-50 text-sm sm:text-base md:text-lg leading-relaxed">
                    Menjadi yang terdepan sebagai perusahaan perdagangan, distributor dan suplier dengan
                    memberikan nilai kepuasan terbaik bagi pelanggan / rekanan melalui pelayanan dan produk
                    yang berkualitas.
                  </p>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-on-scroll opacity-0 translate-y-10 md:translate-y-0 md:translate-x-[50px] delay-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">MISI</h3>
              </div>
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></span>
                  <p className="text-emerald-50 text-sm sm:text-base md:text-lg leading-relaxed">
                    Membuka peluang dan usaha yang produktif dalam membantu perekonomian Indonesia.
                  </p>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></span>
                  <p className="text-emerald-50 text-sm sm:text-base md:text-lg leading-relaxed">
                    Mengadakan kerjasama yang saling menguntungkan antara Produsen, Distributor, Agen,
                    Suplier dan Konsumen.
                  </p>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></span>
                  <p className="text-emerald-50 text-sm sm:text-base md:text-lg leading-relaxed">
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
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Direksi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Leadership Team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Director 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg ring-4 ring-emerald-200">
                  <img
                    src={direktorUtama}
                    alt="G. SLAMET RIADI - Direktur Utama"
                    className="w-full h-full object-cover"
                  />
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
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg ring-4 ring-emerald-200">
                  <img
                    src={direktur}
                    alt="SLAMET RAHARDJO - Direktur"
                    className="w-full h-full object-cover"
                  />
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
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Aktivitas Usaha</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Our Business Operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Activity 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={oilPalmPlantation}
                  alt="Perkebunan Kelapa Sawit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
              <div className="relative h-48 overflow-hidden">
                <img
                  src={palmOilProcessingMill}
                  alt="Pengolahan & Produksi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
              <div className="relative h-48 overflow-hidden">
                <img
                  src={distributionFleetStorage}
                  alt="Trading & Distribusi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={freshFruitBunchesTransport}
                    alt="Pembelian & Pengiriman TBS"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-emerald-900 mb-3">Pembelian & Pengiriman TBS</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Pembelian dan pemilihan buah sawit (TBS) dengan kualitas export dari kemitraan
                    para petani sawit, kemudian pengiriman/pendistribusian buah sawit ke pabrik
                    kelapa sawit untuk proses pengolahan.
                  </p>
                </div>
              </div>

              {/* Process 2 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={processingMachinery}
                    alt="Proses Pengolahan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-emerald-900 mb-3">Proses Pengolahan</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Proses pengolahan buah kelapa sawit menggunakan mesin modern dengan digital
                    pressing untuk menghasilkan CPO sesuai standar internasional dan Palm Kernel
                    dengan prosentasi produksi yang tinggi.
                  </p>
                </div>
              </div>

              {/* Process 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={laboratoryTestingEquipment}
                    alt="Quality Control"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-emerald-900 mb-3">Quality Control</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Laboratorium dengan peralatan modern untuk memastikan kualitas CPO sesuai
                    standar PORAM. Setiap batch diuji untuk parameter FFA, moisture, impurities,
                    dan lainnya.
                  </p>
                </div>
              </div>

              {/* Process 4 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vesselLoadingOperations}
                    alt="Pemuatan & Distribusi"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-emerald-900 mb-3">Pemuatan & Distribusi</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Proses pemuatan CPO dari tangki pabrik ke kapal cargo atau truck losing.
                    Memerlukan waktu 36-48 jam tergantung kapasitas pompa. Transportasi laut
                    menggunakan kapal sesuai standar kelaikan laut.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Facilities */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-8 md:p-12 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-3 text-center">Fasilitas Pengolahan</h3>
            <p className="text-emerald-100 text-center mb-10 max-w-2xl mx-auto">
              Dilengkapi dengan fasilitas modern dan standar internasional untuk menghasilkan produk berkualitas tinggi
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Facility 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-2 mb-2 md:hidden">
                    <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-900 font-bold text-sm">✓</span>
                    </div>
                    <h4 className="font-bold text-white text-lg">Station Palm Kernel / Ripple Mill</h4>
                  </div>
                  <div className="relative w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={processingMachinery}
                      alt="Station Palm Kernel / Ripple Mill"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="hidden md:flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-900 font-bold text-sm">✓</span>
                      </div>
                      <h4 className="font-bold text-white text-lg">Station Palm Kernel / Ripple Mill</h4>
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed">
                      Mesin produksi dengan prosentasi tinggi untuk menghasilkan Inti Sawit berkualitas.
                      Dilengkapi dengan Mechanical Mechenery equipment dan conveyor Screw.
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-2 mb-2 md:hidden">
                    <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-900 font-bold text-sm">✓</span>
                    </div>
                    <h4 className="font-bold text-white text-lg">Storage Tank 5.000 mton x 2</h4>
                  </div>
                  <div className="relative w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={cpoStorageTanks}
                      alt="Storage Tank 5.000 mton x 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="hidden md:flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-900 font-bold text-sm">✓</span>
                      </div>
                      <h4 className="font-bold text-white text-lg">Storage Tank 5.000 mton x 2</h4>
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed">
                      Penampung hasil produksi siap untuk dipasarkan domestik dan export.
                      Produksi/Quality sudah sesuai dengan Standar PORAM.
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-2 mb-2 md:hidden">
                    <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-900 font-bold text-sm">✓</span>
                    </div>
                    <h4 className="font-bold text-white text-lg">Station Clarification Pure Oil</h4>
                  </div>
                  <div className="relative w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={refineryProcessingSystem}
                      alt="Station Clarification Pure Oil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="hidden md:flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-900 font-bold text-sm">✓</span>
                      </div>
                      <h4 className="font-bold text-white text-lg">Station Clarification Pure Oil</h4>
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed">
                      Proses pemurnian CPO dengan digital pressing sesuai standar internasional.
                      Termasuk Sludge Tank, COT, CST tank dan fasilitas pendukung lainnya.
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility 4 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-2 mb-2 md:hidden">
                    <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-900 font-bold text-sm">✓</span>
                    </div>
                    <h4 className="font-bold text-white text-lg">Transportasi Laut</h4>
                  </div>
                  <div className="relative w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={vesselLoadingOperations}
                      alt="Transportasi Laut"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="hidden md:flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-emerald-400 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-900 font-bold text-sm">✓</span>
                      </div>
                      <h4 className="font-bold text-white text-lg">Transportasi Laut</h4>
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed">
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
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Hasil Produk</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-200 mx-auto mb-6"></div>
            <p className="text-xl text-emerald-100">Quality Palm Oil Products</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={bulkPalmOilContainers}
                  alt="Kemasan Derigen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
              </div>
              <div className="p-8">
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
            </div>

            {/* Product 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={refinedPalmOilBottles}
                  alt="Kemasan Botol"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
              </div>
              <div className="p-8">
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
            </div>

            {/* Product 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={exportContainerLoading}
                  alt="Kemasan Flexi Bag"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
              </div>
              <div className="p-8">
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
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Our Facilities & Operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            {[
              {
                title: 'Perkebunan Kelapa Sawit',
                desc: 'Aceh Timur / Tamiang',
                detail: 'Topografi tanah rata & bergelombang landai',
                image: oilPalmPlantation
              },
              {
                title: 'Station Ripple Mill',
                desc: 'Produksi Palm Kernel',
                detail: 'Mechanical equipment modern',
                image: processingMachinery
              },
              {
                title: 'Storage Tank',
                desc: 'Kapasitas 5.000 mton x 2',
                detail: 'Standar PORAM',
                image: cpoStorageTanks
              },
              {
                title: 'Clarification Station',
                desc: 'Pemurnian CPO',
                detail: 'Digital pressing system',
                image: refineryProcessingSystem
              },
              {
                title: 'Quality Control Lab',
                desc: 'Laboratorium modern',
                detail: 'Testing & analysis',
                image: qualityControlLab
              },
              {
                title: 'Loading Port',
                desc: 'Fasilitas pelabuhan',
                detail: 'Kapal cargo & truck losing',
                image: vesselLoadingOperations
              },
              {
                title: 'Buah Sawit (TBS)',
                desc: 'Fresh Fruit Bunches',
                detail: 'Kualitas export grade',
                image: freshFruitBunchesTransport
              },
              {
                title: 'Proses Pengolahan',
                desc: 'Processing facility',
                detail: 'Modern machinery',
                image: palmOilProcessingMill
              },
              {
                title: 'Transportasi',
                desc: 'Darat & laut',
                detail: 'Fleet & cargo ships',
                image: distributionFleetStorage
              }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
      <section id="contact" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
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
              
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus(null);
                
                const form = e.target;
                
                // EmailJS configuration
                const serviceId = 'service_cmxxx83';
                const templateId = 'template_30ig3vj';
                const publicKey = 'nriXW6bQGzP7RfNnm';
                
                // Prepare template params
                const templateParams = {
                  to_email: 'andrewrchristopher@gmail.com', // Email tujuan
                  from_name: form.name.value,
                  from_email: form.email.value,
                  phone: form.phone.value || 'Not provided',
                  company: form.company.value || 'Not provided',
                  service: form.service.value || 'General Inquiry',
                  message: form.message.value,
                  reply_to: form.email.value
                };
                
                try {
                  await emailjs.send(serviceId, templateId, templateParams, publicKey);
                  setSubmitStatus('success');
                  form.reset(); // Clear the form
                  
                  // Hide success message after 5 seconds
                  setTimeout(() => {
                    setSubmitStatus(null);
                  }, 5000);
                } catch (error) {
                  console.error('Email send failed:', error);
                  setSubmitStatus('error');
                  
                  // Hide error message after 5 seconds
                  setTimeout(() => {
                    setSubmitStatus(null);
                  }, 5000);
                } finally {
                  setIsSubmitting(false);
                }
              }}>
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
                  src="https://www.google.com/maps?q=3.6001606,98.6439091&hl=en&z=18&output=embed"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="PT. Multi Agronabatindo Niaga - Ruko Tata Plaza"
                ></iframe>
              </div>

              {/* Map Info */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Jl. Kapten Muslim Komp. Ruko Tata Plaza Blok B No. 15
                </h4>
                <p className="text-lg text-gray-700 mb-4">
                  Medan Helvetia, Medan - 20123, North Sumatra
                </p>
                <a
                  href="https://maps.app.goo.gl/X7HS3fDexfK2fwyP9"
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
      <footer className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-white">PT. Multi Agronabatindo Niaga</h3>
                  <p className="text-emerald-300 font-medium">Since 1990</p>
                </div>
              </div>
              <p className="text-emerald-100 text-lg leading-relaxed mb-6 max-w-md">
                Leading palm oil trading and plantation company in Indonesia, committed to quality and sustainable practices.
              </p>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-emerald-300">35+</div>
                  <div className="text-sm text-emerald-200">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-emerald-300">100+</div>
                  <div className="text-sm text-emerald-200">Professional Staff</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', section: 'about' },
                  { name: 'Vision & Mission', section: 'vision-mission' },
                  { name: 'Directors', section: 'directors' },
                  { name: 'Activities', section: 'activities' },
                  { name: 'Products', section: 'products' },
                  { name: 'Gallery', section: 'gallery' },
                  { name: 'Contact', section: 'contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollToSection(link.section)} 
                      className="text-emerald-200 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-emerald-300 transition-colors"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">Contact Info</h4>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-emerald-300 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-200 text-sm font-medium">Email</p>
                    <a href="mailto:man@multiagroniaga.com" className="text-white hover:text-emerald-300 transition-colors font-medium">
                      man@multiagroniaga.com
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-emerald-300 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-200 text-sm font-medium">Phone</p>
                    <a href="tel:061-4555092" className="text-white hover:text-emerald-300 transition-colors font-medium">
                      061 - 4555092
                    </a>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-emerald-300 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-200 text-sm font-medium">Location</p>
                    <p className="text-white font-medium">Medan, Sumatera Utara</p>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-emerald-200 text-sm font-medium mb-2">Follow Us</p>
                    <div className="flex space-x-3">
                      <a href="#" className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
                        <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
                        <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
                        <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
                        <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-700/50 my-8"></div>

          {/* Bottom Section */}
          <div className="text-center">
            <p className="text-emerald-300 text-sm">
              &copy; 2025 PT. Multi Agronabatindo Niaga. All rights reserved.
            </p>
            <p className="text-emerald-400 text-xs mt-1">
              Licensed Trading Company • Certified Quality Standards
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;