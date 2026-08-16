import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Master Data Catalog</span>
          <h3 class="text-xl font-extrabold text-slate-900">Product Management (SKU Master)</h3>
          <p class="text-xs text-slate-500 mt-0.5">Manage group SKUs, HS Codes, product categories, and unit price baselines.</p>
        </div>
        <button 
          (click)="showAddModal.set(true)"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition shadow-sm">
          <span>+ Add New Product</span>
        </button>
      </div>

      <!-- Product Table -->
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
            <tr>
              <th class="py-3 px-4">Product Name & SKU</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">HS Code</th>
              <th class="py-3 px-4">Country of Origin</th>
              <th class="py-3 px-4">Default Supplier</th>
              <th class="py-3 px-4 text-right">Unit Price (USD)</th>
              <th class="py-3 px-4 text-right">Stock Level</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 font-medium">
            @for (prd of dataService.products(); track prd.id) {
              <tr class="hover:bg-slate-50 transition">
                <td class="py-3.5 px-4">
                  <div class="font-bold text-slate-900 text-sm">{{ prd.name }}</div>
                  <div class="text-[11px] font-mono text-emerald-700">SKU: {{ prd.sku }}</div>
                </td>
                <td class="py-3.5 px-4">
                  <span class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                    {{ prd.category }}
                  </span>
                </td>
                <td class="py-3.5 px-4 font-mono text-slate-800 font-bold">
                  {{ prd.hsCode }}
                </td>
                <td class="py-3.5 px-4 text-slate-700">🌐 {{ prd.countryOfOrigin }}</td>
                <td class="py-3.5 px-4 text-slate-600">{{ prd.supplierName }}</td>
                <td class="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                  {{ dataService.formatValue(prd.unitPriceUSD) }} / {{ prd.unit }}
                </td>
                <td class="py-3.5 px-4 text-right font-mono text-slate-900 font-bold">
                  {{ prd.stockLevel.toLocaleString() }} {{ prd.unit }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Add Product Modal -->
      @if (showAddModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-xl border border-slate-200 p-6 space-y-5 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-base font-bold text-slate-900">Add New Product SKU Entry</h3>
              <button (click)="showAddModal.set(false)" class="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            
            <div class="space-y-3 text-xs">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Product Name</label>
                <input type="text" [(ngModel)]="newProductName" placeholder="e.g. Organic Cotton Polo" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900">
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">SKU</label>
                  <input type="text" [(ngModel)]="newSku" placeholder="KEYA-SKU-99" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">HS Code</label>
                  <input type="text" [(ngModel)]="newHsCode" placeholder="6105.10" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-mono">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Unit Price (USD)</label>
                  <input type="number" [(ngModel)]="newUnitPrice" placeholder="5.50" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Country of Origin</label>
                  <input type="text" [(ngModel)]="newOrigin" placeholder="Bangladesh" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900">
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button (click)="showAddModal.set(false)" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">Cancel</button>
              <button (click)="saveProduct()" class="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs">Save Entry</button>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class ProductManagementComponent {
  dataService = inject(ExportImportDataService);
  showAddModal = signal(false);

  newProductName = '';
  newSku = '';
  newHsCode = '';
  newUnitPrice = 0;
  newOrigin = 'Bangladesh';

  saveProduct() {
    if (!this.newProductName) return;
    this.dataService.products.update(list => [
      ...list,
      {
        id: `PRD-${Date.now().toString().slice(-3)}`,
        name: this.newProductName,
        sku: this.newSku || `KEYA-PRD-${Date.now().toString().slice(-4)}`,
        category: 'Knitwear',
        unit: 'Pcs',
        supplierId: 'SUP-01',
        supplierName: 'Queensland Cotton Corp',
        countryOfOrigin: this.newOrigin,
        hsCode: this.newHsCode || '6105.10',
        unitPriceUSD: this.newUnitPrice || 5.0,
        stockLevel: 10000
      }
    ]);
    this.showAddModal.set(false);
    this.newProductName = '';
  }
}
