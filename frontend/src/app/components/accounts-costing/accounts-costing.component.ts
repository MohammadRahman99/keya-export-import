import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-accounts-costing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Finance & Commercial Costing</span>
          <h3 class="text-xl font-extrabold text-slate-900">Accounts & Landed Costing Engine</h3>
          <p class="text-xs text-slate-500 mt-0.5">Automated Landed Cost Calculation: Base Price + Freight + Insurance + Customs Duty + Port Charges + C&F Expenses.</p>
        </div>
      </div>

      <!-- Landed Cost Table -->
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
            <tr>
              <th class="py-3 px-4">Import Ref & Product</th>
              <th class="py-3 px-4 text-right">Base FOB Cost</th>
              <th class="py-3 px-4 text-right">Ocean Freight</th>
              <th class="py-3 px-4 text-right">Marine Insurance</th>
              <th class="py-3 px-4 text-right">Customs Duty</th>
              <th class="py-3 px-4 text-right">Port & C&F</th>
              <th class="py-3 px-4 text-right font-extrabold text-emerald-700">Landed Unit Cost</th>
              <th class="py-3 px-4 text-right">Profit Margin</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 font-medium">
            @for (lc of dataService.landedCosts(); track lc.importId) {
              <tr class="hover:bg-slate-50 transition">
                <td class="py-3.5 px-4 space-y-0.5">
                  <div class="font-bold text-slate-900 text-sm">{{ lc.productName }}</div>
                  <div class="text-[11px] font-mono text-emerald-700">ID: {{ lc.importId }}</div>
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-700">
                  {{ dataService.formatValue(lc.baseCostUSD) }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-700">
                  {{ dataService.formatValue(lc.freightUSD) }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-700">
                  {{ dataService.formatValue(lc.insuranceUSD) }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-amber-700 font-bold">
                  {{ dataService.formatValue(lc.customsDutyUSD) }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-700">
                  {{ dataService.formatValue(lc.portChargesUSD + lc.cnfChargesUSD) }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-700 text-sm">
                  {{ dataService.formatValue(lc.landedUnitCostUSD) }} / unit
                </td>
                <td class="py-3.5 px-4 text-right font-mono font-bold text-teal-700">
                  +{{ lc.projectedProfitMargin }}%
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class AccountsCostingComponent {
  dataService = inject(ExportImportDataService);
}
