const brandLogos = [
  { name: "Vogue", logo: "https://download.logo.wine/logo/Vogue_(magazine)/Vogue_(magazine)-Logo.wine.png" },
  { name: "Accenture", logo: "https://download.logo.wine/logo/Accenture/Accenture-Logo.wine.png" },
  { name: "SAP", logo: "https://cdn.iconscout.com/icon/free/png-256/free-sap-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-6-pack-logos-icons-2945134.png?f=webp&w=256" },
  { name: "Airtel", logo: "https://www.logo.wine/a/logo/Airtel_India/Airtel_India-Logo.wine.svg" },
  { name: "Apple", logo: "https://www.svgrepo.com/show/75117/apple-big-logo.svg" },
  { name: "Samsung", logo: "https://download.logo.wine/logo/Samsung/Samsung-Logo.wine.png" },
  { name: "Vogue", logo: "https://download.logo.wine/logo/Vogue_(magazine)/Vogue_(magazine)-Logo.wine.png" },
  { name: "Volvo", logo: "https://www.logo.wine/a/logo/Volvo/Volvo-Logo.wine.svg" },
  { name: "PWC", logo: "https://www.pngall.com/wp-content/uploads/15/PWC-Logo-PNG-HD-Image.png" },
  { name: "Hyundai", logo: "https://www.svgrepo.com/show/306214/hyundai.svg" },
  { name: "Sony", logo: "https://www.svgrepo.com/show/443435/brand-sony.svg" },
  { name: "SAP", logo: "https://cdn.iconscout.com/icon/free/png-256/free-sap-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-6-pack-logos-icons-2945134.png?f=webp&w=256" },
];

const TrustedBrands = () => {
  return (
    <div className="bg-gradient-to-r from-purple-200 to-pink-200 py-10">
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-10">
          Trusted by the world's top brands.
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brandLogos.map((brand, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 md:h-16 lg:h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
