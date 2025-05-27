import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="mt-12 text-center text-gray-500 text-sm font-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <p>
        Developed with ❤️ by Firas Jerbi| © {new Date().getFullYear()} All
        rights reserved.
      </p>
    </motion.footer>
  );
}

export default Footer;
