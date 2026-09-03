import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService, UserRoleProfile, UserRole } from '../../services/export-import-data.service';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Human Resources & Access Control</span>
          <h2 class="text-2xl font-black text-slate-900">Keya Group Employee Management (CRUD)</h2>
          <p class="text-xs text-slate-500 mt-1">Create, view, update, and manage Keya Group staff accounts, passwords, and assigned roles.</p>
        </div>

        <button 
          (click)="openAddEmployeeModal()"
          class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20">
          <span>+ Add New Employee</span>
        </button>
      </div>

      <!-- Quick Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xl flex items-center justify-center">
            👑
          </div>
          <div>
            <div class="text-slate-500 font-medium">System Administrators</div>
            <div class="text-xl font-black text-slate-900 font-mono">{{ getCountByRole('Admin') }}</div>
            <div class="text-[10px] text-emerald-600 font-semibold">Full System Access</div>
          </div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 font-bold text-xl flex items-center justify-center">
            🔍
          </div>
          <div>
            <div class="text-slate-500 font-medium">Investigating Officers</div>
            <div class="text-xl font-black text-slate-900 font-mono">{{ getCountByRole('Investigating Officer') }}</div>
            <div class="text-[10px] text-blue-600 font-semibold">Customs & Duty Audit</div>
          </div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-bold text-xl flex items-center justify-center">
            🏭
          </div>
          <div>
            <div class="text-slate-500 font-medium">Operational Operators</div>
            <div class="text-xl font-black text-slate-900 font-mono">{{ getCountByRole('Operator') }}</div>
            <div class="text-[10px] text-amber-600 font-semibold">Warehouse & Trade Entry</div>
          </div>
        </div>
      </div>

      <!-- Employee Directory Table (READ / EDIT / DELETE) -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 class="text-lg font-black text-slate-900">Employee Staff Directory</h3>
            <p class="text-xs text-slate-500">Total Registered Employees: {{ dataService.users().length }}</p>
          </div>

          <!-- Search Filter Input -->
          <div class="w-full sm:w-72">
            <input 
              type="text" 
              [(ngModel)]="searchFilter"
              placeholder="Search by name, email, or department..." 
              class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600">
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th class="p-3.5">ID</th>
                <th class="p-3.5">Employee Name</th>
                <th class="p-3.5">Corporate Email</th>
                <th class="p-3.5">Assigned Role</th>
                <th class="p-3.5">Department</th>
                <th class="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              @for (user of filteredUsers(); track user.id) {
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-3.5 font-mono font-bold text-slate-900">{{ user.id }}</td>
                  <td class="p-3.5">
                    <div class="flex items-center gap-3">
                      <img [src]="user.avatar" [alt]="user.name" class="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm">
                      <div>
                        <div class="font-bold text-slate-900 text-sm">{{ user.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5 font-mono text-slate-700">{{ user.email }}</td>
                  <td class="p-3.5">
                    <span [class]="getRoleBadgeClass(user.role)">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="p-3.5 text-slate-600 font-semibold">{{ user.department }}</td>
                  <td class="p-3.5 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button 
                        (click)="openEditEmployeeModal(user)"
                        class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg border border-slate-300 text-[11px] transition">
                        ✏️ Edit
                      </button>
                      <button 
                        (click)="deleteEmployee(user)"
                        class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg border border-red-200 text-[11px] transition">
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- CREATE / EDIT EMPLOYEE MODAL -->
      @if (showModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div class="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Employee Form</span>
                <h3 class="text-lg font-black text-slate-900">
                  {{ isEditMode() ? 'Edit Employee Profile' : 'Register New Employee' }}
                </h3>
              </div>
              <button (click)="closeModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
            </div>

            <div class="space-y-4 text-xs">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="formName" 
                  placeholder="e.g. Tariqul Islam" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-emerald-600">
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Corporate Email Address</label>
                <input 
                  type="email" 
                  [(ngModel)]="formEmail" 
                  placeholder="name&#64;keyagroupbd.com" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:outline-none focus:border-emerald-600">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Role Type</label>
                  <select 
                    [(ngModel)]="formRole" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-semibold focus:outline-none focus:border-emerald-600">
                    <option value="Admin">Admin</option>
                    <option value="Investigating Officer">Investigating Officer</option>
                    <option value="Operator">Operator</option>
                  </select>
                </div>

                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Department</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formDept" 
                    placeholder="e.g. Export Commercial Desk" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-emerald-600">
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button 
                (click)="closeModal()" 
                class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button 
                (click)="saveEmployee()" 
                class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md">
                {{ isEditMode() ? 'Update Employee' : 'Create Employee' }}
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  `
})
export class RoleManagementComponent {
  dataService = inject(ExportImportDataService);
  
  searchFilter = '';
  showModal = signal(false);
  isEditMode = signal(false);
  editingUserId = signal<string | null>(null);

  // Form Fields
  formName = '';
  formEmail = '';
  formRole: UserRole = 'Operator';
  formDept = '';

  filteredUsers(): UserRoleProfile[] {
    const q = this.searchFilter.toLowerCase().trim();
    if (!q) return this.dataService.users();
    return this.dataService.users().filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) || 
      u.department.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  }

  getCountByRole(role: UserRole): number {
    return this.dataService.users().filter(u => u.role === role).length;
  }

  getRoleBadgeClass(role: UserRole): string {
    if (role === 'Admin') return 'px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-200';
    if (role === 'Investigating Officer') return 'px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-mono text-[11px] font-bold border border-blue-200';
    return 'px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-mono text-[11px] font-bold border border-amber-200';
  }

  openAddEmployeeModal() {
    this.isEditMode.set(false);
    this.editingUserId.set(null);
    this.formName = '';
    this.formEmail = '';
    this.formRole = 'Operator';
    this.formDept = '';
    this.showModal.set(true);
  }

  openEditEmployeeModal(user: UserRoleProfile) {
    this.isEditMode.set(true);
    this.editingUserId.set(user.id);
    this.formName = user.name;
    this.formEmail = user.email;
    this.formRole = user.role;
    this.formDept = user.department;
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveEmployee() {
    if (!this.formName || !this.formEmail) return;

    if (this.isEditMode() && this.editingUserId()) {
      // Update existing employee
      const targetId = this.editingUserId();
      this.dataService.users.update(list => list.map(u => {
        if (u.id === targetId) {
          return {
            ...u,
            name: this.formName,
            email: this.formEmail,
            role: this.formRole,
            department: this.formDept || u.department
          };
        }
        return u;
      }));
    } else {
      // Create new employee
      const newUser: UserRoleProfile = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: this.formName,
        email: this.formEmail,
        role: this.formRole,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        department: this.formDept || 'Keya Group Operations',
        permissions: [this.formRole.toUpperCase()]
      };
      this.dataService.users.update(list => [newUser, ...list]);
    }

    this.closeModal();
  }

  deleteEmployee(user: UserRoleProfile) {
    if (confirm(`Are you sure you want to delete employee "${user.name}" (${user.email})?`)) {
      this.dataService.users.update(list => list.filter(u => u.id !== user.id));
    }
  }
}
