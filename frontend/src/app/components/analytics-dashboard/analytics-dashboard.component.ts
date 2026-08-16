import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="analytics" class="py-16 bg-slate-900/60 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Executive Insights
            </div>
            <h2 class="text-3xl font-extrabold text-white tracking-tight">
              Global Trade Analytics & Destination Breakdown
            </h2>
            <p class="text-slate-400 text-sm mt-1">
              Quarterly export revenue metrics, vessel container dispatches, and key trade lane shares.
            </p>
          </div>

          <div class="flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span>Rates Synced:</span>
            <span class="font-mono text-emerald-400 font-bold">1 USD = {{ dataService.currentCurrency().rate }} {{ dataService.currentCurrency().code }}</span>
          </div>
        </div>

        <div class="grid lg:grid-cols-12 gap-8">
          
          <!-- Chart / Bar Grid (Left Column) -->
          <div class="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
            <h3 class="text-base font-bold text-white flex justify-between items-center">
              <span>Division Revenue Distribution</span>
              <span class="text-xs text-slate-400 font-normal">FY 2025 - 2026</span>
            </h3>

            <!-- Division Revenue Bars -->
            <div class="space-y-4">
              
              <!-- Knit Composite -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-xs">
                  <span class="font-bold text-white">Keya Knit Composite Ltd. (Apparel)</span>
                  <span class="font-mono text-emerald-400 font-bold">
                    {{ dataService.formatValue(120000000) }} (54.5%)
                  </span>
                </div>
                <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[54.5%] rounded-full"></div>
                </div>
              </div>

              <!-- Spinning Mills -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-xs">
                  <span class="font-bold text-white">Keya Spinning Mills Ltd. (Yarn)</span>
                  <span class="font-mono text-blue-400 font-bold">
                    {{ dataService.formatValue(45000000) }} (20.5%)
                  </span>
                </div>
                <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[20.5%] rounded-full"></div>
                </div>
              </div>

              <!-- Cosmetics -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-xs">
                  <span class="font-bold text-white">Keya Cosmetics & Toiletries</span>
                  <span class="font-mono text-teal-400 font-bold">
                    {{ dataService.formatValue(30000000) }} (13.6%)
                  </span>
                </div>
                <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-gradient-to-r from-teal-500 to-emerald-400 h-full w-[13.6%] rounded-full"></div>
                </div>
              </div>

              <!-- Cotton Supply -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-xs">
                  <span class="font-bold text-white">Keya Cotton Supply & Fiber</span>
                  <span class="font-mono text-amber-400 font-bold">
                    {{ dataService.formatValue(25000000) }} (11.4%)
                  </span>
                </div>
                <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-gradient-to-r from-amber-500 to-yellow-400 h-full w-[11.4%] rounded-full"></div>
                </div>
              </div>

            </div>

            <!-- Total Revenue Note -->
            <div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span class="text-slate-400">Total Group Annual Export Turnover:</span>
              <span class="text-base font-extrabold text-white font-mono">
                {{ dataService.formatValue(220000000) }}
              </span>
            </div>

          </div>

          <!-- Market Share breakdown (Right Column) -->
          <div class="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 shadow-2xl">
            <h3 class="text-base font-bold text-white">Top Export Market Shares</h3>

            <div class="space-y-3 text-xs">
              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🇪🇺</span>
                  <div>
                    <div class="font-bold text-white">European Union</div>
                    <div class="text-[11px] text-slate-400">Germany, Spain, UK, France, Portugal</div>
                  </div>
                </div>
                <span class="font-mono font-bold text-emerald-400 text-sm">42%</span>
              </div>

              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🇺🇸</span>
                  <div>
                    <div class="font-bold text-white">North America</div>
                    <div class="text-[11px] text-slate-400">United States & Canada</div>
                  </div>
                </div>
                <span class="font-mono font-bold text-blue-400 text-sm">35%</span>
              </div>

              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🇦🇪</span>
                  <div>
                    <div class="font-bold text-white">Middle East & GCC</div>
                    <div class="text-[11px] text-slate-400">UAE, Saudi Arabia, Oman, Qatar</div>
                  </div>
                </div>
                <span class="font-mono font-bold text-teal-400 text-sm">13%</span>
              </div>

              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🇨🇳</span>
                  <div>
                    <div class="font-bold text-white">Asia-Pacific</div>
                    <div class="text-[11px] text-slate-400">China, Japan, Vietnam, Australia</div>
                  </div>
                </div>
                <span class="font-mono font-bold text-amber-400 text-sm">10%</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class AnalyticsDashboardComponent {
  dataService = inject(ExportImportDataService);
}
