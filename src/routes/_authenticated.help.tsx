import { createFileRoute } from '@tanstack/react-router'
import { Mail } from 'lucide-react'

import Sidebar from '#/components/layout/Sidebar'
import Header from '#/components/layout/Header'
import { faqSections, supportContact } from '../data/helpContent'

export const Route = createFileRoute('/_authenticated/help')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="w-full overflow-y-auto p-2">
        <Header />

        <div className="mx-auto max-w-3xl px-2 pb-10">
          <h1 className="mt-4 text-2xl font-bold">Help Center</h1>
          <p className="mt-1 text-(--text-secondary)">
            Answers to common questions about using the dashboard.
          </p>

          <div className="mt-6 space-y-8">
            {faqSections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>

                <div className="space-y-2">
                  {section.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-(--border) bg-(--card-bg) p-4 open:pb-4"
                    >
                      <summary className="cursor-pointer list-none font-medium marker:content-none">
                        <span className="flex items-center justify-between gap-4">
                          {item.question}
                          <span className="shrink-0 text-(--text-secondary) transition-transform group-open:rotate-45">
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-(--text-secondary)">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-xl border border-(--border) bg-(--surface-hover) p-5">
            <h2 className="text-lg font-semibold">Still need help?</h2>
            <p className="mt-1 text-(--text-secondary)">
              {supportContact.note}
            </p>
            <a
              href={`mailto:${supportContact.email}`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Mail size={16} />
              {supportContact.email}
            </a>
          </section>
        </div>
      </div>
    </main>
  )
}