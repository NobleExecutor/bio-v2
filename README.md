# 🌙 Florent — Portfolio V2 (Persona 3 Reload Edition)

<div align="center">

[![Site en Ligne](https://img.shields.io/badge/Demo%20Live-bio.noblexecutor.xyz-0a3fd6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://bio.noblexecutor.xyz/)
[![Theme](https://img.shields.io/badge/Theme-Persona%203%20Reload-3ee0ff?style=for-the-badge&logo=playstation&logoColor=030818)](https://persona.atlus.com/p3r/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-FTP%20Deploy-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/NobleExecutor/bio-v2/actions)
[![License](https://img.shields.io/badge/License-MIT%20%2F%20Non--Commercial-ff2d4b?style=for-the-badge)](#-auteur--crédits)

<p align="center">
  <b>Portfolio personnel interactif inspiré par l'esthétique, la cinématique et l'interface utilisateur du jeu vidéo culte <i>Persona 3 Reload</i> (ATLUS / SEGA).</b>
</p>

[Aperçu & Concept](#-aperçu--concept) •
[Fonctionnalités Clés](#-fonctionnalités-phares) •
[Direction Artistique](#-direction-artistique--design-system) •
[Architecture](#-architecture--structure-du-projet) •
[Lecteur Musical](#-lecteur-audio-p3r-makoto-yuki) •
[Installation Locale](#-installation--démarrage-local) •
[Déploiement](#-déploiement-continu-cicd) •
[Auteur & Crédits](#-auteur--crédits)

---

</div>

## 📌 Aperçu & Concept

Ce projet constitue la **seconde version (V2)** de mon portfolio en ligne. Développeur web passionné et étudiant en **BUT Métiers du Multimédia et de l'Internet (MMI)** à l'Université de Haute-Alsace (Mulhouse), j'ai conçu ce site afin de combiner ma passion pour le web créatif et mon admiration pour le travail d'UI/UX design d'ATLUS sur **_Persona 3 Reload_**.

> **Objectif :**  
> Recréer une interface web percutante, réactive et cinématique, reprenant les codes graphiques, typographiques, sonores et interactifs du menu pause et du baladeur MP3 de *Persona 3 Reload*, le tout **sans aucun framework lourd** — uniquement en **Vanilla HTML5, CSS3 et JavaScript moderne**.

L'intégration du menu pause s'appuie sur le travail open-source de **[deltea/p3r-pause-menu](https://github.com/deltea/p3r-pause-menu)**, d'où proviennent les ressources multimédias de base (vidéo de fond, typographies, effets sonores et tracés de curseur), réadaptées ici en JavaScript natif.

Le portfolio a également pour rôle de présenter mon parcours universitaire, mes compétences techniques, mes projets significatifs, et d'accompagner ma recherche active d'une **alternance de 2 ans en développement web** (2025–2028).

---

## 🌟 Fonctionnalités Phares

### 🎮 1. Menu Pause P3R Interactif & Cinématique (`js/menu.js`)
- **Ambiance sous-marine en vidéo continue** : arrière-plan vidéo animé (`assets/background.mp4`) intégré dans le conteneur du menu, synchronisé avec les ouvertures et fermetures.
- **Pile d'options inclinées 2D/3D** : chaque option (`À PROPOS`, `PARCOURS`, `PROJETS`, `CONTACT`) possède son angle de rotation (`--base-rot`) et son décalage spatial sur mesure.
- **Curseur SVG bicolore dynamique avec masques SVG (`<mask id="selector-mask-X">`)** :
  - Survol ou focus dévoilant un curseur géométrique triangulaire magenta (`#FD77D9`) et blanc.
  - Masque vectoriel inversé permettant d'afficher le texte en superposition rouge néon (`p3r-opt-text-red`) avec une précision chirurgicale.
- **Index latéral dynamique rotatif** : indicateur vertical grand format (`01`, `02`, `03`, `04`) calqué sur l'interface du jeu.
- **Effets sonores originaux (SFX)** : retours audio immersifs (`assets/sfx/navigation.wav`) lors de l'ouverture du menu, de la navigation entre les éléments et de la sélection.
- **Navigation double souris / clavier** :
  - `W` / `S` ou `Flèche Haut` / `Flèche Bas` : sélection de l'option précédente / suivante.
  - `Entrée` ou `Espace` : validation de la sélection et défilement fluide vers la section ciblée.
  - `Échap` (`ESC`) : fermeture instantanée du menu.
- **Barre de commande de style JRPG** : invite de commandes en bas à droite indiquant les raccourcis avec une icône de souris vectorielle SVG personnalisée et touche `ESC`.
- **Verrouillage automatique du scroll** (`body.lock`) et conservation d'état de l'élément sélectionné (`lastClickedIdx`).

### 🎧 2. Lecteur Audio Intégré « Makoto Yuki Stick MP3 Player » (`js/music-player.js`)
- **Widget flottant compact en disque CD** :
  - Disque vinyle/CD stylisé en bas à droite de l'écran, tournant en temps réel lors de la lecture (`.spinning`).
  - Badge d'état central Play/Pause (`▶` / `❚❚`).
- **Déploiement vers le baladeur MP3 de Makoto Yuki** :
  - Reproduction vectorielle intégrale en SVG du baladeur emblématique du protagoniste (embout cranté noir, anneau argenté, câble et prise jack 3.5mm, corps en aluminium brossé et texture métallique).
  - Écran LCD vertical rétroéclairé cyan affichant le titre de la chanson en rotation, le chrono dynamique et l'état de lecture.
- **Playlist officielle de 9 morceaux de l'OST _Persona 3 Reload_** :
  1. *Full Moon Full Life* (Opening Theme)
  2. *Color Your Night*
  3. *When The Moon's Reaching Out Stars -Reload-*
  4. *Changing Seasons -Reload-*
  5. *巌戸台分寮 -Reload-* (Iwatodai Dorm)
  6. *Mass Destruction -Reload-* (Lotus Juice)
  7. *It's Going Down Now*
  8. *全ての人の魂の戦い* (The Battle for Everyone's Souls)
  9. *キミの記憶 -Reload-* (Memories of You)
- **Contrôles multimédia complets** : boutons Précédent, Suivant, Lecture/Pause, sélecteur direct de piste via menu déroulant, barre de progression interactive scrubable et potentiomètre de volume.
- **Persistance des préférences via `localStorage`** : mémorisation automatique du volume d'écoute (`p3r_volume`) et de la dernière piste sélectionnée (`p3r_track_idx`).

### ✍️ 3. Effet Machine à Écrire sur le Badge Hero (`js/typewriter.js`)
- Badge incliné animé en en-tête alternant avec naturel entre différents statuts :
  - *« Recherche alternance »*
  - *« Hello, World »*
  - *« Bienvenue »*
- Respect automatique du paramètre d'accessibilité utilisateur `prefers-reduced-motion: reduce`.

### 🗂️ 4. Sections de Contenu du Portfolio
- **Hero** : Titre percutant, résumé de profil et statut d'alternance.
- **À propos** : Philosophie de développement, apprentissage en continu et ambition de maîtrise Full-Stack (du site vitrine à l'application web complexe connectée à des APIs et bases de données).
- **Parcours (Chronologie)** :
  - **BUT MMI** — Université de Haute-Alsace, Mulhouse (2025 – 2028, en cours).
  - **Licence Mathématiques-Informatique** — Université de Haute-Alsace, Mulhouse (2023 – 2025, programmation orientée objet en C++).
  - **Baccalauréat général** — Lycée Louis Armand, Mulhouse (2021 – 2023, spécialités NSI et LLCER anglais, mention Assez Bien).
- **Projets Réalisés** :
  - **Portfolio (V2)** : cette application web Vanilla HTML/CSS/JS reprenant l'univers de Persona 3 Reload.
  - **SAE 203 · Wiki Evangelion** : application web MVC en PHP 8.3 & MySQL/MariaDB avec moteur de recherche dynamique et architecture conteneurisée Docker.
  - **Quick Notes App** : application de prise de notes rapide avec persistance locale dans le navigateur.
  - **Site Web ADF** : communication à 360° et site vitrine WordPress pour une association de self-défense.
  - **Film Search App** : exploration de React, des composants JSX, des hooks d'état et des APIs REST.
  - **Portfolio (V1)** : première vitrine web animée avec GSAP et déployée via GitHub Actions.
- **Contact Direct** : coordonnées rapides (adresse mail DuckDuckGo privacy-friendly, localisation à Mulhouse, liens LinkedIn et GitHub) et bouton d'action CTA biseauté.

### ⬆️ 5. Bouton Flottant « Retour en Haut » (`js/back-to-top.js`)
- Bouton trapézoïdal aux couleurs P3R apparaissant en fondu dès 300px de scroll vertical.
- Défilement fluide automatique ramenant à l'ancrage `#top`.

---

## 🎨 Direction Artistique & Design System

L'ensemble de la charte graphique s'appuie sur la direction artistique unique de *Persona 3 Reload*, caractérisée par un fort contraste d'abîme bleu marine, des néons cyan, des touches de rouge/rose saturés et des lignes angulaires biseautées.

### 🎭 Palette Chromatique

| Variable CSS | Code HEX | Utilisation |
| :--- | :--- | :--- |
| `--abyss` | `#030818` | Fond principal nocturne et profond |
| `--navy` | `#071a4a` | Dégradés d'accentuation et bordures de cartes |
| `--blue` | `#0A3FD6` | Ombres dures décalées (*hard drop shadows*) et lueurs P3R |
| `--cyan` | `#3EE0FF` | Boutons d'action, accents fluo, contours de sélection |
| `--ice` | `#E8FBFF` | Typographie principale haute lisibilité |
| `--red` | `#FF2D4B` | Contrastes d'alerte et survol d'accentuation |
| `--p3r-btn-1..4` | `#16CFFB`, `#7DE6FD`, `#22A6F2`, `#77FEFC` | Dégradé de teintes individuelles pour les options du menu |
| *Curseur Accent* | `#FD77D9` | Rose néon emblématique du curseur P3R |

### 🔤 Typographie Officielle

Le projet intègre directement les polices de caractères officielles via `@font-face` (fichiers locaux sous `assets/fonts/`) avec préchargement (`rel="preload"`) dans le `<head>` :

- **Skip Std B** : utilisée pour les titres majeurs (`H1`, `H2`, `H3`), les boutons biseautés et les étiquettes fortes.
- **Expressway Bold** : police géométrique alternative pour les intitulés et badges.
- **NewRodin Pro & Rodin Pro** (déclinées du Light au Ultra Bold) : corps de texte, descriptions, listes et métadonnées.

### 📐 Géométrie et Découpes Spatiales
- **Inclinaison skew systématique** : utilisation de `transform: skewX(-12deg)` sur les conteneurs et étiquettes, avec contre-inclinaison `transform: skewX(12deg)` pour maintenir la lisibilité des textes.
- **Clip-paths polygonaux** : boutons biseautés créés avec `polygon(14% 0, 100% 0, 86% 100%, 0 100%)`.
- **Fond texturé dynamique (`.bgfx`)** : combinaison de lignes diagonales à 115° et d'un dégradé radial bleu électrique.
- **Prise en charge des encoches et barres tactiles (iOS / Android)** : intégration native de `viewport-fit=cover` et `env(safe-area-inset-top / bottom)`.

---

## 🗂 Architecture & Structure du Projet

Le projet a été développé dans une philosophie **zero-dependency** : aucun bundler requis (Webpack, Vite, Rollup), aucun framework (React, Vue, Svelte), aucune bibliothèque tierce importée via CDN.

```text
bio-v2/
├── index.html                   # Document HTML5 sémantique principal (structure & SVGs)
│
├── css/
│   └── styles.css               # Système de design, variables CSS, typographies, responsive
│
├── js/
│   ├── menu.js                  # Contrôleur du menu pause (navigation clavier/souris, SFX)
│   ├── music-player.js          # Moteur du lecteur audio P3R (baladeur MP3, LCD, playlist)
│   ├── typewriter.js            # Animation de machine à écrire du badge d'en-tête
│   └── back-to-top.js           # Détection du scroll et bouton de retour haut de page
│
├── assets/
│   ├── background.mp4           # Boucle vidéo d'ambiance sous-marine pour le menu pause
│   ├── favicon.ico              # Favicon du site
│   ├── selection-cursor.svg     # Tracé vectoriel du curseur de sélection
│   ├── selection-cursor-background.svg # Fond étendu du curseur vectoriel
│   │
│   ├── sfx/
│   │   └── navigation.wav       # Bruitage sonore de navigation UI officiel
│   │
│   ├── fonts/                   # Polices typographiques du jeu au format OTF / TTF
│   │   ├── Expressway Bold.ttf
│   │   ├── Skip Std B.otf
│   │   ├── NewRodin Pro (L, M, DB, EB, UB).otf
│   │   └── Rodin Pro (L, M, DB, B, EB, UB).otf
│   │
│   └── music/                   # Pistes musicales Persona 3 Reload (format MP3)
│       ├── Full Moon Full Life.mp3
│       ├── Color Your Night.mp3
│       ├── When The Moon's Reaching Out Stars -Reload-.mp3
│       ├── Changing Seasons -Reload-.mp3
│       ├── 巌戸台分寮 -Reload-.mp3
│       ├── Mass Destruction -Reload-.mp3
│       ├── It's Going Down Now.mp3
│       ├── 全ての人の魂の戦い.mp3
│       └── キミの記憶 -Reload-.mp3
│
├── .github/
│   └── workflows/
│       └── main.yml             # Workflow de déploiement automatique FTP sur git push
│
└── README.md                    # Documentation complète du projet
```

---

## 🎵 Lecteur Audio P3R (Makoto Yuki)

Le lecteur audio combine du dessin vectoriel SVG pur et les fonctionnalités de l'API HTML5 Audio.

```
       [ Disque CD Rotatif (État compact au repos) ]
                           │
             (Survol / Clic d'ouverture)
                           ▼
 ┌────────────────────────────────────────────────────────┐
 │   BALADEUR MP3 DE MAKOTO YUKI (SVG Haute Précision)    │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │ ● Câble jack audio 3.5mm                         │  │
 │  │ ● Bouchon supérieur noir cranté                  │  │
 │  │ ● Corps cylindrique en aluminium                 │  │
 │  │ ● Écran LCD rétroéclairé : [ FULL MOON... 02:45] │  │
 │  └──────────────────────────────────────────────────┘  │
 │                                                        │
 │   COMMANDES MULTIMÉDIA P3R AUDIO                       │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │ P3R AUDIO                              [01/09] ✕ │  │
 │  │ Full Moon Full Life                              │  │
 │  │ 00:42 ──────────────────●─────────────── 03:26   │  │
 │  │              [ ⏮ ]    [ ▶ / ❚❚ ]    [ ⏭ ]       │  │
 │  │ [Menu déroulant pistes ▾]  [Volume ───●────────] │  │
 │  └──────────────────────────────────────────────────┘  │
 └────────────────────────────────────────────────────────┘
```

- **Calcul de positionnement interactif** : la barre de progression calcule la position cliquée proportionnellement à `audio.duration`.
- **Gestion des fins de piste** : écoute de l'événement natif `ended` pour enchaîner automatiquement sur la piste suivante (`autoPlay: true`).
- **Gestion des erreurs et autoplay browser policy** : le lecteur encapsule les appels `audio.play()` dans des promesses sécurisées pour respecter les politiques de lecture automatique des navigateurs modernes.

---

## 🚀 Installation & Démarrage Local

Puisqu'il s'agit d'un projet web statique moderne, aucun gestionnaire de paquets (`npm`, `yarn`, `bun`) ni étape de compilation n'est strictement obligatoire.

Cependant, en raison du chargement des pistes audio locales, de la vidéo de fond et des polices `@font-face`, **l'utilisation d'un serveur HTTP local est fortement conseillée** pour éviter les blocages de politiques de sécurité CORS (`file://`).

### 1. Cloner le Dépôt

```bash
git clone https://github.com/NobleExecutor/bio-v2.git
cd bio-v2
```

### 2. Lancer un Serveur Local

Choisissez l'une des méthodes suivantes selon vos outils habituels :

#### Méthode A : Avec Python 3 (intégré sur macOS et Linux)
```bash
python3 -m http.server 8000
```
Puis ouvrez votre navigateur sur [http://localhost:8000](http://localhost:8000).

#### Méthode B : Avec Node.js (`npx serve`)
```bash
npx serve .
```
Puis ouvrez l'adresse indiquée (ex: [http://localhost:3000](http://localhost:3000)).

#### Méthode C : Avec PHP
```bash
php -S localhost:8000
```
Puis ouvrez votre navigateur sur [http://localhost:8000](http://localhost:8000).

#### Méthode D : Avec l'extension VS Code *Live Server*
1. Ouvrez le dossier dans VS Code.
2. Clic droit sur `index.html` > **Open with Live Server**.

---

## 🔄 Déploiement Continu (CI/CD)

Le site est déployé automatiquement à chaque nouveau commit sur la branche `main` grâce au workflow GitHub Actions défini dans [`.github/workflows/main.yml`](.github/workflows/main.yml).

### Fonctionnement du Pipeline :
1. **Déclenchement (`push: branches: [main]`)** : capture toute modification poussée sur la branche principale.
2. **Checkout du code** : utilisation de `actions/checkout@v4`.
3. **Synchronisation FTP (`SamKirkland/FTP-Deploy-Action@v4.3.6`)** : synchronisation différentielle des fichiers modifiés vers le serveur distant dans le répertoire cible `/sites/bio.noblexecutor.xyz/`.

```yaml
name: 🚀 Deploy website on push (MAIN)
on:
  push:
    branches:
      - main

jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest
    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v4
      
      - name: 📂 Sync files
        uses: SamKirkland/FTP-Deploy-Action@v4.3.6
        with:
          server: ${{ secrets.ftp_server }}
          username: ${{ secrets.ftp_username }}
          password: ${{ secrets.ftp_password }}
          server-dir: /sites/bio.noblexecutor.xyz/
```

### Configuration des Secrets GitHub :
Pour configurer ce déploiement sur votre propre fork ou serveur :
1. Accédez à votre dépôt sur GitHub > **Settings** > **Secrets and variables** > **Actions**.
2. Créez les secrets de dépôt suivants :
   - `ftp_server` : nom d'hôte ou IP de votre serveur FTP.
   - `ftp_username` : identifiant de connexion FTP.
   - `ftp_password` : mot de passe FTP.

---

## ♿ Accessibilité & Bonnes Pratiques

- **Balisage sémantique moderne** : utilisation rigoureuse des éléments `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **Rôles et états ARIA** :
  - Menu accessible avec `role="dialog"`, `aria-modal="true"`, `aria-expanded` et `aria-controls`.
  - Notifications vocalisables (`aria-live="polite"` pour les descriptions du menu).
  - Boutons dotés d'étiquettes explicites (`aria-label`) pour les lecteurs d'écran.
- **Navigation clavier intégrale** : l'ensemble des éléments interactifs (menu pause, options, lecteur audio, contrôles) est navigable au clavier avec styles de focus dédiés (`:focus-visible`).
- **Préférence de réduction des animations** : prise en compte de la media query `@media (prefers-reduced-motion: reduce)` pour adapter ou désactiver les animations pour les personnes sensibles.

---

## 👥 Auteur & Crédits

### Concepteur & Développeur
- **Florent** ([@NobleExecutor](https://github.com/NobleExecutor))
- 🎓 **Formation :** BUT Métiers du Multimédia et de l'Internet (MMI) — Université de Haute-Alsace, Mulhouse
- 💼 **Recherche :** Alternance en Développement Web Full-Stack (2026–2028)
- ✉️ **Contact :** [noblexecutor@duck.com](mailto:noblexecutor@duck.com)
- 🔗 **LinkedIn :** [Florent Skamba](https://www.linkedin.com/in/florent-skamba/)
- 🌐 **Site Personnel :** [bio.noblexecutor.xyz](https://bio.noblexecutor.xyz/)

### Remerciements & Attribution
- **Projet d'origine & Assets :** Un immense merci à **[deltea](https://github.com/deltea)** pour son projet [**p3r-pause-menu**](https://github.com/deltea/p3r-pause-menu) ([démo en ligne](https://p3r.deltea.space) · [article de blog](https://www.deltea.space/blog/p3r-pause-menu)), dont sont issus les assets de base (vidéo d'ambiance `background.mp4`, bruitage sonore `navigation.wav`, typographies du jeu et fichiers SVG du curseur de sélection).
- **Inspiration UI :** Ce portfolio réimplémente et adapte ces éléments en Vanilla HTML/CSS/JS natif (sans dépendances) pour servir de vitrine personnelle et de lecteur musical complet.

### Propriété Intellectuelle
- **Persona 3 Reload** est une marque déposée et une propriété exclusive d'**ATLUS** et **SEGA**.
- Les musiques, bruitages sonores et polices de caractères issus de l'univers de Persona 3 Reload sont utilisés ici à des fins strictement personnelles, éducatives et de démonstration technique non commerciale.

