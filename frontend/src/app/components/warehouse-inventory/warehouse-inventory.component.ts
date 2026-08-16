import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-warehouse-inventory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-700">Stock & Bin Receipts</span>
          <h3 class="text-xl font-extrabold text-slate-900">Warehouse & Inventory Management</h3>
          <p class="text-xs text-slate-500 mt-0.5">Track raw material and finished garment stock: Imported vs Received vs Damaged quantities across warehouse locations.</p>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
            <tr>
              <th class="py-3 px-4">Item Name & SKU</th>
              <th class="py-3 px-4">Warehouse Location</th>
              <th class="py-3 px-4 text-right">Imported Qty</th>
              <th class="py-3 px-4 text-right">Received Qty</th>
              <th class="py-3 px-4 text-right text-red-700">Damaged Qty</th>
              <th class="py-3 px-4 text-right font-bold text-emerald-700">Available Stock</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 font-medium">
            @for (wh of dataService.warehouseStock(); track wh.id) {
              <tr class="hover:bg-slate-50 transition">
                <td class="py-3.5 px-4 space-y-0.5">
                  <div class="font-bold text-slate-900 text-sm">{{ wh.productName }}</div>
                  <div class="text-[11px] font-mono text-emerald-700">SKU: {{ wh.sku }}</div>
                </td>
                <td class="py-3.5 px-4">
                  <span class="px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                    🏢 {{ wh.warehouseLocation }}
                  </span>
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-700">
                  {{ wh.importedQty.toLocaleString() }} {{ wh.unit }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-800">
                  {{ wh.receivedQty.toLocaleString() }} {{ wh.unit }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono font-bold text-red-600">
                  ⚠️ {{ wh.damagedQty.toLocaleString() }} {{ wh.unit }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-700 text-sm">
                  {{ wh.currentStock.toLocaleString() }} {{ wh.unit }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class WarehouseInventoryComponent {
  dataService = inject(ExportImportDataService);
}
