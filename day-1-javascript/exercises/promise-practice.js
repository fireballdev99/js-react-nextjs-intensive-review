const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

// ตัวอย่าง function จาก claude ai โดยฉันได้เพิ่ม const API_ENDPOINT เพื่อให้อ่านง่ายขึ้น
async function fetchUsersSequentialClaude() {
  console.time("SequentialClaude");

  const user1 = await fetch(`${API_ENDPOINT}/1`);
  const user1Data = await user1.json();
  console.log("Got user 1:", user1Data.name);

  const user2 = await fetch(`${API_ENDPOINT}/2`);
  const user2Data = await user2.json();
  console.log("Got user 2:", user2Data.name);

  const user3 = await fetch(`${API_ENDPOINT}/3`);
  const user3Data = await user3.json();
  console.log("Got user 3:", user3Data.name);

  console.timeEnd("SequentialClaude");
  return [user1Data, user2Data, user3Data];
}

async function fetchUsersParallelClaude() {
  console.time("ParallelClaude");

  const [user1, user2, user3] = await Promise.all([
    fetch(`${API_ENDPOINT}/1`).then((res) => res.json()),
    fetch(`${API_ENDPOINT}/2`).then((res) => res.json()),
    fetch(`${API_ENDPOINT}/3`).then((res) => res.json()),
  ]);

  console.log("Got all users:", user1.name, user2.name, user3.name);
  console.timeEnd("ParallelClaude");
  return [user1, user2, user3];
}

async function comparePerformanceClaude() {
  console.log("🐌 Sequential (ทีละคน):");
  await fetchUsersSequentialClaude();

  console.log("\n🚀 Parallel (พร้อมกัน):");
  await fetchUsersParallelClaude();
}

// comparePerformanceClaude();

// ลองปรับปรุงโค้ดและทำความเข้าใจ

const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function fetchUsersSequential() {
  console.time("Sequential");
  const result = await users.reduce(async (acc, userId, index) => {
    const prevResult = await acc;
    const res = await fetch(`${API_ENDPOINT}/${userId}`);
    const data = await res.json();
    console.log(`Got user ${index + 1}: ${data.name}`);
    return [...prevResult, data];
  }, Promise.resolve([]));
  console.timeEnd("Sequential");
  return result;
}

async function fetchUsersParallel() {
  console.time("Parallel");
  const result = await Promise.all(
    users.map(async (userId, index) => {
      const res = await fetch(`${API_ENDPOINT}/${userId}`);
      const data = await res.json();
      console.log(`Got user ${index + 1}: ${data.name}`);
      return data;
    })
  );
  console.timeEnd("Parallel");
  return result;
}

// เปรียบเทียบ
async function comparePerformance() {
  console.log("===== 🐌 Sequential (ทีละคน) =====");
  await fetchUsersSequential();

  console.log("\n===== 🚀 Parallel (พร้อมกัน) =====");
  await fetchUsersParallel();
}

// comparePerformance();

// โจทย์: สร้าง dashboard ที่ดึงข้อมูลจากหลาย APIs พร้อมกัน

// // 1. User profile
// `https://jsonplaceholder.typicode.com/users/${userId}`

// // 2. User's posts
// `https://jsonplaceholder.typicode.com/users/${userId}/posts`

// // 3. User's albums
// `https://jsonplaceholder.typicode.com/users/${userId}/albums`

// ตัวอย่างของ Claude
// แบบช้า - ดึงทีละตัว
// โจทย์: สร้าง dashboard ที่ดึงข้อมูลจากหลาย APIs พร้อมกัน

// แบบช้า - ดึงทีละตัว
async function createDashboardSlowClaude(userId) {
  console.time("Dashboard Slow");

  // ดึงทีละตัว
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((r) => r.json());
  const posts = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  ).then((r) => r.json());
  const albums = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  ).then((r) => r.json());

  console.timeEnd("Dashboard Slow");
  return { user, posts, albums };
}

