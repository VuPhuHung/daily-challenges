/* # Javascript
## Đề bài:
Số nguyên tố là một số tự nhiên lớn hơn 1 và chỉ chia hết cho 1 và chính nó. 
Trong bài tập này, bạn sẽ viết một hàm để kiểm tra xem một số có phải là số nguyên tố hay không.

Một số nguyên tố là số chỉ có đúng hai ước là 1 và chính nó. 
Để kiểm tra một số n có phải số nguyên tố hay không, bạn cần kiểm tra xem n có chia hết cho bất kỳ số nào từ 2 đến căn bậc hai của n không. Nếu có, nó không phải số nguyên tố

### Yêu cầu:
- Viết một hàm JavaScript có tên `isPrime` để kiểm tra xem một số có phải là số nguyên tố không.
- Nếu số là số nguyên tố, in ra "Số này là số nguyên tố". Nếu không phải, in ra "Số này không phải là số nguyên tố".

## Ví dụ:

**Input**: 
- Số: `7`

**Output**: 
- Kết quả: `"Số này là số nguyên tố"`

**Giải thích**: 
Số `7` chỉ chia hết cho `1` và `7`, do đó nó là số nguyên tố.

## Ví dụ khác:

**Input**: 
- Số: `10`

**Output**: 
- Kết quả: `"Số này không phải là số nguyên tố"`

**Giải thích**: 
Số `10` chia hết cho `1`, `2`, `5`, và `10`, do đó nó không phải là số nguyên tố.

### Gợi ý:
Bạn có thể sử dụng vòng lặp để kiểm tra số đó có chia hết cho bất kỳ số nào từ 2 đến căn bậc hai của số đó hay không. 
Nếu có, thì đó không phải là số nguyên tố.

# Playwright
## Đề bài
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 2: Product page
- Thêm vào giỏ hàng 2 sản phẩm 1.
- Thêm vào giỏ hàng 2 sản phẩm 2.
- Thêm vào giỏ hàng 3 sản phẩm 3.

- Kiểm số lượng sản phẩm đúng.
- (Nâng cao) Kiểm tra tổng tiền sản phẩm đúng (tổng tiền = tổng (số lượng * đơn giá)) */

// Javascript
function isPrime(number){
    if (number < 2) {
        return "Số này không phải là số nguyên tố";
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return "Số này không phải là số nguyên tố";
        }
    }
    return "Số này là số nguyên tố";
}

console.log(isPrime(7));
console.log(isPrime(100));

// Playwright
import {test, expect} from '@playwright/test';

test('Daily-Challenges-17-09-2024', async ({page}) => {
    await test.step('Go to https://material.playwrightvn.com/', async () => {
        await page.goto('https://material.playwrightvn.com/');
    });

    await test.step('Click: Product page', async () => {
        await page.locator('//a[@href="02-xpath-product-page.html"]').click();
    });

    await test.step('Add product 1 to cart', async () => {
        await page.locator('//button[@data-product-id="1"]').click({clickCount: 2});
    });

    await test.step('Add product 2 to cart', async () => {
        await page.locator('//button[@data-product-id="2"]').click({clickCount: 2});
    });

    await test.step('Add product 3 to cart', async () => {  
        await page.locator('//button[@data-product-id="3"]').click({clickCount: 3});
    });

    await test.step('Check number of product 1', async () => {
        const numberOfProduct1 = await page.locator('//*[@id="cart-items"]/tr[1]/td[3]').textContent();
        expect(numberOfProduct1).toBe("2");
    });

    await test.step('Check number of product 2', async () => {
        const numberOfProduct2 = await page.locator('//*[@id="cart-items"]/tr[2]/td[3]').textContent();
        expect(numberOfProduct2).toBe("2");
    });

    await test.step('Check number of product 3', async () => {
        const numberOfProduct3 = await page.locator('//*[@id="cart-items"]/tr[3]/td[3]').textContent();
        expect(numberOfProduct3).toBe("3");
    });

    await test.step('Check total price', async () => {
       const totalPrice = await page.locator('//*[@class="total-price"]').textContent();
       const numberOfProduct1 = parseInt(await page.locator('//*[@id="cart-items"]/tr[1]/td[3]').textContent() || '0');
       const numberOfProduct2 = parseInt(await page.locator('//*[@id="cart-items"]/tr[2]/td[3]').textContent() || '0');
       const numberOfProduct3 = parseInt(await page.locator('//*[@id="cart-items"]/tr[3]/td[3]').textContent() || '0');

       const priceOfProduct1 = 10.00;
       const priceOfProduct2 = 20.00;
       const priceOfProduct3 = 30.00;

       const expectedTotalPrice = (numberOfProduct1 * priceOfProduct1) + (numberOfProduct2 * priceOfProduct2) + (numberOfProduct3 * priceOfProduct3);

       expect(totalPrice).toBe("$"+`${expectedTotalPrice}.00`);
    });

});
