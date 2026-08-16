import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-shipment-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-blue-700">Port & Vessel Tracking</span>
          <h3 class="text-xl font-extrabold text-slate-900">Vessel Cargo & Container Tracking</h3>
          <p class="text-xs text-slate-500 mt-0.5">Real-time ocean freight status for outbound export containers and inbound raw material LCs.</p>
        </div>
      </div>

      <!-- Filter & Search Controls -->
      <div class="flex flex-col md:flex-row gap-3 items-center justify-between">
        
        <!-- Search Input -->
        <div class="w-full md:w-80">
          <input 
            type="text"
            [ngModel]="dataService.searchQuery()"
            (ngModelChange)="dataService.searchQuery.set($event)"
            placeholder="Search B/L, LC #, Container # or Client..."
            class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600">
        </div>

        <!-- Type Filter Buttons -->
        <div class="flex items-center gap-1.5 text-xs">
          <button 
            (click)="dataService.selectedTypeFilter.set('ALL')"
            [class]="dataService.selectedTypeFilter() === 'ALL' ? 'px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold' : 'px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'">
            All Cargo
          </button>
          <button 
            (click)="dataService.selectedTypeFilter.set('EXPORT')"
            [class]="dataService.selectedTypeFilter() === 'EXPORT' ? 'px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold' : 'px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'">
            Outbound Exports
          </button>
          <button 
            (click)="dataService.selectedTypeFilter.set('IMPORT')"
            [class]="dataService.selectedTypeFilter() === 'IMPORT' ? 'px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold' : 'px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'">
            Inbound Raw Materials
          </button>
        </div>

      </div>

      <!-- Shipments List Grid -->
      <div class="space-y-4">
        @for (shp of dataService.filteredShipments(); track shp.id) {
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 hover:border-emerald-500/40 transition">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div class="flex items-center gap-3">
                <span [class]="shp.type === 'EXPORT' ? 'px-2.5 py-1 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200' : 'px-2.5 py-1 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200'">
                  {{ shp.type }}
                </span>
                <div>
                  <h4 class="text-sm font-bold text-slate-900 font-mono">{{ shp.id }}</h4>
                  <p class="text-[11px] text-slate-500 font-mono">B/L: {{ shp.bolNumber }} | LC: {{ shp.lcNumber }}</p>
                </div>
              </div>
              <div class="text-right text-xs">
                <div class="font-bold text-slate-900 font-mono">{{ shp.vesselName }}</div>
                <div class="text-[11px] text-slate-500">ETA: {{ shp.eta }}</div>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-4 text-xs">
              <div>
                <span class="text-slate-500 block text-[11px]">Consignment Description:</span>
                <span class="font-semibold text-slate-900">{{ shp.itemsDescription }}</span>
                <span class="block text-slate-600 text-[11px] font-mono mt-0.5">Qty: {{ shp.quantityUnits }}</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[11px]">Route:</span>
                <span class="font-semibold text-slate-900">{{ shp.originPort }} → {{ shp.destinationPort }}</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[11px]">Declared Commercial Value:</span>
                <span class="font-mono font-bold text-emerald-700 text-sm">{{ dataService.formatValue(shp.valueUSD) }}</span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-1.5 pt-1">
              <div class="flex justify-between text-[11px]">
                <span class="text-slate-600 font-medium font-mono">Status: {{ shp.status }}</span>
                <span class="font-mono font-bold text-emerald-700">{{ shp.progressPercentage }}%</span>
              </div>
              <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
                <div class="bg-emerald-600 h-full transition-all duration-500" [style.width.%]="shp.progressPercentage"></div>
              </div>
            </div>

          </div>
        }
      </div>

    </div>
  `
})
export class ShipmentTrackerComponent {
  dataService = inject(ExportImportDataService);
}
