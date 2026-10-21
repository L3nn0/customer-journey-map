<div align="center">

# 🗺️ Customer Journey Map Creator

**Eine interaktive Web-App zur Erstellung professioneller Customer Journey Maps im minimalistischen Editorial-Design.**  
*Direkt im Browser nutzbar • Offline-fähig als Progressive Web App (PWA) • Kostenlos & Open Source*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 💡 Über die App

Der **Customer Journey Map Creator** ist ein fokussiertes Werkzeug für UX/UI-Designer, Product Manager, Berater und Entwicklungsteams. Die Anwendung ermöglicht es, Kundenerlebnisse, Touchpoints und emotionale Höhen und Tiefen strukturiert und visuell ansprechend darzustellen – ohne komplexe Design-Software oder kostenpflichtige Abonnements.

Das Design zeichnet sich durch einen klaren, typografisch reduzierten **Black & White Editorial-Stil** aus, der sich nahtlos in Kundenpräsentationen, Strategie-Workshops, Pitch Decks und Dokumentationen einfügt.

---

## ✨ Kernfunktionen

- **👤 Persona- & Szenario-Bereich**:
  - Persona-Name, Kontext und das konkrete Szenario erfassen.
  - Vordefinierte Persona-Symbole auswählen oder ein eigenes Profilbild hochladen.
  - Erwartungshaltungen (*Expectations*) der Zielgruppe als Aufzählungspunktliste definieren.

- **📊 Flexible Phasen (2 bis 10 Spalten)**:
  - Dynamische Spaltenanzahl für unterschiedliche Journey-Längen (z. B. *Entdecken*, *Vergleichen*, *Entscheiden*, *Nutzen*).
  - Phasen per Klick hinzufügen, entfernen, umbenennen oder in der Reihenfolge verschieben.
  - Berührungspunkte und Aktionen (*Touchpoints*) mit automatischer Durchnummerierung.

- **📈 Interaktive Motivations- & Emotionslinie**:
  - Organische Bézier-Kurve, die sich horizontal durch die gesamte Journey zieht.
  - **Freies Ziehen**: Kontrollpunkte einfach mit Maus oder Touchscreen nach oben (*hohe Motivation / Begeisterung*) oder nach unten (*Frustration / Hürden*) ziehen.
  - Beliebig viele Kontrollpunkte per Doppelklick hinzufügen oder bei Bedarf wieder entfernen.

- **💬 Zitate & Nutzerstimmen (Sprechblasen)**:
  - Echte O-Töne, Zitate oder Gedanken der Persona platzieren.
  - Sprechblasen frei auf dem Board verschieben.
  - Ausrichtung des Zeigepfeils per Klick umkehren (zeigt nach oben oder nach unten zur Kurve).

- **🎯 Chancen, Metriken & Verantwortlichkeiten**:
  - Modulare Bereiche unterhalb der Journey für *Opportunities*, *Internal Ownership*, *KPIs* oder *Pain Points*.
  - Beliebige Anzahl an Unterbereichen und Aufzählungspunkten.

- **📷 Hochauflösender Export & Datensicherung**:
  - **PNG-Export (2.5x Retina)**: Gestochen scharfe Grafiken für Präsentationen und Whiteboards.
  - **In Zwischenablage kopieren**: Direkt per Tastenkürzel (`Strg+V` / `Cmd+V`) in Slack, Notion oder Präsentationsprogramme einfügen.
  - **PDF & Druckoptimierung**: Speziell formatiertes DIN-A4 Querformat (`@media print`).
  - **JSON Backup & Teilen**: Projekte als JSON-Datei exportieren und jederzeit wieder importieren.
  - **Automatisches Speichern**: Alle Änderungen werden lokal im Browser (`localStorage`) gesichert.

- **📱 Progressive Web App (PWA)**:
  - Funktioniert vollständig **offline** ohne Internetverbindung.
  - Lässt sich als eigenständige Desktop- oder Mobile-App auf dem Homescreen installieren.

---

## 📐 Aufbau der Journey Map

Die Journey Map folgt einer erprobten und übersichtlichen Struktur:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Avatar]  PERSONA NAME                       ERWARTUNGEN               │
│           Szenario & Kontextbeschreibung     • Erwartung 1             │
│                                              • Erwartung 2             │
├───────────────┬───────────────┬───────────────┬────────────────────────┤
│    PHASE 1    │    PHASE 2    │    PHASE 3    │        PHASE 4         │
├───────────────┼───────────────┼───────────────┼────────────────────────┤
│ 1. Schritt A  │ 3. Schritt C  │ 6. Schritt E  │ 8. Schritt G           │
│ 2. Schritt B  │ 4. Schritt D  │ 7. Schritt F  │                        │
│               │ 5. Schritt ...│               │                        │
│     💬        │               │               │           💬           │
│    ╭───╮      │               │     💬        │         ╭────╮         │
│ ───╯   ╰──────┼───────╮       │   ╭─────╮     │       ╭─╯    ╰───────  │
│ (Motivations- │       ╰───────┼───╯     ╰─────┼───────╯                │
│    kurve)     │          💬   │               │                        │
├───────────────┴───────────────┴───────────────┴────────────────────────┤
│ CHANCEN & POTENZIALE              VERANTWORTLICHKEITEN & METRIKEN      │
│ • Optimierungspotenzial 1         • Team-Ziel & Messgröße 1            │
│ • Touchpoint-Verbesserung 2       • Durchschnittliche Bearbeitungszeit │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Datenschutz & Offline-First

- **100% Client-Side**: Alle Eingaben verbleiben ausschließlich in deinem Browser.
- **Keine Server-Übertragung**: Es werden keine Analysedaten, Tracking-Cookies oder Nutzerinhalte an externe Server übertragen.
- **Vollständig offline nutzbar**: Auch im Zug, im Flugzeug oder ohne aktive Internetverbindung einsatzbereit.

---

## 📄 Lizenz

Dieses Projekt ist unter der **[MIT Lizenz](LICENSE)** lizenziert und kann frei genutzt, angepasst und erweitert werden.
