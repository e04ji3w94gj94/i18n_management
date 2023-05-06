# i18n Management

前端平台管理與設定 i18n 語料庫，並於 webpack 打包時產生 json 檔

## 使用工具

Frontend：Create React App 建置 \
Backend： Node.js、MongoDB、Docker

### `啟動 Backend Server`

於 i18n_management_backend 路徑中輸入 `docker-compose up` 指令\
等待服務啟動後於 [http://localhost:5000](http://localhost:5000) 畫面會看到 Server is ready\
首次啟動可以於 [http://localhost:5000/api/locales/seed](http://localhost:5000/api/locales/seed) 初始化資料至資料庫

![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/backend_server_start.png)
![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/add_init_data.png)

### `啟動 Frontend Server`

於 i18n_management_frontend 路徑中輸入 `npm install` 指令\
等待安裝完成後輸入 `npm run start` 指令\
等待服務啟動後於 [http://localhost:3000](http://localhost:3000) 即可看到平台畫面

![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/home_page.png)

#### `新增示意圖 `

![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/add_example.png)

#### `編輯示意圖 `

![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/edit_example.png)

#### `刪除示意圖 `

![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/delete_dialog.png)
![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/delete_example.png)

### `打包 Frontend 程式`

於 i18n_management_frontend 路徑中輸入 `npm run build` 指令 ( 需要先啟動 Backend Server )\
即可於 i18n_management_frontend/src/assets/locales 路徑中，更新並產生 locales json 檔

#### `打包示意圖 `

![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/build_before.png)
![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/build_after.png)
![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/build_file.png)

### `Config 設定`

![image](https://github.com/e04ji3w94gj94/i18n_management/blob/main/screen_image/config.png)
