/* # Javascript
## Đề bài:
Quản lý danh sách sản phẩm bằng Object.

Trong bài tập này, bạn sẽ tạo một hệ thống quản lý danh sách sản phẩm bằng cách sử dụng đối tượng (Object). Mỗi sản phẩm sẽ có tên và giá, và bạn sẽ viết các hàm để thêm sản phẩm, xoá sản phẩm, và tính tổng giá trị của tất cả các sản phẩm trong danh sách.

### Yêu cầu:
1. Tạo một object `productList` để lưu trữ danh sách sản phẩm.
2. Viết hàm `addProduct(name, price)` để thêm sản phẩm vào danh sách. Sản phẩm sẽ có thuộc tính `name` (tên) và `price` (giá).
3. Viết hàm `removeProduct(name)` để xoá một sản phẩm khỏi danh sách theo tên sản phẩm.
4. Viết hàm `calculateTotal()` để tính tổng giá của tất cả sản phẩm trong danh sách.

## Ví dụ:
**Input**: 
- Thêm sản phẩm: `"Táo"`, giá: `5000`
- Thêm sản phẩm: `"Chuối"`, giá: `3000`
- Xoá sản phẩm: `"Chuối"`
- Tính tổng giá trị sản phẩm.

**Output**: 
- Sản phẩm trong danh sách: `Táo: 5000`
- Tổng giá trị sản phẩm: `5000`

**Giải thích**:
- Đầu tiên, thêm sản phẩm `"Táo"` với giá `5000`, sau đó thêm `"Chuối"` với giá `3000`.
- Sau đó, xóa `"Chuối"` khỏi danh sách.
- Cuối cùng, tính tổng giá của các sản phẩm trong danh sách còn lại.

# Playwright
## Đề bài
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 5: Puzzle drag and drop game
- Kéo thả các ô 1, 2, 3, 4 vào ô tương ứng.
- Verify message trong alert xuất hiện là: "Congratulations! You completed the puzzle." */

//Javascript

let productList = {
    products: [],
    addProduct(name, price) {
        this.products.push({ name, price });
    },
};

function removeProduct(name) {
    this.products = this.products.filter(product => product.name !== name)
};

function calculateTotal() {
    return this.products.reduce((total, product) => total + product.price, 0);
}

productList.addProduct('Táo', 5000);
productList.addProduct('Chuối', 3000);

console.log("Danh sách sản phẩm:");
console.log(productList.products);

removeProduct.call(productList, 'Chuối');

console.log("Danh sách sản phẩm sau khi xóa Chuối:");
console.log(productList.products);

calculateTotal.call(productList);

console.log("Tổng giá trị của tất cả sản phẩm:");
console.log(calculateTotal.call(productList));

//Playwright
import { test, expect } from '@playwright/test'

test('Drag and Drop', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');

    await page.getByText('Bài học 5: Puzzle drag and drop game').click();

    page.on('dialog', async dialog => {
        dialog.accept();

        expect(dialog.message()).toBe("Congratulations! You completed the puzzle.");
    });
    await page.locator('//*[@id="piece-1"]').dragTo((page.locator('//div[@data-piece="1"]')));
    await page.locator('//*[@id="piece-2"]').dragTo((page.locator('//div[@data-piece="2"]')));
    await page.locator('//*[@id="piece-3"]').dragTo((page.locator('//div[@data-piece="3"]')));
    await page.locator('//*[@id="piece-4"]').dragTo((page.locator('//div[@data-piece="4"]')));
});