import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
//shadcn을 설치함으로써 자동으로 설치됨 clsx 설치할 필요 없음
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';

const IBMPlex = IBM_Plex_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
	title: 'Imaginify',
	description: 'AI-powered Image generator'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={cn('font-IBMPlex antialiased', IBMPlex.variable)}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
