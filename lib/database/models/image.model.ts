import { Document, Schema, model, models } from 'mongoose';

//mongoose로 부터 Doucment interface를 import해 확장해주면 _id에 대한 타입지정가능
export interface IImage extends Document {
	title: string;
	transformationType: string;
	publicId: string;
	secureUrl: string;
	width?: number;
	height?: number;
	config?: Object;
	transforamtionUrl?: string;
	aspectRatio?: string;
	color?: string;
	prompt?: string;
	author: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const ImageSchema = new Schema({
	title: { type: String, required: true },
	transformationType: { type: String, required: true },
	publicId: { type: String, required: true },
	secureUrl: { type: URL, required: true },
	width: { type: Number },
	height: { type: Number },
	config: { type: Object },
	transformationUrl: { type: URL },
	aspectRatio: { type: String },
	color: { type: String },
	prompt: { type: String },
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;
