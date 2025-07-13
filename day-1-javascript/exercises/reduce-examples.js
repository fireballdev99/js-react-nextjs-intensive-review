// reduce() - reduce elements in array to sigle vaule

// ยกตัวอย่างคิดเงินรวมของสินค้าที่ cashier

const numbers = [15, 6, 24, 55, 44, 96, 72, 10, 16];

const sum = (sum, current) => {
  return sum + current;
};

const total = numbers.reduce(sum);
// หรือจะเขียนแบบ Arrow Function ก็ได้เช่น

const totalArrow = numbers.reduce((sum, current) => sum + current);

console.log(`ยอดชำระ: ${total} THB`);
console.log(`ยอดชำระ(Arrow): ${totalArrow} THB`);

// นับจำนวนคำซ้ำใน Array
const words = ["apple", "banana", "apple", "orange", "banana", "banana"];

// จะใช้ acc แทน accumulator
const count = (acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
};

const result = words.reduce(count, {});

console.log(result);

// หาค่าเฉลี่ยคะแนนของนักเรียน

const students = [
  { name: "John", score: 50 },
  { name: "Jane", score: 82 },
  { name: "Joe", score: 95 },
  { name: "Jim", score: 68 },
];

const average =
  students.reduce((acc, student) => acc + student.score, 0) / students.length;

console.log(average);

// แปลง Array ให้เป็น Object (by id)
const users = [
  { id: "u1", name: "John" },
  { id: "u2", name: "Jane" },
  { id: "u3", name: "Jim" },
  { id: "u4", name: "Jones" },
  { id: "u5", name: "Jack" },
];

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

console.log(userMap);

// ลองเพิ่ม logic:
// * รวมคะแนนเฉพาะคนที่สอบผ่าน (score >= 75)
// * ทำฟังก์ชัน groupBy(array, key)
// * ทำ shopping cart → รวมยอดทุกสินค้า (qty * price)
// ช่วยให้คำใบ้หน่อย ไม่ต้องบอกคำตอบฉัน

// 1. รวมคะแนนเฉพาะของคนที่สอบผ่าน >= 75 คะแนน

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

// 2. จัดการหมวดหมู่ของสินค้าตามประเภทโดยใช้ reduce แทน groupby

const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

const groupBy = inventory.reduce((acc, inven) => {
  // Step 1: เช็ค acc["vegetables"] มีไหม?

  //   console.log("acc before:", acc); // {}
  //   console.log("inven.type:", inven.type); // "vegetables" <- ยกตัวอย่างรอบแรก
  //   console.log("acc[inven.type]:", acc[inven.type]); // undefined

  // Step 2: ไม่มี → สร้างใหม่
  if (!acc[inven.type]) acc[inven.type] = [];
  //   console.log("acc after create:", acc); // { vegetables: [] } <- ยกตัวอย่างรอบแรก

  // Step 3: push object ใหม่
  acc[inven.type].push({ name: inven.name, qty: inven.quantity });
  //   console.log("acc after push:", acc);
  return acc;
}, {});

console.log(groupBy);

// 3. ทำ shopping cart → รวมยอดทุกสินค้า (qty * price)

const cart = [
  { name: "โทรศัพท์", price: 25000, qty: 1 },
  { name: "หูฟัง", price: 2500, qty: 2 },
  { name: "เคส", price: 500, qty: 3 },
  { name: "สายชาร์จ", price: 300, qty: 2 },
  { name: "แท็บเล็ต", price: 15000, qty: 1 },
];

// แยกประเภทแต่ละประเภท เผื่อนำไปทำสรุปว่าประเภทไหนราคาเท่าไหร่
const sumPrice = cart.reduce((acc, item) => {
  acc[item.name] = { sumPrice: item.price * item.qty };
  return acc;
}, {});

console.log(sumPrice);

// ทำตามโจทย์เอาแค่ qty*price

const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

console.log(`ราคารวมสินค้า: ${totalPrice}`);

// หรือทำทั้งเก็บประเภทแยกรายการและรายการรวม

const listAndTotal = cart.reduce(
  (acc, item) => {
    // คิดราคารวมก่อน
    const totalPrice = item.qty * item.price;
    // แยกรายการ
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
