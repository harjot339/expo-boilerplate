# 🚀 Expo Boilerplate

A production-ready Expo boilerplate built with best practices for scalable React Native development. This setup includes:

- 🧭 React Navigation
- 🧠 Redux Toolkit for state management
- 🌐 Localization with i18n
- 🎨 Theming with light/dark support
- 🧹 ESLint + Prettier for consistent code quality
- 🐶 Husky + Commitlint for Git commit standards
- 🖼️ Built-in support for SVGs, images, and custom fonts

---

## 🚀 Getting Started

### 1. Create a New Project from This Template

You can initialize a new Expo project using this boilerplate:

```bash
npx create-expo-app my-app --template https://github.com/harjot339/expo-boilerplate
```

### 2. Install Dependencies

```bash
yarn
```

### 3.Start the Development Server

```bash
yarn start
```

## 📊 SonarQube Setup for Code Quality & Coverage

### 1. Install Docker

### 2. Install SonarScanner Globally

```bash
npm install -g sonar-scanner
```

#### Verify installation

```bash
sonar-scanner -h
```

### 3. Run SonarQube in Docker

```bash
docker-compose up
```

Access it at: http://localhost:9000

Default credentials: admin / admin (you’ll be prompted to change the password)

### 4. After sonarqube is running properly on http://localhost:9000 , create a project locally, and note down the creds!

### 5. To check the sonarqube coverage, you need to execute the below command with respect to the project created on step 4

```bash
sonar-scanner -Dsonar.projectKey=project-name -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.token=project-token
```

### Note: Update project-token with the token generated after step 4
