import './style.css';

/* ==========================================
   1. STATE, PERSISTENCE, AND DATA
   ========================================== */
let currentUser = JSON.parse(localStorage.getItem('cz_user')) || null;
let tasks = JSON.parse(localStorage.getItem('cz_tasks')) || [
  { id: 'CZ-701', title: 'Update Documentation', assignee: 'Sarah Lin', category: 'Documentation', status: 'In Progress', priority: 'Medium', dueDate: '2023-10-26' },
  { id: 'CZ-702', title: 'Fix Login Auth', assignee: 'Raj Patel', category: 'Development', status: 'Pending', priority: 'High', dueDate: '2023-10-26' },
  { id: 'CZ-703', title: 'Quarterly Review', assignee: 'Michelle O.', category: 'Management', status: 'Completed', priority: 'Low', dueDate: '2023-10-20' }
];

const saveState = () => {
  localStorage.setItem('cz_user', JSON.stringify(currentUser));
  localStorage.setItem('cz_tasks', JSON.stringify(tasks));
};

/* ==========================================
   2. NAVIGATION ENGINE (SPA)
   ========================================== */
window.navigate = (view) => {
  const app = document.getElementById('app');
  app.style.opacity = '0'; 

  setTimeout(() => {
    if (!currentUser && view !== 'login' && view !== 'signup') {
      renderLogin();
    } 
    else if (currentUser && !currentUser.onboardingComplete && view !== 'onboarding') {
      renderOnboarding();
    }
    else {
      if (view === 'login') renderLogin();
      else if (view === 'signup') renderSignUp();
      else if (view === 'onboarding') renderOnboarding();
      else if (view === 'newTask') renderLayout('newTask');
      else renderLayout(view);
    }
    app.style.opacity = '1';
  }, 200);
};

/* ==========================================
   3.ACCESS VIEWS
   ========================================== */
const renderLogin = () => {
  document.getElementById('app').innerHTML = `
    <div class="access-container">
      <div class="access-card">
        <div class="sidebar-logo" style="text-align:center; margin-bottom:24px;">💼 CRUDZASO</div>
        <h2 class="access-title">Welcome back</h2>
        <p style="text-align:center; color:gray; margin-bottom:20px; font-size:14px;">Enter your credentials to access the platform</p>
        <form id="l-form" class="access-form">
          <div class="input-group"><label>Email or username</label><input type="email" id="l-email" required placeholder="student@university.edu"></div>
          <div class="input-group"><label>Password</label><input type="password" required placeholder="••••••••"></div>
          <button type="submit" class="btn-submit">Sign in</button>
        </form>
        <p class="access-footer">Don't have an account? <span class="link" onclick="navigate('signup')">Register</span></p>
      </div>
    </div>`;

  document.getElementById('l-form').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('l-email').value;
    if (currentUser && email === currentUser.email) {
      navigate('dashboard');
    } else {
      alert("Credenciales no coinciden. Intenta registrarte.");
    }
  };
};

const renderSignUp = () => {
  document.getElementById('app').innerHTML = `
    <div class="access-container">
      <div class="access-card">
        <h2 class="access-title">Create account</h2>
        <p style="text-align:center; color:gray; margin-bottom:20px; font-size:14px;">Join the academic performance platform today</p>
        <form id="s-form" class="access-form">
          <div class="input-group"><label>Full Name</label><input type="text" id="s-name" required placeholder="John Doe"></div>
          <div class="input-group"><label>Email address</label><input type="email" id="s-email" required placeholder="student@university.edu"></div>
          <div class="input-group"><label>Password</label><input type="password" id="s-pw" required placeholder="Create a password"></div>
          <button type="submit" class="btn-submit">Register</button>
        </form>
        <p class="access-footer">Already have an account? <span class="link" onclick="navigate('login')">Sign in</span></p>
      </div>
    </div>`;

  document.getElementById('s-form').onsubmit = (e) => {
    e.preventDefault();
    currentUser = { 
      name: document.getElementById('s-name').value,
      email: document.getElementById('s-email').value, 
      onboardingComplete: false 
    };
    saveState();
    navigate('onboarding');
  };
};

