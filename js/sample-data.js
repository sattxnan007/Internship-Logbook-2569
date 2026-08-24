/**
 * Default Clean Initial Sample Data
 */

const DEFAULT_SAMPLE_DATA = {
  months: [
    {
      id: 'month_1',
      title: 'เดือนที่ 1: การปฐมนิเทศ และ Onboarding',
      goal: 'เรียนรู้ Tech Stack ของทีม ติดตั้ง Environment และเริ่มทำความเข้าใจระบบ'
    },
    {
      id: 'month_2',
      title: 'เดือนที่ 2: พัฒนาระบบ Core Features',
      goal: 'พัฒนา REST API, เชื่อมต่อฐานข้อมูล และสร้างหน้า UI Dashboard'
    }
  ],
  weeks: [
    {
      id: 'week_1',
      monthId: 'month_1',
      title: 'สัปดาห์ที่ 1: ติดตั้งโปรแกรมและทำความเข้าใจงาน',
      summary: 'ติดตั้ง VS Code, Docker, Git และร่วมประชุม Sprint Planning'
    },
    {
      id: 'week_2',
      monthId: 'month_1',
      title: 'สัปดาห์ที่ 2: ออกแบบ Database Schema และ Auth',
      summary: 'ออกแบบตาราง Users, Roles และทำระบบ JWT Login'
    },
    {
      id: 'week_3',
      monthId: 'month_2',
      title: 'สัปดาห์ที่ 3: พัฒนา REST API และ Dashboard UI',
      summary: 'เขียน Endpoint สำหรับดึงข้อมูล และสร้างหน้ารายงาน Dashboard'
    }
  ],
  tasks: [
    {
      id: 'task_1',
      weekId: 'week_1',
      date: '2026-06-01',
      dayName: 'จันทร์',
      title: 'ปฐมนิเทศ และติดตั้ง Environment บนเครื่องทำงาน',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
      description: 'เข้าร่วมปฐมนิเทศนักศึกษาฝึกงาน รับมอบหมายเครื่องคอมพิวเตอร์และตั้งค่า VS Code, Docker, Git SSH Key สำหรับทำงานร่วมกับทีม'
    },
    {
      id: 'task_2',
      weekId: 'week_1',
      date: '2026-06-02',
      dayName: 'อังคาร',
      title: 'ศึกษา Database Schema และ System Architecture',
      imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop',
      description: 'ศึกษาโครงสร้างฐานข้อมูลตาราง Users, Roles และ Permissions ร่วมกับพี่เลี้ยง เพื่อเตรียมความพร้อมในการพัฒนา API'
    },
    {
      id: 'task_3',
      weekId: 'week_1',
      date: '2026-06-03',
      dayName: 'พุธ',
      title: 'ประชุม Daily Scrum และเขียน API Endpoint แรก',
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
      description: 'เข้าร่วมประชุม Daily Standup 15 นาที และเริ่มพัฒนา API สำหรับดึงข้อมูลโปรไฟล์ผู้ใช้งานพร้อมเขียน Unit Test'
    }
  ]
};

window.DEFAULT_SAMPLE_DATA = DEFAULT_SAMPLE_DATA;
