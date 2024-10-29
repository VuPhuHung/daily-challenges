/* # Javascript
## Đề bài:
Cho một mảng các số nguyên, bạn cần tính tổng của tất cả các phần tử trong mảng đó. Trong bài tập này, bạn sẽ viết một hàm để thực hiện việc tính tổng các số trong mảng.

### Yêu cầu:
- Viết một hàm JavaScript có tên `sumArray` để tính tổng các số trong mảng.
- Nếu mảng rỗng, trả về thông báo `"Mảng rỗng"`.
- Nếu mảng chứa các giá trị không phải là số, bỏ qua những giá trị đó.

## Ví dụ:
**Input 1**:
```javascript
[1, 2, 3, 4, 5]
```

**Output 1**:
```javascript
"Tổng là: 15"
```

**Input 2**:
```javascript
[1, "abc", 3, 4, "xyz", 5]
```

**Output 2**:
```javascript
"Tổng là: 13"
```

**Input 3**:
```javascript
[]
```

**Output 3**:
```javascript
"Mảng rỗng"
```

# Playwright
- Sử dụng fixture `request` trong Playwright để tạo mới 1 account.
- Biết API documentation: https://demoqa.com/swagger/
 */

//Javascript
function sumArray(arr) {
    if (arr.length === 0) {
        return "Mảng rỗng";
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') {
            sum += arr[i];
        }
    }
    return `Tổng là: ${sum}`;
}
console.log(sumArray([1, 2, 3, 4, 5]));
console.log(sumArray([1, "abc", 3, 4, "xyz", 5]));
console.log(sumArray([]));

//Playwright
import { test,expect } from "@playwright/test";

test("Create account using API", async ({ request }) => {
    const apiUrl = "https://demoqa.com/Account/v1/User";
    const accountData = {
        userName: "david",
        password: "Abc@12345",
    };

    const response = await request.post(apiUrl, {
        data: accountData,
    });
    expect(response.status()).toBe(201);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.username).toBe(accountData.userName);
})