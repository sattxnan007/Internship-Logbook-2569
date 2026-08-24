# 🎓 Internship Work Log & Portfolio (ระบบบันทึกผลการปฏิบัติงานฝึกงานสไตล์ Notion)

เว็บแอปพลิเคชันระดับ Fullstack สำหรับบันทึกและรวบรวมผลการปฏิบัติงานฝึกงาน/สหกิจศึกษา ออกแบบด้วยสุนทรียภาพสไตล์ **Notion Database** ทันสมัย สวยงาม และใช้งานง่าย พร้อมโครงสร้าง 3 ระดับ (รายเดือน ➔ รายอาทิตย์ ➔ รายวัน) และการจัดการรูปภาพ

---

## ✨ ไฮไลท์ฟังก์ชันการทำงานหลัก (Features)

### 1. 🗂️ ลำดับชั้นข้อมูล 3 ระดับ (3-Tier Hierarchical Structure)
- **ระดับที่ 1: รายเดือน (Monthly View)**: สรุปภาพรวมรายเดือน, เป้าหมาย (Monthly Goals), แถบความคืบหน้า (Progress Bar), จำนวนสัปดาห์ และชั่วโมงสะสม
- **ระดับที่ 2: รายอาทิตย์ (Weekly View)**: แบ่งเป็น Week 1, Week 2, Week 3... พร้อม Milestone สรุปผลงานและสถานะประจำสัปดาห์
- **ระดับที่ 3: รายวัน (Daily Tasks)**: บันทึกกิจกรรมและผลงานในแต่ละวัน พร้อม:
  - **แนบรูปภาพ 1 รูป**: มีระบบ Drag & Drop, พรีวิวภาพ, บีบอัดอัตโนมัติ และ Lightbox ขยายดูภาพขนาดเต็ม
  - **รายละเอียดงาน (Work Description)**
  - **ปัญหาและอุปสรรคที่พบ (Challenges)**
  - **วิธีการแก้ไขปัญหา (Solutions)**
  - **ทักษะและสิ่งที่ได้เรียนรู้ (Key Learnings)**
  - **แท็กและหมวดหมู่งาน (Tags / Tech Stack)**
  - **สถานะ (Completed / In Progress / Review) และชั่วโมงการทำงาน**

### 2. 🎨 สุนทรียภาพและการออกแบบสไตล์ Notion (Notion-Style UX/UI)
- **Cover Banner & Custom Avatar**: เปลี่ยนรูปหน้าปกและ Emoji ไอคอนได้
- **Intern Metadata Grid**: แสดงข้อมูลนักศึกษา, สถาบัน, บริษัท, พี่เลี้ยง (Mentor), และระยะเวลาฝึกงาน
- **Sidebar & Breadcrumb Navigation**: เมนู Tree View นำทาง ยุบ-ขยายได้ พร้อมระบบค้นหาแบบรวดเร็ว (รองรับปุ่มลัด `Ctrl + K`)
- **Dark & Light Mode**: สลับโหมดมืด-สว่างสไตล์ Notion สบายตา
- **สถิติ & กราฟภาพรวม (Analytics Dashboard)**: แสดงสรุปสัดส่วนทักษะ Tech Stack และเปอร์เซ็นต์ชั่วโมงสะสม
- **ระบบออกรายงานพร้อมพิมพ์ (Print & PDF Export)**: จัดหน้าสวยงามแบบ A4 พร้อมสั่งพิมพ์หรือ Save เป็น PDF ส่งอาจารย์หรือพี่เลี้ยง

### 3. 💾 สถาปัตยกรรมข้อมูลระดับ Fullstack (IndexedDB Engine)
- จัดเก็บข้อมูลทั้งหมดและไฟล์ภาพลงใน **IndexedDB** หมดปัญหาความจุเต็มของ LocalStorage
- **ระบบสำรองข้อมูล (Export JSON)** และ **กู้คืนข้อมูล (Import JSON)** ย้ายเครื่องทำงานได้สะดวก
- มีระบบ **Reset to Sample Data** โหลดข้อมูลตัวอย่างของ Fullstack Developer Intern ให้พร้อมใช้งานทันที

---

## 🚀 วิธีการเปิดใช้งาน (How to Run)

### วิธีที่ 1: ดับเบิลคลิกไฟล์ Launcher (ง่ายที่สุด)
ดับเบิลคลิกที่ไฟล์ `start_server.bat` ระบบจะเปิดหน้าเว็บที่ `http://localhost:8080` บนเบราว์เซอร์ให้อัตโนมัติ

### วิธีที่ 2: รันผ่าน Terminal / Command Line
```bash
# รัน Local Web Server ด้วย Python
python -m http.server 8080
```
จากนั้นเปิดเบราว์เซอร์ไปที่: `http://localhost:8080` หรือเปิดไฟล์ `index.html` ได้โดยตรง

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
All Intern/
├── index.html              # หน้าเว็บหลัก Semantic HTML5 & Modals
├── start_server.bat        # สคริปต์คลิกเปิดรันเซิร์ฟเวอร์ทันที
├── README.md               # เอกสารประกอบการใช้งาน
├── css/
│   ├── main.css            # Notion Theme Variables, Typography, Layout, Sidebar
│   ├── components.css      # การ์ด Month/Week/Day, Dropzone, Lightbox, Stats, Modals
│   └── print.css           # สไตล์สำหรับการพิมพ์และ Export PDF
└── js/
    ├── db.js               # IndexedDB Storage Manager (บันทึกข้อมูลและรูปภาพ)
    ├── sample-data.js      # ชุดข้อมูลตัวอย่างการฝึกงาน Fullstack Developer
    ├── state.js            # State Management, Router, Filters, Search & Analytics
    ├── components.js       # Dynamic UI Renderer (3 Views, Sidebar, Breadcrumb)
    └── app.js              # Event Handlers, Image Compressor, Modals & Lifecycles
```
