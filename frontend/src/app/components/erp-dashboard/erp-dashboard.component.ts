import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-erp-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      
      <!-- Top Metric KPI Cards (White Background, Slate Border) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Outbound Exports</span>
            <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">↑ 18.4%</span>
          </div>
          <div class="text-2xl font-black text-slate-900 font-mono">
            {{ dataService.metrics().totalExportsFormatted }}
          </div>
          <div class="text-[11px] text-slate-500 font-medium">Target Volume: $250.0M / FY</div>
        </div>

        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Material Imports</span>
            <span class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono font-bold">Cotton & Dyes</span>
          </div>
          <div class="text-2xl font-black text-slate-900 font-mono">
            {{ dataService.metrics().totalImportsFormatted }}
          </div>
          <div class="text-[11px] text-slate-500 font-medium">Active LCs: 14 Open</div>
        </div>

        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Pending Cargo Containers</span>
            <span class="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold">En Route</span>
          </div>
          <div class="text-2xl font-black text-amber-600 font-mono">
            {{ dataService.metrics().pendingShipmentsCount }} <span class="text-xs font-normal text-slate-500">TEU</span>
          </div>
          <div class="text-[11px] text-slate-500 font-medium">Vessels: MSC, Maersk, CMA CGM</div>
        </div>

        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Cleared Containers</span>
            <span class="text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-mono font-bold">Chattogram CGP</span>
          </div>
          <div class="text-2xl font-black text-emerald-600 font-mono">
            {{ dataService.metrics().arrivedShipmentsCount }} <span class="text-xs font-normal text-slate-500">TEU</span>
          </div>
          <div class="text-[11px] text-slate-500 font-medium">Stocked at Gazipur Hub</div>
        </div>

      </div>

      <!-- Live Operations & Breakdown Cards (White Background) -->
      <div class="grid lg:grid-cols-12 gap-6">
        
        <!-- Outbound Export Breakdown -->
        <div class="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider">Division Export Allocation</h3>
            <span class="text-xs text-slate-500 font-mono">Currency: {{ dataService.currentCurrency().code }}</span>
          </div>

          <div class="space-y-4">
            
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-medium">
                <span class="text-slate-800 font-semibold">Keya Knit Composite Ltd. (Apparel)</span>
                <span class="font-mono text-emerald-700 font-bold">
                  {{ dataService.formatValue(120000000) }} (54.5%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div class="bg-emerald-600 h-full w-[54.5%]"></div>
              </div>
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-medium">
                <span class="text-slate-800 font-semibold">Keya Spinning Mills Ltd. (Yarn)</span>
                <span class="font-mono text-blue-700 font-bold">
                  {{ dataService.formatValue(45000000) }} (20.5%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div class="bg-blue-600 h-full w-[20.5%]"></div>
              </div>
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-medium">
                <span class="text-slate-800 font-semibold">Keya Cosmetics & Toiletries</span>
                <span class="font-mono text-teal-700 font-bold">
                  {{ dataService.formatValue(30000000) }} (13.6%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div class="bg-teal-600 h-full w-[13.6%]"></div>
              </div>
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-medium">
                <span class="text-slate-800 font-semibold">Keya Cotton Supply & Fiber</span>
                <span class="font-mono text-amber-700 font-bold">
                  {{ dataService.formatValue(25000000) }} (11.4%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div class="bg-amber-600 h-full w-[11.4%]"></div>
              </div>
            </div>

          </div>

          <div class="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
            <span class="text-slate-500 font-medium">Total Group Turnover:</span>
            <span class="font-mono font-black text-slate-900 text-sm">
              {{ dataService.formatValue(220000000) }}
            </span>
          </div>

        </div>

        <!-- Regional Export Destinations -->
        <div class="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider">Destination Market Share</h3>
          </div>

          <div class="space-y-3 text-xs">
            
            <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span>🇪🇺</span>
                <span class="font-bold text-slate-800">European Union</span>
              </div>
              <span class="font-mono font-bold text-emerald-700 text-sm">42%</span>
            </div>

            <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span>🇺🇸</span>
                <span class="font-bold text-slate-800">North America (USA & Canada)</span>
              </div>
              <span class="font-mono font-bold text-blue-700 text-sm">35%</span>
            </div>

            <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span>🇦🇪</span>
                <span class="font-bold text-slate-800">Middle East & GCC</span>
              </div>
              <span class="font-mono font-bold text-teal-700 text-sm">13%</span>
            </div>

            <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span>🇨🇳</span>
                <span class="font-bold text-slate-800">Asia-Pacific</span>
              </div>
              <span class="font-mono font-bold text-amber-700 text-sm">10%</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  `
})
export class ErpDashboardComponent {
  dataService = inject(ExportImportDataService);
}
