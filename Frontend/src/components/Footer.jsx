import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#F7F7F7] py-10 px-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                
                <div className="text-left space-y-2 max-w-sm">
                    <h3 className="text-xl font-bold text-gray-900">Subscribe our Newsletter</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#00B207] text-white rounded-full cursor-pointer hover:bg-green-700 transition-colors">
                        <FaFacebookF size={14} />
                    </div>
                    <div className="p-3 text-gray-600 cursor-pointer hover:text-green-600 transition-colors">
                        <FaTwitter size={16} />
                    </div>
                    <div className="p-3 text-gray-600 cursor-pointer hover:text-green-600 transition-colors">
                        <FaInstagram size={16} />
                    </div>
                </div>

            </div>
        </footer>
    );
}