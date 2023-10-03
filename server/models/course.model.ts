import mongoose, { Document, Model, Schema } from "mongoose";

interface IComment extends Document {
  comment: string;
  user: object;
  commentReplies: IComment[];
}

interface IReview extends Document {
  rating: number;
  comment: string;
  user: object;
  commentReplies: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  vidoeThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  suggestion: string;
  questions: IComment[];
  links: ILink[];
}

interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

export const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});

export const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

export const commentSchema = new Schema<IComment>({
  comment: String,
  user: Object,
  commentReplies: [Object],
});

export const courseDataSchema = new Schema<ICourseData>({
  title: String,
  description: String,
  videoUrl: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  suggestion: String,
  questions: [commentSchema],
  links: [linkSchema],
});

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  tags: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },
  benefits: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  ratings: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
});

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default CourseModel;
