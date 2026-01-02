# Events App 

A modern event management web application built with **Angular 21**, **Angular Material (Material 3)**, and a mock REST backend using **json-server**.

This project demonstrates clean frontend architecture, standalone Angular components, service-based data handling, and a polished Material Design 3 interface.  
It is built for internal company use and team collaboration.

---

## Features

- Event overview with Angular Material table  
- Event detail page with ticket information  
- Ticket reservation and confirmation flow  
- User feedback via Material SnackBars  
- Loading indicators with Material progress spinner  
- Custom Material 3 theme and SCSS variables  
- Mock REST API powered by `json-server`  

---

## Tech Stack

- **Angular 21** (Standalone APIs)  
- **Angular Material (Material 3)**  
- **RxJS** (`firstValueFrom`)  
- **json-server** (mock backend)  
- **TypeScript**  
- **SCSS / Material Theming**  

---

## Project Structure

```text
src/
 ├── app/
 │   ├── pages/
 │   │   ├── event-list/
 │   │   ├── event-detail/
 │   │   └── event-form/
 │   ├── services/
 │   │   ├── event.service.ts
 │   │   └── snackbar.service.ts
 │   └── app.routes.ts
 ├── styles.scss
 └── custom-theme.scss

db.json
```

##  Run the Project Locally

Follow these steps to set up and run the project locally (or on your company workstation):

###  1. Clone the repository

```bash
git clone https://github.com/nina-bejam/events-app.git
cd events-app
```
---

### 2. Install dependences
    
```bash
npm install
```

---

### 3. Start the full environment (Angular + json-server)

```bash
npm start
```
This will automatically:

- Launch the Angular app at http://localhost:4200
- Start the mock backend (json-server) at http://localhost:3000
- Open your browser automatically

---

## Requirements

1. Node.js, v18 or higher
2. npm (comes with Node)
3. Internet connection (for first-time dependency install)
