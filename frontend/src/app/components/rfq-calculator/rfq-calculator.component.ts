import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-rfq-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Container Freight Logistics</span>
          <h3 class="text-xl font-extrabold text-slate-900">Container Load Capacity Calculator</h3>
          <p class="text-xs text-slate-500 mt-0.5">Calculate 20FT & 40FT High Cube container CBM utilization for finished garment cartons and raw cotton bales.</p>
        </div>
      </div>

      <!-- Calculator Form & Results -->
      <div class="grid md:grid-cols-2 gap-6">
        
        <!-- Input Form -->
        <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
          <h4 class="font-bold text-slate-900 uppercase tracking-wider">Carton / Package Dimensions</h4>
          
          <div>
            <label class="block text-slate-700 font-semibold mb-1">Total Quantity (Cartons / Units)</label>
            <input type="number" [(ngModel)]="quantity" class="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-slate-700 font-semibold mb-1">Length (cm)</label>
              <input type="number" [(ngModel)]="lengthCm" class="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono">
            </div>
            <div>
              <label class="block text-slate-700 font-semibold mb-1">Width (cm)</label>
              <input type="number" [(ngModel)]="widthCm" class="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono">
            </div>
            <div>
              <label class="block text-slate-700 font-semibold mb-1">Height (cm)</label>
              <input type="number" [(ngModel)]="heightCm" class="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono">
            </div>
          </div>

          <div>
            <label class="block text-slate-700 font-semibold mb-1">Container Size</label>
            <select [(ngModel)]="containerType" class="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-semibold">
              <option value="20FT">20FT Standard Container (33.2 CBM Capacity)</option>
              <option value="40FT_HC">40FT High Cube Container (76.4 CBM Capacity)</option>
            </select>
          </div>
        </div>

        <!-- Calculated CBM Output Card -->
        <div class="p-5 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-4">
          <h4 class="font-bold text-slate-300 uppercase tracking-wider text-xs">Capacity Utilization Output</h4>

          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-400">Single Carton CBM:</span>
              <span class="font-mono font-bold text-emerald-400 text-sm">{{ getSingleCbm().toFixed(4) }} CBM</span>
            </div>

            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-400">Total Shipment Volume:</span>
              <span class="font-mono font-bold text-emerald-400 text-base">{{ getTotalCbm().toFixed(2) }} CBM</span>
            </div>

            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-400">Selected Container Limit:</span>
              <span class="font-mono text-slate-300">{{ getContainerLimit() }} CBM</span>
            </div>

            <!-- Fill Bar -->
            <div class="space-y-1.5 pt-2">
              <div class="flex justify-between text-xs">
                <span class="text-slate-400">Container Fill Percentage:</span>
                <span class="font-mono font-bold text-emerald-400">{{ getFillPercentage().toFixed(1) }}%</span>
              </div>
              <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
                <div [class]="getFillPercentage() > 100 ? 'bg-red-500 h-full' : 'bg-emerald-500 h-full'" [style.width.%]="getFillPercentage() > 100 ? 100 : getFillPercentage()"></div>
              </div>
            </div>

            @if (getFillPercentage() > 100) {
              <div class="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 font-semibold">
                ⚠️ Cargo volume exceeds container capacity. Additional container recommended.
              </div>
            }
          </div>
        </div>

      </div>

    </div>
  `
})
export class RfqCalculatorComponent {
  dataService = inject(ExportImportDataService);

  quantity = 800;
  lengthCm = 60;
  widthCm = 40;
  heightCm = 40;
  containerType = '40FT_HC';

  getSingleCbm(): number {
    return (this.lengthCm * this.widthCm * this.heightCm) / 1000000;
  }

  getTotalCbm(): number {
    return this.getSingleCbm() * this.quantity;
  }

  getContainerLimit(): number {
    return this.containerType === '20FT' ? 33.2 : 76.4;
  }

  getFillPercentage(): number {
    return (this.getTotalCbm() / this.getContainerLimit()) * 100;
  }
}
