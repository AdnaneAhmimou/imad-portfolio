"use client"

import React from "react"
import Image from "next/image"

interface Tool {
    name: string
    icon: string
    categoryKey: string
}

const tools: Tool[] = [
    {
        name: "Dev C++",
        icon: "/devcpp.jpg",
        categoryKey: "dev",
    },
    {
        name: "TIA V16",
        icon: "/tiav16.png",
        categoryKey: "automation",
    },
    {
        name: "PSIM",
        icon: "/PSIM_logo.png",
        categoryKey: "simulation",
    },
    {
        name: "Arduino",
        icon: "/images.png",
        categoryKey: "embedded",
    },
    {
        name: "Proteus",
        icon: "/Proteus_Design_Suite_Atom_Logo.png",
        categoryKey: "simulation",
    },
]

interface ToolsSectionProps {
    language: "fr" | "de"
}

export default function ToolsSection({ language }: ToolsSectionProps) {
    const title = language === "fr" ? "Outils & Logiciels" : "Werkzeuge & Software"
    const subtitle = language === "fr"
        ? "Les technologies que j'utilise pour donner vie à mes projets."
        : "Die Technologien, die ich verwende, um meine Projekte zum Leben zu erwecken."

    // Dynamic Theme Color
    const themeColor = language === "fr" ? "blue" : "teal"
    const gradientText = language === "fr" ? "from-blue-600 to-cyan-500" : "from-teal-600 to-emerald-500"

    const getCategoryLabel = (key: string) => {
        const labels: Record<string, { fr: string, de: string }> = {
            dev: { fr: "Développement", de: "Entwicklung" },
            automation: { fr: "Automatisation", de: "Automatisierung" },
            simulation: { fr: "Simulation", de: "Simulation" },
            embedded: { fr: "Automatisation", de: "Automatisierung" },
            design: { fr: "Conception", de: "Design" },
        }
        return labels[key]?.[language] || key
    }

    return (
        <section id="tools" className="py-24 relative overflow-hidden bg-slate-50">
            {/* Background Circuit Pattern */}
            <div className="absolute inset-0 circuit-bg opacity-30"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-slate-900">{title.split('&')[0]} &</span>{' '}
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>{title.split('&')[1]}</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">{subtitle}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {tools.map((tool, index) => (
                        <div
                            key={index}
                            className={`group tech-card rounded-2xl p-6 bg-white hover:bg-gradient-to-br hover:from-white hover:to-${themeColor}-50/50 transition-all duration-300 animate-fadeInUp flex flex-col items-center justify-between min-h-[220px]`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`relative w-32 h-32 mb-4 p-4 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-${themeColor}-200 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center`}>
                                <div className={`absolute inset-0 bg-${themeColor}-500/5 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300`}></div>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={tool.icon}
                                        alt={tool.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className={`text-xl font-bold text-slate-900 mb-2 group-hover:text-${themeColor}-600 transition-colors`}>
                                    {tool.name}
                                </h3>

                                <span className={`inline-block px-3 py-1 text-xs font-mono font-medium rounded-full bg-${themeColor}-50 text-${themeColor}-600 border border-${themeColor}-100`}>
                                    {getCategoryLabel(tool.categoryKey)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
