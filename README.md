# JavaScript/React/Next.js Intensive Review

> **เวลา 3 วันทบทวนตัวเองให้เข้าใจมากขึ้น**:รื้อฟื้นและเข้าใจ Technology Frontend แบบลึกๆ และทบทวนในสิ่งที่ลืมเมื่อไม่ได้ใช้งาน นานเกินไป

## เป้าหมายโปรเจค

- **ทบทวนในสิ่งที่ยังไม่แน่น** - เน้นหัวข้อที่ไม่ค่อยได้ใช้งาน หรือยังไม่ค่อยเข้าใจ และ ลืม
- **ใช้งานได้จริง** - ไม่ใช่แค่ทฤษฎีต้องนำ Code ไปประยุกต์ได้
- **ใช้งานได้จริง** - เขียน Documentaion (md) ในความเข้าใจของตัวเองให้ได้ ถือว่าได้ฝึกเขียน Markdown ด้วย

---

## แผนการเรียนรู้ 3 วัน

### Day 1: JavaScript Logic & Async

**เป้าหมาย**: ทบทวน JavaScript ในส่วนที่ไม่ชำนาญ
**Locations**: `day-1-javascript/`

#### หัวข้อที่ทบทวน

- [ ] `reduce()` - ใช้งานจริงนอกเหนือจากรวมตัวเลข
- [ ] `Promise.all()` / `Promise.race()` - จัดการ async หลายตัวพร้อมกัน
- [ ] `closure` & `currying` - แนวคิดที่อาจงง แต่ใช้งานได้จริง
- [ ] `debounce` & `throttle` - เทคนิคเพิ่มประสิทธิภาพ
- [ ] `console.assert()` - เทสต์เบื้องต้นไม่ต้องพึ่ง library
- [ ] Array methods chaining - `map()`, `filter()`, `some()`, `every()`
- [ ] อื่นๆ(อาจเพิ่มในภายหลัง)

#### วิธีรัน

```bash
cd day-1-javascript
node exercises/reduce-examples.js
node exercises/promise-practice.js
node exercises/closure-currying.js
node exercises/debounce-throttle.js
```

#### Output

- `1-js-logic-and-async.md` - บันทึกการเรียนรู้และตัวอย่างโค้ด

---

### Day 2: React & Hooks Optimization

**เป้าหมาย**: จัดการ State และเพิ่มประสิทธิภาพ React เนื่องจากไปฝึกงานมาแล้วรู้สึกเว็บทำงานได้ช้า
**Location**: `day-2-react/`

#### หัวข้อที่ทบทวน

- [ ] `useReducer()` - จัดการ state ซับซ้อน (login/signup form)
- [ ] `useMemo()` / `useCallback()` - กรอง list แบบ realtime
- [ ] `useRef()` - ใช้กับ input focus, timer
- [ ] Re-render Behavior - เข้าใจ render ที่ไม่จำเป็น
- [ ] Component Tree Debug - ใช้ React DevTools ดู performance
- [ ] Custom Hooks - สร้าง `useLocalStorage`, `useFetch`
- [ ] Context API - จัดการ state ระดับ global
- [ ] หรืออื่นๆ (เพิ่มในอนาคต)

#### วิธีรัน

```bash
cd day-2-react
npm install
npm run dev
```

#### Output

- `2-react-hooks-and-optimization.md` - บันทึกการเรียนรู้และ performance tips

---

### Day 3: Next.js App Router & Testing

**เป้าหมาย**: เข้าใจ App router และการทำงานทุกอย่างของ Next.js และการ Testing เบื้องต้น

**Location**: `day-3-nextjs/`

#### หัวข้อที่ทบทวน

- [ ] SSR / CSR / SSG - เข้าใจ render ต่างกันยังไง
- [ ] Layout.tsx, nested route - สร้างโครงหน้า admin/blog
- [ ] API Routes - เขียน `/api/todo` + handler
- [ ] `generateMetadata()` - SEO / title / Open Graph
- [ ] Middleware - auth check, redirect
- [ ] Server Actions - form handling แบบใหม่
- [ ] Testing - Jest + React Testing Library พื้นฐาน
- [ ] และอื่นๆ (อาจเพิ่มในอนาคต)

#### วิธีรัน

```bash
cd day-3-nextjs
npm install
npm run dev
npm run test
```

#### Output

- `3-nextjs-routing-api-testing.md` - บันทึกการเรียนรู้และ best practices

---

## โครงสร้างไฟล์

