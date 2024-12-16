// # Playwright
// - Cho trang web sau: https://material.playwrightvn.com/021-import-export.html
// - Thực hiện thao tác:
//     - Export CSV về
//     - Xoá các học sinh của lớp 10A3
//     - Thêm vào 2 học sinh của lớp 10A6 vào cuối danh sách: 
//         - Nguyễn Văn Nam, 10A6, 8, 8, 8
//         - Trần Thị Nga, 10A6, 9, 9, 9

import path from 'path'; //Thư viện node cung cấp các phương thức để làm việc với đường dẫn tệp tin và thư mục.
//xác định đường dẫn tệp tin, nối các phần của đường dẫn, và phân tích các đường dẫn cho hệ điều hành khác nhau.
import fs from 'fs'; // Thư viện node cho phép bạn làm việc với hệ thống tệp, bao gồm đọc, ghi, và xóa các tệp.
// hương thức như fs.readFileSync() và fs.writeFileSync() giúp đọc và ghi nội dung vào tệp một cách đồng bộ.
import os from 'os'; //Thư viện node cung cấp các phương thức để tương tác với hệ điều hành.
// cho phép lấy thông tin về hệ thống, như thông tin về CPU, thông tin mạng, và thư mục tạm thời, 
// như os.tmpdir() để lấy đường dẫn tới thư mục tạm.

import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync'; // Hàm để phân tích tệp CSV
import { downloadBrowsers } from 'puppeteer/internal/node/install.js';

/* Sample CSV file:
STT, Tên học sinh, Lớp, Điểm toán, Điểm lý, Điểm hóa
1,   Nguyễn Văn A| |10A1|        8|       7|       9|
2,   Trần Thị B  | |10A2|        9|       6|       8|
3,   Lê Văn C    | |10A3|        5|       8|       7|
4,   Phạm Thị D  | |10A4|        6|       9|       6|
5,   Hoàng Văn E | |10A5|        7|       8|       9|
 */

const originHeaderRow = "STT, Tên học sinh, Lớp, Điểm toán, Điểm lý, Điểm hóa";
const headerMapping = new Map<string, string>([
    ['STT', 'no'],
    ['Tên học sinh', 'fullname'],
    ['Lớp', 'class'],
    ['Điểm toán', 'math_point'],
    ['Điểm lý', 'physics_point'],
    ['Điểm hóa', 'chemistry_point'],
]);
const newRecords = [
    { no: "", fullname: "Nguyễn Văn Nam", class: "10A6", math_point: "8", physics_point: "8", chemistry_point: "8" },
    { no: "", fullname: "Trần Thị Nga", class: "10A6", math_point: "9", physics_point: "9", chemistry_point: "9" },
];

test('2024-09-27', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/021-import-export.html');

    // Export to CSV
    const tmpDir = os.tmpdir(); //Lấy đường dẫn đến thư mục tạm thời của hệ thống
    const downloadPromise = page.waitForEvent('download'); //Tạo một promise để chờ sự kiện tải xuống.
    await page.locator("#exportButton").click();

    const downloadFile = await downloadPromise; //Chờ đợi cho đến khi tệp được tải xuống hoàn tất và lưu thông tin tệp vào biến downloadFile.
    const savedPath = path.join(tmpDir, downloadFile.suggestedFilename()); //Tạo đường dẫn tệp tải xuong
    await downloadFile.saveAs(savedPath);

    // Read and parse downloaded CSV, re-mapping header
    const fileContent = fs.readFileSync(savedPath, { encoding: 'utf-8' });
    const records = parse(fileContent, {
        delimiter: ',',
        trim: true,
        skip_empty_lines: true,
        columns: (headers) =>{
            return headers.map(header => headerMapping.get(header));
        },
    });

    // Transform data
    // Remove 10A3 class
    let filteredRecords = records.filter(record => record.class != '10A3');
    // add new records with new increment ID
    filteredRecords = [...filteredRecords, ...newRecords];

    // Update ID
    for (let i = 0; i< filteredRecords.length; i++){
        filteredRecords[i].no = i + 1; 
    }

    // Write back to CSV file
    const  toImportCsvPath = path.join(tmpDir, "student_to_import.csv");
    let csvBuffer = '';
    csvBuffer += originHeaderRow;
    for (const record of filteredRecords){
        csvBuffer += '\n' + Object.values(record).join(',');
    }
    fs.writeFileSync(toImportCsvPath, csvBuffer);
});