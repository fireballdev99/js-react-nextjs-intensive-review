# Day 1: JavaScript Logic & Async - ทบทวนสิ่งที่ไม่แน่น

> **วันที่**: 13-Jul-2025  
> **สถานะ**: ✅ เสร็จสิ้น `reduce()` - เข้าใจลึกซึ้งแล้ว

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

### ตัวอย่างการใช้งานจริง

#### ตัวอย่างที่ 1: รวมตัวเลขแบบง่าย ๆ

```javascript
const numbers = [15, 6, 24, 55, 44, 96, 72, 10, 16];

const totalArrow = numbers.reduce((sum, current) => sum + current);
console.log(`ยอดชำระ(Arrow): ${totalArrow} THB`); // 338 THB
```

#### ตัวอย่างที่ 2: นับจำนวนคำซ้ำใน Array

```javascript
const words = ["apple", "banana", "apple", "orange", "banana", "banana"];

const count = (acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
};

const result = words.reduce(count, {});
console.log(result);
// { apple: 2, banana: 3, orange: 1 }
```

#### ตัวอย่างที่ 3: หาค่าเฉลี่ยคะแนนของนักเรียน

```javascript
const students = [
  { name: "John", score: 50 },
  { name: "Jane", score: 82 },
  { name: "Joe", score: 95 },
  { name: "Jim", score: 68 },
];

const average =
  students.reduce((acc, student) => acc + student.score, 0) / students.length;
console.log(average); // 73.75
```

#### ตัวอย่างที่ 4: แปลง Array ให้เป็น Object (by id)

```javascript
const users = [
  { id: "u1", name: "John" },
  { id: "u2", name: "Jane" },
  { id: "u3", name: "Jim" },
];

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
// { u1: {id: "u1", name: "John"}, u2: {...}, u3: {...} }
```

---

## 💪 ตัวอย่างขั้นสูง

### ตัวอย่างที่ 5: ระบบคัดเฉพาะนักเรียนที่สอบผ่าน

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

  //   โดยส่วนนี้ทำไว้เพื่อดู log เพื่อศึกษาการไหลผ่านของข้อมูล
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

### ตัวอย่างที่ 6: จัดกลุ่มสินค้าตามประเภท (GroupBy)

```javascript
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

const groupBy = inventory.reduce((acc, inven) => {
  if (!acc[inven.type]) acc[inven.type] = [];
  acc[inven.type].push({ name: inven.name, qty: inven.quantity });
  return acc;
}, {});

console.log(groupBy);
// {
//   vegetables: [{ name: "asparagus", qty: 9 }],
//   fruit: [{ name: "bananas", qty: 5 }, { name: "cherries", qty: 12 }],
//   meat: [{ name: "goat", qty: 23 }, { name: "fish", qty: 22 }]
// }
```

### ตัวอย่างที่ 7: Shopping Cart - คำนวณยอดรวม

```javascript
const cart = [
  { name: "โทรศัพท์", price: 25000, qty: 1 },
  { name: "หูฟัง", price: 2500, qty: 2 },
  { name: "เคส", price: 500, qty: 3 },
  { name: "สายชาร์จ", price: 300, qty: 2 },
  { name: "แท็บเล็ต", price: 15000, qty: 1 },
];

// วิธีที่ 1: แค่ยอดรวม
const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
console.log(`ราคารวมสินค้า: ${totalPrice}`); // 47,100

// วิธีที่ 2: รายละเอียด + ยอดรวม
const listAndTotal = cart.reduce(
  (acc, item) => {
    const totalPrice = item.qty * item.price;
    acc.items[item.name] = {
      price: item.price,
      qty: item.qty,
      total: totalPrice,
    };
    acc.grandTotal += totalPrice;
    return acc;
  },
  { items: {}, grandTotal: 0 }
);

console.log(listAndTotal);
// {
//   items: {
//     "โทรศัพท์": { price: 25000, qty: 1, total: 25000 },
//     "หูฟัง": { price: 2500, qty: 2, total: 5000 },
//     ...
//   },
//   grandTotal: 47100
// }
```

---

## 🔧 เทคนิคสำคัญที่เรียนรู้

### 1. Bracket Notation กับ Dynamic Keys

```javascript
// ใช้ค่าจาก variable เป็น property key
acc[item.name] = value; // ✅ ใช้ค่าใน item.name
acc[student.stu] = student; // ✅ ใช้รหัสนักเรียนเป็น key

// เปรียบเทียบกับ dot notation
acc.name = value; // ❌ สร้าง property ชื่อ "name"
```

### 2. Conditional Object Creation

```javascript
// เช็คว่ามี property แล้วสร้างถ้ายังไม่มี
if (!acc[key]) acc[key] = []; // สร้าง array ใหม่
if (!acc[key]) acc[key] = 0; // สร้างค่าเริ่มต้น

// หรือใช้ OR operator
acc[word] = (acc[word] || 0) + 1; // เพิ่มจำนวนนับ
```

### 3. Complex Initial Value

```javascript
// Object ที่มีหลาย property
{ items: {}, grandTotal: 0 }
{ passed: [], failed: [], total: 0 }
{ groups: {}, count: 0, summary: {} }
```

### 4. Multiple Operations ใน Reducer

```javascript
const result = array.reduce(
  (acc, item) => {
    const calculated = item.qty * item.price;

    // Operation 1: เก็บรายการ
    acc.items[item.name] = { ...item, total: calculated };

    // Operation 2: รวมยอด
    acc.grandTotal += calculated;

    // Operation 3: นับจำนวน
    acc.count++;

    return acc;
  },
  { items: {}, grandTotal: 0, count: 0 }
);
```

