/* # Javascript
## Đề bài:
Tìm số lớn nhất trong mảng.

Cho một mảng các số nguyên, bạn cần tìm ra số lớn nhất trong mảng đó. Trong bài tập này, bạn sẽ viết một hàm để thực hiện việc tìm kiếm số lớn nhất.

### Yêu cầu:
- Viết một hàm JavaScript có tên findLargestNumber để tìm số lớn nhất trong một mảng các số nguyên.
- Nếu mảng rỗng, trả về thông báo "Mảng rỗng".

## Ví dụ:
**Input**: 
- Mảng: [3, 7, 2, 5, 9]

**Output**: 
- Kết quả: Số lớn nhất là: 9

**Giải thích**:
- Trong mảng [3, 7, 2, 5, 9], số lớn nhất là 9

# Playwright
## Đề bài
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 5: Xử lý mouse event
- Click vào ô: "Nhấn hoặc nhấn đúp vào đây!"
- Kiểm tra: số lần nhấn = 1, loại nhấn: đơn, phím kèm theo: không có
- Double click vào ô: "Nhấn hoặc nhấn đúp vào đây!"
- Kiểm tra: số lần nhân = 3, loại nhấn: đúp, phím kèm theo: không có
- Giữ shift và click vào ô: "Nhấn hoặc nhấn đúp vào đây!"
- Kiểm tra: số lần nhấn = 4, loại nhấn: đơn, phím kèm theo: Shift */

// Javascript:
let arr = [3, 7, 2, 5, 9];

function findLargestNumber(arr) {
    if (arr.length === 0) {
        return "Mảng rỗng";
    }
    else {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;

    }
}
console.log("The largest number is: " + findLargestNumber(arr));

// Playwright
import { test, expect } from '@playwright/test';

test('Solution day 5', async ({ page }) => {
    await test.step('Go to page', async () => {
        await page.goto("https://material.playwrightvn.com");
    })

    await test.step('Go to lesson 5: Puzzle drag and drop game', async () => {
        await page.locator('//a[@href="018-mouse.html"]').click();
    })

    await test.step('Click vào ô: "Nhấn hoặc nhấn đúp vào đây!"', async () => {
        await page.locator('//div[@class="click-area"]').click();
        await expect(page.locator('//p[@id="clickCount"]')).toHaveText("Số lần nhấn: 1");
        await expect(page.locator('//p[@id="clickType"]')).toHaveText("Loại nhấn: Đơn");
        await expect(page.locator('//p[@id="modifierKeys"]')).toHaveText("Phím kèm theo: Không có");
    })

    await test.step('Double click vào ô: "Nhấn hoặc nhấn đúp vào đây!"', async () => {
        await page.locator('//div[@class="click-area"]').dblclick();
        await expect(page.locator('//p[@id="clickCount"]')).toHaveText("Số lần nhấn: 3");
        await expect(page.locator('//p[@id="clickType"]')).toHaveText("Loại nhấn: Đúp");
        await expect(page.locator('//p[@id="modifierKeys"]')).toHaveText("Phím kèm theo: Không có");
    })

    await test.step('Giữ shift và click vào ô: "Nhấn hoặc nhấn đúp vào đây!"', async () => {
        await page.locator('//div[@class="click-area"]').click({ modifiers: ['Shift'] });
        await expect(page.locator('//p[@id="clickCount"]')).toHaveText("Số lần nhấn: 4");
        await expect(page.locator('//p[@id="clickType"]')).toHaveText("Loại nhấn: Đơn");
        await expect(page.locator('//p[@id="modifierKeys"]')).toHaveText("Phím kèm theo: Shift");
    })

})

