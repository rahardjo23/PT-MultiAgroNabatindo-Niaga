import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ChatWidget from './ChatWidget';

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
import direktorUtama from './assets/images/direkturutama.png';
import direktur from './assets/images/direktur.jpg';
import filterPressSystem from './assets/images/filter-press-system.png';
import steamDistributionSystem from './assets/images/steam-distribution-system.png';
import companyLogo from './assets/images/logo.png';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Vision & Mission', id: 'vision-mission' },
  { label: 'Directors', id: 'directors' },
  { label: 'Activities', id: 'activities' },
  { label: 'Products', id: 'products' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 border-b transition-all duration-300 ${
        isScrolled ? 'bg-white border-gray-200 shadow-sm shadow-gray-900/5' : 'bg-white/95 border-gray-100'
      }`}>
        <div className="section-wrap">
          <div className="flex justify-between items-center h-[4.25rem] md:h-[5rem]">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 text-left group"
            >
              <img
                src={companyLogo}
                alt="PT. Multi Agronabatindo Niaga"
                className="w-10 h-10 md:w-11 md:h-11 object-contain flex-shrink-0"
              />
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900 leading-tight tracking-tight">
                  PT. MULTI AGRONABATINDO NIAGA
                </p>
                <p className="text-[11px] md:text-xs text-gray-500 hidden sm:block">
                  Edible Oil & Trading Company
                </p>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-600 hover:text-emerald-800 transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-800 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button className="md:hidden p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="section-wrap py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2.5 text-sm text-gray-700 hover:text-emerald-800"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative pt-[4.25rem] md:pt-[5rem]">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4.25rem)] lg:min-h-[calc(100vh-5rem)]">
          <div className="flex flex-col justify-center section-wrap py-20 lg:py-32 lg:pr-16 order-2 lg:order-1 animate-fade-in">
            <p className="section-label">Est. 1990</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.25rem] font-semibold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              PT. Multi Agronabatindo Niaga
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10 max-w-xl">
              Leading Palm Oil Trading & Plantation Company Since 1990
            </p>
            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => scrollToSection('about')}
                className="btn-primary"
              >
                Learn More
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary"
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 lg:h-auto order-1 lg:order-2 hero-image-wrap">
            <img
              src={oilPalmPlantation}
              alt="Perkebunan kelapa sawit PT. Multi Agronabatindo Niaga"
              className="absolute inset-0 w-full h-full object-cover hero-image"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding border-t border-gray-200 bg-stone-50">
        <div className="section-wrap">
          <div className="reveal">
            <p className="section-label">Profil Perusahaan</p>
            <h2 className="section-heading">Latar Belakang</h2>
            <div className="accent-rule" />
          </div>

          <div className="grid lg:grid-cols-3 gap-14 lg:gap-20">
            <div className="lg:col-span-2 space-y-6 prose-body text-base md:text-lg reveal reveal-delay-1">
              <p>
                Multi Agronabatindo Niaga adalah salah satu perusahaan swasta nasional di Indonesia yang
                berkedudukan di Ruko Tata Plaza Blok B No. 15 Jl. Kapten Muslim Kec. Medan Helvetia,
                Sumatera Utara. Merupakan perusahaan trading yang aktifitas utamanya bergerak dalam bidang
                membeli, memproses dan menjual minyak sawit melalui transportasi darat, laut ke pihak pembeli.
                Selain itu perusahaan kami juga beraktifitas dalam perkebunan kelapa sawit.
              </p>
              <p>
                PT. Multi Agronabatindo Niaga berdiri pada tahun <strong className="text-emerald-800 font-semibold">1990</strong> adalah
                salah satu perusahaan trading kelapa sawit yang didukung oleh staff & tenaga ahli serta memiliki
                karyawan yang professional dibidangnya, yang bergabung dan berkembang bersama perusahaan.
              </p>
              <p>
                Di era Globalisasi dan kemajuan teknologi, perekonomian dan perindustrian yang membutuhkan
                mobilitas kerja yang efisien dan efektif, PT. Multi Agronabatindo Niaga siap membantu dalam
                menyediakan kebutuhan minyak kepala sawit. Kami juga siap bersaing secara sehat dan ketat
                dengan perusahaan lainnya yang bergerak di bidang yang sama untuk dapat memenuhi kebutuhan
                jasa trading dan suplier sebagaimana keinginan pelanggan ataupun rekanan.
              </p>
              <p>
                Kami selalu menekankan pada persediaan minyak sawit yang berkualitas, sehingga kami siap
                melaksanakan kerjasama jangka panjang dan saling menguntungkan dengan memberikan pelayanan
                yang terbaik, optimal dalam menjaga kepercayaan dan kepuasan untuk memenuhi kebutuhan
                pelanggan atau rekanan.
              </p>
            </div>

            <div className="bordered-block divide-y divide-gray-200 self-start reveal reveal-delay-2">
              {[
                { value: '35+', label: 'Years Experience' },
                { value: '100+', label: 'Professional Staff' },
                { value: 'Certified', label: 'Quality Standards' },
                { value: 'Leading', label: 'Market Position' },
              ].map((stat) => (
                <div key={stat.label} className="px-7 py-6 transition-colors duration-300 hover:bg-emerald-50/40">
                  <p className="font-serif text-3xl font-semibold text-emerald-800">{stat.value}</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className="mt-20 img-frame bg-white reveal">
            <img
              src={plantationFacilityOverview}
              alt="Perkebunan Kelapa Sawit"
              className="w-full h-80 md:h-[28rem] object-cover img-interactive"
            />
            <figcaption className="px-7 py-6 border-t border-gray-200">
              <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-2">Perkebunan Kelapa Sawit</h3>
              <p className="text-gray-600 text-base md:text-lg">Jln besar Medan-Aceh No. 56 Aceh Timur / Aceh Tamiang</p>
              <p className="text-sm md:text-base text-gray-500 mt-1.5">Topografi Tanah Rata & Bergelombang Landai</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="section-padding border-t border-gray-200 bg-white">
        <div className="section-wrap">
          <div className="reveal">
            <p className="section-label">Arah Perusahaan</p>
            <h2 className="section-heading">Visi & Misi</h2>
            <div className="accent-rule" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="reveal reveal-delay-1">
              <h3 className="subheading mb-8 pb-4 border-b-2 border-emerald-800">
                Visi
              </h3>
              <ul className="space-y-5 prose-body text-base md:text-lg">
                <li className="vision-item">
                  Maju dan berkembang sebagai perusahaan trading, distributor dan suplier yang dapat
                  menyediakan permintaan pelanggan / rekanan.
                </li>
                <li className="vision-item">
                  Menjaga dan meningkatkan kualitas dan kuantitas jasa dan barang yang dibutuhkan.
                </li>
                <li className="vision-item">
                  Menjadi yang terdepan sebagai perusahaan perdagangan, distributor dan suplier dengan
                  memberikan nilai kepuasan terbaik bagi pelanggan / rekanan melalui pelayanan dan produk
                  yang berkualitas.
                </li>
              </ul>
            </div>

            <div className="reveal reveal-delay-2">
              <h3 className="subheading mb-8 pb-4 border-b-2 border-emerald-800">
                Misi
              </h3>
              <ul className="space-y-5 prose-body text-base md:text-lg">
                <li className="vision-item">
                  Membuka peluang dan usaha yang produktif dalam membantu perekonomian Indonesia.
                </li>
                <li className="vision-item">
                  Mengadakan kerjasama yang saling menguntungkan antara Produsen, Distributor, Agen,
                  Suplier dan Konsumen.
                </li>
                <li className="vision-item">
                  Meningkatkan hasil yang optimal, menjaga kepercayaan pelanggan dan memuaskan pelanggan
                  dari segi jasa pelayanan, kualitas dan kuantias barang yang dibutuhkan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section id="directors" className="section-padding border-t border-gray-200 bg-stone-50">
        <div className="section-wrap">
          <div className="reveal">
            <p className="section-label">Leadership Team</p>
            <h2 className="section-heading">Direksi</h2>
            <div className="accent-rule" />
          </div>

          <div className="space-y-12 max-w-5xl">
            <article className="reveal grid sm:grid-cols-[160px_1fr] md:grid-cols-[220px_1fr] gap-8 md:gap-10 bordered-block p-7 md:p-10 hover:border-emerald-700/30">
              <div className="img-frame">
                <img
                  src={direktorUtama}
                  alt="G. SLAMET RIADI - Direktur Utama"
                  className="w-full aspect-[3/4] object-cover object-top img-interactive"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900">G. SLAMET RIADI</h3>
                <p className="text-emerald-800 font-medium text-sm md:text-base mt-1.5 mb-5">Direktur Utama</p>
                <p className="prose-body text-base md:text-lg">
                  Pemilik PT. Multi Agronabatindo Niaga perusahaan trading dengan motivasi
                  mengimplementasi dan mengorganisir visi dan misi perusahaan. Menjadikan perusahaan
                  salah satu perusahaan trading terbesar di Indonesia dan Asia.
                </p>
              </div>
            </article>

            <article className="reveal reveal-delay-1 grid sm:grid-cols-[160px_1fr] md:grid-cols-[220px_1fr] gap-8 md:gap-10 bordered-block p-7 md:p-10 hover:border-emerald-700/30">
              <div className="img-frame">
                <img
                  src={direktur}
                  alt="SLAMET RAHARDJO - Direktur"
                  className="w-full aspect-[3/4] object-cover object-top img-interactive"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900">SLAMET RAHARDJO</h3>
                <p className="text-emerald-800 font-medium text-sm md:text-base mt-1.5 mb-5">Direktur</p>
                <p className="prose-body text-base md:text-lg">
                  Mengelolah perusahaan, menyusun strategi bisnis untuk kemajuan perusahaan. Bekerja
                  dengan penuh keyakinan, keahlian, ketekunan dan kepedulian dengan lingkungan.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding border-t border-gray-200 bg-white">
        <div className="section-wrap">
          <div className="reveal">
            <p className="section-label">Our Business Operations</p>
            <h2 className="section-heading">Aktivitas Usaha</h2>
            <div className="accent-rule" />
          </div>

          {/* Business activities — alternating rows */}
          <div className="reveal space-y-0 border border-gray-200 divide-y divide-gray-200 mb-24">
            {[
              {
                title: 'Perkebunan Kelapa Sawit',
                text: 'Pembelian dan pemilihan buah sawit dengan kualitas export dari kemitraan para petani sawit.',
                detail: 'Lokasi: Jln Medan-Aceh No. 56, Aceh Timur/Tamiang',
                image: oilPalmPlantation,
                alt: 'Perkebunan Kelapa Sawit',
                reverse: false,
              },
              {
                title: 'Pengolahan & Produksi',
                text: 'Proses pengolahan buah kelapa sawit dengan mesin modern untuk menghasilkan CPO dan Palm Kernel berkualitas tinggi.',
                detail: 'Fasilitas: Station Ripple Mill, Clarification Station',
                image: palmOilProcessingMill,
                alt: 'Pengolahan & Produksi',
                reverse: true,
              },
              {
                title: 'Trading & Distribusi',
                text: 'Pendistribusian CPO melalui transportasi darat dan laut dengan storage tank 5.000 mton sesuai standar PORAM.',
                detail: 'Kapasitas: Storage Tank 5.000 mton x 2',
                image: distributionFleetStorage,
                alt: 'Trading & Distribusi',
                reverse: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`grid md:grid-cols-2 group ${item.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="aspect-[16/10] md:aspect-auto md:min-h-[320px] img-frame overflow-hidden">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover img-interactive group-hover:scale-[1.02] transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white transition-colors duration-300 group-hover:bg-emerald-50/30">
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="prose-body text-base md:text-lg mb-4">{item.text}</p>
                  <p className="text-sm md:text-base text-emerald-800 font-medium">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Processing steps — vertical timeline */}
          <div className="reveal mb-24">
            <h3 className="subheading mb-10">Proses Pengolahan Produk</h3>
            <ol className="process-timeline space-y-0">
              {[
                {
                  step: '01',
                  title: 'Pembelian & Pengiriman TBS',
                  text: 'Pembelian dan pemilihan buah sawit (TBS) dengan kualitas export dari kemitraan para petani sawit, kemudian pengiriman/pendistribusian buah sawit ke pabrik kelapa sawit untuk proses pengolahan.',
                  image: freshFruitBunchesTransport,
                },
                {
                  step: '02',
                  title: 'Proses Pengolahan',
                  text: 'Proses pengolahan buah kelapa sawit menggunakan mesin modern dengan digital pressing untuk menghasilkan CPO sesuai standar internasional dan Palm Kernel dengan prosentasi produksi yang tinggi.',
                  image: processingMachinery,
                },
                {
                  step: '03',
                  title: 'Quality Control',
                  text: 'Laboratorium dengan peralatan modern untuk memastikan kualitas CPO sesuai standar PORAM. Setiap batch diuji untuk parameter FFA, moisture, impurities, dan lainnya.',
                  image: laboratoryTestingEquipment,
                },
                {
                  step: '04',
                  title: 'Pemuatan & Distribusi',
                  text: 'Proses pemuatan CPO dari tangki pabrik ke kapal cargo atau truck losing. Memerlukan waktu 36-48 jam tergantung kapasitas pompa. Transportasi laut menggunakan kapal sesuai standar kelaikan laut.',
                  image: vesselLoadingOperations,
                },
              ].map((item, index) => (
                <li key={item.step} className="process-timeline-step group">
                  <div className="process-timeline-marker">
                    <span className="process-timeline-dot">{item.step}</span>
                    {index < 3 && <span className="process-timeline-line" aria-hidden="true" />}
                  </div>
                  <div className="process-timeline-content">
                    <div className="grid lg:grid-cols-[1fr_240px] gap-6 lg:gap-8 items-start">
                      <div>
                        <h4 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                        <p className="prose-body text-base md:text-lg">{item.text}</p>
                      </div>
                      <div className="img-frame overflow-hidden hidden lg:block">
                        <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover img-interactive facility-img group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
                      </div>
                    </div>
                    <div className="img-frame overflow-hidden mt-5 lg:hidden">
                      <img src={item.image} alt={item.title} className="w-full aspect-[16/10] object-cover img-interactive" />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Facilities — compact editorial list with inline thumbnails */}
          <div className="reveal">
            <h3 className="subheading mb-3">Fasilitas Pengolahan</h3>
            <p className="section-lead mb-10">
              Dilengkapi dengan fasilitas modern dan standar internasional untuk menghasilkan produk berkualitas tinggi
            </p>

            <div className="facility-list">
              {[
                {
                  title: 'Station Palm Kernel / Ripple Mill',
                  desc: 'Mesin produksi dengan prosentasi tinggi untuk menghasilkan Inti Sawit berkualitas. Dilengkapi dengan Mechanical Mechenery equipment dan conveyor Screw.',
                  image: processingMachinery,
                },
                {
                  title: 'Storage Tank 5.000 mton x 2',
                  desc: 'Penampung hasil produksi siap untuk dipasarkan domestik dan export. Produksi/Quality sudah sesuai dengan Standar PORAM.',
                  image: cpoStorageTanks,
                },
                {
                  title: 'Station Clarification Pure Oil',
                  desc: 'Proses pemurnian CPO dengan digital pressing sesuai standar internasional. Termasuk Sludge Tank, COT, CST tank dan fasilitas pendukung lainnya.',
                  image: refineryProcessingSystem,
                },
                {
                  title: 'Filter Press System',
                  desc: 'Sistem filtrasi tekanan untuk memisahkan CPO dari sludge. Meningkatkan pemulihan minyak dan mengurangi kerugian produksi.',
                  image: filterPressSystem,
                },
                {
                  title: 'Steam Distribution System',
                  desc: 'Sistem distribusi uap bertekanan ke unit-unit pengolahan untuk mendukung operasi yang stabil dan efisien.',
                  image: steamDistributionSystem,
                },
                {
                  title: 'Fasilitas Tangki Proses',
                  desc: 'Tangki proses untuk pemurnian dan penanganan produk guna menjaga konsistensi kualitas minyak sawit.',
                  image: cpoStorageTanks,
                },
                {
                  title: 'Transportasi Laut',
                  desc: 'Kapal cargo sesuai standard kelaikan laut untuk pengiriman internasional. Proses pemuatan memerlukan waktu 36-48 jam tergantung kapasitas.',
                  image: vesselLoadingOperations,
                },
              ].map((facility, index) => (
                <article key={facility.title} className="group facility-list-item">
                  <div className="facility-list-thumb img-frame overflow-hidden shrink-0">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="facility-list-img w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="facility-list-body min-w-0 flex-1">
                    <p className="facility-list-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h4 className="font-serif text-lg md:text-xl font-semibold text-gray-900 mb-1.5 md:mb-2">{facility.title}</h4>
                    <p className="prose-body text-sm md:text-base">{facility.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="section-padding border-t border-gray-200 bg-stone-50">
        <div className="section-wrap">
          <div className="reveal">
            <p className="section-label">Quality Palm Oil Products</p>
            <h2 className="section-heading">Hasil Produk</h2>
            <div className="accent-rule" />
          </div>

          <div className="space-y-8 md:space-y-10">
            {[
              {
                label: 'Bulk Packaging',
                title: 'Kemasan Derigen',
                desc: 'Jerry can packaging untuk distribusi dalam jumlah besar',
                features: ['Kapasitas besar', 'Mudah transportasi', 'Standar industri'],
                image: bulkPalmOilContainers,
              },
              {
                label: 'Retail Packaging',
                title: 'Kemasan Botol',
                desc: 'Packaging botol untuk konsumen retail dan rumah tangga',
                features: ['Higienis', 'Praktis', 'Berkualitas tinggi'],
                image: refinedPalmOilBottles,
              },
              {
                label: 'Export Packaging',
                title: 'Kemasan Flexi Bag',
                desc: 'Container flexi bag untuk pengiriman export internasional',
                features: ['Kapasitas container', 'Export ready', 'Standar PORAM'],
                image: exportContainerLoading,
              },
            ].map((product, index) => (
              <article
                key={product.title}
                className={`reveal product-showcase group overflow-hidden border border-gray-200 bg-white transition-colors duration-300 hover:border-emerald-700/30 ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="grid lg:grid-cols-2 min-h-0">
                  <div className="relative min-h-[220px] lg:min-h-[300px] img-frame border-0 lg:border-r lg:border-gray-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover img-interactive group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 mb-3">{product.label}</p>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 mb-3">{product.title}</h3>
                    <p className="text-base md:text-lg text-gray-600 mb-8">{product.desc}</p>
                    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      {product.features.map((feature) => (
                        <div key={feature}>
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Keunggulan</dt>
                          <dd className="text-sm md:text-base font-medium text-gray-800">{feature}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section-padding border-t border-gray-200 bg-white">
        <div className="section-wrap">
          <div className="reveal">
            <p className="section-label">Our Facilities & Operations</p>
            <h2 className="section-heading">Gallery</h2>
            <div className="accent-rule" />
          </div>

          <div className="gallery-mosaic mb-20">
            {[
              { title: 'Perkebunan Kelapa Sawit', desc: 'Aceh Timur / Tamiang', detail: 'Topografi tanah rata & bergelombang landai', image: oilPalmPlantation, span: 'gallery-span-featured' },
              { title: 'Station Ripple Mill', desc: 'Produksi Palm Kernel', detail: 'Mechanical equipment modern', image: processingMachinery, span: '' },
              { title: 'Storage Tank', desc: 'Kapasitas 5.000 mton x 2', detail: 'Standar PORAM', image: cpoStorageTanks, span: '' },
              { title: 'Clarification Station', desc: 'Pemurnian CPO', detail: 'Digital pressing system', image: refineryProcessingSystem, span: 'gallery-span-wide' },
              { title: 'Filter Press System', desc: 'Pemulihan minyak dari sludge', detail: 'Sistem filtrasi tekanan', image: filterPressSystem, span: '' },
              { title: 'Steam Distribution System', desc: 'Distribusi uap ke unit pengolahan', detail: 'Jaringan uap bertekanan', image: steamDistributionSystem, span: '' },
              { title: 'Quality Control Lab', desc: 'Laboratorium modern', detail: 'Testing & analysis', image: qualityControlLab, span: '' },
              { title: 'Loading Port', desc: 'Fasilitas pelabuhan', detail: 'Kapal cargo & truck losing', image: vesselLoadingOperations, span: '' },
              { title: 'Buah Sawit (TBS)', desc: 'Fresh Fruit Bunches', detail: 'Kualitas export grade', image: freshFruitBunchesTransport, span: '' },
              { title: 'Proses Pengolahan', desc: 'Processing facility', detail: 'Modern machinery', image: palmOilProcessingMill, span: 'gallery-span-tall' },
              { title: 'Transportasi', desc: 'Darat & laut', detail: 'Fleet & cargo ships', image: distributionFleetStorage, span: '' },
            ].map((item) => (
              <figure key={item.title} className={`reveal gallery-tile group ${item.span}`}>
                <img src={item.image} alt={item.title} className="gallery-tile-image" />
                <figcaption className="gallery-tile-caption">
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/90 mt-1">{item.desc}</p>
                  <p className="text-xs text-white/70 mt-1">{item.detail}</p>
                </figcaption>
                <div className="gallery-tile-label">
                  <p className="font-serif text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              </figure>
            ))}
          </div>

          <div className="reveal grid md:grid-cols-2 gap-0 border border-gray-200 overflow-hidden">
            <div className="p-7 md:p-10 bg-emerald-800 text-white">
              <h3 className="font-serif text-xl md:text-2xl font-semibold mb-5">Perkebunan</h3>
              <ul className="space-y-3 text-sm md:text-base text-emerald-50/95 leading-relaxed">
                <li>Lokasi strategis di jalur Medan-Aceh</li>
                <li>Topografi tanah rata dan bergelombang landai</li>
                <li>Kemitraan dengan petani sawit lokal</li>
                <li>Buah sawit kualitas export grade</li>
              </ul>
            </div>
            <div className="p-7 md:p-10 bg-stone-50">
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-5">Fasilitas Produksi</h3>
              <ul className="space-y-3 prose-body text-sm md:text-base">
                <li>Station Ripple Mill dengan conveyor modern</li>
                <li>Clarification station untuk pemurnian CPO</li>
                <li>Filter Press untuk pemulihan minyak dari sludge</li>
                <li>Steam distribution system ke unit pengolahan</li>
                <li>Laboratorium quality control lengkap</li>
                <li>Storage tank kapasitas 10.000 mton total</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding border-t border-gray-200 bg-stone-50">
        <div className="section-wrap">
          <div className="reveal">
            <p className="section-label">Get in Touch With Us</p>
            <h2 className="section-heading">Contact Us</h2>
            <div className="accent-rule" />
          </div>

          <div className="reveal grid lg:grid-cols-2 gap-14 lg:gap-20 mb-20">
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-5">Registered Office</h3>
                <div className="space-y-4 prose-body text-sm md:text-base">
                  <p className="flex gap-3">
                    <MapPin className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <span>
                      Jl. Kapten Muslim Komp. Ruko Tata Plaza<br />
                      Blok B No. 15, Kel. Dwi Kora<br />
                      Kec. Medan Helvetia, Kota Medan 20123<br />
                      Sumatera Utara
                    </span>
                  </p>
                  <p className="flex gap-3 items-center">
                    <Mail className="w-5 h-5 text-emerald-800 flex-shrink-0" />
                    <a href="mailto:man@multiagroniaga.com" className="text-emerald-800 hover:underline transition-colors duration-300">
                      man@multiagroniaga.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-5">Main Office</h3>
                <div className="space-y-4 prose-body text-sm md:text-base">
                  <p className="flex gap-3">
                    <MapPin className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <span>
                      Jl. Putri Hijau Komp. Graha Niaga<br />
                      Blok C 11 Lantai – 3<br />
                      Medan 20114<br />
                      Sumatera Utara
                    </span>
                  </p>
                  <p className="flex gap-3 items-center">
                    <Phone className="w-5 h-5 text-emerald-800 flex-shrink-0" />
                    <a href="tel:061-4555092" className="text-emerald-800 hover:underline transition-colors duration-300">
                      061 - 4555092
                    </a>
                  </p>
                  <p className="flex gap-3 items-center">
                    <Mail className="w-5 h-5 text-emerald-800 flex-shrink-0" />
                    <a href="mailto:man@multiagroniaga.com" className="text-emerald-800 hover:underline transition-colors duration-300">
                      man@multiagroniaga.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bordered-block p-7 md:p-10">
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-7">Send Us a Message</h3>

              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus(null);

                const form = e.target;
                const serviceId = 'service_cmxxx83';
                const templateId = 'template_30ig3vj';
                const publicKey = 'nriXW6bQGzP7RfNnm';

                const templateParams = {
                  to_email: 'andrewrchristopher@gmail.com',
                  from_name: form.name.value,
                  from_email: form.email.value,
                  phone: form.phone.value || 'Not provided',
                  company: form.company.value || 'Not provided',
                  service: form.service.value || 'General Inquiry',
                  message: form.message.value,
                  reply_to: form.email.value,
                };

                try {
                  await emailjs.send(serviceId, templateId, templateParams, publicKey);
                  setSubmitStatus('success');
                  form.reset();
                  setTimeout(() => setSubmitStatus(null), 5000);
                } catch (error) {
                  console.error('Email send failed:', error);
                  setSubmitStatus('error');
                  setTimeout(() => setSubmitStatus(null), 5000);
                } finally {
                  setIsSubmitting(false);
                }
              }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-emerald-800">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-900 text-sm md:text-base focus:outline-none focus:border-emerald-800 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address <span className="text-emerald-800">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-900 text-sm md:text-base focus:outline-none focus:border-emerald-800 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-900 text-sm md:text-base focus:outline-none focus:border-emerald-800 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Enter your company"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-900 text-sm md:text-base focus:outline-none focus:border-emerald-800 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 text-sm md:text-base focus:outline-none focus:border-emerald-800 bg-white transition-colors duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="CPO Trading">CPO Trading</option>
                    <option value="Palm Kernel">Palm Kernel</option>
                    <option value="Plantation Partnership">Plantation Partnership</option>
                    <option value="Export Services">Export Services</option>
                    <option value="Distribution">Distribution Services</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message <span className="text-emerald-800">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Please describe your inquiry..."
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 text-sm md:text-base focus:outline-none focus:border-emerald-800 resize-none transition-colors duration-300"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="border border-emerald-200 bg-emerald-50 text-emerald-900 p-4 text-sm">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="border border-red-200 bg-red-50 text-red-900 p-4 text-sm">
                    Failed to send message. Please try again or email us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary py-4 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div className="reveal bordered-block">
            <div className="p-7 md:p-10 border-b border-gray-200">
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-2">Find Us</h3>
              <p className="text-sm md:text-base text-gray-600">Visit our office in Medan for direct consultation</p>
            </div>
            <iframe
              src="https://www.google.com/maps?q=3.6001606,98.6439091&hl=en&z=18&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PT. Multi Agronabatindo Niaga - Ruko Tata Plaza"
            />
            <div className="p-7 md:p-10 border-t border-gray-200">
              <p className="font-medium text-gray-900 text-base md:text-lg">
                Jl. Kapten Muslim Komp. Ruko Tata Plaza Blok B No. 15
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-1.5">
                Medan Helvetia, Medan - 20123, North Sumatra
              </p>
              <a
                href="https://maps.app.goo.gl/X7HS3fDexfK2fwyP9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 text-sm md:text-base font-medium text-emerald-800 hover:underline transition-colors duration-300"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t-4 border-emerald-800">
        <div className="section-wrap py-14 md:py-16">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <img
                  src={companyLogo}
                  alt=""
                  aria-hidden="true"
                  className="w-10 h-10 object-contain flex-shrink-0"
                />
                <div>
                  <p className="font-serif text-white font-semibold text-base leading-tight">
                    PT. Multi Agronabatindo Niaga
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Since 1990</p>
                </div>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-gray-400 max-w-sm">
                Leading palm oil trading and plantation company in Indonesia, committed to quality and sustainable practices.
              </p>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 text-sm md:text-base">
                {navItems.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">Contact</h4>
              <div className="space-y-2.5 text-sm md:text-base">
                <p>
                  <a href="mailto:man@multiagroniaga.com" className="hover:text-white transition-colors duration-300">
                    man@multiagroniaga.com
                  </a>
                </p>
                <p>
                  <a href="tel:061-4555092" className="hover:text-white transition-colors duration-300">
                    061 - 4555092
                  </a>
                </p>
                <p className="text-gray-400">Medan, Sumatera Utara</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs md:text-sm text-gray-500">
            <p>&copy; 2026 PT. Multi Agronabatindo Niaga. All rights reserved.</p>
            <p className="mt-1.5">Licensed Trading Company • Certified Quality Standards</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}

export default App;
