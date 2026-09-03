import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-erp-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      
      <!-- Welcome Role Greeting Banner with Official Logo -->
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-4">
          <img src="assets/logo/keya-logo.png" alt="Keya Group Logo" class="h-12 w-auto object-contain">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-xl font-extrabold text-slate-900">Welcome, {{ dataService.currentUser()?.name }}</h2>
              <span [class]="getRoleBadgeClass()">{{ getUserRole() }}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5 font-medium">Department: {{ dataService.currentUser()?.department }} • Keya Group ERP Ecosystem</p>
          </div>
        </div>

        <div class="text-right text-xs font-mono">
          <div class="text-slate-500">System Time: {{ getCurrentDate() }}</div>
          <div class="text-emerald-700 font-bold">● Active Corporate Session</div>
        </div>
      </div>

      <!-- Top Metric KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Outbound Exports</span>
            <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">↑ 18.4%</span>
          </div>
          <div class="text-2xl font-black text-slate-900 font-mono">
            {{ dataService.metrics().totalExportsFormatted }}
          </div>
          <div class="text-[11px] text-slate-500 font-medium">Target Volume: $250.0M / FY</div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Material Imports</span>
            <span class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono font-bold">Cotton & Dyes</span>
          </div>
          <div class="text-2xl font-black text-slate-900 font-mono">
            {{ dataService.metrics().totalImportsFormatted }}
          </div>
          <div class="text-[11px] text-slate-500 font-medium">Active LCs: {{ dataService.importPOs().length }} Open</div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Pending Cargo Containers</span>
            <span class="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold">En Route</span>
          </div>
          <div class="text-2xl font-black text-amber-600 font-mono">
            {{ dataService.metrics().pendingShipmentsCount }} <span class="text-xs font-normal text-slate-500">TEU</span>
          </div>
          <div class="text-[11px] text-slate-500 font-medium">Vessels: MSC, Maersk, CMA CGM</div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
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

      <!-- Live Tables: Recent Import POs & Export Sales Orders -->
      <div class="grid lg:grid-cols-2 gap-6 text-xs">
        
        <!-- Recent Import Purchase Orders -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">📥</span>
              <h3 class="font-extrabold text-slate-900 text-sm">Recent Import Purchase Orders (POs)</h3>
            </div>
            <span class="font-mono text-[11px] text-slate-500">{{ dataService.importPOs().length }} Active POs</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th class="p-2">PO Ref</th>
                  <th class="p-2">Supplier</th>
                  <th class="p-2">Value ($)</th>
                  <th class="p-2">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
                @for (po of dataService.importPOs(); track po.poNumber) {
                  <tr>
                    <td class="p-2 font-bold text-slate-900">{{ po.poNumber }}</td>
                    <td class="p-2 font-sans font-medium text-slate-800">{{ po.supplierName }}</td>
                    <td class="p-2 font-bold text-emerald-700">{{ dataService.formatValue(po.totalValueUSD) }}</td>
                    <td class="p-2 font-sans">
                      <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[10px]">{{ po.status }}</span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Export Sales Orders -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">📤</span>
              <h3 class="font-extrabold text-slate-900 text-sm">Recent Export Sales Orders</h3>
            </div>
            <span class="font-mono text-[11px] text-slate-500">{{ dataService.exportOrders().length }} Active Orders</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th class="p-2">Order ID</th>
                  <th class="p-2">Customer & Country</th>
                  <th class="p-2">Export Value</th>
                  <th class="p-2">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
                @for (order of dataService.exportOrders(); track order.orderId) {
                  <tr>
                    <td class="p-2 font-bold text-slate-900">{{ order.orderId }}</td>
                    <td class="p-2 font-sans font-medium text-slate-800">{{ order.customerName }} ({{ order.destinationCountry }})</td>
                    <td class="p-2 font-bold text-emerald-700">{{ dataService.formatValue(order.exportValueUSD) }}</td>
                    <td class="p-2 font-sans">
                      <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">{{ order.status }}</span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Live Operations & Breakdown Cards -->
      <div class="grid lg:grid-cols-12 gap-6">
        
        <!-- Outbound Export Breakdown -->
        <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
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
        <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider">Destination Market Share</h3>
          </div>

          <div class="space-y-3 text-xs">
            
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span>🇪🇺</span>
                <span class="font-bold text-slate-800">European Union</span>
              </div>
              <span class="font-mono font-bold text-emerald-700 text-sm">42%</span>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span>🇺🇸</span>
                <span class="font-bold text-slate-800">North America (USA & Canada)</span>
              </div>
              <span class="font-mono font-bold text-blue-700 text-sm">35%</span>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span>🇦🇪</span>
                <span class="font-bold text-slate-800">Middle East & GCC</span>
              </div>
              <span class="font-mono font-bold text-teal-700 text-sm">13%</span>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
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

  getUserRole(): string {
    return this.dataService.currentUser()?.role || 'Operator';
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getRoleBadgeClass(): string {
    const role = this.getUserRole();
    if (role === 'Admin') return 'px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-300';
    if (role === 'Investigating Officer') return 'px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold border border-blue-300';
    return 'px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold border border-amber-300';
  }
}
