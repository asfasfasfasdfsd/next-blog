import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/**/}
      <head />
      <body>{children}</body>
    </html>
  );
}
