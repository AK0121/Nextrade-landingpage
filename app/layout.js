import { DM_Sans, Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nextrade | Trade like a boss | 1000X margin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${inter.variable} antialiased `}
      >
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155'
            },
            success: {
              style: {
                border: '1px solid #10b981'
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff'
              }
            },
            error: {
              style: {
                border: '1px solid #ef4444'
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff'
              }
            }
          }}
        />
      </body>
    </html>
  );
}
