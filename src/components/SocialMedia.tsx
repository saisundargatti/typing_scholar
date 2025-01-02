const SocialMedia = () => {
  const websiteUrl = encodeURIComponent("https://typing-scholar.pages.dev/");

  const socialMediaLinks = [
    {
      href: `https://www.facebook.com/share.php?u=${websiteUrl}`,
      src: "/facebook.png",
      alt: "Share on Facebook - Typing Scholar",
      tooltip: "Share on Facebook",
      color: "hover:bg-blue-100",
    },
    {
      href: `https://wa.me/?text=${websiteUrl}`,
      src: "/whatsapp.png",
      alt: "Share on WhatsApp - Typing Scholar",
      tooltip: "Share on WhatsApp",
      color: "hover:bg-green-100",
    },
    {
      href: `https://t.me/share/url?url=${websiteUrl}`,
      src: "/telegram.png",
      alt: "Share on Telegram - Typing Scholar",
      tooltip: "Share on Telegram",
      color: "hover:bg-blue-100",
    },
  ];

  return (
    <div className="fixed left-0 top-24 flex flex-col bg-white/90 backdrop-blur-lg rounded-lg shadow-md">
      {socialMediaLinks.map((link, index) => (
        <div key={index} className="relative group">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-12 h-12 rounded-md transition-all duration-300 hover:scale-105 ${link.color}`}
            aria-label={link.alt}
          >
            <img
              src={link.src}
              alt={link.alt}
              className="w-12 h-12 object-contain"
            />
          </a>
          {/* Tooltip */}
          <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
            {link.tooltip}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