const renderOnboarding = () => {
  document.getElementById('app').innerHTML = `
    <div class="access-container">
      <div class="access-card">
        <h2 class="access-title">Configura tu Perfil</h2>
        <form id="o-form" class="access-form">
          <div class="photo-setup">
            <div class="preview-box">
              <img id="o-preview" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
              <label for="f-up" class="upload-icon">📸</label>
            </div>
            <input type="file" id="f-up" accept="image/*" hidden>
          </div>
          <div class="input-group"><label>Cargo / Rol</label><input type="text" id="o-role" required placeholder="Ej: Product Designer"></div>
          <div class="input-group"><label>ID Empleado</label><input type="text" id="o-id" required placeholder="CZ-882103"></div>
          <button type="submit" class="btn-submit">Finalizar Registro</button>
        </form>
      </div>
    </div>`;

  document.getElementById('f-up').onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (ev) => document.getElementById('o-preview').src = ev.target.result;
    reader.readAsDataURL(e.target.files[0]);
  };

  document.getElementById('o-form').onsubmit = (e) => {
    e.preventDefault();
    currentUser = { 
      ...currentUser, 
      role: document.getElementById('o-role').value, 
      id: document.getElementById('o-id').value,
      avatar: document.getElementById('o-preview').src, 
      onboardingComplete: true,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    saveState();
    navigate('dashboard');
  };
};

/* ==========================================
   4. MAIN LAYOUT AND COMPONENTS
   ========================================== */
const renderLayout = (view) => {
  document.getElementById('app').innerHTML = `
    <div class="layout-grid">
      <aside class="sidebar">
        <div class="sidebar-logo">💼 CRUDZASO</div>
        <nav class="sidebar-nav">
          <button class="nav-btn ${view === 'dashboard' ? 'active' : ''}" onclick="navigate('dashboard')">📊 Dashboard</button>
          <button class="nav-btn ${view === 'tasks' ? 'active' : ''}" onclick="navigate('tasks')">✅ My Tasks</button>
          <button class="nav-btn ${view === 'profile' ? 'active' : ''}" onclick="navigate('profile')">👤 Profile</button>
        </nav>
        <div class="sidebar-footer">
          <button class="logout-btn" onclick="logout()">🚪 Logout</button>
        </div>
      </aside>
      <main class="main-content">
        <header class="topbar">
          <div class="breadcrumb">🏠 > ${view.toUpperCase()}</div>
          <div class="profile-pill" onclick="navigate('profile')" style="cursor:pointer; display:flex; align-items:center; gap:12px;">
            <div class="profile-info" style="text-align:right;">
                <p style="margin:0; font-size:14px; font-weight:600;">${currentUser.name}</p>
                <small style="display:block; color:gray; font-size:12px;">${currentUser.role}</small>
            </div>
            <img src="${currentUser.avatar}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border: 1px solid #ddd; flex-shrink:0;">
          </div>
        </header>
        <div id="dynamic-content" class="view-content"></div>
      </main>
    </div>`;

  const container = document.getElementById('dynamic-content');
  if (view === 'tasks') renderMyTasks(container);
  else if (view === 'profile') renderProfile(container);
  else if (view === 'newTask') renderCreateTask(container);
  else renderDashboard(container);
};

/* ==========================================
   5. INTERNAL VIEWS
   ========================================== */
const renderDashboard = (container) => {
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  container.innerHTML = `
    <div class="header-row">
        <div>
            <h1>Task Manager</h1>
            <p style="color:gray;">Overview of your current academic performance tasks.</p>
        </div>
        <button class="btn-primary" onclick="navigate('newTask')">+ New Task</button>
    </div>
    <div class="stats-grid">
      <div class="stat-card"><h3>Total Tasks</h3><div class="value">${tasks.length}</div><small style="color:green">↑ 12% from last week</small></div>
      <div class="stat-card"><h3>Completed</h3><div class="value">${completed}</div><small style="color:green">✓ On track</small></div>
      <div class="stat-card"><h3>Pending</h3><div class="value">${pending}</div><small style="color:red">⚠ ${pending} High Priority</small></div>
      <div class="stat-card"><h3>Overall Progress</h3><div class="value">${progress}%</div><small style="color:blue">Keep it up!</small></div>
    </div>
    <div class="table-container">${renderTableTemplate(tasks)}</div>`;
};

const renderMyTasks = (container) => {
  container.innerHTML = `
    <div class="header-row">
        <div>
            <h1>Task Management</h1>
            <p style="color:gray;">View, edit, and organize all academic tasks in one place.</p>
        </div>
        <button class="btn-primary" onclick="navigate('newTask')">+ New Task</button>
    </div>
    <div class="table-container">${renderTableTemplate(tasks)}</div>`;
};