// แบบเร็ว - ดึงพร้อมกัน
async function createDashboardFastClaude(userId) {
  console.time("Dashboard Fast");

  const [user, posts, albums] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((r) =>
      r.json()
    ),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then(
      (r) => r.json()
    ),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`).then(
      (r) => r.json()
    ),
  ]);

  console.timeEnd("Dashboard Fast");
  return { user, posts, albums };
}

function displayDashboard(data) {
  console.log("📊 Dashboard:");
  console.log(`👤 User: ${data.user.name}`);
  console.log(`📝 Posts: ${data.posts.length} posts`);
  console.log(`📸 Albums: ${data.albums.length} albums`);
}

async function compareDashboard() {
  console.log("🐌 Dashboard แบบช้า:");
  const slowResult = await createDashboardSlowClaude(1);
  displayDashboard(slowResult);

  console.log("\n🚀 Dashboard แบบเร็ว:");
  const fastResult = await createDashboardFastClaude(1);
  displayDashboard(fastResult);
}

// compareDashboard();

// โจทย์สร้าง Profile Card
async function createUserProfileCardSeq(userId) {
  console.time("Sequential Card");
  const user = await fetch(`${API_ENDPOINT}/${userId}`).then((r) => r.json());
  const post = await fetch(`${API_ENDPOINT}/${userId}/posts`).then((r) =>
    r.json()
  );
  const latestPost = await post.slice(-3);
  console.timeEnd("Sequential Card");
  return { user, latestPost };
}

async function createUserProfileCardPara(userId) {
  console.time("Parallel Card");
  const [user, posts] = await Promise.all([
    fetch(`${API_ENDPOINT}/${userId}`).then((r) => r.json()),
    fetch(`${API_ENDPOINT}/${userId}/posts`).then((r) => r.json()),
  ]);
  const latestPost = await posts.slice(-3);
  console.timeEnd("Parallel Card");
  return { user, latestPost };
}

function displayUserProfile(data) {
  console.log(`=== Profile Card: ${data.user.name} ===`);
  console.log(`Email: ${data.user.email}`);
  console.log(`Company: ${data.user.company.name}`);
  console.log(`Recent posts: ${data.latestPost.length} posts`);
}

async function compareProfileCard(id) {
  console.log("Sequential Card");
  const seqRes = await createUserProfileCardSeq(id);
  displayUserProfile(seqRes);
  console.log("Parallel Card");
  const paraRes = await createUserProfileCardPara(id);
  displayUserProfile(paraRes);
}

// compareProfileCard(1);

// โจทย์เขียน Function ให้ใช้หลาย ID ได้

function displayMultiUserDashboard(usersData) {
  console.log("Multi User Dashboard");
  usersData.forEach((userData, index) => {
    console.log(`User ${index + 1}: ${userData.user.name}`);
    console.log(`Posts: ${userData.posts.length}`);
    console.log(`Albums: ${userData.albums.length}`);
  });
}

async function createUserProfileCardMulti(userIds) {
  const result = await Promise.all(
    userIds.map(async (userId) => {
      const [user, posts, albums] = await Promise.all([
        fetch(`${API_ENDPOINT}/${userId}`).then((r) => r.json()),
        fetch(`${API_ENDPOINT}/${userId}/posts`).then((r) => r.json()),
        fetch(`${API_ENDPOINT}/${userId}/albums`).then((r) => r.json()),
      ]);
      return { user, posts, albums };
    })
  );

  return result;
}

// createUserProfileCardMulti(users).then((r) => displayMultiUserDashboard(r));

// โจทย์ที่ 3: Error Resilient Dashboard

async function createSafeDashboard(userId) {
  console.time("Safe Dashboard");

  try {
    // ลองใส่ URL ที่จะ error ดู
    const results = await Promise.all([
      fetch(`${API_ENDPOINT}/${userId}`).then((r) => r.json()),
      fetch(`${API_ENDPOINT}/${userId}/posts`).then((r) => r.json()),
      fetch(`https://invalid-url-404.com/data`).then((r) => r.json()), // ❌ จะ error
      fetch(`${API_ENDPOINT}/${userId}/albums`).then((r) => r.json()),
    ]);

    console.log("✅ All success:", results);
  } catch (error) {
    console.log("❌ Promise.all() failed:", error.message);

    // วิธีแก้: ใช้ Promise.allSettled()
    console.log("\n🔄 Trying Promise.allSettled()...");

    const settledResults = await Promise.allSettled([
      fetch(`${API_ENDPOINT}/${userId}`).then((r) => r.json()),
      fetch(`${API_ENDPOINT}/${userId}/posts`).then((r) => r.json()),
      fetch(`https://invalid-url-404.com/data`).then((r) => r.json()), // ❌ จะ error
      fetch(`${API_ENDPOINT}/${userId}/albums`).then((r) => r.json()),
    ]);
    console.log("Settled Results");
    settledResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`API ${index + 1}: Success!`);
      } else {
        console.log(`API ${index + 1}: ${result.reason.message}`);
      }
    });
  }

  console.timeEnd("Safe Dashboard");
}

// ทดสอบ
createSafeDashboard(1);
