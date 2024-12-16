// # Javascript
// ## Đề bài:
// Viết một hàm để tính tiền tip dựa trên tổng hóa đơn và tỷ lệ phần trăm tip.

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên `calculateTip` có 2 tham số: tổng hóa đơn và tỷ lệ tip(%) để tính tiền tip.
// ## Ví dụ:
// **Input**:
// - Tổng hóa đơn: 100
// - Tỷ lệ tip: 15%

// **Output**:
// - Tiền tip: 15


// # Playwright
// - Cho trang web sau: https://material.playwrightvn.com/021-import-export.html
// - Thực hiện thao tác:
//     - Tìm kiếm học sinh theo lớp: A4
//     - Verify chỉ có 1 học sinh học lớp A4
//     - Xóa nội dung tìm kiếm.
//     - Verify tất cả các học sinh xuất hiện.


//Javascript:
function calculateTip(totalBill, tipPercentage) {
    return totalBill * (tipPercentage / 100);
}

// Ví dụ sử dụng
const totalBill = 100;
const tipPercentage = 15;
const tip = calculateTip(totalBill, tipPercentage);
console.log(`Tip: $${tip}`); // Output: Tip: $15

// Playwright:
import { test, expect } from '@playwright/test';
test('2024-09 day 26', async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/021-import-export.html");

    // Filter by class A4
    await page.selectOption('#filterCriteria', 'Lớp');
    await page.fill("#searchInput", 'A4');
    await page.click("#searchButton");
    // Verify there is only 1 visible row, which is class *A4

    let visibleCount = 0
    let rows = await page.locator('#studentTable tbody tr').all();
    for (const row of rows) {
        if (await row.isVisible()) {
            const classCell = row.locator('td').nth(2);
            await expect(classCell).toContainText('A4');
            visibleCount++;
        }
    }

    expect(visibleCount).toBe(1);

    // Clear the filter
    await page.fill("#searchInput", '');
    await page.click("#searchButton");

    // Verify there are 5 visible rows
    visibleCount = 0
    rows = await page.locator('#studentTable tbody tr').all();
    for (const row of rows) {
        if (await row.isVisible()) {
            
            visibleCount++;
        }
    }
    expect(visibleCount).toBe(5);
});