const renderCreateTask = (container) => {
    container.innerHTML = `
    <div class="header-row">
        <div onclick="navigate('tasks')" style="cursor:pointer; color:var(--primary); font-weight:600;">← Back to Tasks</div>
    </div>
    <h1 style="margin-bottom:20px;">Create New Task</h1>
    <div class="access-card" style="max-width:100%; border-radius:12px;">
        <form id="task-form">
            <div class="input-group">
                <label>Task Title <span style="color:red">*</span></label>
                <input type="text" id="t-title" required placeholder="e.g., Complete Quarter 3 Report">
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div class="input-group">
                    <label>Category</label>
                    <select id="t-category" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);">
                        <option>Development</option>
                        <option>Mathematics</option>
                        <option>Design</option>
                        <option>Management</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Priority</label>
                    <select id="t-priority" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div class="input-group">
                    <label>Status</label>
                    <select id="t-status" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);">
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Due Date</label>
                    <input type="date" id="t-date" required>
                </div>
            </div>
            <div class="input-group">
                <label>Description</label>
                <textarea id="t-desc" rows="4" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);" placeholder="Add details about this task..."></textarea>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px;">
                <button type="button" class="nav-btn" style="width:auto;" onclick="navigate('tasks')">Cancel</button>
                <button type="submit" class="btn-primary">💾 Save Task</button>
            </div>
        </form>
    </div>`;

    document.getElementById('task-form').onsubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: `CZ-${Math.floor(100 + Math.random() * 900)}`,
            title: document.getElementById('t-title').value,
            assignee: currentUser.name,
            category: document.getElementById('t-category').value,
            status: document.getElementById('t-status').value,
            priority: document.getElementById('t-priority').value,
            dueDate: document.getElementById('t-date').value
        };
        tasks.push(newTask);
        saveState();
        navigate('tasks');
    };
};

const renderProfile = (container) => {
  container.innerHTML = `
    <h1 class="view-title" style="margin-bottom:30px;">My Profile</h1>
    <div class="profile-flex-wrapper">
      <div class="identity-card">
        <div class="avatar-header"></div>
        <div class="identity-body">
            <img src="${currentUser.avatar}" class="large-avatar" style="width:120px; height:120px; border-radius:50%; object-fit:cover; margin-top:-60px; border:4px solid white;">
            <h2>${currentUser.name}</h2>
            <p style="color:var(--primary); font-weight:700;">${currentUser.role}</p>
            <div style="background:#eff6ff; color:var(--primary); display:inline-block; padding:4px 12px; border-radius:20px; font-size:12px; margin-top:10px;">User Account</div>
        </div>
        <div style="margin-top:20px; border-top:1px solid var(--border); padding-top:20px;">
            <div style="font-size:24px; font-weight:800;">${tasks.length}</div>
            <div style="color:gray; font-size:12px;">Tasks</div>
        </div>
      </div>
      <div class="details-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3>Personal Information</h3>
            <button class="nav-btn" style="width:auto; font-size:12px; border:1px solid var(--border);">Edit Profile</button>
        </div>
        <div class="details-grid">
          <div class="item"><label>Full Name</label><p>${currentUser.name}</p></div>
          <div class="item"><label>Employee ID</label><p>${currentUser.id}</p></div>
          <div class="item"><label>Email</label><p>${currentUser.email}</p></div>
          <div class="item"><label>Join Date</label><p>${currentUser.joinDate}</p></div>
        </div>
      </div>
    </div>`;
};

const renderTableTemplate = (data) => `
  <table class="my-tasks-table">
    <thead><tr><th>TASK NAME</th><th>ASSIGNEE</th><th>STATUS</th><th>PRIORITY</th><th>DUE DATE</th></tr></thead>
    <tbody>
      ${data.map(t => `
        <tr>
          <td><b>${t.title}</b><br><small style="color:gray">${t.id}</small></td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
                <img src="https://ui-avatars.com/api/?name=${t.assignee}&background=random" style="width:24px; height:24px; border-radius:50%; object-fit:cover;">
                ${t.assignee}
            </div>
          </td>
          <td><span class="badge-${t.status.toLowerCase().replace(/\s+/g, '')}">${t.status}</span></td>
          <td><span class="dot dot-${t.priority.toLowerCase()}"></span> ${t.priority}</td>
          <td>${t.dueDate}</td>
        </tr>`).join('')}
    </tbody>
  </table>`;

/* ==========================================
   6. LOGOUT AND STARTUP
   ========================================== */
window.logout = () => {
  if (confirm("Are you sure you want to sign out?")) {
    localStorage.removeItem('cz_user');
    currentUser = null;
    navigate('login');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  currentUser ? navigate('dashboard') : navigate('login');
});