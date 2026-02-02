# 💼 CRUDZASO - Academic Task Management System

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

A high-performance **Task Management Application** built with a focus on clean code and efficient state management. This project features a custom-built Single Page Application (SPA) engine.

## 🛠️ Technical Optimization
The codebase has been refactored from **314 to 223 lines of code** without losing functionality.
* **Unified Template Engine**: Merged Dashboard and Task views into a single intelligent rendering function.
* **Package Manager**: Optimized with **Yarn** for faster and more secure dependency management.
* **Dynamic Routing**: Implemented a map-based navigation system for fluid transitions.
* **Clean State Management**: Fully integrated `localStorage` to persist tasks and user profile data.

## 🎨 UI/UX Problem Solving
This version specifically resolves critical design bugs identified in previous iterations:
* **Avatar Scaling Fix**: Fixed oversized profile images by enforcing strict CSS dimensions (120px).
* **Data Integrity**: Resolved `undefined` display errors in task lists by standardizing the data object structure.
* **Layout Stability**: Implemented a centered access container and a structured sidebar to prevent UI "breaking" during navigation.

## ✨ Features
* **Custom SPA Navigation**: Fast view switching without full page reloads.
* **Professional Dashboard**: Includes statistics for total, completed, and pending tasks.
* **Task Categorization**: Support for Academic Categories, Status Badges, and Priority Indicators (High/Medium/Low).
* **Session Control**: Secure Logout flow that clears session data and redirects to the Login view.

## 🚀 Installation & Setup (Using Yarn)
1. **Clone the repo**: `git clone https://github.com/Jeskaai/CRUDZASO.git`
2. **Install dependencies**: `yarn install`
3. **Run development server**: `yarn dev`

---
*Developed as part of the Web Development module at **Riwi**.*
