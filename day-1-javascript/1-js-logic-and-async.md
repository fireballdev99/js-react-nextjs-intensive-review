# Day 1: JavaScript Logic & Async - ทบทวนสิ่งที่ไม่แน่น

> **วันที่**: 13-Jul-2025  
> **สถานะ**: กำลังเรียนรู้ `reduce()` - ใช้งานจริงนอกเหนือจากรวมตัวเลข

## เป้าหมายวันนี้

- เข้าใจ `reduce()` แบบลึก ๆ ไม่ใช่แค่รวมตัวเลข
- เรียนรู้ `Promise.all()` และ `Promise.race()`
- ทำความเข้าใจ `closure` & `currying`
- ฝึกใช้ `debounce` & `throttle`
- ลองเขียน test ด้วย `console.assert()`

---

## 1. `reduce()` - ไม่ใช่แค่การรวมตัวเลข

### `reduce()` คืออะไร?

`reduce()` เป็น Array method ที่ใช้**ลดขนาด Array ลงเหลือค่าเดียว** โดยการประมวลผลทีละ element

**Syntax**:

```javascript
array.reduce(callback(accumulator, currentValue), initialValue);
```

**ส่วนประกอบ**:

- **`accumulator`** (acc) = ค่าที่สะสมไว้ (ผลลัพธ์ที่กำลังรวบรวม)
- **`currentValue`** = element ปัจจุบันที่กำลังประมวลผล
- **`initialValue`** = ค่าเริ่มต้นของ accumulator (ไม่บังคับ แต่แนะนำ) เพราะบางทีลืมใส่ทำให้ Error ได้จากการที่ทดลอง

### ความเข้าใจเดิม

```javascript
// แค่รวมตัวเลข
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10
```

#### ตัวอย่างที่ 1: ระบบคัดเฉพาะนักเรียนที่สอบผ่าน

```javascript
const studenExample = [
  { stu: "580001", name: "John Doe", score: 75 },
  { stu: "580002", name: "Jane Doe", score: 90 },
  { stu: "580003", name: "Jim Doe", score: 51 },
  { stu: "580004", name: "Jenny Doe", score: 65 },
  { stu: "580005", name: "Jimmy Doe", score: 74 },
];

const passed = studenExample.reduce((acc, student) => {
  if (student.score >= 75) {
    acc[student.stu] = student;
  }
  if (student.score < 75) {
    console.log(`${student.name} with ${student.score} not passed`);
  }
  return acc;
}, {});

console.log(passed);
```

**ผลลัพธ์**:

```
Jim Doe with 51 not passed
Jenny Doe with 65 not passed
Jimmy Doe with 74 not passed
{
  "580001": { stu: "580001", name: "John Doe", score: 75 },
  "580002": { stu: "580002", name: "Jane Doe", score: 90 }
}
```

### การไหลของข้อมูล (Data Flow)

#### ขั้นตอนการทำงาน:

1. **เริ่มต้น**: `acc = {}` (object ว่าง) ที่กำหนด initialvalue ไว้ {}
2. **รอบที่ 1**: `student = John (75)` → ผ่าน → `acc["580001"] = John`
3. **รอบที่ 2**: `student = Jane (90)` → ผ่าน → `acc["580002"] = Jane`
4. **รอบที่ 3**: `student = Jim (51)` → ไม่ผ่าน → `acc` คงเดิม
5. **รอบที่ 4**: `student = Jenny (65)` → ไม่ผ่าน → `acc` คงเดิม
6. **รอบที่ 5**: `student = Jimmy (74)` → ไม่ผ่าน → `acc` คงเดิม

NOTE: ใน Code ได้ทำการ log ไว้เพื่อดูการไหลของ `reduce()`

#### ทำไมใช้ `acc[student.stu] = student`

**เปรียบเทียบกับตู้เก็บของ**:

- `acc` = ตู้เก็บของ
- `student.stu` = เลขตู้ (580001, 580002...)
- `student` = กระเป๋าที่เก็บในตู้

```javascript
// เหมือนการบอกว่า: "เอากระเป๋าของ John ไปเก็บในตู้เลข 580001"
// ประมาณว่าเอาข้อมูลของ john{} ไปเก็บใน objectid 580001 ครับ
acc["580001"] = johnData;

// ข้อดี: หาคนได้ทันที
const john = passed["580001"]; // ไม่ต้อง loop หา
```

### สิ่งที่เรียนรู้

- `reduce()` สามารถแปลง Array เป็น Object ได้
- **Initial value** สำคัญมาก (ใส่ `{}` สำหรับ object, `0` สำหรับ number)
- **ต้อง return accumulator เสมอ** ไม่งั้นจะได้ `undefined`
- การใช้ property ของ object เป็น key ทำให้ค้นหาได้เร็ว

### ข้อผิดพลาดที่เจอบ่อย

```javascript
// ❌ ผิด - ไม่ return เมื่อไม่ผ่านเงื่อนไข
const wrong = array.reduce((acc, item) => {
  if (item.condition) {
    return acc + item.value;
  }
  // ❌ ไม่มี return ตรงนี้!
}, 0);

// ✅ ถูก - return เสมอ
const correct = array.reduce((acc, item) => {
  if (item.condition) {
    return acc + item.value;
  }
  return acc; // ✅ return เสมอ
}, 0);
```

---

## สิ่งที่จะทำต่อไป

### ตัวอย่างที่ยังไม่ได้ลองเขียน:

- [ ] ฟังก์ชัน `groupBy(array, key)` - จัดกลุ่มข้อมูล
- [ ] Shopping cart - คำนวณยอดรวม (`qty * price`)
- [ ] หาค่าสูงสุด/ต่ำสุดแบบซับซ้อน
- [ ] แปลง Array เป็น Map/Set

### หัวข้ออื่น ๆ ที่ยังไม่ได้เรียน:

- [ ] `Promise.all()` / `Promise.race()`
- [ ] `closure` & `currying`
- [ ] `debounce` & `throttle`
- [ ] `console.assert()`
- [ ] Array methods chaining

---

## บันทึกส่วนตัว

### สิ่งที่ยากในตอนแรก:

- **Initial value** ลืมใส่บ่อย → Error
- **Return statement** ลืม return ในบาง case
- **Object key assignment** งงว่า `acc[key] = value` ทำงานยังไง

### สิ่งที่เข้าใจแล้ว:

- `reduce()` เป็นของดีของ Array methods
- สามารถแทนที่ `map()`, `filter()` ได้ (แต่ไม่ควร)
- การไหลของข้อมูลใน accumulator

### ประโยชน์ที่เห็นชัด:

- **Performance**: เวลาต้องแปลง Array → Object
- **Readability**: โค้ดสั้นลง เข้าใจง่ายขึ้น ถ้าเข้าใจมันจริงๆ
- **Flexibility**: ทำอะไรได้เยอะ ไม่ใช่แค่รวมตัวเลข

---

**ไฟล์ที่เกี่ยวข้อง**: `exercises/reduce-examples.js`  
**ขั้นต่อไป**: `Promise.all()` และ `Promise.race()`  
**สถานะ**: ✅ เข้าใจ `reduce()` แล้ว - กำลังฝึกตัวอย่างเพิ่ม
