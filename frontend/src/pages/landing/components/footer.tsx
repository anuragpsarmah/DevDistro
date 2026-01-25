import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "FAQ"],
    Company: ["About", "Blog", "Careers"],
    Resources: ["Documentation", "API Reference", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/anuragpsarmah/DevExchange", label: "GitHub" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="py-16 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">DevExchange</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The open source marketplace for developers to buy and sell source code.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DevExchange. Open source under MIT License.
          </p>
          <p className="text-gray-500 text-sm">
            Developed with ❤️ by{" "}
            <a
              target="_blank"
              href="https://github.com/anuragpsarmah"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Anurag
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
