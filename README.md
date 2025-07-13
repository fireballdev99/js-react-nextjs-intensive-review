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
