/* # Javascript
## Đề bài:
Việc hiển thị ngày tháng hiện tại là một yêu cầu thường gặp trong các ứng dụng. Trong bài tập này, bạn sẽ viết một hàm để lấy ngày hiện tại và hiển thị nó theo định dạng dd/mm/yyyy.

### Yêu cầu:
- Viết một hàm JavaScript có tên `getCurrentDate` để lấy ngày hiện tại và định dạng nó theo kiểu `dd/mm/yyyy`.
- Hàm sẽ trả về ngày, tháng, và năm hiện tại, đảm bảo ngày và tháng luôn có 2 chữ số (ví dụ: ngày 1 thì phải hiển thị là 01).

## Ví dụ:
**Output 1**:
Output (với ngày hiện tại là 14 tháng 9, năm 2024):
"Ngày hiện tại là: 14/09/2024"

**Output 2**:
Output khác (với ngày hiện tại là 5 tháng 1, năm 2024):
"Ngày hiện tại là: 05/01/2024"

# Playwright
- Cho trang web sau: https://demo.playwright.dev/api-mocking/
- Sử dụng kĩ thuật mocking trong Playwright để custom danh sách các loại quả trả về thành: ["Cam", "Táo", "Xoài"]
 */

// Javascript

function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

console.log(getCurrentDate());

// Playwright
import { test, expect } from "@playwright/test";
test("Mock API fruits", async ({ request }) => {
    const response = await request.get("https://demo.playwright.dev/api-mocking");
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toContain("Orange");
    expect(responseBody).toContain("Apple");
    expect(responseBody).toContain("Mango");
});