---

## 🚨 ข้อผิดพลาดที่เจอและแก้ไข

### 1. ลืม Return Statement

```javascript
// ❌ ผิด - ลืม return
const wrong = array.reduce((acc, item) => {
  if (item.condition) {
    acc[item.id] = item;
  }
  // ไม่มี return!
}, {});

// ✅ ถูก - return เสมอ
const correct = array.reduce((acc, item) => {
  if (item.condition) {
    acc[item.id] = item;
  }
  return acc;
}, {});
```

### 2. ลืม Initial Value

```javascript
// ❌ อันตราย - ไม่ใส่ initial value
const sum = numbers.reduce((a, b) => a + b); // เริ่มจาก element แรก

// ✅ ปลอดภัย - ใส่ initial value
const sum = numbers.reduce((a, b) => a + b, 0); // เริ่มจาก 0
```

---

## 🔍 Debugging Tips

### 1. Console.log เพื่อเข้าใจ Flow

```javascript
const result = array.reduce((acc, item, index) => {
  console.log(`รอบที่ ${index + 1}:`, item);
  console.log("acc before:", JSON.stringify(acc, null, 2));

  // ทำงานจริง
  acc[item.type] = item;

  console.log("acc after:", JSON.stringify(acc, null, 2));
  return acc;
}, {});
```

### 2. เช็ค Type และ Property

```javascript
const result = array.reduce((acc, item) => {
  console.log("item:", item);
  console.log("item.type:", item.type);
  console.log("typeof acc:", typeof acc);
  console.log("acc keys:", Object.keys(acc));

  return acc;
}, {});
```

---

## สิ่งที่จะทำต่อไป

### เสร็จสิ้นแล้ว ✅:

- [x] `reduce()` - รวมตัวเลข, นับคำซ้ำ, หาค่าเฉลี่ย
- [x] แปลง Array → Object (by id)
- [x] กรองข้อมูลตามเงื่อนไข (นักเรียนสอบผ่าน)
- [x] จัดกลุ่มข้อมูล (GroupBy ด้วย reduce)
- [x] คำนวณ Shopping Cart (qty × price)
- [x] Object structure ซับซ้อน (items + grandTotal)

### ตัวอย่างที่อาจจะลองเพิ่ม:

- [ ] หาค่าสูงสุด/ต่ำสุดแบบซับซ้อน
- [ ] แปลง Array เป็น Map/Set
- [ ] Flatten nested arrays
- [ ] Pipeline pattern ด้วย reduce

### หัวข้ออื่น ๆ ที่ยังไม่ได้เรียน:

- [ ] `Promise.all()` / `Promise.race()` - จัดการ async หลายตัว
- [ ] `closure` & `currying` - แนวคิดขั้นสูง
- [ ] `debounce` & `throttle` - เพิ่มประสิทธิภาพ
- [ ] `console.assert()` - testing เบื้องต้น
- [ ] Array methods chaining - ต่อ methods แบบลื่น

---

## บันทึกส่วนตัว

### สิ่งที่ยากในตอนแรก:

- **Initial value** ลืมใส่บ่อย → Error หรือผลลัพธ์ผิด
- **Return statement** ลืม return ในบาง case → ได้ undefined
- **Object key assignment** งงว่า `acc[key] = value` ทำงานยังไง โดยปกติจะเจอในตัวอย่างแต่ก็ต้องมา debug เพื่อ log ดูค่าก่อนแล้วค่อยเขียนต่อ
- **Bracket notation** ไม่เข้าใจความแตกต่างกับ dot notation

### สิ่งที่เข้าใจแล้ว:

- `reduce()` เป็นของโคตรดีใน Array methods ซึ่งฉันไม่ค่อยได้ใช้เลย
- สามารถแทนที่ `map()`, `filter()` ได้ (แต่ไม่ควรเสมอไป)
- การไหลของข้อมูลใน accumulator แต่ละรอบ
- **Bracket notation** ใช้เมื่อต้องการ dynamic key
- **Object creation** ใน reduce สำหรับ grouping
- **Multiple operations** ในฟังก์ชันเดียวได้

### ประโยชน์ที่เห็นชัด:

- **Performance**: loop เดียวแทนหลาย loop
- **Readability**: โค้ดสั้นลง เข้าใจง่ายขึ้น (ถ้าเข้าใจมันจริง ๆ)
- **Flexibility**: ทำอะไรได้เยอะ ไม่ใช่แค่รวมตัวเลข
- **Data transformation**: แปลง structure ได้ตามต้องการ

### เทคนิคที่จำได้:

1. **เช็คเสมอ** ว่ามี return statement
2. **ใส่ initial value** เสมอเพื่อป้องกัน bug
3. **console.log** เพื่อ debug data flow
4. **ใช้ bracket notation** กับ dynamic keys
5. **if (!acc[key])** pattern สำหรับสร้าง property ใหม่

### สิ่งที่จะนำไปใช้:

1. **ใช้ reduce() แปลง data structure** แทน multiple loops
2. **groupBy pattern** สำหรับจัดกลุ่มข้อมูล
3. **shopping cart pattern** สำหรับการคำนวณซับซ้อน
4. **debugging pattern** ด้วย console.log ใน reducer

---

**ไฟล์ที่เกี่ยวข้อง**: `exercises/reduce-examples.js`  
**ขั้นต่อไป**: `Promise.all()` และ `Promise.race()` - Async patterns  
**สถานะ**: ✅ เข้าใจ `reduce()` ลึกซึ้งแล้ว - พร้อมไปหัวข้อต่อไป
