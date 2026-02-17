"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  User,
  HelpCircle,
  Briefcase,
  Workflow,
  BookOpen,
  Code,
  Mail,
  Settings,
  FolderOpen,
  Boxes,
  Moon,
  Sun,
  Star,
  Sparkles,
  DollarSign,
  Move,
  MousePointer2,
} from "lucide-react";

interface PageLink {
  path: string;
  name: string;
  description: string;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  pages: PageLink[];
}

const HomePage = () => {
  // Dark mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Saved pages state with localStorage persistence
  const [savedPages, setSavedPages] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set<string>();
    const saved = window.localStorage.getItem("savedPages");
    return saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
  });

  // Save to localStorage whenever dark mode changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Save to localStorage whenever saved pages change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "savedPages",
      JSON.stringify(Array.from(savedPages)),
    );
  }, [savedPages]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleSavedPage = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const categories: Category[] = [
    {
      name: "Navigation",
      icon: <Workflow className="w-4 h-4" />,
      pages: [
        {
          path: "/navbar/1",
          name: "Sticky Navbar",
          description: "Sticky Cards Navbar",
        },
        {
          path: "/navbar/2",
          name: "Pill Navbar",
          description: "Floating Pill Navbar",
        },
        {
          path: "/navbar/3",
          name: "Morphing Navbar",
          description: "Morphing Navbar with Stacked Cards",
        },
      ],
    },
    {
      name: "Cards",
      icon: <DollarSign className="w-4 h-4" />,
      pages: [
        {
          path: "/cards/1",
          name: "Sticky Card",
          description: "Sticky Card Animation",
        },
        {
          path: "/cards/2",
          name: "Sticky Scroll",
          description: "Sticky Scroll Card",
        },
        {
          path: "/cards/3",
          name: "Card Slider",
          description: "Card Slider Component",
        },
        {
          path: "/cards/4",
          name: "Slider Card",
          description: "Slider Card Animation",
        },
      ],
    },
    {
      name: "Heroes",
      icon: <Sparkles className="w-4 h-4" />,
      pages: [
        {
          path: "/hero/1",
          name: "Logistics Hero",
          description: "Shiprocket Logistics Hero",
        },
        {
          path: "/hero/2",
          name: "Services Hero",
          description: "Shiprocket Services Hero",
        },
        {
          path: "/hero/3",
          name: "Portfolio Hero",
          description: "Services & Solutions Portfolio",
        },
      ],
    },
    {
      name: "Grids",
      icon: <Boxes className="w-4 h-4" />,
      pages: [
        {
          path: "/grid/1",
          name: "Segments Grid",
          description: "Customer Segments Grid",
        },
        {
          path: "/grid/2",
          name: "Production Grid",
          description: "Photo Production Grid",
        },
        {
          path: "/grid/3",
          name: "Editorial Grid",
          description: "Editorial Grids",
        },
        {
          path: "/grid/4",
          name: "Brand Grid",
          description: "AI Brand Management Grid",
        },
      ],
    },
    {
      name: "Animations",
      icon: <Move className="w-4 h-4" />,
      pages: [
        {
          path: "/animation/1",
          name: "Text Reveal",
          description: "Scroll Text Reveal Animation",
        },
        {
          path: "/animation/2",
          name: "Character Reveal",
          description: "Smooth Character Reveal",
        },
        {
          path: "/animation/3",
          name: "Scroll Reveal",
          description: "Sticky Scroll Reveal",
        },
        {
          path: "/animation/6",
          name: "Responsibility",
          description: "Sticky Image Scroll",
        },
        {
          path: "/animation/7",
          name: "Reverse Scroll",
          description: "Sticky Image Reverse",
        },
        {
          path: "/animation/8",
          name: "Text Parallax",
          description: "Text Parallax On Scroll",
        },
        {
          path: "/animation/9",
          name: "Perspective Scroll",
          description: "Perspective Stacks Scroll",
        },
        {
          path: "/animation/10",
          name: "Perspective Scroll 2",
          description: "Perspective Stacks with Static End",
        },
        {
          path: "/animation/11",
          name: "Split Gallery",
          description: "Split Perspective Scroll Animation",
        },
      ],
    },
    {
      name: "Small Animations",
      icon: <MousePointer2 className="w-4 h-4" />,
      pages: [
        {
          path: "/small/1",
          name: "Magnetic Icons",
          description: "Magnetic Icons",
        },
        {
          path: "/small/2",
          name: "Button Collection",
          description: "Advanced Button Collection",
        },
        {
          path: "/small/3",
          name: "Fluid Buttons",
          description: "Fluid Button Collection",
        },
        {
          path: "/small/5",
          name: "Animated Stats",
          description: "Animated Counter with Stats",
        },
      ],
    },
    {
      name: "Small Components",
      icon: <HelpCircle className="w-4 h-4" />,
      pages: [
        {
          path: "/small-components/footer",
          name: "Footer",
          description: "Shiprocket Inspired Footer",
        },
        {
          path: "/small-components/accordian",
          name: "Accordian",
          description: "FAQ Accordian Component",
        },
        {
          path: "/small-components/4",
          name: "Velocity Text",
          description: "Scroll Velocity Animation",
        },
      ],
    },
  ];

  return (
    <div
      className={`h-screen overflow-hidden p-4 transition-colors duration-300 ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
        : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
        }`}
    >
      <div className="h-full flex flex-col">
        {/* Compact Header */}
        <div
          className={`flex items-center  justify-between mb-3 pb-2 border-b transition-colors ${isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
        >
          <div className="flex items-center gap-2">
            <h1
              className={`text-2xl font-bold transition-colors ${isDarkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Page Navigation
            </h1>
            <span
              className={`text-sm transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              (
              {categories.reduce(
                (sum, cat) => sum + cat.pages.length,
                0,
              )}{" "}
              pages)
            </span>
          </div>

          {/* Dark Mode Toggle */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className="sr-only"
            />
            <div
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isDarkMode ? "bg-indigo-600" : "bg-gray-300"
                }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 flex items-center justify-center ${isDarkMode ? "translate-x-6" : "translate-x-0"
                  }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-indigo-600" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </div>
            <span
              className={`text-sm font-medium transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </label>
        </div>

        {/* Compact Categories Grid - All in one view */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-2 lg:grid-cols-5 gap-3 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className={`rounded-lg shadow-sm p-3 h-[45vh]  hover:shadow-md transition-all border flex flex-col ${isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
              >
                {/* Compact Category Header */}
                <div
                  className={`flex items-center gap-2 mb-2 pb-2 border-b transition-colors ${isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                >
                  <div
                    className={`p-1 rounded flex-shrink-0 transition-colors ${isDarkMode
                      ? "bg-indigo-900 text-indigo-300"
                      : "bg-indigo-100 text-indigo-600"
                      }`}
                  >
                    {category.icon}
                  </div>
                  <h2
                    className={`text-sm font-semibold truncate flex-1 transition-colors ${isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                  >
                    {category.name}
                  </h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {category.pages.length}
                  </span>
                </div>

                {/* Compact Pages List */}
                <div className="flex-1 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {category.pages.map((page, pageIndex) => {
                    const isSaved = savedPages.has(page.path);
                    return (
                      <div
                        key={pageIndex}
                        className={`group relative p-2 rounded border transition-all duration-200 ${isDarkMode
                          ? isSaved
                            ? "bg-gradient-to-br from-indigo-900/40 to-gray-800 border-indigo-600 hover:border-indigo-500 hover:bg-indigo-900/50"
                            : "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 hover:border-indigo-500 hover:bg-indigo-900/30"
                          : isSaved
                            ? "bg-gradient-to-br from-indigo-50 to-white border-indigo-300 hover:border-indigo-400 hover:bg-indigo-100"
                            : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                          }`}
                      >
                        <Link
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-1"
                        >
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-xs font-semibold transition-colors truncate ${isDarkMode
                                ? isSaved
                                  ? "text-indigo-300 group-hover:text-indigo-200"
                                  : "text-gray-200 group-hover:text-indigo-300"
                                : isSaved
                                  ? "text-indigo-700 group-hover:text-indigo-800"
                                  : "text-gray-800 group-hover:text-indigo-600"
                                }`}
                            >
                              {page.name}
                            </div>
                            <div
                              className={`text-[10px] font-mono truncate transition-colors ${isDarkMode
                                ? "text-indigo-400"
                                : "text-indigo-600"
                                }`}
                            >
                              {page.path}
                            </div>
                          </div>
                        </Link>

                        {/* Checkbox for saving page */}
                        <button
                          onClick={(e) => toggleSavedPage(page.path, e)}
                          className={`absolute top-1 right-1 p-1 rounded transition-all duration-200 ${isDarkMode
                            ? isSaved
                              ? "bg-indigo-600 text-white hover:bg-indigo-500"
                              : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300"
                            : isSaved
                              ? "bg-indigo-500 text-white hover:bg-indigo-600"
                              : "bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-600"
                            }`}
                          title={isSaved ? "Remove from saved" : "Save page"}
                        >
                          {isSaved ? (
                            <Star className="w-3 h-3 fill-current" />
                          ) : (
                            <Star className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
