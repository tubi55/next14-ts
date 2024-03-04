import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
//shadcn을 설치함으로써 자동으로 설치됨 clsx 설치할 필요 없음
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

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
		// clerk login 페이지의 포인트 색상 변경가능
		//clerk web page > customization > branding에서 로고이미지 등록 및 기타 수정사항 적용가능
		<ClerkProvider appearance={{ variables: { colorPrimary: '#624cf5' } }}>
			<html lang='en'>
				<body className={cn('font-IBMPlex antialiased', IBMPlex.variable)}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
