import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center font-black text-white text-sm">
              K
            </div>
            <div>
              <span class="font-extrabold text-sm text-white">KEYA GROUP ENTERPRISE ERP</span>
              <p class="text-[11px] text-slate-500">Internal Management & Operations System</p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-[11px] text-slate-400">
            <span class="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono font-bold">
              ⚡ Angular 18 + Tailwind CSS
            </span>
            <span class="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
              Role: {{ dataService.activeRole() }}
            </span>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 Keya Group Bangladesh. Internal Confidential & Proprietary.</p>
          <div class="flex items-center gap-4">
            <span>Gazipur Complex Hub</span>
            <span>Chattogram Port Terminal</span>
            <span>Security Policy</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  dataService = inject(ExportImportDataService);
}