```
js-react-nextjs-intensive-review/
├── day-1-javascript/
│   ├── exercises/
│   │   ├── reduce-examples.js
│   │   ├── promise-practice.js
│   │   ├── closure-currying.js
│   │   └── debounce-throttle.js
│   └── 1-js-logic-and-async.md
├── day-2-react/
│   ├── src/
│   │   ├── components/
│   │   └── hooks/
│   ├── package.json
│   └── 2-react-hooks-and-optimization.md
├── day-3-nextjs/
│   ├── app/
│   │   ├── api/
│   │   └── admin/
│   ├── package.json
│   └── 3-nextjs-routing-api-testing.md
└── README.md
```

> **Generate Stucture with claude.ai**

---

## Quick Start

### Prerequisites

- Node.js version 18 หรือสูงกว่า
- Git
- Text Editor (VS Code แนะนำ)

### การติดตั้ง

```bash
# Clone repository (ถ้าใช้ Git)
git clone https://github.com/fireballdev99/js-react-nextjs-intensive-review.git
cd js-react-nextjs-intensive-review
```

### เริ่มต้นแต่ละวัน

```bash
# Day 1 - JavaScript
cd day-1-javascript
node exercises/reduce-examples.js
# or other path

# Day 2 - React Development
cd day-2-react
npm install
npm run dev
# เปิดเบราว์เซอร์ไปที่ http://localhost:5173

# Day 3 - Next.js Development
cd day-3-nextjs
npm install
npm run dev
# เปิดเบราว์เซอร์ไปที่ http://localhost:3000
```

---

## สิ่งที่จะได้เรียนรู้

### JavaScript (Day1)

- เข้าใจ `reduce()` แบบลึกๆ
- จัดการ Promise หลายตัวด้วย `Promise.all()` และ `Promise.race()`
- เข้าใจ Closure และ Currying ในการใช้งานจริง
- เทคนิค Debounce/Throttle เพื่อเพิ่มประสิทธิภาพ
- การเทสต์เบื้องต้นด้วย `console.assert()`

### React (Day 2)

- การใช้ `useReducer()` จัดการ state ที่ซับซ้อน
- เพิ่มประสิทธิภาพด้วย `useMemo()` และ `useCallback()`
- เข้าใจ Re-render behavior และการ optimize
- สร้าง Custom Hooks ที่ใช้งานได้จริง
- การใช้ Context API อย่างมีประสิทธิภาพ

### Next.js (Day 3)

- เข้าใจ App Router และ rendering strategies
- การสร้าง API Routes และ Server Actions
- การจัดการ SEO ด้วย `generateMetadata()`
  \*การเขียน Test ด้วย Jest และ React Testing Library
- การ deploy และ optimization สำหรับ production

---

## Portfolio Highlights

โปรเจคนี้แสดงให้เห็น:

- **Modern JavaScript Patterns** - เข้าใจและใช้ ES6+ features อย่างมีประสิทธิภาพ
- **React Best Practices** - การเขียน React ที่มีประสิทธิภาพ และ maintainable
- **Next.js Full-stack Capabilities** - สร้าง web application ที่สมบูรณ์
- **Testing Methodologies** - การเขียน Test
- **Documentation Skills** - การเขียนเอกสารที่เข้าใจง่าย

---

## Resources

### เอกสารอ้างอิง

- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- อื่นๆ อาจจะเพิ่มเข้ามาทีหลัง

### Tools ที่ใช้

- **Development**: Vite, Next.js
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

---

## Progress Tracking

### Day 1 - JavaScript

- [x] เข้าใจ `reduce()` แบบลึก ✅
- [x] เรียนรู้ Promise patterns ✅
- [x] Promise.all() vs Promise.allSettled() ✅
- [x] Sequential vs Parallel performance ✅
- [x] Dashboard patterns (Single & Multi-user) ✅
- [x] Error handling strategies ✅
- [ ] เข้าใจ Closure และ Currying
- [ ] ใช้ Debounce/Throttle ได้
- [ ] เขียน test ด้วย `console.assert()`
- [x] เขียน markdown สรุปความรู้ ✅

### Day 2 - React

- [ ] ใช้ `useReducer()` จัดการ form
- [ ] เพิ่มประสิทธิภาพด้วย `useMemo()`/`useCallback()`
- [ ] เข้าใจ Re-render behavior
- [ ] สร้าง Custom Hooks
- [ ] ใช้ Context API
- [ ] เขียน markdown สรุปความรู้

### Day 3 - Next.js

- [ ] เข้าใจ SSR/CSR/SSG
- [ ] สร้าง Layout และ nested routes
- [ ] เขียน API Routes
- [ ] ใช้ `generateMetadata()`
- [ ] เขียน Test พื้นฐาน
- [ ] เขียน markdown สรุปความรู้

---

**เริ่มต้น**: วันที่ [13-Jul-2025]  
**สถานะ**: ⏳ กำลังดำเนินการ  
**ผู้เขียน**: [fireballdev99]
