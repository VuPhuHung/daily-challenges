/* # Javascript
## Đề bài:
Tuổi của một người được tính dựa trên năm sinh của họ và năm hiện tại. Trong bài tập này, bạn sẽ viết một hàm để tính tuổi dựa trên năm sinh được nhập vào. Biết công thức tính tuổi:
```
Tuổi = Năm hiện tại - Năm sinh
```

### Yêu cầu:
- Viết một hàm JavaScript có tên `calculateAge` để tính số tuổi của một người dựa trên năm sinh của họ.
- In ra số tuổi tương ứng với năm hiện tại.
- Nếu năm sinh lớn hơn năm hiện tại, in ra một thông báo lỗi "Năm sinh không hợp lệ."

## Ví dụ:
**Input**:
- Năm sinh: `1990`

**Output**: 
- Kết quả: `Tuổi của bạn là: 34`

**Giải thích**: 
Năm hiện tại là 2024, tuổi của người sinh năm 1990 sẽ là 2024 - 1990 = 34 tuổi.

## Ví dụ khác:
- Năm sinh: `2025`

**Output**:
- Kết quả: `Năm sinh không hợp lệ`

**Giải thích**:
Vì năm sinh không thể lớn hơn năm hiện tại (2024), nên cần trả về thông báo lỗi.

### Gợi ý:
Bạn có thể lấy năm hiện tại bằng cách sử dụng đối tượng `Date` trong JavaScript.

# Playwright
## Đề bài
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 3: Todo page
- Thêm vào todo có nội dung: Xin chào, đây là bài thực hành ngày 18 tháng 9
- Verify chỉ có 1 Todo duy nhất được add vào.
- Sửa nội dung Todo: Xin chào, đây là bài thực hành ngày 18 tháng 9 - phiên bản đã chỉnh sửa
- Verify nội dung đã được chỉnh sửa
- Xoá Todo
- Verify Todo đã được xoá. */

// Javascript
function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear()
    if (birthYear > currentYear) {
        throw new Error('Năm sinh không hợp lệ')
    }
    else {
        const age = currentYear - birthYear
        console.log(`Tuổi của bạn là: ${age}`)
    }
}

calculateAge(1995);

// Playwright
import { test, expect } from '@playwright/test';

test('Todo Page', async ({ page }) => {
    await test.step("Go to page", async () => {
        await page.goto('https://material.playwrightvn.com/');
    });

    test.step("Click Bài học 3: Todo page", async () => {
        await page.locator('//a[@href="03-xpath-todo-list.html"]').click();
    });

    await test.step("Add todo: Xin chào, đây là bài thực hành ngày 18 tháng 9", async () => {
        await page.locator('//input[@id="new-task"]').fill("Xin chào, đây là bài thực hành ngày 18 tháng 9");
        await page.locator('//button[@id="add-task"]').click();
    });

    await expect(page.locator('//ul[@id="task-list"]')).toHaveCount(1);
    
    //Edit on alert popup
    page.once('dialog', async dialog => {
        dialog.accept('Xin chào, đây là bài thực hành ngày 18 tháng 9 - phiên bản đã chỉnh sửa');
    });
    await test.step("Edit todo", async () => {
        await page.locator('//button[@onclick="editTask(0)"]').click();
    });

    await test.step("Verify edited todo", async () => {
        await expect(page.locator('//span[text()="Xin chào, đây là bài thực hành ngày 18 tháng 9 - phiên bản đã chỉnh sửa"]')).toBeVisible();
    });

    //Delete on alert popup
    page.once('dialog', async dialog => {
        dialog.accept();
    });
    await test.step("Delete todo", async () => {
        await page.locator('//button[@onclick="deleteTask(0)"]').click();
    });

    await test.step("Verify deleted todo", async () => {
        await expect(page.locator('//span[text()="Xin chào, đây là bài thực hành ngày 18 tháng 9 - phiên bản đã chỉnh sửa"]')).not.toBeVisible();
    });
});

