import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService, Division } from '../../services/export-import-data.service';

@Component({
  selector: 'app-divisions-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="divisions" class="py-16 bg-slate-900/60 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Keya Group Business Units
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vertical Industrial Divisions & Product Portfolio
          </h2>
          <p class="text-slate-400 text-base">
            Integrated manufacturing operations ensuring quality control from raw cotton bales to finished apparel and fast-moving consumer toiletries.
          </p>
        </div>

        <!-- Division Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (div of dataService.divisions(); track div.id) {
            <div 
              class="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition duration-300 group flex flex-col justify-between">
              
              <!-- Image Header -->
              <div class="relative h-44 overflow-hidden">
                <img 
                  [src]="div.image" 
                  [alt]="div.name" 
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                <span class="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-[11px] font-extrabold text-emerald-400 rounded-lg border border-slate-700">
                  Est. {{ div.established }}
                </span>

                <div class="absolute bottom-3 left-3 right-3">
                  <h3 class="text-lg font-bold text-white leading-snug group-hover:text-emerald-400 transition">
                    {{ div.name }}
                  </h3>
                </div>
              </div>

              <!-- Body Content -->
              <div class="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p class="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed">
                    {{ div.tagline }}
                  </p>

                  <!-- Export Volume in Active Currency -->
                  <div class="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-xs">
                    <span class="text-slate-400">Annual Export Volume:</span>
                    <span class="font-extrabold text-emerald-400 font-mono">
                      {{ dataService.formatValue(div.annualExportUSD) }}
                    </span>
                  </div>

                  <!-- Key Products Pills -->
                  <div class="mt-4 space-y-1.5">
                    <div class="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Top Products</div>
                    <div class="flex flex-wrap gap-1">
                      @for (prod of div.mainProducts.slice(0, 3); track prod) {
                        <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                          {{ prod }}
                        </span>
                      }
                      @if (div.mainProducts.length > 3) {
                        <span class="px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 text-[10px]">
                          +{{ div.mainProducts.length - 3 }} more
                        </span>
                      }
                    </div>
                  </div>
                </div>

                <!-- Footer Action -->
                <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span class="text-[11px] text-slate-400 font-medium">Monthly Cap: {{ div.capacityPerMonth }}</span>
                  <button 
                    (click)="openModal(div)"
                    class="px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 text-slate-200 text-xs font-semibold rounded-lg transition">
                    View Specs
                  </button>
                </div>

              </div>

            </div>
          }
        </div>

      </div>

      <!-- Detail Specification Modal -->
      @if (selectedDivision()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div class="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div class="flex items-start justify-between">
              <div>
                <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Industrial Division Specs</span>
                <h3 class="text-2xl font-extrabold text-white mt-1">{{ selectedDivision()?.name }}</h3>
                <p class="text-sm text-slate-400">{{ selectedDivision()?.tagline }}</p>
              </div>
              <button 
                (click)="selectedDivision.set(null)"
                class="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition">
                ✕
              </button>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div class="text-xs text-slate-400">Monthly Manufacturing Capacity</div>
                <div class="text-sm font-bold text-white mt-0.5">{{ selectedDivision()?.capacityPerMonth }}</div>
              </div>
              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div class="text-xs text-slate-400">Annual Export Volume</div>
                <div class="text-sm font-bold text-emerald-400 mt-0.5 font-mono">
                  {{ dataService.formatValue(selectedDivision()?.annualExportUSD || 0) }}
                </div>
              </div>
            </div>

            <!-- Full Product Portfolio -->
            <div class="space-y-2">
              <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Product Catalog List</h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                @for (prod of selectedDivision()?.mainProducts; track prod) {
                  <div class="p-2.5 bg-slate-900/90 rounded-lg text-xs font-medium text-slate-200 border border-slate-800/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{{ prod }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Certifications -->
            <div class="space-y-2">
              <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Quality & Compliance Accreditations</h4>
              <div class="flex flex-wrap gap-2">
                @for (cert of selectedDivision()?.certifications; track cert) {
                  <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium rounded-lg">
                    ✓ {{ cert }}
                  </span>
                }
              </div>
            </div>

            <!-- Export Markets -->
            <div class="space-y-2">
              <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Export Destinations</h4>
              <p class="text-xs text-slate-300">
                {{ selectedDivision()?.exportDestinations?.join(', ') }}
              </p>
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end">
              <a href="#calculator" 
                (click)="selectedDivision.set(null)"
                class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition">
                Configure Order RFQ
              </a>
            </div>

          </div>
        </div>
      }
    </section>
  `
})
export class DivisionsShowcaseComponent {
  dataService = inject(ExportImportDataService);
  selectedDivision = signal<Division | null>(null);

  openModal(div: Division) {
    this.selectedDivision.set(div);
  }
}
