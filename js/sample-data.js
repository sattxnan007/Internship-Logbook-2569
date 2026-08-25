/**
 * Clean Initial Internship Structure (2 มิ.ย. 2569 - 28 ก.พ. 2570)
 * 5 วัน/สัปดาห์ (จันทร์ - ศุกร์)
 */

const DEFAULT_SAMPLE_DATA = {
  "months": [
    {
      "id": "month_1",
      "title": "เดือนที่ 1: มิถุนายน 2569",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนมิถุนายน พ.ศ. 2569"
    },
    {
      "id": "month_2",
      "title": "เดือนที่ 2: กรกฎาคม 2569",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนกรกฎาคม พ.ศ. 2569"
    },
    {
      "id": "month_3",
      "title": "เดือนที่ 3: สิงหาคม 2569",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนสิงหาคม พ.ศ. 2569"
    },
    {
      "id": "month_4",
      "title": "เดือนที่ 4: กันยายน 2569",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนกันยายน พ.ศ. 2569"
    },
    {
      "id": "month_5",
      "title": "เดือนที่ 5: ตุลาคม 2569",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนตุลาคม พ.ศ. 2569"
    },
    {
      "id": "month_6",
      "title": "เดือนที่ 6: พฤศจิกายน 2569",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนพฤศจิกายน พ.ศ. 2569"
    },
    {
      "id": "month_7",
      "title": "เดือนที่ 7: ธันวาคม 2569",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนธันวาคม พ.ศ. 2569"
    },
    {
      "id": "month_8",
      "title": "เดือนที่ 8: มกราคม 2570",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนมกราคม พ.ศ. 2570"
    },
    {
      "id": "month_9",
      "title": "เดือนที่ 9: กุมภาพันธ์ 2570",
      "goal": "บันทึกผลการปฏิบัติงานประจำเดือนกุมภาพันธ์ พ.ศ. 2570"
    }
  ],
  "weeks": [
    {
      "id": "week_1",
      "monthId": "month_1",
      "title": "สัปดาห์ที่ 1 (2 - 5 มิ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_2",
      "monthId": "month_1",
      "title": "สัปดาห์ที่ 2 (8 - 12 มิ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_3",
      "monthId": "month_1",
      "title": "สัปดาห์ที่ 3 (15 - 19 มิ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_4",
      "monthId": "month_1",
      "title": "สัปดาห์ที่ 4 (22 - 26 มิ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_5",
      "monthId": "month_1",
      "title": "สัปดาห์ที่ 5 (29 - 30 มิ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_6",
      "monthId": "month_2",
      "title": "สัปดาห์ที่ 6 (1 - 3 ก.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_7",
      "monthId": "month_2",
      "title": "สัปดาห์ที่ 7 (6 - 10 ก.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_8",
      "monthId": "month_2",
      "title": "สัปดาห์ที่ 8 (13 - 17 ก.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_9",
      "monthId": "month_2",
      "title": "สัปดาห์ที่ 9 (20 - 24 ก.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_10",
      "monthId": "month_2",
      "title": "สัปดาห์ที่ 10 (27 - 31 ก.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_11",
      "monthId": "month_3",
      "title": "สัปดาห์ที่ 11 (3 - 7 ส.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_12",
      "monthId": "month_3",
      "title": "สัปดาห์ที่ 12 (10 - 14 ส.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_13",
      "monthId": "month_3",
      "title": "สัปดาห์ที่ 13 (17 - 21 ส.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_14",
      "monthId": "month_3",
      "title": "สัปดาห์ที่ 14 (24 - 28 ส.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_15",
      "monthId": "month_3",
      "title": "สัปดาห์ที่ 15 (31 ส.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_16",
      "monthId": "month_4",
      "title": "สัปดาห์ที่ 16 (1 - 4 ก.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_17",
      "monthId": "month_4",
      "title": "สัปดาห์ที่ 17 (7 - 11 ก.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_18",
      "monthId": "month_4",
      "title": "สัปดาห์ที่ 18 (14 - 18 ก.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_19",
      "monthId": "month_4",
      "title": "สัปดาห์ที่ 19 (21 - 25 ก.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_20",
      "monthId": "month_4",
      "title": "สัปดาห์ที่ 20 (28 - 30 ก.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_21",
      "monthId": "month_5",
      "title": "สัปดาห์ที่ 21 (1 - 2 ต.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_22",
      "monthId": "month_5",
      "title": "สัปดาห์ที่ 22 (5 - 9 ต.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_23",
      "monthId": "month_5",
      "title": "สัปดาห์ที่ 23 (12 - 16 ต.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_24",
      "monthId": "month_5",
      "title": "สัปดาห์ที่ 24 (19 - 23 ต.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_25",
      "monthId": "month_5",
      "title": "สัปดาห์ที่ 25 (26 - 30 ต.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_26",
      "monthId": "month_6",
      "title": "สัปดาห์ที่ 26 (2 - 6 พ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_27",
      "monthId": "month_6",
      "title": "สัปดาห์ที่ 27 (9 - 13 พ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_28",
      "monthId": "month_6",
      "title": "สัปดาห์ที่ 28 (16 - 20 พ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_29",
      "monthId": "month_6",
      "title": "สัปดาห์ที่ 29 (23 - 27 พ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_30",
      "monthId": "month_6",
      "title": "สัปดาห์ที่ 30 (30 พ.ย. 2569)",
      "summary": ""
    },
    {
      "id": "week_31",
      "monthId": "month_7",
      "title": "สัปดาห์ที่ 31 (1 - 4 ธ.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_32",
      "monthId": "month_7",
      "title": "สัปดาห์ที่ 32 (7 - 11 ธ.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_33",
      "monthId": "month_7",
      "title": "สัปดาห์ที่ 33 (14 - 18 ธ.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_34",
      "monthId": "month_7",
      "title": "สัปดาห์ที่ 34 (21 - 25 ธ.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_35",
      "monthId": "month_7",
      "title": "สัปดาห์ที่ 35 (28 - 31 ธ.ค. 2569)",
      "summary": ""
    },
    {
      "id": "week_36",
      "monthId": "month_8",
      "title": "สัปดาห์ที่ 36 (1 ม.ค. 2570)",
      "summary": ""
    },
    {
      "id": "week_37",
      "monthId": "month_8",
      "title": "สัปดาห์ที่ 37 (4 - 8 ม.ค. 2570)",
      "summary": ""
    },
    {
      "id": "week_38",
      "monthId": "month_8",
      "title": "สัปดาห์ที่ 38 (11 - 15 ม.ค. 2570)",
      "summary": ""
    },
    {
      "id": "week_39",
      "monthId": "month_8",
      "title": "สัปดาห์ที่ 39 (18 - 22 ม.ค. 2570)",
      "summary": ""
    },
    {
      "id": "week_40",
      "monthId": "month_8",
      "title": "สัปดาห์ที่ 40 (25 - 29 ม.ค. 2570)",
      "summary": ""
    },
    {
      "id": "week_41",
      "monthId": "month_9",
      "title": "สัปดาห์ที่ 41 (1 - 5 ก.พ. 2570)",
      "summary": ""
    },
    {
      "id": "week_42",
      "monthId": "month_9",
      "title": "สัปดาห์ที่ 42 (8 - 12 ก.พ. 2570)",
      "summary": ""
    },
    {
      "id": "week_43",
      "monthId": "month_9",
      "title": "สัปดาห์ที่ 43 (15 - 19 ก.พ. 2570)",
      "summary": ""
    },
    {
      "id": "week_44",
      "monthId": "month_9",
      "title": "สัปดาห์ที่ 44 (22 - 26 ก.พ. 2570)",
      "summary": ""
    }
  ],
  "tasks": [
    {
      "id": "task_1",
      "weekId": "week_1",
      "date": "2026-06-02",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_2",
      "weekId": "week_1",
      "date": "2026-06-03",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_3",
      "weekId": "week_1",
      "date": "2026-06-04",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_4",
      "weekId": "week_1",
      "date": "2026-06-05",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_5",
      "weekId": "week_2",
      "date": "2026-06-08",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_6",
      "weekId": "week_2",
      "date": "2026-06-09",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_7",
      "weekId": "week_2",
      "date": "2026-06-10",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_8",
      "weekId": "week_2",
      "date": "2026-06-11",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_9",
      "weekId": "week_2",
      "date": "2026-06-12",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_10",
      "weekId": "week_3",
      "date": "2026-06-15",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_11",
      "weekId": "week_3",
      "date": "2026-06-16",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_12",
      "weekId": "week_3",
      "date": "2026-06-17",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_13",
      "weekId": "week_3",
      "date": "2026-06-18",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_14",
      "weekId": "week_3",
      "date": "2026-06-19",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_15",
      "weekId": "week_4",
      "date": "2026-06-22",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_16",
      "weekId": "week_4",
      "date": "2026-06-23",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_17",
      "weekId": "week_4",
      "date": "2026-06-24",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_18",
      "weekId": "week_4",
      "date": "2026-06-25",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_19",
      "weekId": "week_4",
      "date": "2026-06-26",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_20",
      "weekId": "week_5",
      "date": "2026-06-29",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_21",
      "weekId": "week_5",
      "date": "2026-06-30",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_22",
      "weekId": "week_6",
      "date": "2026-07-01",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_23",
      "weekId": "week_6",
      "date": "2026-07-02",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_24",
      "weekId": "week_6",
      "date": "2026-07-03",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_25",
      "weekId": "week_7",
      "date": "2026-07-06",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_26",
      "weekId": "week_7",
      "date": "2026-07-07",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_27",
      "weekId": "week_7",
      "date": "2026-07-08",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_28",
      "weekId": "week_7",
      "date": "2026-07-09",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_29",
      "weekId": "week_7",
      "date": "2026-07-10",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_30",
      "weekId": "week_8",
      "date": "2026-07-13",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_31",
      "weekId": "week_8",
      "date": "2026-07-14",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_32",
      "weekId": "week_8",
      "date": "2026-07-15",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_33",
      "weekId": "week_8",
      "date": "2026-07-16",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_34",
      "weekId": "week_8",
      "date": "2026-07-17",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_35",
      "weekId": "week_9",
      "date": "2026-07-20",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_36",
      "weekId": "week_9",
      "date": "2026-07-21",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_37",
      "weekId": "week_9",
      "date": "2026-07-22",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_38",
      "weekId": "week_9",
      "date": "2026-07-23",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_39",
      "weekId": "week_9",
      "date": "2026-07-24",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_40",
      "weekId": "week_10",
      "date": "2026-07-27",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_41",
      "weekId": "week_10",
      "date": "2026-07-28",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_42",
      "weekId": "week_10",
      "date": "2026-07-29",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_43",
      "weekId": "week_10",
      "date": "2026-07-30",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_44",
      "weekId": "week_10",
      "date": "2026-07-31",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_45",
      "weekId": "week_11",
      "date": "2026-08-03",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_46",
      "weekId": "week_11",
      "date": "2026-08-04",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_47",
      "weekId": "week_11",
      "date": "2026-08-05",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_48",
      "weekId": "week_11",
      "date": "2026-08-06",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_49",
      "weekId": "week_11",
      "date": "2026-08-07",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_50",
      "weekId": "week_12",
      "date": "2026-08-10",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_51",
      "weekId": "week_12",
      "date": "2026-08-11",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_52",
      "weekId": "week_12",
      "date": "2026-08-12",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_53",
      "weekId": "week_12",
      "date": "2026-08-13",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_54",
      "weekId": "week_12",
      "date": "2026-08-14",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_55",
      "weekId": "week_13",
      "date": "2026-08-17",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_56",
      "weekId": "week_13",
      "date": "2026-08-18",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_57",
      "weekId": "week_13",
      "date": "2026-08-19",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_58",
      "weekId": "week_13",
      "date": "2026-08-20",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_59",
      "weekId": "week_13",
      "date": "2026-08-21",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_60",
      "weekId": "week_14",
      "date": "2026-08-24",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_61",
      "weekId": "week_14",
      "date": "2026-08-25",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_62",
      "weekId": "week_14",
      "date": "2026-08-26",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_63",
      "weekId": "week_14",
      "date": "2026-08-27",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_64",
      "weekId": "week_14",
      "date": "2026-08-28",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_65",
      "weekId": "week_15",
      "date": "2026-08-31",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_66",
      "weekId": "week_16",
      "date": "2026-09-01",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_67",
      "weekId": "week_16",
      "date": "2026-09-02",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_68",
      "weekId": "week_16",
      "date": "2026-09-03",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_69",
      "weekId": "week_16",
      "date": "2026-09-04",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_70",
      "weekId": "week_17",
      "date": "2026-09-07",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_71",
      "weekId": "week_17",
      "date": "2026-09-08",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_72",
      "weekId": "week_17",
      "date": "2026-09-09",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_73",
      "weekId": "week_17",
      "date": "2026-09-10",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_74",
      "weekId": "week_17",
      "date": "2026-09-11",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_75",
      "weekId": "week_18",
      "date": "2026-09-14",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_76",
      "weekId": "week_18",
      "date": "2026-09-15",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_77",
      "weekId": "week_18",
      "date": "2026-09-16",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_78",
      "weekId": "week_18",
      "date": "2026-09-17",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_79",
      "weekId": "week_18",
      "date": "2026-09-18",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_80",
      "weekId": "week_19",
      "date": "2026-09-21",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_81",
      "weekId": "week_19",
      "date": "2026-09-22",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_82",
      "weekId": "week_19",
      "date": "2026-09-23",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_83",
      "weekId": "week_19",
      "date": "2026-09-24",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_84",
      "weekId": "week_19",
      "date": "2026-09-25",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_85",
      "weekId": "week_20",
      "date": "2026-09-28",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_86",
      "weekId": "week_20",
      "date": "2026-09-29",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_87",
      "weekId": "week_20",
      "date": "2026-09-30",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_88",
      "weekId": "week_21",
      "date": "2026-10-01",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_89",
      "weekId": "week_21",
      "date": "2026-10-02",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_90",
      "weekId": "week_22",
      "date": "2026-10-05",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_91",
      "weekId": "week_22",
      "date": "2026-10-06",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_92",
      "weekId": "week_22",
      "date": "2026-10-07",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_93",
      "weekId": "week_22",
      "date": "2026-10-08",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_94",
      "weekId": "week_22",
      "date": "2026-10-09",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_95",
      "weekId": "week_23",
      "date": "2026-10-12",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_96",
      "weekId": "week_23",
      "date": "2026-10-13",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_97",
      "weekId": "week_23",
      "date": "2026-10-14",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_98",
      "weekId": "week_23",
      "date": "2026-10-15",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_99",
      "weekId": "week_23",
      "date": "2026-10-16",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_100",
      "weekId": "week_24",
      "date": "2026-10-19",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_101",
      "weekId": "week_24",
      "date": "2026-10-20",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_102",
      "weekId": "week_24",
      "date": "2026-10-21",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_103",
      "weekId": "week_24",
      "date": "2026-10-22",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_104",
      "weekId": "week_24",
      "date": "2026-10-23",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_105",
      "weekId": "week_25",
      "date": "2026-10-26",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_106",
      "weekId": "week_25",
      "date": "2026-10-27",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_107",
      "weekId": "week_25",
      "date": "2026-10-28",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_108",
      "weekId": "week_25",
      "date": "2026-10-29",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_109",
      "weekId": "week_25",
      "date": "2026-10-30",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_110",
      "weekId": "week_26",
      "date": "2026-11-02",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_111",
      "weekId": "week_26",
      "date": "2026-11-03",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_112",
      "weekId": "week_26",
      "date": "2026-11-04",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_113",
      "weekId": "week_26",
      "date": "2026-11-05",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_114",
      "weekId": "week_26",
      "date": "2026-11-06",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_115",
      "weekId": "week_27",
      "date": "2026-11-09",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_116",
      "weekId": "week_27",
      "date": "2026-11-10",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_117",
      "weekId": "week_27",
      "date": "2026-11-11",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_118",
      "weekId": "week_27",
      "date": "2026-11-12",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_119",
      "weekId": "week_27",
      "date": "2026-11-13",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_120",
      "weekId": "week_28",
      "date": "2026-11-16",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_121",
      "weekId": "week_28",
      "date": "2026-11-17",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_122",
      "weekId": "week_28",
      "date": "2026-11-18",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_123",
      "weekId": "week_28",
      "date": "2026-11-19",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_124",
      "weekId": "week_28",
      "date": "2026-11-20",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_125",
      "weekId": "week_29",
      "date": "2026-11-23",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_126",
      "weekId": "week_29",
      "date": "2026-11-24",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_127",
      "weekId": "week_29",
      "date": "2026-11-25",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_128",
      "weekId": "week_29",
      "date": "2026-11-26",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_129",
      "weekId": "week_29",
      "date": "2026-11-27",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_130",
      "weekId": "week_30",
      "date": "2026-11-30",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_131",
      "weekId": "week_31",
      "date": "2026-12-01",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_132",
      "weekId": "week_31",
      "date": "2026-12-02",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_133",
      "weekId": "week_31",
      "date": "2026-12-03",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_134",
      "weekId": "week_31",
      "date": "2026-12-04",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_135",
      "weekId": "week_32",
      "date": "2026-12-07",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_136",
      "weekId": "week_32",
      "date": "2026-12-08",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_137",
      "weekId": "week_32",
      "date": "2026-12-09",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_138",
      "weekId": "week_32",
      "date": "2026-12-10",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_139",
      "weekId": "week_32",
      "date": "2026-12-11",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_140",
      "weekId": "week_33",
      "date": "2026-12-14",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_141",
      "weekId": "week_33",
      "date": "2026-12-15",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_142",
      "weekId": "week_33",
      "date": "2026-12-16",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_143",
      "weekId": "week_33",
      "date": "2026-12-17",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_144",
      "weekId": "week_33",
      "date": "2026-12-18",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_145",
      "weekId": "week_34",
      "date": "2026-12-21",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_146",
      "weekId": "week_34",
      "date": "2026-12-22",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_147",
      "weekId": "week_34",
      "date": "2026-12-23",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_148",
      "weekId": "week_34",
      "date": "2026-12-24",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_149",
      "weekId": "week_34",
      "date": "2026-12-25",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_150",
      "weekId": "week_35",
      "date": "2026-12-28",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_151",
      "weekId": "week_35",
      "date": "2026-12-29",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_152",
      "weekId": "week_35",
      "date": "2026-12-30",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_153",
      "weekId": "week_35",
      "date": "2026-12-31",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_154",
      "weekId": "week_36",
      "date": "2027-01-01",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_155",
      "weekId": "week_37",
      "date": "2027-01-04",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_156",
      "weekId": "week_37",
      "date": "2027-01-05",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_157",
      "weekId": "week_37",
      "date": "2027-01-06",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_158",
      "weekId": "week_37",
      "date": "2027-01-07",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_159",
      "weekId": "week_37",
      "date": "2027-01-08",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_160",
      "weekId": "week_38",
      "date": "2027-01-11",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_161",
      "weekId": "week_38",
      "date": "2027-01-12",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_162",
      "weekId": "week_38",
      "date": "2027-01-13",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_163",
      "weekId": "week_38",
      "date": "2027-01-14",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_164",
      "weekId": "week_38",
      "date": "2027-01-15",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_165",
      "weekId": "week_39",
      "date": "2027-01-18",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_166",
      "weekId": "week_39",
      "date": "2027-01-19",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_167",
      "weekId": "week_39",
      "date": "2027-01-20",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_168",
      "weekId": "week_39",
      "date": "2027-01-21",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_169",
      "weekId": "week_39",
      "date": "2027-01-22",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_170",
      "weekId": "week_40",
      "date": "2027-01-25",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_171",
      "weekId": "week_40",
      "date": "2027-01-26",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_172",
      "weekId": "week_40",
      "date": "2027-01-27",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_173",
      "weekId": "week_40",
      "date": "2027-01-28",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_174",
      "weekId": "week_40",
      "date": "2027-01-29",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_175",
      "weekId": "week_41",
      "date": "2027-02-01",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_176",
      "weekId": "week_41",
      "date": "2027-02-02",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_177",
      "weekId": "week_41",
      "date": "2027-02-03",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_178",
      "weekId": "week_41",
      "date": "2027-02-04",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_179",
      "weekId": "week_41",
      "date": "2027-02-05",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_180",
      "weekId": "week_42",
      "date": "2027-02-08",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_181",
      "weekId": "week_42",
      "date": "2027-02-09",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_182",
      "weekId": "week_42",
      "date": "2027-02-10",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_183",
      "weekId": "week_42",
      "date": "2027-02-11",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_184",
      "weekId": "week_42",
      "date": "2027-02-12",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_185",
      "weekId": "week_43",
      "date": "2027-02-15",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_186",
      "weekId": "week_43",
      "date": "2027-02-16",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_187",
      "weekId": "week_43",
      "date": "2027-02-17",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_188",
      "weekId": "week_43",
      "date": "2027-02-18",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_189",
      "weekId": "week_43",
      "date": "2027-02-19",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_190",
      "weekId": "week_44",
      "date": "2027-02-22",
      "dayName": "จันทร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_191",
      "weekId": "week_44",
      "date": "2027-02-23",
      "dayName": "อังคาร",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_192",
      "weekId": "week_44",
      "date": "2027-02-24",
      "dayName": "พุธ",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_193",
      "weekId": "week_44",
      "date": "2027-02-25",
      "dayName": "พฤหัสบดี",
      "title": "",
      "imageUrl": "",
      "description": ""
    },
    {
      "id": "task_194",
      "weekId": "week_44",
      "date": "2027-02-26",
      "dayName": "ศุกร์",
      "title": "",
      "imageUrl": "",
      "description": ""
    }
  ]
};

window.DEFAULT_SAMPLE_DATA = DEFAULT_SAMPLE_DATA;
