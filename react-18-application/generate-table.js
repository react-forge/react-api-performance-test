import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON data
const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dist', 'stats.json'), 'utf-8')
);

// Extract module data and flatten it
function extractModules(node, modules = [], parentPath = '') {
  if (node.uid) {
    // This is a leaf node (actual module)
    const fullPath = parentPath + '/' + node.name;
    modules.push({
      name: fullPath,
      uid: node.uid,
      ...node
    });
  }
  
  if (node.children) {
    for (const child of node.children) {
      const currentPath = node.name === 'root' ? '' : parentPath + '/' + node.name;
      extractModules(child, modules, currentPath);
    }
  }
  
  return modules;
}

const modules = extractModules(jsonData.tree);

// Get nodeParts to find actual size data
const nodeParts = jsonData.nodeParts || {};

// Create table data
const tableData = modules.map(mod => {
  const data = nodeParts[mod.uid] || {};
  return {
    name: mod.name,
    renderedLength: data.renderedLength || 0,
    gzipLength: data.gzipLength || 0,
    brotliLength: data.brotliLength || 0,
  };
}).filter(item => item.renderedLength > 0);

// Sort by rendered size (descending)
tableData.sort((a, b) => b.renderedLength - a.renderedLength);

// Format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Calculate percentages
const totalSize = tableData.reduce((sum, item) => sum + item.renderedLength, 0);

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bundle Analysis - Table View</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
    }
    
    h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .summary {
      display: flex;
      gap: 30px;
      margin-top: 20px;
      font-size: 14px;
    }
    
    .summary-item {
      background: rgba(255,255,255,0.2);
      padding: 10px 20px;
      border-radius: 6px;
    }
    
    .summary-label {
      opacity: 0.9;
      margin-bottom: 5px;
    }
    
    .summary-value {
      font-size: 20px;
      font-weight: bold;
    }
    
    .table-container {
      overflow-x: auto;
      padding: 20px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    
    thead {
      background: #f8f9fa;
      position: sticky;
      top: 0;
    }
    
    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: #495057;
      border-bottom: 2px solid #dee2e6;
      cursor: pointer;
      user-select: none;
    }
    
    th:hover {
      background: #e9ecef;
    }
    
    th.sortable::after {
      content: ' ⇅';
      opacity: 0.3;
    }
    
    th.sorted-asc::after {
      content: ' ↑';
      opacity: 1;
    }
    
    th.sorted-desc::after {
      content: ' ↓';
      opacity: 1;
    }
    
    td {
      padding: 12px 16px;
      border-bottom: 1px solid #dee2e6;
    }
    
    tr:hover {
      background: #f8f9fa;
    }
    
    .module-name {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 13px;
      color: #495057;
      word-break: break-all;
    }
    
    .npm-package {
      color: #667eea;
      font-weight: 500;
    }
    
    .size-cell {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    
    .percent-bar {
      width: 100%;
      height: 20px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    
    .percent-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }
    
    .percent-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 11px;
      font-weight: 600;
      color: #495057;
    }
    
    .search-box {
      margin: 20px 20px 0;
      padding: 0 20px 20px;
      border-bottom: 1px solid #dee2e6;
    }
    
    input[type="text"] {
      width: 100%;
      padding: 10px 15px;
      border: 2px solid #dee2e6;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    
    input[type="text"]:focus {
      outline: none;
      border-color: #667eea;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Bundle Analysis - Table View</h1>
      <div class="summary">
        <div class="summary-item">
          <div class="summary-label">Total Modules</div>
          <div class="summary-value">${tableData.length}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Total Size</div>
          <div class="summary-value">${formatBytes(totalSize)}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Gzipped</div>
          <div class="summary-value">${formatBytes(tableData.reduce((sum, item) => sum + item.gzipLength, 0))}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Brotli</div>
          <div class="summary-value">${formatBytes(tableData.reduce((sum, item) => sum + item.brotliLength, 0))}</div>
        </div>
      </div>
    </div>
    
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="Search modules... (e.g., 'react', 'node_modules', '.jsx')">
    </div>
    
    <div class="table-container">
      <table id="dataTable">
        <thead>
          <tr>
            <th class="sortable" data-sort="name">Module Name</th>
            <th class="sortable sorted-desc" data-sort="renderedLength">Rendered Size</th>
            <th class="sortable" data-sort="gzipLength">Gzip Size</th>
            <th class="sortable" data-sort="brotliLength">Brotli Size</th>
            <th>% of Total</th>
          </tr>
        </thead>
        <tbody>
          ${tableData.map(item => {
            const percent = ((item.renderedLength / totalSize) * 100).toFixed(2);
            const isNpmPackage = item.name.includes('node_modules');
            const displayName = item.name.replace(/^\/+/, '');
            
            return `
            <tr data-name="${displayName.toLowerCase()}">
              <td><div class="module-name ${isNpmPackage ? 'npm-package' : ''}">${displayName}</div></td>
              <td class="size-cell">${formatBytes(item.renderedLength)}</td>
              <td class="size-cell">${formatBytes(item.gzipLength)}</td>
              <td class="size-cell">${formatBytes(item.brotliLength)}</td>
              <td>
                <div class="percent-bar">
                  <div class="percent-fill" style="width: ${percent}%"></div>
                  <div class="percent-text">${percent}%</div>
                </div>
              </td>
            </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>
  
  <script>
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const tableRows = document.querySelectorAll('#dataTable tbody tr');
    
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      tableRows.forEach(row => {
        const name = row.getAttribute('data-name');
        if (name.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
    
    // Sorting functionality
    let currentSort = { column: 'renderedLength', direction: 'desc' };
    
    const parseSize = (sizeStr) => {
      const match = sizeStr.match(/([\\d.]+)\\s*(\\w+)/);
      if (!match) return 0;
      const value = parseFloat(match[1]);
      const unit = match[2];
      const multipliers = { 'B': 1, 'KB': 1024, 'MB': 1024 * 1024 };
      return value * (multipliers[unit] || 1);
    };
    
    document.querySelectorAll('th.sortable').forEach(header => {
      header.addEventListener('click', () => {
        const column = header.getAttribute('data-sort');
        const tbody = document.querySelector('#dataTable tbody');
        const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => row.style.display !== 'none');
        
        // Toggle direction
        if (currentSort.column === column) {
          currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          currentSort.column = column;
          currentSort.direction = column === 'name' ? 'asc' : 'desc';
        }
        
        // Update header classes
        document.querySelectorAll('th.sortable').forEach(h => {
          h.classList.remove('sorted-asc', 'sorted-desc');
        });
        header.classList.add('sorted-' + currentSort.direction);
        
        // Sort rows
        rows.sort((a, b) => {
          let aVal, bVal;
          
          if (column === 'name') {
            aVal = a.getAttribute('data-name');
            bVal = b.getAttribute('data-name');
            return currentSort.direction === 'asc' 
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          } else {
            const colIndex = Array.from(header.parentElement.children).indexOf(header);
            aVal = parseSize(a.children[colIndex].textContent);
            bVal = parseSize(b.children[colIndex].textContent);
            return currentSort.direction === 'asc' ? aVal - bVal : bVal - aVal;
          }
        });
        
        // Re-append sorted rows
        rows.forEach(row => tbody.appendChild(row));
      });
    });
  </script>
</body>
</html>`;

// Write the HTML file
fs.writeFileSync(path.join(__dirname, 'dist', 'stats-table.html'), html);

console.log('✅ Table visualization generated: dist/stats-table.html');
