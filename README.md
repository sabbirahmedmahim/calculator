# Simple B&W Calculator with Timer

A sleek, minimalist, monochrome calculator built entirely with Vanilla JavaScript, HTML5, and raw CSS3. This project focuses on clean Object-Oriented Programming (OOP) principles, state management, and strict separation of concerns without relying on external libraries or the unsafe `eval()` function.

**🔗 [Live Demo: Click Here to View]([Insert your live link here])**

---

## 🚀 Features

### Calculator
* **Core Operations:** Addition, Subtraction, Multiplication, Division.
* **Advanced Functions:** Square Root (√), Square (x²), Power (xʸ), and Percentage (%).
* **Algorithmic State Management:** Custom computation logic (Two-Operand Architecture) that avoids standard mathematical parsing bugs.
* **Floating Point Precision:** Mitigates standard IEEE 754 rounding errors (e.g., `0.1 + 0.2 = 0.3`).
* **Keyboard Support:** Fully mapped keyboard inputs for seamless typing.

### Built-in Timer
* Independent stopwatch functionality running parallel to the calculator.
* Play, Pause, and Reset controls.

### UI / UX
* **Monochrome Aesthetic:** High-contrast, distraction-free black and white design.
* **Dark/Light Theme Toggle:** Instantly invert colors for comfortable viewing.
* **Responsive Grid:** Structured using CSS Grid for a robust, flexible keypad layout.

---

## 🛠️ Technologies Used

* **HTML5:** Semantic markup and structured `data-` attributes.
* **CSS3:** Raw CSS, Flexbox, CSS Grid, and custom variables for theme toggling.
* **Vanilla JavaScript (ES6+):** Class-based OOP architecture, event delegation, and strict DOM manipulation.

---

## 🧠 Technical Highlights

* **No `eval()`:** The calculator engine securely evaluates inputs step-by-step using a custom Switch-Case logic block rather than executing arbitrary strings.
* **Class-Based Architecture:** The logic is divided into two separate, encapsulated classes (`Calculator` and `Timer`). This ensures they maintain their own internal states without polluting the global namespace or interfering with one another.
* **Event Listeners:** Efficient DOM selection using `querySelectorAll` to map user interface buttons dynamically to class methods.

---

## 💻 Getting Started (Local Setup)

Since this project is built with Vanilla web technologies, no build tools or package managers (like npm) are required.

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/bw-calculator.git](https://github.com/yourusername/bw-calculator.git)
