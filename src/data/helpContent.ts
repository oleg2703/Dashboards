export interface FaqItem {
  question: string
  answer: string
}

export interface FaqSection {
  title: string
  items: FaqItem[]
}

// Plain content, no DB table needed for this — edit this file directly
// when the product behaviour changes (e.g. the low-stock threshold).
export const faqSections: FaqSection[] = [
  {
    title: 'Orders',
    items: [
      {
        question: 'Why can\u2019t I add more of a product than is in stock?',
        answer:
          'When you add an item to an order, the quantity is checked against the product\u2019s current stock. This stops an order from promising more units than the store actually has available.',
      },
      {
        question: 'How is the order total calculated?',
        answer:
          'The total is calculated automatically from the items you add \u2014 quantity \u00d7 price for each line, summed together. It isn\u2019t a field you type in yourself, so it can\u2019t drift out of sync with what was actually ordered.',
      },
      {
        question: 'Can I edit the items in an order after it\u2019s created?',
        answer:
          'Not yet \u2014 once an order is created, you can update its status (e.g. mark it as paid or cancelled), but the list of items is locked. If the items were wrong, cancel the order and create a new one.',
      },
    ],
  },
  {
    title: 'Products',
    items: [
      {
        question: 'What does the “Low Stock” status mean?',
        answer:
          'A product is automatically marked “Low Stock” once its stock quantity drops to 5 units or fewer, and “Active” above that. You don’t set this status yourself — it’s calculated from the stock number whenever you create or edit a product.',
      },
    ],
  },
  {
    title: 'Customers',
    items: [
      {
        question:
          'Why can\u2019t I manually set a customer\u2019s Total Spent or Orders Count?',
        answer:
          'Those numbers are calculated automatically from the customer\u2019s real orders, so they always reflect reality. Any value you type into those fields when adding a customer is just a placeholder and will be replaced by the real total as soon as the page reloads.',
      },
    ],
  },
  {
    title: 'Roles & access',
    items: [
      {
        question: 'What can each role do?',
        answer:
          'Viewer: can view the dashboard, products, customers and orders, but can\u2019t create, edit or delete anything. Manager: everything a Viewer can do, plus creating and editing products, customers and orders. Admin: everything a Manager can do, plus deleting records and managing other users\u2019 roles in Settings.',
      },
      {
        question:
          'Why don\u2019t I see an Add or Delete button that a colleague sees?',
        answer:
          'Buttons are shown based on your role\u2019s permissions. If you believe you should have more access, ask an Admin to update your role from the Settings page.',
      },
      {
        question: 'I just signed up \u2014 why can I only view things?',
        answer:
          'New accounts start as Viewer by default, so nobody can grant themselves elevated access just by signing up. An existing Admin needs to promote your account from the Settings page before you can add or edit records.',
      },
    ],
  },
]

export const supportContact = {
  email: 'support@yourstore.example',
  note: 'For anything not covered here \u2014 bugs, access requests, or feature ideas \u2014 email us directly.',
}