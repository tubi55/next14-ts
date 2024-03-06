import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

//MongoDB connection 객체 인터페이스
interface MongooseConnection {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

//Next에서는 서버 action이 실행될때마다 DB컨넥션을 열고 action수행후 바로 DB컨넥션을 제거
//만약 단기간에 여러 서버 action요청이 들어오면 무수히 많은 DB컨넥션이 빈번하게 생기고 사라짐
//따라서 현재 몽고DB가 접속되어 있지 않더라도 연결객체를 미리 초기화해서 캐싱처리하면 최적화처리를 할 수 있음
//(global as any) global=전역 scope, as any는 타입
//결국 any type인 전역 scope에 mongoose객체가 없으면 null값으로 초기화해서 미리 캐싱처리
//Serverless 개발의 특징 : 클라우드 컴퓨팅으로 인해 개발자가 직접 서버를 관리할 필요없이 애플리케이션을 빌드하고 실행가능 (Scalable: 상황에 따라 확장용이)
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
	if (cached.conn) return cached.conn;
	if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

	//bufferCommands:false (mongoose는 DB연결을 기다리지 않고 이전 모델객체의 정보를 참조해 즉각 사용할 수 있도록 buffering 기능이 기본설정되어 있음 )
	//그렇다보니 만약 DB접속전 Model에 문제가 발생시 해당 에러를 내보내지 않는 문제점이 있기 때문에 buffering기능을 비활성화
	cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: "imaginify", bufferCommands: false });
	cached.conn = await cached.promise;

	return cached.conn;
};
