import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-export-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Garments & Textile Outbound Sales</span>
          <h3 class="text-xl font-extrabold text-slate-900">Export Management</h3>
          <p class="text-xs text-slate-500 mt-0.5">Buyer Sales Orders (SO), Export Commercial Invoices, Packing Lists, Container Freight Station dispatches, and FOB/CIF Export Values.</p>
        </div>
      </div>

      <!-- Export Orders Table -->
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
            <tr>
              <th class="py-3 px-4">Export Ref & SO</th>
              <th class="py-3 px-4">Export Invoice No</th>
              <th class="py-3 px-4">International Buyer Customer</th>
              <th class="py-3 px-4">Destination Country</th>
              <th class="py-3 px-4 text-right">Export Quantity</th>
              <th class="py-3 px-4 text-right">Export Value</th>
              <th class="py-3 px-4">Dispatch Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 font-medium">
            @for (exp of dataService.exportOrders(); track exp.orderId) {
              <tr class="hover:bg-slate-50 transition">
                <td class="py-3.5 px-4 space-y-0.5">
                  <div class="font-bold text-slate-900 font-mono">{{ exp.orderId }}</div>
                  <div class="text-[11px] font-mono text-slate-500">SO: {{ exp.salesOrderNo }}</div>
                </td>
                <td class="py-3.5 px-4 font-mono font-bold text-emerald-700">
                  {{ exp.exportInvoiceNo }}
                </td>
                <td class="py-3.5 px-4 text-slate-900 font-semibold">{{ exp.customerName }}</td>
                <td class="py-3.5 px-4 text-slate-700">
                  🌐 {{ exp.destinationCountry }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-700">
                  {{ exp.exportQuantity.toLocaleString() }} {{ exp.unit }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-700 text-sm">
                  {{ dataService.formatValue(exp.exportValueUSD) }}
                </td>
                <td class="py-3.5 px-4">
                  <span [class]="exp.status === 'Vessel Dispatched' ? 'px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200' : 'px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200'">
                    {{ exp.status }}
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
export class ExportManagementComponent {
  dataService = inject(ExportImportDataService);
}
