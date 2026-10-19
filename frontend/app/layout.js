import './globals.css';
import { Big_Shoulders_Display, Work_Sans } from 'next/font/google';
import Header from '../components/Header';

const display = Big_Shoulders_Display({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-display', display: 'swap' });
const body = Work_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: 'Plateworks - strength gym',
  description: 'Strength floor, coached classes and memberships priced by the plate.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>Plateworks Strength Club. Open 5 am to 11 pm, every day.</p>
            <p className="muted">Training platform demo. Sample gym, sample prices.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
