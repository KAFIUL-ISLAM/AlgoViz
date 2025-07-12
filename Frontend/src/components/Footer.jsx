import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faGraduationCap,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

function Footer({ isDark }) {
  return (
    <footer className="w-full relative overflow-hidden mt-8 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.3)]">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-gray-800/5 dark:to-gray-800/10 backdrop-blur-md"></div>

      {/* Glass Effect Container */}
      <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 rounded-2xl"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Side - Developers */}
              <div className="relative">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-emerald-500 dark:from-cyan-400 dark:to-emerald-300 bg-clip-text text-transparent mb-6">
                  Developers
                </h3>
                <div className="space-y-4">
                  <p className="text-slate-700 dark:text-gray-300 flex items-center gap-3 group hover:text-turquoise-dark dark:hover:text-turquoise-light transition-colors">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-turquoise-dark group-hover:scale-110 transition-transform"
                    />
                    Aya El Assal
                  </p>
                  <p className="text-slate-700 dark:text-gray-300 flex items-center gap-3 group hover:text-turquoise-dark dark:hover:text-turquoise-light transition-colors">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-turquoise-dark group-hover:scale-110 transition-transform"
                    />
                    Kafiul Islam
                  </p>
                  {/* <p className="text-slate-600 dark:text-gray-400 text-xs flex items-center gap-2 mt-6">
                    <FontAwesomeIcon icon={faPalette} className="text-turquoise-dark" />
                    Logo Design by Wiam Belkassem
                  </p> */}
                </div>
              </div>

              {/* Right Side - Institution */}
              <div className="relative">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-500 to-cyan-600 dark:from-emerald-300 dark:to-cyan-400 bg-clip-text text-transparent mb-6">
                  Institution
                </h3>
                <div className="flex items-center gap-6 mb-4">
                  <img
                    src={isDark ? "/uni_logo_dark.png" : "/uni_logo.png"}
                    alt="UPC Logo"
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="text-slate-700 dark:text-gray-300 font-semibold hover:text-turquoise-dark dark:hover:text-turquoise-light transition-colors">
                      China University of Petroleum
                    </p>
                    <p className="text-slate-600 dark:text-gray-400">
                      (East China)
                    </p>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-gray-300 hover:text-turquoise-dark dark:hover:text-turquoise-light transition-colors">
                  Summer Practice Internship 2025
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 pt-4 border-t border-white/10 dark:border-gray-700/10">
            <p className="text-center text-slate-700 dark:text-gray-300 text-sm flex items-center justify-center gap-2">
              Made with{" "}
              <FontAwesomeIcon
                icon={faHeart}
                className="text-red-500 hover:scale-110 transition-transform"
              />{" "}
              for learning and visualization
            </p>
            <p className="text-center text-slate-600 dark:text-gray-400 text-xs mt-2 mb-2">
              © {new Date().getFullYear()} AlgoViz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
