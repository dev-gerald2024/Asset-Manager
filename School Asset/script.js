document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Filtering Logic (Bulletproof Version) ---
    const controlBars = document.querySelectorAll('.controls-bar');

    controlBars.forEach(controlsBar => {
        const searchInput = controlsBar.querySelector('.search-box input');
        const filterBtns = controlsBar.querySelectorAll('.filter-btn');
        const tableContainer = controlsBar.closest('.table-container');
        
        // SAFETY CHECK: If it can't find the container or input, stop here so we don't break the page
        if (!tableContainer || !searchInput) return;

        const tableBody = tableContainer.querySelector('.asset-table tbody');
        // SAFETY CHECK: Ensure the table body actually exists
        if (!tableBody) return; 

        let currentCategory = 'All';

        function filterTable() {
            const searchTerm = searchInput.value.toLowerCase();
            const rows = tableBody.querySelectorAll('tr');
            
            rows.forEach(row => {
                // Skip the "No items found" placeholder rows
                if (row.cells.length <= 1) return;

                const rowText = row.textContent.toLowerCase();
                let categoryCell = "All"; 
                
                // In our tables, Category is the 3rd column (index 2)
                if (row.cells.length >= 3) {
                    categoryCell = row.cells[2].textContent.trim(); 
                }
                
                const matchesSearch = rowText.includes(searchTerm);
                const matchesCategory = currentCategory === 'All' || categoryCell === currentCategory;

                row.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
            });
        }

        // Listen for typing
        searchInput.addEventListener('input', filterTable);

        // Listen for category button clicks
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    currentCategory = e.target.textContent.trim();
                    filterTable();
                });
            });
        }
    });
    // 2. Add Asset Modal Logic
    const addModal = document.getElementById('addAssetModal');
    const addAssetBtn = document.querySelector('.add-asset-btn');
    const cancelAddBtn = document.getElementById('cancelAddBtn');

    if (addModal && addAssetBtn) {
        addAssetBtn.addEventListener('click', () => addModal.classList.add('active'));
        if (cancelAddBtn) cancelAddBtn.addEventListener('click', () => addModal.classList.remove('active'));
        
        addModal.addEventListener('click', (e) => {
            if (e.target === addModal) addModal.classList.remove('active');
        });
    }

   // 3. Edit Asset Modal Logic
    const editModal = document.getElementById('editAssetModal');
    const closeEditBtn = document.getElementById('closeEditBtn');
    const editBtns = document.querySelectorAll('.edit-btn');

    if (editModal && editBtns.length > 0) {
        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('editEquipId').value = btn.getAttribute('data-id');
                document.getElementById('editResourceName').value = btn.getAttribute('data-name');
                document.getElementById('editCategory').value = btn.getAttribute('data-category');
                document.getElementById('editStatus').value = btn.getAttribute('data-status');
                // Updated to fetch data-department and target editDepartment
                document.getElementById('editDepartment').value = btn.getAttribute('data-department');
                
                editModal.classList.add('active');
            });
        });

        if (closeEditBtn) closeEditBtn.addEventListener('click', () => editModal.classList.remove('active'));
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) editModal.classList.remove('active');
        });
    }

    // 4. Real-time Dashboard Clock Logic
    const liveClock = document.getElementById('liveClock');
    
    if (liveClock) {
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US'); 
            liveClock.innerHTML = `↗ Last updated: ${timeString}`;
        }
        updateTime();
        setInterval(updateTime, 1000);
    }
});