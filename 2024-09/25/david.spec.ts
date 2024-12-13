// # Javascript
// ## Đề bài:
// Cho một chuỗi bất kỳ, có thể chứa các khoảng trắng ở đầu, ở cuối hoặc giữa các từ. Nhiệm vụ của bạn là viết một hàm để xóa tất cả các khoảng trắng dư thừa, giữ lại chỉ một khoảng trắng giữa các từ, và đảm bảo không có khoảng trắng ở đầu hoặc cuối chuỗi.

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên `trimSpaces` để loại bỏ tất cả các khoảng trắng dư thừa trong chuỗi.
// - Đảm bảo giữa các từ chỉ có một khoảng trắng.
// - Loại bỏ tất cả khoảng trắng ở đầu và cuối chuỗi.

// ## Ví dụ:

// **Input 1**:
// ```javascript
// "   Xin   chào   mọi người   "
// ```

// **Output 1**:
// ```javascript
// "Xin chào mọi người"
// ```

// **Input 2**:
// ```javascript
// "   JavaScript    is    fun   "
// ```

// **Output 2**:
// ```javascript
// "JavaScript is fun"
// ```

// **Input 3**:
// ```javascript
// "   Lập  trình   JavaScript   "
// ```

// **Output 3**:
// ```javascript
// "Lập trình JavaScript"
// ```

// # Playwright
// - Cho trang web sau: https://material.playwrightvn.com/017-detect-user-agent.html
// - Sử dụng kĩ thuật emulation trong Playwright để set trạng thái của location, camera và microphone thành đã cấp quyền


// #Javascript:
function trimSpaces(input) {
    const trimmed = input.trim();
    const result = trimmed.replace(/  +/g, ' ');
    return result;
}
;
const example = "   Xin   chào   mọi người   ";
const trimString = trimSpaces(example);
console.log(trimString);



//Playwright
import { test, expect } from '@playwright/test';

test("Emulation", async ({ context, page }) => {
    await page.goto("https://material.playwrightvn.com/017-detect-user-agent.html");
    await context.grantPermissions(['geolocation'], {origin: "https://material.playwrightvn.com"});
    await context.grantPermissions(['camera'], {origin: "https://material.playwrightvn.com"});
    await context.grantPermissions(['microphone'], {origin: "https://material.playwrightvn.com"});
});
