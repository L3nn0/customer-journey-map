<div align="center">

# 🗺️ Customer Journey Map Creator

**Ein moderner, interaktiver Customer Journey Map Builder im eleganten Editorial-Design.**  
*100% Client-Side • PWA (Progressive Web App) • Optimiert für GitHub Pages • Kostenlos & Open Source*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-ea580c.svg)](https://pages.github.com/)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646cff.svg?logo=vite)](https://vitejs.dev/)

[**Live Demo ausprobieren**](#-live-demo--deployment) • [**Features**](#-features) • [**Schnellstart**](#-schnellstart) • [**GitHub Pages Deployment**](#-deployment-auf-github-pages) • [**Mitwirken**](#-mitwirken--contributing)

---

</div>

## 📖 Über das Projekt

Der **Customer Journey Map Creator** ermöglicht es UX/UI-Designern, Product Managern, Gründern und Forscherteams, saubere, publikationsreife Customer Journey Maps direkt im Browser zu gestalten – ganz ohne teure Software oder komplexe Design-Tools.

Das Design orientiert sich an der bekannten, minimalistischen **Black & White Editorial Journey Map** (u. a. bekannt aus der *„Jumping Jamie“* Fallstudie):
- Große, übersichtliche Tabelle mit klarer Typografie
- Persona-Block mit Avatar und Erwartungen
- Dynamische Phasen (2 bis 10 Spalten)
- **Interaktiv ziehbare Motivationskurve (Emotion Curve)**
- Frei platzierbare Sprechblasen für Kundenstimmen und Zitate
- Bereiche für Opportunities, Metriken und interne Verantwortlichkeiten

---

## 🌟 Features

### 👤 1. Persona & Szenario Header
- **Persona-Name & Kontext**: Szenario und Ziele der Persona frei editieren.
- **Avatar-Auswahl**: Wähle aus typischen Persona-Icons oder lade ein eigenes Bild/Foto hoch.
- **Erwartungen (Expectations)**: Titel und Aufzählungspunkte dynamisch hinzufügen oder löschen.

### 📊 2. Dynamische Phasen (2 bis 10 Spalten)
- Spalten flexibel hinzufügen (`+ Spalte`), umbenennen, löschen oder mit `<` / `>` umsortieren.
- Touchpoints / Aktionen werden **automatisch fortlaufend durchnummeriert** (1., 2., 3., ...).
- Schritte können innerhalb jeder Phase nach oben oder unten verschoben werden.

### 📈 3. Interaktive Motivations- & Emotionskurve
- Organische Catmull-Rom Bézier-Kurve, die sich horizontal durch alle Phasen erstreckt.
- **Intuitive Steuerung**: Ziehe Kontrollpunkte einfach mit der Maus oder dem Finger nach oben (*Begeisterung/Motivation*) oder unten (*Frustration/Schmerzpunkte*).
- **Doppelklick** auf das Board fügt einen neuen Kontrollpunkt ein.
- Punkte können mit einem Klick gelöscht werden.

### 💬 4. Sprechblasen & Zitate
- Füge echte Nutzerkommentare und Zitate (*Quotes*) hinzu.
- Sprechblasen frei an jede beliebige Stelle der Kurve verschieben.
- **Pfeilausrichtung umkehrbar**: Klick schaltet den Pfeil zwischen *nach oben zur Kurve* und *nach unten zur Kurve* um.

### 🎯 5. Untere Bereiche (Opportunities & Metrics)
- Standardmäßig unterteilt in **Opportunities** und **Internal Ownership + Metrics**.
- Bereiche können frei umbenannt, gelöscht oder erweitert werden (z. B. für *Pain Points*, *Tech Metrics*, *Ideen*).

### 👁️ 6. Präsentations- & Export-Modi
- **Bearbeiten-Modus**: Schnelle Bearbeitung mit Drag-Handles, Inline-Inputs und Werkzeugen.
- **Vorschau-Modus (Posteransicht)**: Schaltet alle Bearbeitungselemente aus für eine saubere Präsentationsansicht.
- 📷 **PNG Export**: Hochauflösender 2.5x Retina-Export.
- 📋 **In Zwischenablage kopieren**: Direkt per `Strg+V` in PowerPoint, Slack, Miro oder Notion einfügen.
- 🖨️ **PDF / Drucken**: Vorkonfiguriertes Querformat-Drucklayout (DIN-A4 / Letter).
- 💾 **JSON Export & Import**: Eigene Maps sichern, teilen und wiederherstellen.
- 🔄 **Auto-Save**: Speichert den aktuellen Stand automatisch im Browser (`localStorage`).

### 📱 7. Progressive Web App (PWA)
- Funktioniert **100% offline** dank modernem Service Worker.
- Auf Desktop (Chrome/Edge/Brave) sowie Mobilgeräten (iOS/Android) als eigenständige App installierbar.

---

## 📐 Aufbau einer Journey Map

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Avatar]  JUMPING JAMIE                      EXPECTATIONS              │
│           Scenario: Jamie needs to switch... • Clear online info       │
│                                              • Plan breakdowns         │
├───────────────┬───────────────┬───────────────┬────────────────────────┤
│    DEFINE     │    COMPARE    │   NEGOTIATE   │         SELECT         │
├───────────────┼───────────────┼───────────────┼────────────────────────┤
│ 1. Step A     │ 3. Step C     │ 6. Step E     │ 8. Step G              │
│ 2. Step B     │ 4. Step D     │ 7. Step F     │                        │
│               │ 5. Step ...   │               │                        │
│     💬        │               │               │           💬           │
│    ╭───╮      │               │     💬        │         ╭────╮         │
│ ───╯   ╰──────┼───────╮       │   ╭─────╮     │       ╭─╯    ╰───────  │
│               │       ╰───────┼───╯     ╰─────┼───────╯ (Motivations-  │
│               │          💬   │               │            kurve)      │
├───────────────┴───────────────┴───────────────┴────────────────────────┤
│ OPPORTUNITIES                     INTERNAL OWNERSHIP + METRICS         │
│ • Compare alternate offers        • Support: reduce call time to 2m    │
│ • Breakdown current plan          • Web: add comparison functionality  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Schnellstart

### Voraussetzungen
- Node.js (Version 18 oder neuer)
- npm, pnpm oder yarn

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/<dein-username>/<repo-name>.git
cd <repo-name>

# 2. Abhängigkeiten installieren
npm install

# 3. Lokalen Entwicklungsserver starten
npm run dev
```

Die App ist nun unter `http://localhost:5173` im Browser erreichbar.

---

## 🌐 Deployment auf GitHub Pages

Dieses Repository ist **Out-of-the-Box** für GitHub Pages vorbereitet:
- Vite verwendet relative Basispfade (`base: './'`).
- Ein automatisierter GitHub Actions Workflow (`.github/workflows/deploy.yml`) ist bereits enthalten.

### Schritt-für-Schritt Anleitung:

1. **Repository auf GitHub pushen**:
   ```bash
   git add .
   git commit -m "feat: initial release"
   git branch -M main
   git remote add origin https://github.com/<dein-username>/<repo-name>.git
   git push -u origin main
   ```

2. **GitHub Pages in den Repository-Einstellungen aktivieren**:
   - Öffne dein Repository auf GitHub.
   - Navigiere zu **Settings** ➔ **Pages**.
   - Wähle unter **Build and deployment** bei **Source**:
     👉 **GitHub Actions**

3. **Fertig!**
   - GitHub startet automatisch den Build- und Deployment-Workflow.
   - Deine App ist in wenigen Augenblicken live unter:  
     `https://<dein-username>.github.io/<repo-name>/`

---

## 📱 Als PWA installieren

### Desktop (Chrome, Edge, Brave):
1. Öffne die Live-URL im Browser.
2. Klicke auf das **Installieren-Symbol** in der Adressleiste oder nutze den grünen **Installieren**-Button in der Navigationsleiste.
3. Die App öffnet sich nun in einem eigenen, ablenkungsfreien Fenster.

### iOS / iPadOS (Safari):
1. Öffne die Website in Safari.
2. Tippe auf das **Teilen**-Symbol (Viereck mit Pfeil nach oben).
3. Scrolle nach unten und wähle **Zum Home-Bildschirm**.

### Android:
1. Öffne die Website in Chrome.
2. Tippe auf die drei Punkte oben rechts und wähle **App installieren** bzw. **Zum Startbildschirm hinzufügen**.

---

## 🧰 Tech-Stack

- **Framework**: [React 19](https://react.dev/) mit [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Export Engine**: [html-to-image](https://github.com/bubkoo/html-to-image) & Canvas Confetti
- **PWA**: Service Worker & Web App Manifest

---

## 🤝 Mitwirken / Contributing

Beiträge, Feedback und Feature-Wünsche sind herzlich willkommen!

1. **Forke** das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/tolles-feature`)
3. Committe deine Änderungen (`git commit -m 'Add some great feature'`)
4. Pushe den Branch (`git push origin feature/tolles-feature`)
5. Öffne einen **Pull Request**

---

## 📄 Lizenz

Dieses Projekt steht unter der **[MIT Lizenz](LICENSE)**. Du kannst es frei für private und kommerzielle Zwecke verwenden, anpassen und weiterentwickeln.

---

<div align="center">
  <sub>Erstellt mit ❤️ für einfache und wirkungsvolle Customer Journeys.</sub>
</div>
