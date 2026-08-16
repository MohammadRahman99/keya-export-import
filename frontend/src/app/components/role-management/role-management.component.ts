import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService, UserRole } from '../../services/export-import-data.service';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Access Control & Staff Matrix</span>
          <h3 class="text-xl font-extrabold text-slate-900">User & Role Security Management</h3>
          <p class="text-xs text-slate-500 mt-0.5">Manage employee access levels across Admin, Export Manager, Import Manager, Accounts, Warehouse, and Executive Board.</p>
        </div>
      </div>

      <!-- Active Role Switcher Pills -->
      <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Simulate Active Working Profile:</label>
        <div class="flex flex-wrap gap-2 text-xs">
          @for (role of availableRoles; track role) {
            <button 
              (click)="dataService.setRole(role)"
              [class]="dataService.activeRole() === role ? 'px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition'">
              {{ role }}
            </button>
          }
        </div>
      </div>

      <!-- Users Directory Table -->
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
            <tr>
              <th class="py-3 px-4">Employee Name</th>
              <th class="py-3 px-4">Department</th>
              <th class="py-3 px-4">Assigned Role</th>
              <th class="py-3 px-4">System Permissions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 font-medium">
            @for (usr of dataService.users(); track usr.id) {
              <tr [class]="usr.role === dataService.activeRole() ? 'bg-emerald-50/50 transition' : 'hover:bg-slate-50 transition'">
                <td class="py-3.5 px-4">
                  <div class="font-bold text-slate-900 text-sm">{{ usr.name }}</div>
                  <div class="text-[11px] font-mono text-slate-500">{{ usr.email }}</div>
                </td>
                <td class="py-3.5 px-4 text-slate-700 font-medium">{{ usr.department }}</td>
                <td class="py-3.5 px-4">
                  <span class="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold">
                    {{ usr.role }}
                  </span>
                </td>
                <td class="py-3.5 px-4">
                  <div class="flex flex-wrap gap-1">
                    @for (perm of usr.permissions; track perm) {
                      <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-semibold border border-emerald-200">
                        {{ perm }}
                      </span>
                    }
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class RoleManagementComponent {
  dataService = inject(ExportImportDataService);
  
  availableRoles: UserRole[] = [
    'Admin',
    'Export Manager',
    'Import Manager',
    'Accounts',
    'Warehouse',
    'Management'
  ];
}
