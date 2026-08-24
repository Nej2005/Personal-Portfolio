import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import CertificationCard from './CertificationCard';
import CertificateModal from './CertificateModal';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-16 sm:py-20 md:py-32 bg-white dark:bg-[#0D0D0D] transition-colors duration-300">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="pixel-badge">
              CERTIFICATIONS & CREDENTIALS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] dark:text-white">
            Professional Credentials & Workshops
          </h2>
          <p className="text-xs sm:text-base text-[#666666] dark:text-[#A0A0A0] mt-2 sm:mt-3 leading-relaxed">
            Verified certifications, IoT masterclasses, cloud infrastructure, and technical workshop completions.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.certifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              onView={(c) => setSelectedCert(c)}
            />
          ))}
        </div>

      </div>

      {/* Modal preview */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
