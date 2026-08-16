import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="hero" class="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-slate-950 border-b border-slate-900">
      <!-- Background Ambient Glow & Mesh -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Hero Column -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
              <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">EST. 1983</span>
              <span>Bangladesh's Premier Industrial Export Conglomerate</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Global Trade & Logistics <br>
              <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Import Export Terminal
              </span>
            </h1>

            <p class="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Powering international supply chains from Bangladesh to 50+ countries. Delivering high-quality 
              <strong class="text-white">Knitwear Garments</strong>, <strong class="text-white">Combed Cotton Yarn</strong>, 
              <strong class="text-white">Cosmetics & Personal Care</strong>, and <strong class="text-white">Raw Cotton Supply</strong>.
            </p>

            <!-- Live Container / B/L Quick Search Box -->
            <div class="glass-panel p-4 rounded-2xl border border-slate-800 shadow-2xl space-y-3">
              <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Track Container / Bill of Lading (B/L) / LC Number
              </label>
              <div class="flex flex-col sm:flex-row gap-2">
                <div class="relative flex-1">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    [(ngModel)]="searchInputValue"
                    (input)="onSearchInput()"
                    placeholder="Enter Container ID (e.g. MSCU7729104, B/L MSCUBD8849201...)"
                    class="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition">
                </div>
                <a href="#tracker" 
                  class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20">
                  <span>Track Container</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
              <div class="flex flex-wrap gap-2 text-xs text-slate-400 pt-1">
                <span class="text-slate-500">Quick Track:</span>
                <button (click)="quickSearch('MSCU7729104')" class="hover:text-emerald-400 underline font-mono">MSCU7729104 (H&M EU)</button>
                <span>•</span>
                <button (click)="quickSearch('MAEU4419208')" class="hover:text-emerald-400 underline font-mono">MAEU4419208 (Target USA)</button>
                <span>•</span>
                <button (click)="quickSearch('CMAU8810293')" class="hover:text-emerald-400 underline font-mono">CMAU8810293 (Raw Cotton AU)</button>
              </div>
            </div>

            <!-- Key Enterprise Stats Grid with Dynamic Currency -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div class="text-xs text-slate-400 font-medium">Annual Export</div>
                <div class="text-2xl font-extrabold text-white mt-1">
                  {{ dataService.metrics().exportsFormatted }}
                </div>
                <div class="text-[11px] text-emerald-400 font-semibold mt-0.5">↑ 14% YoY Growth</div>
              </div>

              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div class="text-xs text-slate-400 font-medium">Raw Material Import</div>
                <div class="text-2xl font-extrabold text-white mt-1">
                  {{ dataService.metrics().importsFormatted }}
                </div>
                <div class="text-[11px] text-blue-400 font-semibold mt-0.5">Cotton & Dyes Supply</div>
              </div>

              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div class="text-xs text-slate-400 font-medium">Active Containers</div>
                <div class="text-2xl font-extrabold text-white mt-1">
                  {{ dataService.metrics().activeContainers }} <span class="text-xs font-normal text-slate-400">TEU</span>
                </div>
                <div class="text-[11px] text-teal-400 font-semibold mt-0.5">Chattogram & At Sea</div>
              </div>

              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div class="text-xs text-slate-400 font-medium">Global Markets</div>
                <div class="text-2xl font-extrabold text-white mt-1">
                  50+ <span class="text-xs font-normal text-slate-400">Nations</span>
                </div>
                <div class="text-[11px] text-amber-400 font-semibold mt-0.5">USA, EU, Middle East</div>
              </div>
            </div>

          </div>

          <!-- Right Hero Column: Visual Hub Showcase -->
          <div class="lg:col-span-5">
            <div class="relative">
              <!-- Main Feature Card -->
              <div class="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-300">Live Logistics Operation</span>
                  </div>
                  <span class="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    PORT: CHATTOGRAM CGP
                  </span>
                </div>

                <!-- Industrial Units Graphic Preview -->
                <div class="relative h-52 rounded-2xl overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80" 
                    alt="Keya Group Container Port Logistics" 
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-700">
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span class="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Garments & Textile Export Terminal</span>
                      <h4 class="text-lg font-extrabold text-white">Gazipur Industrial Hub #1</h4>
                    </div>
                    <span class="px-3 py-1 bg-slate-900/90 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700">
                      4.5M Pcs / Month
                    </span>
                  </div>
                </div>

                <!-- Live Active Dispatch Widget -->
                <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-slate-400">Current Active Outbound Dispatch:</span>
                    <span class="text-emerald-400 font-mono font-bold">MSC Isabella (Voyage 402W)</span>
                  </div>
                  <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[65%] rounded-full"></div>
                  </div>
                  <div class="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Chattogram Port (CGP)</span>
                    <span class="text-slate-200 font-medium">65% En Route</span>
                    <span>Hamburg Port, Germany</span>
                  </div>
                </div>

                <!-- Global Office Quick Badges -->
                <div class="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
                  <span>International Offices:</span>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 rounded bg-slate-800 text-slate-200 font-medium">🇺🇸 Keya USA Inc.</span>
                    <span class="px-2 py-1 rounded bg-slate-800 text-slate-200 font-medium">🇪🇺 Keya Europe GmbH</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  dataService = inject(ExportImportDataService);
  searchInputValue = '';

  onSearchInput() {
    this.dataService.searchQuery.set(this.searchInputValue);
  }

  quickSearch(term: string) {
    this.searchInputValue = term;
    this.dataService.searchQuery.set(term);
  }
}
