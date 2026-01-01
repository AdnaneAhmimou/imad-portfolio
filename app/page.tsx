"use client"

import React, { useState, useEffect } from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"



import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import {
  Mail,
  Download,
  Zap,

  ChevronDown,
  GraduationCap,
  Briefcase,
  Linkedin,

  Instagram,
  Globe,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react"

// Type definitions
interface Project {
  id: number
  title: string
  description: string
  image: string
  details: string
  link: string
  linkFrench?: string
}



// Translation data
const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      contact: "Contact",
      resume: "CV",
    },
    // Hero Section
    hero: {
      name: "Imad Cherradi",
      title: "Ingénieur Électricien",
      tagline: "Solutions Innovantes. Conceptions Puissantes.",
      description:
        "Passionné par la création de systèmes électriques efficaces et durables qui relient la théorie aux applications pratiques.",
      downloadPortfolio: "Télécharger CV",
      contactMe: "Me Contacter",
    },
    // About Section
    about: {
      title: "À propos de moi",
      description:
        "Je suis Imad Cherradi, étudiant en licence en Génie Électrique et Systèmes d'Automatisation (GESA). Je suis actuellement à la recherche d'un stage et suis très motivé pour mettre mes compétences au service de votre entreprise afin de contribuer à la mise en œuvre de normes.",
      education: "Formation",
      experience: "Expérience",
      certifications: "Certifications",
      educationItems: [
        {
          degree: "Licence en Génie Électrique et Systèmes Automatisés",
          institution: "Faculté des Sciences et Techniques de SETTAT",
          date: "2023-2024",
        },
        {
          degree: "DEUST en Génie Électrique et Mécanique",
          institution: "FST Settat - Faculté des Sciences et Techniques de SETTAT",
          date: "2021-2023",
        },
        {
          degree: "Baccalauréat en Sciences Électriques et Technologies",
          institution: "Lycée Orangers RABAT",
          date: "2020-2021",
        },
        {
          degree: "DUT en tant que Technicien Spécialisé en Électromécanique des Systèmes Automatisés",
          institution: "OFPPT à Rabat - Office de la Formation Professionnelle et de la Promotion du Travail à RABAT",
          date: "2016-2019",
        },
        {
          degree: "Baccalauréat en Sciences Physiques",
          institution: "Lycée Moulay Abdellah Rabat",
          date: "2015-2016",
        },
      ],
      experienceItems: [
        {
          position: "Stage pour mon projet de fin d'études au Bureau d'Études EDEEP",
          company: "Al Jadida - Sujet : un banc d'automatisation, Avril - Juin 2024",
        },
        {
          position: "Stage dans un atelier de mécanique automobile et diagnostic en tant que technicien",
          company: "Rabat, Juillet - Août 2023",
        },
        {
          position: "Stage dans un atelier de bobinage en tant qu'opérateur",
          company: "Rabat, Octobre - Novembre 2019",
        },
      ],
      certificationsList: ["Licence PE", "LEED AP", "PMI-PMP", "Certifié NEC"],
    },
    // Projects Section
    projects: {
      title: "Projets Sélectionnés",
      subtitle:
        "Découvrez une sélection de mes projets d'ingénierie qui démontrent l'innovation, l'expertise technique et la résolution pratique de problèmes.",
      items: [
        {
          title: "Ein Automatisierungsprüfstand",
          titleFr: "Un Banc d'Automatisation",
          details: "",
        },
        {
          title: "Solar-Tracker",
          titleFr: "Suiveur Solaire",
          details: "",
        },
        {
          title: "Die Überwachung der Mischung zweier Produkte",
          titleFr: "Surveillance du Mélange de Deux Produits",
          details: "",
        },
        {
          title: "Wie stellt man Beton her?",
          titleFr: "Comment Fabriquer le Béton ?",
          details: "",
        },
      ],
      viewPresentation: "Voir la Présentation",
      projectLabel: "Projet",
    },
    // Contact Section
    contact: {
      title: "Contactez-moi",
      subtitle: "Intéressé par une collaboration ou avez des questions sur mes services ? N'hésitez pas à me contacter !",
      headerTitle: "Créons quelque chose d'",
      headerAccent: "exceptionnel",
      headerTitleEnd: " ensemble.",
      headerSubtitle: "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités de faire partie de vos visions.",
      mailLabel: "Courriel",
      socialLabel: "Réseaux Sociaux",
      info: {
        title: "Informations de Contact",
        location: "Localisation",
        locationValue: "Rabat, Maroc",
        email: "Email",
        emailValue: "imadcherradi15@gmail.com",
        phone: "Téléphone",
        phoneValue: "+212638668387",
        connectTitle: "Connectez-vous avec moi",
        availabilityTitle: "Disponibilité pour les Projets",
        availabilityStatus: "Actuellement disponible pour des projets de conseil",
        downloadResume: "Télécharger mon CV",
      },
    },
    // Footer
    footer: {
      copyright: "© 2024 Imad Cherradi. Tous droits réservés.",
      designedBy: "© 2025 • Conçu avec passion",
      timezone: "Fuseau horaire",
      localTime: "Heure locale",
    },
  },
  de: {
    // Navigation
    nav: {
      home: "Startseite",
      about: "Über mich",
      projects: "Projekte",
      contact: "Kontakt",
      resume: "Lebenslauf",
    },
    // Hero Section
    hero: {
      name: "Imad Cherradi",
      title: "Elektroingenieur",
      tagline: "Innovative Lösungen. Leistungsstarke Designs.",
      description:
        "Leidenschaftlich für die Entwicklung effizienter und nachhaltiger elektrischer Systeme, die Theorie mit praktischen Anwendungen verbinden.",
      downloadPortfolio: "Lebenslauf herunterladen",
      contactMe: "Kontaktieren Sie mich",
    },
    // About Section
    about: {
      title: "Über mich",
      description:
        "Ich bin Imad Cherradi, Bachelorstudent in Elektrotechnik und Automatisierungssystemen (GESA). Ich bin derzeit auf der Suche nach einem Praktikum und bin sehr motiviert, meine Fähigkeiten in den Dienst Ihres Unternehmens zu stellen, um zur Umsetzung von Standards beizutragen.",
      education: "Formationen",
      experience: "Erfahrung",
      certifications: "Zertifizierungen",
      educationItems: [
        {
          degree: "Bachelor-Abschluss in Elektrotechnik und automatisierten Systemen",
          institution: "Fakultät für Wissenschaft und Technologie in SETTAT",
          date: "2023-2024",
        },
        {
          degree: "Deust in Elektrotechnik und Maschinenbau",
          institution: "FST Settat - Fakultät für Wissenschaft und Technologie in SETTAT",
          date: "2021-2023",
        },
        {
          degree: "Abitur Elektrowissenschaften und Technologien",
          institution: "Orangers High School RABAT",
          date: "2020-2021",
        },
        {
          degree: "DUT als Fachtechniker für Elektromechanik automatisierter Systeme",
          institution: "OFPPT in Rabat - Büro für Berufsausbildung und Arbeitsförderung in RABAT",
          date: "2016-2019",
        },
        {
          degree: "Abitur Physikalische Wissenschaften",
          institution: "Moulay Abdellah High School Rabat",
          date: "2015-2016",
        },
      ],
      experienceItems: [
        {
          position: "Praktikum für mein PFE im EDEEP Konstruktionsbüro",
          company: "Al Jadida - Thema: eine Automatisierungsbank, April - Juni 2024",
        },
        {
          position: "Praktikum in einer Automechanik und Diagnose Werkstatt als Techniker",
          company: "Rabat, Juli - August 2023",
        },
        {
          position: "Praktikum in einer Spule Werkstatt als Bediener",
          company: "Rabat, Oktober - November 2019",
        },
      ],
      certificationsList: ["PE-Lizenz", "LEED AP", "PMI-PMP", "NEC-zertifiziert"],
    },
    // Projects Section
    projects: {
      title: "Ausgewählte Projekte",
      subtitle:
        "Entdecken Sie eine Auswahl meiner Ingenieursprojekte, die Innovation, technische Expertise und praktische Problemlösung demonstrieren.",
      items: [
        {
          title: "Ein Automatisierungsprüfstand",
          titleFr: "Un Banc d'Automatisation",
          details: "",
        },
        {
          title: "Solar-Tracker",
          titleFr: "Suiveur Solaire",
          details: "",
        },
        {
          title: "Die Überwachung der Mischung zweier Produkte",
          titleFr: "Surveillance du Mélange de Deux Produits",
          details: "",
        },
        {
          title: "Wie stellt man Beton her?",
          titleFr: "Comment Fabriquer le Béton ?",
          details: "",
        },
      ],
      viewPresentation: "Präsentation anzeigen",
      projectLabel: "Projekt",
    },
    // Contact Section
    contact: {
      title: "Kontakt aufnehmen",
      subtitle:
        "Interessiert an einer Zusammenarbeit oder haben Sie Fragen zu meinen Dienstleistungen? Zögern Sie nicht, sich zu melden!",
      headerTitle: "Lassen Sie uns gemeinsam etwas ",
      headerAccent: "Außergewöhnliches",
      headerTitleEnd: " schaffen.",
      headerSubtitle: "Ich bin immer offen für Gespräche über neue Projekte, kreative Ideen oder Möglichkeiten, Teil Ihrer Visionen zu sein.",
      mailLabel: "E-Mail",
      socialLabel: "Soziale Medien",
      info: {
        title: "Kontaktinformationen",
        location: "Standort",
        locationValue: "Rabat, Marokko",
        email: "E-Mail",
        emailValue: "imadcherradi15@gmail.com",
        phone: "Telefon",
        phoneValue: "+212 123-456-789",
        connectTitle: "Verbinden Sie sich mit mir",
        availabilityTitle: "Verfügbarkeit für Projekte",
        availabilityStatus: "Derzeit verfügbar für Beratungsprojekte",
        downloadResume: "Meinen Lebenslauf herunterladen",
      },
    },
    // Footer
    footer: {
      copyright: "© 2024 Imad Cherradi. Alle Rechte vorbehalten.",
      designedBy: "© 2025 • Mit Leidenschaft entworfen",
      timezone: "Zeitzone",
      localTime: "Ortszeit",
    },
  },
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"fr" | "de">("fr")

  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education")
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    // Initial update
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Casablanca' }))
    }
    updateTime()

    // Update every second
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("imad.cherradi@email.com") // Replace with actual email logic if needed
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email", err)
    }
  }

  // Get current translations
  const t = translations[language]

  const projects: Project[] = [
    {
      id: 1,
      title: language === "fr" ? t.projects.items[0].titleFr : t.projects.items[0].title,
      description: "",
      image: "/project11.png",
      details: "",
      link: "https://www.canva.com/design/DAGoYDb0o1E/7A7SFBGxi6oZ9tLBTh4ZpQ/edit?utm_content=DAGoYDb0o1E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
      linkFrench: "https://www.canva.com/design/DAGGuvnW36s/-aZh6vODbx64-ROaq-SRGQ/edit"
    },
    {
      id: 2,
      title: language === "fr" ? t.projects.items[1].titleFr : t.projects.items[1].title,
      description: "",
      image: "/project2.png",
      details: "",
      link: "https://www.canva.com/design/DAGnDgZXnOc/EzWIQ3XWq3zrJE-ntVMLNg/edit?utm_content=DAGnDgZXnOc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
      linkFrench: "https://www.canva.com/design/DAF3OxE2N_8/u5Hq5FqSpgv47KLXxh1rYw/edit",
    },
    {
      id: 3,
      title: language === "fr" ? t.projects.items[2].titleFr : t.projects.items[2].title,
      description: "",
      image: "/project3.png",
      details: "",
      link: "https://www.canva.com/design/DAGm_idjS6o/DBRnPPehbQUIq43dO-7vGg/edit?utm_content=DAGm_idjS6o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
      linkFrench: "https://www.canva.com/design/DAF-9Z_aygM/rfPcITcSjrBUIMOYv4JlJw/edit",
    },
    {
      id: 4,
      title: language === "fr" ? t.projects.items[3].titleFr : t.projects.items[3].title,
      description: "",
      image: "/project4.png",
      details: "",
      link: "https://www.canva.com/design/DAF3OXHvlWM/biCzORAqFWvVfIrCDG_HWg/edit",
      linkFrench: "",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDownloadPortfolio = () => {
    window.open("/IMAD CHERRADI (CV).pdf", "_blank")
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "de" : "fr")
  }



  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar - Card Style */}
      {/* Navigation Bar - Floating Capsule Design */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl animate-fadeInUp">
          {/* Logo/Name */}
          <div className="flex items-center mr-8">
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Imad <span className="text-blue-600">Cherradi</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { id: "hero", label: t.nav.home },
              { id: "about", label: t.nav.about },
              { id: "projects", label: t.nav.projects },
              { id: "contact", label: t.nav.contact }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-full transition-all capitalize"
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 ml-8">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "fr" ? "DE" : "FR"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-4 right-4 glass-panel rounded-2xl p-4 animate-fadeInUp md:hidden flex flex-col space-y-2">
            <button onClick={() => { scrollToSection("hero"); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-xl font-medium">{t.nav.home}</button>
            <button onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-xl font-medium">{t.nav.about}</button>
            <button onClick={() => { scrollToSection("projects"); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-xl font-medium">{t.nav.projects}</button>
            <button onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-xl font-medium">{t.nav.contact}</button>
            <button
              onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
              className="text-left px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-xl font-medium flex items-center"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "fr" ? "DE" : "FR"}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - Futuristic Electric Theme */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50"
      >
        {/* Animated Circuit Board Background - Electric Flow */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="#3b82f6" opacity="0.3" />
                <line x1="50" y1="50" x2="100" y2="50" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
                <line x1="50" y1="50" x2="50" y2="0" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
                {/* Micro-animations in pattern */}
                <circle cx="50" cy="50" r="1" fill="#60a5fa" className="animate-pulse" style={{ animationDuration: '3s' }} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" className="opacity-20" />

            {/* Dynamic Electric Lines with Glow */}
            <g style={{ filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))' }}>
              <path d="M0,100 Q400,250 800,100 T1600,100" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="3000" strokeDashoffset="3000" className="animate-draw opacity-80" />
              <path d="M0,800 Q300,600 600,800 T1600,800" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3000" strokeDashoffset="3000" className="animate-draw opacity-60" style={{ animationDuration: '7s', animationDelay: '1s' }} />
              <path d="M-100,400 Q400,200 900,400 T1900,400" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3000" strokeDashoffset="3000" className="animate-draw opacity-60" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            </g>
          </svg>
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 px-4 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text content */}
            <div className="text-left animate-fadeInUp">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-slate-900 tracking-tight leading-tight">
                <span className="inline-block">{t.hero.name.split(' ')[0]}</span>
                <br />
                <span className="text-gradient neon-glow">{t.hero.name.split(' ')[1]}</span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-light mb-8 text-slate-600 flex items-center">
                <span className="w-16 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 mr-4 animate-pulse"></span>
                {t.hero.title}
              </h2>

              {/* Mobile Image - Visible only on mobile/tablet */}
              <div className="flex lg:hidden justify-center mb-10 animate-float relative">
                {/* Rotating Tech Rings */}
                <div className="absolute inset-0 border-2 border-blue-400/20 rounded-full scale-125 opacity-40 border-dashed animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full scale-110 opacity-60 border-dashed animate-[spin_15s_linear_reverse_infinite]"></div>

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full holographic-border p-1 shadow-2xl shadow-blue-500/20">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-br from-slate-100 to-slate-200">
                    <Image
                      src="/1718251726199.jpeg"
                      alt="Imad Cherradi - Professional Photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Floating Tech Badge */}
                  <div className="absolute -bottom-6 -right-6 glass-panel px-6 py-4 rounded-2xl flex items-center gap-3 shadow-xl border-2 border-blue-400/30">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-slate-900">Innovation</p>
                      <p className="text-blue-600 font-semibold">Focused</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xl mb-10 text-slate-600 leading-relaxed max-w-lg">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  onClick={handleDownloadPortfolio}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all font-medium relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 translate-y-full group-hover:translate-y-0 transition-transform"></span>
                  <Download className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">{t.hero.downloadPortfolio}</span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="holographic-border text-slate-700 hover:text-blue-600 px-8 py-6 text-lg rounded-xl transition-all font-medium"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {t.hero.contactMe}
                </Button>
              </div>

              {/* Social Media Links - Tech Style */}
              <div className="flex items-center gap-6 border-t border-slate-200 pt-8">
                <a href="https://www.linkedin.com/in/imad-cherradi-0352a021a/" target="_blank" rel="noopener noreferrer" className="group relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors relative z-10" />
                </a>

                <a href="https://www.instagram.com/imad960" target="_blank" rel="noopener noreferrer" className="group relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <Instagram className="w-6 h-6 text-slate-400 group-hover:text-pink-600 transition-colors relative z-10" />
                </a>
              </div>
            </div>

            {/* Right side - Holographic Image Frame */}
            <div className="hidden lg:flex justify-center lg:justify-end animate-float relative">
              {/* Rotating Tech Rings */}
              <div className="absolute inset-0 border-2 border-blue-400/20 rounded-full scale-125 opacity-40 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full scale-110 opacity-60 border-dashed animate-[spin_15s_linear_reverse_infinite]"></div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full holographic-border p-1 shadow-2xl shadow-blue-500/20">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-br from-slate-100 to-slate-200">
                  <Image
                    src="/1718251726199.jpeg"
                    alt="Imad Cherradi - Professional Photo"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating Tech Badge */}
                <div className="absolute -bottom-6 -right-6 glass-panel px-6 py-4 rounded-2xl flex items-center gap-3 shadow-xl border-2 border-blue-400/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-slate-900">Innovation</p>
                    <p className="text-blue-600 font-semibold">Focused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-blue-400" />
        </div>
      </section>


      {/* About Me Section - Futuristic Tech Console */}
      <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
        {/* Animated Background */}
        <div className="absolute inset-0 circuit-bg opacity-30"></div>
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 Q400,100 800,50 T1600,50" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" className="animate-draw" style={{ animationDuration: '15s' }} />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-slate-900">{t.about.title.split(' ')[0]}</span>{' '}
              <span className="text-gradient">{t.about.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">{t.about.description}</p>
          </div>

          {/* Futuristic Tech Console */}
          <div className="holographic-border rounded-2xl shadow-2xl overflow-hidden mb-16 animate-fadeInUp relative bg-white">
            {/* Animated Top Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 animate-holographic"></div>

            {/* Simplified Tabs - Text with Underlines - Centered */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-4 pt-8 pb-4 md:px-8 md:pt-10 md:pb-6 flex justify-center gap-6 md:gap-16 relative">
              <button
                onClick={() => setActiveTab('education')}
                className={`group pb-2 md:pb-4 text-lg md:text-2xl font-bold tracking-wide transition-all flex items-center gap-2 md:gap-4 relative ${activeTab === 'education' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <GraduationCap className="w-7 h-7" />
                <span>{t.about.education}</span>
                {/* Animated underline */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all ${activeTab === 'education' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`group pb-2 md:pb-4 text-lg md:text-2xl font-bold tracking-wide transition-all flex items-center gap-2 md:gap-4 relative ${activeTab === 'experience' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Briefcase className="w-7 h-7" />
                <span>{t.about.experience}</span>
                {/* Animated underline */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all ${activeTab === 'experience' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </button>
            </div>

            {/* Console Body - Enhanced */}
            <div className="p-8 min-h-[400px] bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative">
              {/* Decorative circuit lines */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
                  <circle cx="10%" cy="50%" r="3" fill="#3b82f6" />
                  <circle cx="90%" cy="50%" r="3" fill="#06b6d4" />
                </svg>
              </div>

              {activeTab === 'education' ? (
                <div className="space-y-6 animate-fadeInUp relative z-10">
                  {t.about.educationItems.map((item, index) => (
                    <div key={index} className="group relative pl-10 border-l-2 border-blue-200 hover:border-blue-500 transition-all pb-2">
                      {/* Enhanced circuit node */}
                      <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
                        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                      </div>
                      {/* Power line indicator */}
                      <div className="absolute -left-[5px] top-8 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-cyan-400/50"></div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{item.degree}</h4>
                        <span className="font-mono text-xs font-bold text-blue-600 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-1.5 rounded-full whitespace-nowrap border border-blue-200 shadow-sm">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                          {item.date}
                        </span>
                      </div>
                      <p className="text-slate-500 font-medium">{item.institution}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 animate-fadeInUp relative z-10">
                  {t.about.experienceItems.map((item, index) => (
                    <div key={index} className="group relative pl-10 border-l-2 border-blue-200 hover:border-blue-500 transition-all pb-2">
                      {/* Enhanced circuit node */}
                      <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
                        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                      </div>
                      {/* Power line indicator */}
                      <div className="absolute -left-[5px] top-8 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-cyan-400/50"></div>

                      <div className="flex flex-col gap-1 mb-2">
                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{item.position}</h4>
                        <p className="text-slate-500 font-medium">{item.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Projects Section - Futuristic Minimalist */}
      <section id="projects" className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
        {/* Background Circuit Pattern */}
        <div className="absolute inset-0 circuit-bg opacity-20"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-slate-900">{t.projects.title.split(' ')[0]}</span>{' '}
              <span className="text-gradient">{t.projects.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">{t.projects.subtitle}</p>

            {/* Project Counter */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="font-mono text-sm text-blue-600 font-bold">{projects.length} Projects</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, index) => (
              <div
                key={proj.id}
                className="group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  const targetLink = language === "fr" && proj.linkFrench ? proj.linkFrench : proj.link
                  window.open(targetLink, "_blank", "noopener,noreferrer")
                }}
              >
                <div className="holographic-border rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 h-[420px] relative">

                  {/* Image Section */}
                  {proj.image && (
                    <div className="relative w-full h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                      {/* Circuit overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] z-10"></div>

                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10"></div>

                      {/* Project Number Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm border border-blue-200 flex items-center justify-center shadow-lg">
                          <span className="font-bold text-blue-600 font-mono text-sm">{proj.id.toString().padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-6 flex flex-col justify-between h-[164px] relative">
                    {/* Decorative line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">View Project</span>

                      {/* Animated arrow */}
                      <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-all duration-300">
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 -rotate-90 transition-all duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Interactive & Futuristic */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200/60 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-24">
            {/* Header Left */}
            <div className="space-y-6 max-w-sm animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                {t.contact.headerTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t.contact.headerAccent}</span>{t.contact.headerTitleEnd}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light">
                {t.contact.headerSubtitle}
              </p>
            </div>

            {/* Links Right */}
            <div className="flex flex-col gap-8 w-full md:min-w-[300px] animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {/* Email Box */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">{t.contact.mailLabel}</span>
                <div
                  onClick={copyToClipboard}
                  className="holographic-border group cursor-pointer relative bg-white rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 border border-slate-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{t.contact.info.emailValue}</span>
                  </div>

                  <div className="flex-shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors">
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Socials Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">{t.contact.socialLabel}</span>
                <div className="grid grid-cols-1 gap-4">
                  <a
                    href="https://linkedin.com/in/imad-cherradi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span className="font-medium text-slate-700 group-hover:text-blue-700">LinkedIn</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-slate-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Accent */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <p>{t.footer.designedBy}</p>
            <div className="flex gap-6">
              <span className="hover:text-blue-600 transition-colors cursor-default flex items-center gap-2">
                <Globe className="w-3 h-3" />
                {t.footer.timezone}: GMT+1
              </span>
              <span className="hover:text-blue-600 transition-colors cursor-default">
                {t.footer.localTime}: {currentTime || "..."}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg bg-gray-900 text-white border-gray-700 p-0 overflow-hidden">
          {selectedProject && (
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t.projects.projectLabel}</p>
                  <DialogTitle className="text-2xl font-bold text-white">{selectedProject.title}</DialogTitle>
                </div>
              </div>

              {/* Small Image */}
              <div className="mb-6">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={400}
                  height={128}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              {/* Description */}
              <DialogDescription className="text-gray-300 leading-relaxed text-sm mb-6">
                {selectedProject.details}
              </DialogDescription>

              {/* Link Button */}
              <div className="flex justify-start">
                <button
                  onClick={() => {
                    const targetLink = language === "fr" && selectedProject.linkFrench ? selectedProject.linkFrench : selectedProject.link
                    window.open(targetLink, "_blank", "noopener,noreferrer")
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
                >
                  {t.projects.viewPresentation} →
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
