import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      
      <!-- Internal Staff Operations Banner -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border-b border-slate-800/60 py-1.5 px-4 text-xs">
        <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div class="flex items-center gap-3 text-slate-300">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 text-[11px]">
              🔒 INTERNAL SYSTEM ONLY
            </span>
            <span class="hidden sm:inline text-slate-400">Keya Group Industrial Complex • Employee Portal</span>
          </div>

          <!-- Active Employee Profile & Currency Selector -->
          <div class="flex items-center gap-4">
            
            <!-- Employee Badge -->
            <div class="flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-slate-400">User:</span>
              <span class="font-bold text-white">{{ getCurrentUser().name }}</span>
              <span class="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                {{ dataService.activeRole() }}
              </span>
            </div>

            <!-- Global Trade Currency Switcher -->
            <div class="relative group">
              <button 
                class="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-100 px-3 py-1 rounded-lg border border-slate-700 transition shadow-sm cursor-pointer">
                <span>{{ dataService.currentCurrency().flag }}</span>
                <span class="font-semibold text-emerald-400">{{ dataService.currentCurrency().code }} ({{ dataService.currentCurrency().symbol }})</span>
                <svg class="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <div class="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block z-50 animate-in fade-in duration-150">
                <div class="p-2 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Select Operating Currency
                </div>
                <div class="max-h-64 overflow-y-auto py-1">
                  @for (c of dataService.currencies(); track c.code) {
                    <button 
                      (click)="dataService.setCurrency(c.code)"
                      [class]="c.code === dataService.currentCurrency().code ? 'w-full flex items-center justify-between px-3 py-2 text-xs bg-emerald-500/10 text-emerald-400 hover:bg-slate-800 transition text-left font-semibold' : 'w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-slate-800 transition text-left text-slate-200'">
                      <div class="flex items-center gap-2">
                        <span>{{ c.flag }}</span>
                        <span class="font-medium">{{ c.name }}</span>
                      </div>
                      <span class="font-mono text-slate-400 font-semibold">{{ c.code }} {{ c.symbol }}</span>
                    </button>
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Main Enterprise Console Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <!-- Logo & Portal Tag -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-700 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-emerald-500/20">
            K
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-xl tracking-tight text-white">KEYA GROUP</span>
              <span class="px-2 py-0.5 text-[10px] font-extrabold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">INTERNAL ERP</span>
            </div>
            <p class="text-[11px] text-slate-400 font-medium">Enterprise Resource Planning & Operations Management</p>
          </div>
        </div>

        <!-- Quick System Status Indicators -->
        <div class="hidden md:flex items-center gap-4 text-xs">
          <div class="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span class="text-slate-400">Port Customs DB:</span>
            <span class="font-bold text-white">Online</span>
          </div>

          <div class="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-400"></span>
            <span class="text-slate-400">Gazipur ERP Sync:</span>
            <span class="font-bold text-white">100% Synced</span>
          </div>
        </div>

      </div>
    </header>
  `
})
export class NavbarComponent {
  dataService = inject(ExportImportDataService);

  getCurrentUser() {
    const role = this.dataService.activeRole();
    const found = this.dataService.users().find(u => u.role === role);
    return found || this.dataService.users()[0];
  }
}
