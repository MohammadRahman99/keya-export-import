import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-import-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-blue-700">Raw Material Procurement</span>
          <h3 class="text-xl font-extrabold text-slate-900">Import Management (PO, PI & LC)</h3>
          <p class="text-xs text-slate-500 mt-0.5">Manage Purchase Orders, Proforma Invoices, and Letter of Credit (LC) lifecycles for raw cotton and dye consignments.</p>
        </div>
      </div>

      <!-- Import PO & LC Table -->
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
            <tr>
              <th class="py-3 px-4">PO & PI Reference</th>
              <th class="py-3 px-4">LC Number</th>
              <th class="py-3 px-4">Supplier Name</th>
              <th class="py-3 px-4">Product & Quantity</th>
              <th class="py-3 px-4 text-right">Unit Price</th>
              <th class="py-3 px-4 text-right">Total LC Value</th>
              <th class="py-3 px-4">Expected Arrival</th>
              <th class="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 font-medium">
            @for (po of dataService.importPOs(); track po.poNumber) {
              <tr class="hover:bg-slate-50 transition">
                <td class="py-3.5 px-4 space-y-0.5">
                  <div class="font-bold text-slate-900 font-mono">{{ po.poNumber }}</div>
                  <div class="text-[11px] font-mono text-slate-500">PI: {{ po.piNumber }}</div>
                </td>
                <td class="py-3.5 px-4 font-mono font-bold text-blue-700">
                  {{ po.lcNumber }}
                </td>
                <td class="py-3.5 px-4 text-slate-800 font-semibold">{{ po.supplierName }}</td>
                <td class="py-3.5 px-4 space-y-0.5">
                  <div class="font-semibold text-slate-900">{{ po.productName }}</div>
                  <div class="text-[11px] text-slate-500 font-mono">Qty: {{ po.quantity.toLocaleString() }} {{ po.unit }}</div>
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-700">
                  {{ dataService.formatValue(po.unitPriceUSD) }} / {{ po.unit }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-700 text-sm">
                  {{ dataService.formatValue(po.totalValueUSD) }}
                </td>
                <td class="py-3.5 px-4 font-mono text-slate-700">
                  📅 {{ po.expectedArrival }}
                </td>
                <td class="py-3.5 px-4">
                  <span [class]="po.status === 'In Transit' ? 'px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200' : 'px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200'">
                    {{ po.status }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class ImportManagementComponent {
  dataService = inject(ExportImportDataService);
}
