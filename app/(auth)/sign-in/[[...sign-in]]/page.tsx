import { SignIn } from "@clerk/nextjs";
import React from "react";

//참고로 구글 로그인시 시스템시간이 안맞아서 에러 나는데 그때는 위도우 오른쪽 하단의 시간우클릭후 날짜시간조정에서
//자동으로 시간설정 끄면 해결됨
//윈도우 설정 건드리지 않고 수정하는법 계속 고민중
const SignInPage = () => {
	return <SignIn />;
};

export default SignInPage;
