# Personal Portfolio — Jenny Hernandez

---

## 🚀 Features

- **Interactive AI Assistant ("Nini")**: Powered by the `@google/genai` SDK to answer visitor inquiries about projects, skills, education, and credentials in real-time.
- **Featured Projects Showcase**: Categorized list of web systems, database architectures, and capstone applications with links to personal and academic GitHub repositories.
- **Credentials & Certifications**: Interactive modal preview for verified certificates, workshops, and achievements.
- **Contact Form & Dual GitHub Profiles**: Integrated communication options with separate profiles for personal and university projects.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v3](https://tailwindcss.com/) & PostCSS |
| **Icon Library** | [Lucide React](https://lucide.dev/) |
| **AI Integration** | [Google Gen AI SDK](https://www.npmjs.com/package/@google/genai) 

---

## ⚙️ Prerequisites

Before running the project locally, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

---

## 📥 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Nej2005/Portfolio.git
   cd Portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and specify your configuration:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_TEXT_MODEL=gemini-3.6-flash
   GEMINI_TTS_MODEL=gemini-3.6-flash
   GEMINI_TTS_VOICE=Kore
   ```

---

## 📜 Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`
Starts the local development server with Hot Module Replacement (HMR).
- Open `http://localhost:5173` to view it in your browser.

### `npm run build`
Compiles and builds the production bundle into the `dist/` folder with minification and optimized assets.

### `npm run preview`
Locally previews the production build generated in the `dist/` folder.

