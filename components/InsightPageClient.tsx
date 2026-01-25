"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Insight } from "@/data/insights";
import Reveal from "@/components/ui/Reveal";
import {
    Calendar, Clock, ArrowRight, ArrowLeft, BookOpen,
    Globe, ChevronDown, Check
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type Props = {
    post: Insight;
    related: Insight[];
};

type Language = "en" | "ar";

const LABELS = {
    en: {
        back: "Back to Insights",
        keyTakeaways: "Key Takeaways",
        related: "Related Articles",
        readMins: "min read",
        onThisPage: "On This Page",
        needAdvice: "Need Solar Advice?",
        needAdviceDesc: "Our experts are ready to help you find the perfect energy solution.",
        getConsultation: "Get Free Consultation",
        readyToStart: "Ready to Start Your Solar Journey?",
        readyDesc: "Get a free consultation and discover how solar energy can reduce your electricity costs.",
        contactUs: "Contact Us",
        moreInsights: "More Insights",
    },
    ar: {
        back: "عودة إلى الرؤى",
        keyTakeaways: "الأفكار الرئيسية",
        related: "مقالات ذات صلة",
        readMins: "دقيقة للقراءة",
        onThisPage: "في هذه الصفحة",
        needAdvice: "هل تحتاج إلى نصيحة؟",
        needAdviceDesc: "خبراؤنا مستعدون لمساعدتك في العثور على حل الطاقة الأمثل.",
        getConsultation: "احصل على استشارة مجانية",
        readyToStart: "هل أنت مستعد لبدء رحلتك مع الطاقة الشمسية؟",
        readyDesc: "احصل على استشارة مجانية واكتشف كيف يمكن للطاقة الشمسية تقليل تكاليف الكهرباء لديك.",
        contactUs: "اتصل بنا",
        moreInsights: "المزيد من الرؤى",
    }
};

export default function InsightPageClient({ post, related }: Props) {
    const [lang, setLang] = useState<Language>("en");
    const isAr = lang === "ar";
    const dir = isAr ? "rtl" : "ltr";
    const text = LABELS[lang];

    // Resolve content based on language
    const title = isAr && post.titleAr ? post.titleAr : post.title;
    // If Arabic excerpt is missing, fallback to English (or empty string/custom logic)
    const excerpt = (isAr && post.excerptAr) ? post.excerptAr : post.excerpt;

    // Sections: Fallback to English if Arabic sections are missing
    const sections = (isAr && post.sectionsAr) ? post.sectionsAr : post.sections;

    // Build takeaways logic (simplified for client side)
    // We'll use the bullets from the first section that has them, or headings
    const firstWithBullets = sections.find((s) => s.bullets && s.bullets.length > 0);
    const takeaways =
        firstWithBullets?.bullets?.slice(0, 4) ??
        sections.slice(0, 4).map((s) => s.heading);

    return (
        <div dir={dir} className={`w-full overflow-x-clip ${isAr ? "font-arabic" : ""}`}>

            {/* PREMIUM HERO */}
            <section className="relative min-h-[50vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={post.cover}
                        alt={post.coverAlt}
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/85 to-zinc-900/60" />
                </div>

                {/* Triangle decorations */}
                <div className={`absolute top-0 ${isAr ? 'right-0 border-r-[32px] border-r-brand-yellow border-t-[32px] border-t-transparent border-l-[32px] border-l-transparent border-b-[32px] border-b-brand-yellow' : 'left-0 border-l-[32px] border-l-brand-yellow border-t-[32px] border-t-transparent border-r-[32px] border-r-transparent border-b-[32px] border-b-brand-yellow'} opacity-30`} />

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 w-full">
                    <Reveal className="max-w-4xl">
                        {/* Top Row: Back Link & Language Switcher */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                            <Link
                                href="/insights"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                                dir="ltr"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                {text.back}
                            </Link>

                            {/* Language Switcher */}
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow text-zinc-900 text-sm font-bold shadow-lg hover:bg-brand-orange transition-colors">
                                        <Globe className="w-4 h-4" />
                                        <span>{lang === 'en' ? 'English' : 'العربية'}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content
                                        align="end"
                                        sideOffset={5}
                                        className="min-w-[140px] bg-white rounded-xl shadow-xl border border-zinc-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200"
                                    >
                                        <DropdownMenu.Item
                                            onSelect={() => setLang('en')}
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium cursor-pointer outline-none transition-colors ${lang === 'en' ? 'bg-brand-yellow/10 text-brand-yellow' : 'text-zinc-700 hover:bg-zinc-50'}`}
                                        >
                                            English
                                            {lang === 'en' && <Check className="w-4 h-4" />}
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item
                                            onSelect={() => setLang('ar')}
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium cursor-pointer outline-none transition-colors ${lang === 'ar' ? 'bg-brand-yellow/10 text-brand-yellow' : 'text-zinc-700 hover:bg-zinc-50'}`}
                                        >
                                            العربية
                                            {lang === 'ar' && <Check className="w-4 h-4" />}
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span key={tag} className="px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight ${isAr ? 'font-arabic' : ''}`}>
                            {title}
                        </h1>

                        <div className="mt-4 w-24 h-1 bg-brand-yellow rounded-full" />

                        <p className="mt-6 text-xl text-zinc-300 max-w-3xl leading-relaxed">
                            {excerpt}
                        </p>

                        {/* Meta info */}
                        <div className="mt-6 flex flex-wrap items-center gap-6 text-zinc-400">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-brand-yellow" />
                                {new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-brand-yellow" />
                                {post.readMins} {text.readMins}
                            </span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Article column */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Key Takeaways - Only show if we have them */}
                            {takeaways && takeaways.length > 0 && (
                                <Reveal className="p-8 rounded-2xl bg-brand-yellow/5 border border-brand-yellow/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-brand-yellow text-zinc-900 inline-grid place-items-center">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-xl font-bold text-zinc-900">{text.keyTakeaways}</h2>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {takeaways.map((t, i) => (
                                            <li
                                                key={`${t}-${i}`}
                                                className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm text-zinc-700 leading-relaxed"
                                            >
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            )}

                            {/* Prose Content */}
                            <article className={`prose prose-lg max-w-none prose-headings:text-zinc-900 prose-headings:font-bold prose-p:text-zinc-700 prose-p:leading-relaxed prose-li:text-zinc-700 ${isAr ? 'font-arabic text-right' : ''}`}>
                                {sections.map((s) => (
                                    <section key={s.id} id={s.id} className="scroll-mt-24 mb-10">
                                        <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
                                            <span className="w-1 h-8 bg-brand-yellow rounded-full" />
                                            {s.heading}
                                        </h2>

                                        {s.paras.map((p, i) => (
                                            <p key={i} className="mb-4">{p}</p>
                                        ))}

                                        {s.bullets && (
                                            <ul className="space-y-2 my-6">
                                                {s.bullets.map((b, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <span className="w-2 h-2 mt-2.5 rounded-full bg-brand-yellow flex-shrink-0" />
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {s.note && (
                                            <div className="rounded-xl p-5 bg-brand-yellow/10 border border-brand-yellow/20 my-6">
                                                <strong className="text-brand-yellow">{isAr ? "ملاحظة:" : "Note:"}</strong>
                                                <p className="mt-2 text-zinc-700">{s.note}</p>
                                            </div>
                                        )}
                                    </section>
                                ))}
                            </article>

                            {/* FAQ Section - if available in current lang */}
                            {/* Note: We didn't add faqAr yet, but handled gracefully via fallback or empty check */}
                            {(isAr ? post.faqAr : post.faq) && (
                                <Reveal className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200">
                                    <h2 className="text-2xl font-bold text-zinc-900 mb-6">{isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h2>
                                    <div className="space-y-4">
                                        {(isAr ? post.faqAr || [] : post.faq || []).map((f, i) => (
                                            <details
                                                key={i}
                                                className="group rounded-xl border border-zinc-200 bg-white overflow-hidden"
                                            >
                                                <summary className="px-6 py-4 font-semibold cursor-pointer list-none text-zinc-900 hover:text-brand-yellow transition-colors flex items-center justify-between">
                                                    {f.q}
                                                    <ArrowRight className={`w-5 h-5 transform transition-transform ${isAr ? 'rotate-180 group-open:rotate-90' : 'group-open:rotate-90'}`} />
                                                </summary>
                                                <div className="px-6 pb-4 text-zinc-600">{f.a}</div>
                                            </details>
                                        ))}
                                    </div>
                                </Reveal>
                            )}

                            {/* Custom HTML Section - ALWAYS RENDERED (Contact Form) */}
                            {post.customHtml && (
                                <div
                                    className="custom-html-section"
                                    dangerouslySetInnerHTML={{ __html: post.customHtml }}
                                />
                            )}
                        </div>

                        {/* Sidebar column - Sticky */}
                        <aside className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-24">
                            {/* Table of Contents */}
                            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-lg">
                                <h3 className={`text-lg font-bold text-zinc-900 mb-4 ${isAr ? 'text-right' : ''}`}>{text.onThisPage}</h3>
                                <div className={`w-12 h-1 bg-brand-yellow rounded-full mb-4 ${isAr ? 'ml-auto mr-0' : ''}`} />
                                <nav className="space-y-2">
                                    {sections.map((s) => (
                                        <a
                                            key={s.id}
                                            href={`#${s.id}`}
                                            className={`block py-2 px-3 rounded-lg text-zinc-600 hover:bg-brand-yellow/10 hover:text-brand-yellow transition-colors ${isAr ? 'text-right' : ''}`}
                                        >
                                            {s.heading}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            {/* Related Articles - Kept in original language (mixed) or could be translated if data existed */}
                            {related.length > 0 && (
                                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-lg">
                                    <h3 className={`text-lg font-bold text-zinc-900 mb-4 ${isAr ? 'text-right' : ''}`}>{text.related}</h3>
                                    <div className={`w-12 h-1 bg-brand-yellow rounded-full mb-4 ${isAr ? 'ml-auto mr-0' : ''}`} />
                                    <div className="space-y-4">
                                        {related.map((p) => (
                                            <Link key={p.slug} href={`/insights/${p.slug}`} className="group flex items-start gap-4">
                                                <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-zinc-200 flex-shrink-0">
                                                    <Image src={p.cover} alt={p.coverAlt} fill className="object-cover group-hover:scale-105 transition-transform" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`font-semibold text-zinc-900 group-hover:text-brand-yellow transition-colors line-clamp-2 ${isAr ? 'text-right' : ''}`}>
                                                        {p.title}
                                                    </h4>
                                                    <p className={`text-sm text-zinc-500 mt-1 ${isAr ? 'text-right' : ''}`}>{p.readMins} {text.readMins}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Card */}
                            <div className="p-6 rounded-2xl bg-zinc-900 text-white">
                                <h3 className={`text-lg font-bold mb-2 ${isAr ? 'text-right' : ''}`}>{text.needAdvice}</h3>
                                <p className={`text-sm text-zinc-400 mb-4 ${isAr ? 'text-right' : ''}`}>
                                    {text.needAdviceDesc}
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-yellow text-zinc-900 font-bold hover:bg-brand-orange transition-colors"
                                >
                                    {text.getConsultation} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-20 bg-brand-yellow">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
                        {text.readyToStart}
                    </h2>
                    <p className="mt-4 text-lg text-zinc-800 max-w-2xl mx-auto">
                        {text.readyDesc}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-xl bg-zinc-900 text-white font-bold text-lg hover:bg-zinc-800 transition-all flex items-center gap-2"
                        >
                            {text.contactUs} <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link
                            href="/insights"
                            className="px-8 py-4 rounded-xl bg-white text-zinc-900 font-bold text-lg hover:shadow-lg transition-all"
                        >
                            {text.moreInsights}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
