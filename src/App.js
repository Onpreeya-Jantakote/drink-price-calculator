import { useState } from "react";
import './App.css';

const menu = [
  { name: "สิงห์ (ขวด)", price: 100, unit: "ขวด" },
  { name: "สิงห์ (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "ลีโอ (ขวด)", price: 100, unit: "ขวด" },
  { name: "ลีโอ (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "ช้างคลาสสิค (ขวด)", price: 100, unit: "ขวด" },
  { name: "ช้างคลาสสิค (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "ช้าง Cold Brew", price: 100, unit: "ขวด" },
  { name: "ช้าง Cold Brew (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "ลาเกอร์", price: 100, unit: "ขวด" },
  { name: "ลาเกอร์ (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "ดุงเกล คาราบาว", price: 100, unit: "ขวด" },
  { name: "ดุงเกล คาราบาว (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "IPA", price: 100, unit: "ขวด" },
  { name: "IPA (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "ไวเซ่น (ขวด)", price: 100, unit: "ขวด" },
  { name: "ไวเซ่น (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "โรเซ่", price: 100, unit: "ขวด" },
  { name: "โรเซ่ (กระป๋อง)", price: 100, unit: "กระป๋อง" },
  { name: "หงส์กลม", price: 350, unit: "ขวด" },
  { name: "แสงกลม", price: 390, unit: "ขวด" },
  { name: "รีแบน", price: 500, unit: "ขวด" },
  { name: "น้ำ", price: 15, unit: "ขวด" },
  { name: "โซดา", price: 30, unit: "ขวด" },
  { name: "น้ำแข็ง", price: 30, unit: "ถัง" },
  { name: "โค้ก (ลิตร)", price: 50, unit: "ขวด" },
  { name: "แก้ว", price: 5, unit: "ใบ" },
  { name: "ทิชชู", price: 10, unit: "ชิ้น" }
];

function App() {
  const [order, setOrder] = useState(
    menu.map((item) => ({ ...item, quantity: 0 }))
  );

  const handleAdd = (index) => {
    const newOrder = [...order];
    newOrder[index].quantity += 1;
    setOrder(newOrder);
  };

  const handleRemove = (index) => {
    const newOrder = [...order];
    if (newOrder[index].quantity > 0) {
      newOrder[index].quantity -= 1;
      setOrder(newOrder);
    }
  };

  const handleClear = () => {
    setOrder(menu.map((item) => ({ ...item, quantity: 0 })));
  };

  const calculateItemPrice = (item) => {
    if (item.price === 100 && item.quantity >= 6) {
      const packs = Math.floor(item.quantity / 6);
      const remainder = item.quantity % 6;
      return (packs * 500) + (remainder * 100);
    } else {
      return item.price * item.quantity;
    }
  };

  const totalPrice = order.reduce((sum, item) => sum + calculateItemPrice(item), 0);

  return (
    <div className="App">
      <h1>🍻 คำนวณราคาเครื่องดื่ม 🍻</h1>
      {order.map((item, index) => (
      <div key={index} className="item-card">
        <span>{item.name} ({item.price}฿)</span>
        <div className="quantity-control">
          <button className="minus-btn" onClick={() => handleRemove(index)}>-</button>
          <span className="quantity">{item.quantity}</span>
          <button className="plus-btn" onClick={() => handleAdd(index)}>+</button>
        </div>
      </div>
    ))}

      <h2>📋 รายการที่เลือก:</h2>
      {order.filter(item => item.quantity > 0).length === 0 && <p>ยังไม่มีรายการที่เลือก</p>}
      {order.filter(item => item.quantity > 0).map((item, index) => (
        <div key={index} className="summary-row">
          <span>{item.name} {item.quantity} {item.unit}</span>
          <span> {calculateItemPrice(item)} ฿</span>
        </div>
      ))}

      <div className="total">
        รวมทั้งหมด: {totalPrice} ฿
      </div>
      <button onClick={handleClear} className="clear-btn">
        ล้างข้อมูล
      </button>
    </div>
  );
}

export default App;
