import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-compliance-certificates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="compliance" class="py-16 bg-slate-950 border-b border-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Global Compliance & Sustainability
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            International Certifications & Audit Accreditation
          </h2>
          <p class="text-slate-400 text-base">
            Keya Group adheres strictly to international environmental standards, organic cotton tracing, and social compliance audits for tier-1 global buyers.
          </p>
        </div>

        <!-- Certificate Cards Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (cert of dataService.certificates(); track cert.id) {
            <div class="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/30 transition">
              
              <div class="flex items-start justify-between">
                <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                  {{ cert.category }}
                </span>
                <span class="text-xs font-mono text-slate-400">{{ cert.certificateNo }}</span>
              </div>

              <div class="space-y-1">
                <h3 class="text-base font-bold text-white leading-snug">{{ cert.title }}</h3>
                <p class="text-xs text-slate-400">Issuer: {{ cert.issuer }}</p>
              </div>

              <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                <div class="flex justify-between">
                  <span class="text-slate-400">Division Scope:</span>
                  <span class="font-semibold text-slate-200">{{ cert.division }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Valid Until:</span>
                  <span class="font-mono text-emerald-400 font-semibold">{{ cert.validUntil }}</span>
                </div>
              </div>

              <div class="pt-2 flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span> {{ cert.status }}
                </span>
                <button 
                  (click)="downloadCertificate(cert.title)"
                  class="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 hover:underline">
                  <span>Verify Document</span>
                  <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </button>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ComplianceCertificatesComponent {
  dataService = inject(ExportImportDataService);

  downloadCertificate(title: string) {
    alert(`Verified Document Request: Official PDF Audit Copy for "${title}" has been dispatched to your session.`);
  }
}
