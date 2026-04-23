# HNG Invoice App

**Live Demo:** [https://hng-projects.github.io/invoice-app](https://hng-projects.github.io/invoice-app)

This is a React invoice management app I built for the HNG internship stage 2 task. My main goal was to create a clean, working app where you can manage your invoices and save your changes. The UI was built by reproducing this [Figma Design](https://www.figma.com/design/e3MtRefbZw41Ts897CQF4N/invoice-app?node-id=0-1&p=f).

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Hng-projects/invoice-app.git
   cd invoice-app
   ```
2. **Install Dependencies**:
   Make sure you have Node.js and `pnpm` installed.
   ```bash
   pnpm install
   ```
3. **Run Locally**:
   ```bash
   pnpm run dev
   ```
4. **Build for Production**:
   ```bash
   pnpm run build
   ```

## Design and Architecture

I built this project with React 19, TypeScript, and Vite. I also used React Router v7 to handle the different pages and URL routing.

To keep things simple without setting up an actual database, I used the browser's `localStorage` to save the invoice data. This means when you add, edit, or delete an invoice, the changes are saved in your browser and will still be there even if you refresh the page.

For styling, I used regular Vanilla CSS Modules instead of a framework like Tailwind. Honestly, I just prefer standard CSS. I find it much easier to read and understand without having to memorize a bunch of generic utility class names, and it keeps my styles neatly separated per component.

## Technical Choices

I made a few specific choices while building this:

- **Native `<dialog>` elements:** Instead of downloading a third-party library for the modals, I used the browser's built-in `<dialog>` tags. They can be a little annoying to animate, but by using some newer CSS features ([`@starting-style`](./src/components/invoices/InvoiceForm/invoice-form.module.css#L42)), I got them to fade and slide naturally without needing extra JavaScript.
- **Local Storage over a Backend:** As mentioned earlier, I stuck to `localStorage` instead of building a real backend. It's fast and gets the job done for a frontend task, though it obviously means your invoices are only saved on your specific computer.

## Accessibility

I tried to make sure the app was accessible and easy to use:

- **Focus Trapping:** When you open the form or a popup, I wrote a small custom hook that traps your keyboard's "Tab" focus inside that modal, so you don't accidentally highlight buttons hidden in the background (see [`useNativeModal.ts:12-35`](./src/components/invoices/InvoiceForm/hooks/useNativeModal.ts#L12)).
- **Accessible Dropdowns:** I used Radix UI for the dropdown menus. It automatically handles all the correct screen-reader tags (WAI-ARIA) and keyboard controls.
- **Dark Mode:** The app includes a fully working dark mode toggle that swaps out CSS color variables for better contrast.

## Extra Touches

I added a few small extras to make the app feel a bit nicer:

- **Page Transitions:** I turned on React Router's new View Transitions feature to make moving between the invoice list and the details page look smoother.
- **Fixing Scrollbar Jumps:** Usually, hiding the page scrollbar when a modal opens causes the whole screen to jump horizontally. I added some quick math to temporarily replace the scrollbar's width with padding to fix that annoying visual bug (see [`useNativeModal.ts:39-42`](./src/components/invoices/InvoiceForm/hooks/useNativeModal.ts#L39)).
- **Quick Status Updates:** You can click the status badge on the details page to quickly change it between "Pending," "Draft," and "Paid" using a little dropdown.
- **Status Rules:** I added a small rule that permanently disables the edit button and status dropdown as soon as an invoice is officially marked as "Paid".
