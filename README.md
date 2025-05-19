# ✅ Todo App

A fully responsive and functional Todo application built with **React** and styled using **Tailwind CSS**. The app connects to a simulated backend via **MockAPI**, handles API communication with **Redux Toolkit Query**, and includes client-side routing using **React Router**. Users receive real-time feedback with toast notifications for all key actions.


---

## 📁 Overview

The application allows users to:

- View a list of tasks with their current status
- Add new tasks with title and description
- Edit existing tasks
- Mark tasks as done or in progress
- Delete tasks when no longer needed

---

## 🔗 Live Demo

Visit the app here: https://gemini-task-inky.vercel.app

---

## 🧪 Pages & Functionality

### Responsive navigation bar

### 🏠 Home Page 
- Dynamic task statistics:
  - Number of tasks in progress
  - Number of done tasks

### 📝 Todos Page (`/todos`)
- Render a list of all tasks
- Each task shows:
  - Title
  - Description
  - Status (`in progress` or `done`)
- Users can:
  - Add a new task
  - Edit an existing one
  - Delete a task
  - Toggle status via checkbox

---

## 📝 Todo Modal

 Todo Modal is a reusable component for handling Todo submition or editing, in which displays different forms depending on needed operation

--

## 🔌 API & Data

- **Backend**: Simulated using [MockAPI](https://mockapi.io)

- **Base URL**: https://6827d9996b7628c529117dff.mockapi.io/todos
  
- Integrated using `createApi` and `fetchBaseQuery` from RTK Query

---

## 🛠 Tech Stack

- ⚛️ React

- 🎨 Tailwind CSS

- ⚙️ Redux Toolkit Query (RTK Query)

- 🌐 React Router

- 🔔 React Toastify

- ⏳ Custom loader for async operations

---

## 🚨 Error Handling

Using react toast error messaging for error handling, unsuccessful tasks and fallbacks for empty sent inputs 

---

## ⚙️ How to Run Locally

- `git clone git@github.com:youssef-eissa/gemini-task.git`

- `cd gemini-task`

- `npm install`

- `npm run dev`

---

## ✅ Deliverables

- Fully functional and styled Todo application

- Modular and maintainable code

- All features implemented as specified

- Error handling and user-friendly feedback included















